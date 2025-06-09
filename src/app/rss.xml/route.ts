import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { SITE_CONFIG } from '@/lib/constants';

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export async function GET() {
  const posts = await getAllPosts();
  const fullPosts = await Promise.all(
    posts.map(async (post) => {
      const fullPost = await getPostBySlug(post.slug);
      return fullPost;
    })
  );

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet href="/rss-styles.xsl" type="text/xsl"?>
<rss version="2.0" 
    xmlns:atom="http://www.w3.org/2005/Atom"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(SITE_CONFIG.name)}</title>
    <link>${SITE_CONFIG.url}</link>
    <description>${escapeXml(SITE_CONFIG.description)}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_CONFIG.url}/rss.xml" rel="self" type="application/rss+xml"/>
    <copyright>© ${new Date().getFullYear()} ${escapeXml(SITE_CONFIG.author.name)}</copyright>
    <generator>Next.js RSS Generator</generator>
    <ttl>60</ttl>
    ${fullPosts
      .filter(post => post !== null)
      .map(
        (post) => `
    <item>
      <title>${escapeXml(post!.title)}</title>
      <link>${SITE_CONFIG.url}/blog/${post!.slug}</link>
      <description>${escapeXml(post!.description)}</description>
      <pubDate>${new Date(post!.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${SITE_CONFIG.url}/blog/${post!.slug}</guid>
      <dc:creator>${escapeXml(post!.author)}</dc:creator>
      ${post!.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
      <content:encoded><![CDATA[${post!.content}]]></content:encoded>
      <comments>${SITE_CONFIG.url}/blog/${post!.slug}#comments</comments>
    </item>`
      )
      .join('\n')}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
      'X-Content-Type-Options': 'nosniff',
    },
  });
} 