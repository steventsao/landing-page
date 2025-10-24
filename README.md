# Publisher Landing Page

Standalone landing page app built with Hono, deployable to Cloudflare Workers.

## Features

- ⚡ Fast, lightweight Hono server
- 📄 Static site serving
- 📝 **Full markdown blog support** with frontmatter
- 🚀 Cloudflare Workers deployment ready
- 🎨 Clean grayscale design
- 🔗 Separate from main cookbook-web app

## Setup

```bash
cd landing-page-app
pnpm install
```

## Development

```bash
pnpm dev
```

Visit http://localhost:8787

## Deployment

```bash
pnpm deploy
```

## Structure

```
landing-page-app/
├── src/
│   └── index.ts          # Hono server with markdown parsing
├── public/
│   ├── index.html        # Landing page
│   ├── styles.css        # Minimal CSS
│   └── blog/             # Markdown blog posts
│       ├── getting-started-with-ai-publishing.md
│       └── why-llms-txt-matters.md
├── package.json
├── wrangler.toml         # Cloudflare config
└── README.md
```

## Blog System

### Markdown Support

Blog posts are written in markdown with YAML frontmatter:

```markdown
---
title: Your Post Title
date: 2024-10-24
excerpt: A brief description of your post
author: Your Name
---

Your markdown content here...

## Headings work
- Lists work
- **Bold** and *italic* work
- [Links](/) work
```

### Adding a New Blog Post

1. Create a new `.md` file in `public/blog/`
2. Add frontmatter with title, date, excerpt, and author
3. Write your content in markdown
4. Add metadata to `blogPostsMetadata` array in `src/index.ts`
5. Add the full markdown content to `markdownFiles` object in `src/index.ts`

**Note**: In the current implementation, markdown content is embedded in the TypeScript file for Cloudflare Workers compatibility. For a file-based approach, you'd need to use Cloudflare KV or R2 storage.

### Supported Markdown Features

- Headings (h2, h3)
- Paragraphs
- Lists (ordered and unordered)
- **Bold** and *italic* text
- [Links]
- Inline `code`
- And more via [marked](https://marked.js.org/)

## Routes

- `/` - Landing page
- `/blog` - Blog listing with all posts
- `/blog/:slug` - Individual blog posts (parsed from markdown)

## Technologies

- [Hono](https://hono.dev/) - Fast web framework
- [marked](https://marked.js.org/) - Markdown parser
- [gray-matter](https://github.com/jonschlinkert/gray-matter) - Frontmatter parser
- Cloudflare Workers - Serverless deployment

## Extending the Blog

To use external markdown files (instead of embedded content):

1. Store markdown files in Cloudflare R2
2. Update the `getBlogPost` function to fetch from R2
3. Or use build-time bundling to include markdown files
