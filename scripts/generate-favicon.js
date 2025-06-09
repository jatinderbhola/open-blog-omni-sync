const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const sizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 48, name: 'favicon-48x48.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'android-chrome-192x192.png' },
    { size: 512, name: 'android-chrome-512x512.png' }
];

async function generateFavicon() {
    // Create a 512x512 SVG with "OS" text
    const svg = `
        <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#0f172a" rx="102.4" ry="102.4"/>
            <text
                x="50%"
                y="50%"
                font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
                font-size="256"
                font-weight="bold"
                fill="white"
                text-anchor="middle"
                dominant-baseline="middle"
            >OS</text>
        </svg>
    `;

    // Ensure the public directory exists
    await fs.mkdir(path.join(process.cwd(), 'public'), { recursive: true });

    // Generate different sizes
    for (const { size, name } of sizes) {
        await sharp(Buffer.from(svg))
            .resize(size, size)
            .png()
            .toFile(path.join(process.cwd(), 'public', name));

        console.log(`Generated ${name}`);
    }

    // Generate ICO file for favicon.ico (includes 16x16 and 32x32)
    const favicon16 = await sharp(Buffer.from(svg))
        .resize(16, 16)
        .png()
        .toBuffer();

    const favicon32 = await sharp(Buffer.from(svg))
        .resize(32, 32)
        .png()
        .toBuffer();

    // Use the 32x32 version as favicon.ico
    await fs.writeFile(
        path.join(process.cwd(), 'public', 'favicon.ico'),
        favicon32
    );

    console.log('Generated favicon.ico');

    // Generate site.webmanifest
    const manifest = {
        name: 'Omni Sync - Blog',
        short_name: 'OS Blog',
        icons: [
            {
                src: '/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png'
            },
            {
                src: '/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png'
            }
        ],
        theme_color: '#0f172a',
        background_color: '#ffffff',
        display: 'standalone'
    };

    await fs.writeFile(
        path.join(process.cwd(), 'public', 'site.webmanifest'),
        JSON.stringify(manifest, null, 2)
    );

    console.log('Generated site.webmanifest');
}

generateFavicon().catch(console.error); 