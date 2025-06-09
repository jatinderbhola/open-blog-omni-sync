# Omni-Channel Blog Platform

A modern blog platform built with Next.js 14 that reads markdown files from a git repository and publishes to multiple platforms (website, LinkedIn, Medium, RSS).

## Features

- 📝 Static blog generation from markdown files
- 🏷️ Tag-based filtering and categorization
- 🌓 Dark/light theme support
- 📱 Responsive design with Tailwind CSS
- ✨ Syntax highlighting for code blocks
- 📊 Reading time estimation
- 🔍 SEO optimization
- 📡 RSS feed generation
- 🔄 Multi-platform publishing support
- 🎨 Modern UI with shadcn components

## Tech Stack

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [gray-matter](https://github.com/jonschlinkert/gray-matter)
- [remark](https://github.com/remarkjs/remark)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/open-blog-omni-sync.git
cd open-blog-omni-sync
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` to see your blog.

## Project Structure

```
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   ├── lib/             # Utility functions and platform adapters
│   ├── types/           # TypeScript type definitions
│   └── styles/          # Global styles and Tailwind config
├── content/
│   ├── posts/           # Blog posts in markdown format
│   └── drafts/          # Draft posts
├── public/              # Static assets
└── docs/               # Additional documentation
```

## Favicons

The project includes a complete set of favicons for various devices and platforms:

- `favicon.ico` - Classic favicon (32x32)
- `favicon-16x16.png` - Small favicon
- `favicon-32x32.png` - Standard favicon
- `apple-touch-icon.png` - Apple devices (180x180)
- `android-chrome-192x192.png` - Android devices
- `android-chrome-512x512.png` - Large Android devices
- `site.webmanifest` - Web app manifest

To generate new favicons:

1. Install dependencies:
```bash
npm install sharp --save-dev
```

2. Run the favicon generation script:
```bash
node scripts/generate-favicon.js
```

The script will create a modern, minimalist favicon with your initials or brand text in a rounded square design.

## Writing Content

Create markdown files in `content/posts/` with the following frontmatter:

```yaml
---
title: "Your Blog Post Title"
description: "Brief description for SEO"
date: "2024-01-15"
tags: ["nextjs", "react", "programming"]
published: true
featured: false
author: "Your Name"
---
```

## Platform Integration

### RSS Feed
- Automatically generated at `/feed.xml`
- Includes post metadata and content

### LinkedIn (Coming Soon)
- Configure LinkedIn API credentials in `.env`
- Posts will be published to your LinkedIn profile

### Medium (Coming Soon)
- Configure Medium API token in `.env`
- Posts will be published to your Medium account

## Development

### Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

### Adding New Platforms

1. Create a new adapter in `src/lib/platforms/`
2. Extend the `BasePlatformAdapter` class
3. Implement the required methods
4. Add configuration to `src/lib/constants.ts`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure environment variables
4. Deploy

### Other Platforms

Build the project:
```bash
npm run build
```

The static output will be in the `.next` directory.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Customizing Author Information

This project is designed to be easily forked and customized. To update the author information:

1. Fork this repository
2. Update the author configuration in `src/config/author.ts`:

```typescript
export const AUTHOR_CONFIG = {
    name: 'Your Name',
    email: 'your.email@example.com',
    website: 'https://yourwebsite.com',
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    bio: 'Your professional bio',
    location: 'Your Location',
    avatar: {
        type: 'generated',
        style: 'pixel-art',
    },
    social: {
        github: 'yourusername',
        linkedin: 'yourusername',
        twitter: 'yourusername',
    },
};
```

### Avatar Options

You can choose from two types of avatars:

1. **Custom Avatar**
   - Upload your image to `public/images/` directory
   - Set `avatar.type` to `'custom'`
   - Specify the path in `avatar.customPath`

2. **Generated Avatar** (Recommended)
   - Set `avatar.type` to `'generated'`
   - Choose a style from:
     - `initials`: Simple avatar with your initials
     - `avataaars`: Cartoon-style avatars
     - `bottts`: Robot-style avatars
     - `pixel-art`: 8-bit style pixel art
     - `identicon`: GitHub-style identicons
   - The avatar will be automatically generated based on your name

Generated avatars are powered by:
- [DiceBear](https://www.dicebear.com/) - For most styles
- [UI Avatars](https://ui-avatars.com/) - For initials style

## Original Author

- **Name:** Jatinder (Jay) Bhola
- **Website:** [jatinderbhola.com](https://jatinderbhola.com)
- **GitHub:** [@jatinderbhola](https://github.com/jatinderbhola)
- **LinkedIn:** [@jatinderbhola](https://www.linkedin.com/in/jatinderbhola) 