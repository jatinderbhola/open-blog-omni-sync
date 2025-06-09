<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title><xsl:value-of select="/rss/channel/title"/> - RSS Feed</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <style type="text/css">
          body {
            max-width: 800px;
            margin: 0 auto;
            font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
            padding: 2rem;
            line-height: 1.5;
            color: #24292e;
          }
          h1 { color: #166534; }
          h2 { color: #15803d; margin-top: 2rem; }
          a { color: #2563eb; text-decoration: none; }
          a:hover { text-decoration: underline; }
          .post { margin: 2rem 0; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; }
          .post:hover { background-color: #f9fafb; }
          .meta { color: #6b7280; font-size: 0.875rem; }
          .categories { margin-top: 0.5rem; }
          .category {
            display: inline-block;
            padding: 0.25rem 0.5rem;
            margin: 0.25rem;
            background-color: #e5e7eb;
            border-radius: 0.25rem;
            color: #374151;
            font-size: 0.75rem;
          }
          .description { margin: 1rem 0; }
        </style>
      </head>
      <body>
        <h1><xsl:value-of select="/rss/channel/title"/></h1>
        <p><xsl:value-of select="/rss/channel/description"/></p>
        <p class="meta">
          Last updated: <xsl:value-of select="/rss/channel/lastBuildDate"/>
          <br/>
          <a>
            <xsl:attribute name="href">
              <xsl:value-of select="/rss/channel/link"/>
            </xsl:attribute>
            Visit Website
          </a>
          &#160;|&#160;
          <a>
            <xsl:attribute name="href">
              <xsl:value-of select="/rss/channel/atom:link/@href"/>
            </xsl:attribute>
            RSS Feed
          </a>
        </p>
        
        <h2>Recent Posts</h2>
        <xsl:for-each select="/rss/channel/item">
          <div class="post">
            <h3>
              <a>
                <xsl:attribute name="href">
                  <xsl:value-of select="link"/>
                </xsl:attribute>
                <xsl:value-of select="title"/>
              </a>
            </h3>
            <p class="meta">
              Published: <xsl:value-of select="pubDate"/>
              <br/>
              Author: <xsl:value-of select="dc:creator"/>
            </p>
            <p class="description">
              <xsl:value-of select="description"/>
            </p>
            <div class="categories">
              <xsl:for-each select="category">
                <span class="category">
                  <xsl:value-of select="."/>
                </span>
              </xsl:for-each>
            </div>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet> 