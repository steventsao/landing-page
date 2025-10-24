import { Hono } from 'hono';
import { marked } from 'marked';
import { HOME_HTML, CSS } from './content';

const APP_ORIGIN = 'https://app.cookbook.run';
const DEFAULT_APP_PATH = '/';

const app = new Hono();

// Configure marked
marked.setOptions({
  gfm: true,
  breaks: true,
});

// Simple frontmatter parser for Cloudflare Workers
function parseFrontmatter(markdown: string) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = markdown.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content: markdown };
  }

  const frontmatter = match[1];
  const content = match[2];

  const data: Record<string, string> = {};
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      data[key.trim()] = valueParts.join(':').trim();
    }
  });

  return { data, content };
}

function sanitizeAppRedirect(target?: string | null) {
  if (!target) {
    return DEFAULT_APP_PATH;
  }

  try {
    const url = new URL(target, APP_ORIGIN);
    if (url.origin !== APP_ORIGIN) {
      return DEFAULT_APP_PATH;
    }

    const path = `${url.pathname}${url.search}${url.hash}`;
    return path || DEFAULT_APP_PATH;
  } catch {
    return DEFAULT_APP_PATH;
  }
}

function buildAppSignInUrl(target?: string | null) {
  const redirect = sanitizeAppRedirect(target);
  const url = new URL('/sign-in', APP_ORIGIN);
  url.searchParams.set('redirect', redirect);
  return url.toString();
}

// Serve CSS
app.get('/styles.css', (c) => {
  return c.text(CSS, 200, { 'Content-Type': 'text/css' });
});

app.get('/sign-in', (c) => {
  const redirectTarget = buildAppSignInUrl(c.req.query('redirect'));
  return c.redirect(redirectTarget, 302);
});

// Serve llms.txt
app.get('/llms.txt', (c) => {
  const llmsTxt = `# cookbook.run

> Grow your AI presence with multi-platform publishing

## What is cookbook.run?

cookbook.run helps you grow your AI presence by publishing your content across all major AI platforms from a single source. Publish once, reach everyone.

## The Problem

Your AI presence is limited to a single platform:
- 80% of AI users can't access your content if you're only on one platform
- ChatGPT, Claude, Gemini, and other AI assistants each have millions of users
- Your expertise gets buried in platform-specific silos
- Competitors publishing everywhere capture the audience you're missing
- Managing multiple platforms manually is time-consuming and error-prone

## The Solution

Grow your AI presence with multi-platform distribution:
- **ChatGPT users**: Reach them via CustomGPT
- **Claude users**: Distribute as Claude Skills
- **Developers**: Deploy as MCP servers
- **All AI tools**: Accessible via llms.txt
- **One publish, everywhere**: Same content across all platforms automatically

## How It Works

1. **Create your content once** - Write your expertise, documentation, or knowledge base
2. **Publish to cookbook.run** - Upload to your canonical knowledge base
3. **Distribute everywhere** - We automatically format and distribute to:
   - Claude Skills
   - ChatGPT CustomGPT
   - MCP servers
   - llms.txt
   - AI agents
4. **Track your reach** - Analytics showing engagement across each platform

## Why It Matters

AI is the fastest-growing way people discover content. Don't let platform fragmentation limit your presence.

**The opportunity is massive:**
- AI assistants process billions of queries daily
- Users discover content through AI, not search engines
- Early adopters who publish everywhere build dominant presence
- Your competitors are already there—or they will be soon

**Own your distribution:**
- Platform lock-in kills growth
- Multi-platform presence builds authority
- One canonical source, infinite reach

Think of it as Transistor.fm for AI:
- Podcasters publish once → grow presence on Spotify, Apple, everywhere
- You publish once → grow AI presence on ChatGPT, Claude, everywhere

## Get Started

Visit https://landing-page.steventsao.workers.dev to start publishing your content in all AI formats.

## Learn More

- Blog: https://landing-page.steventsao.workers.dev/blog
- Getting Started Guide: https://landing-page.steventsao.workers.dev/blog/getting-started-with-ai-publishing
- Why llms.txt: https://landing-page.steventsao.workers.dev/blog/why-llms-txt-matters

---
Generated: ${new Date().toISOString()}
Source: https://landing-page.steventsao.workers.dev
`;
  return c.text(llmsTxt, 200, { 'Content-Type': 'text/plain; charset=utf-8' });
});

// Home page
app.get('/', (c) => {
  return c.html(HOME_HTML);
});

// Blog metadata
const blogPostsMetadata = [
  {
    slug: 'getting-started-with-ai-publishing',
    title: 'Getting Started with AI Publishing',
    date: '2024-10-24',
    excerpt: 'Learn how to publish your content in multiple AI formats with cookbook.run.',
  },
  {
    slug: 'why-llms-txt-matters',
    title: 'Why llms.txt Matters',
    date: '2024-10-20',
    excerpt: 'Understanding the importance of standardized AI content formats.',
  },
];

// Blog listing page
app.get('/blog', (c) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog - cookbook.run</title>
  <style>${CSS}</style>
</head>
<body>
  <div class="min-h-screen bg-background">
    <header class="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm">
      <div class="container mx-auto px-6 py-5">
        <div class="flex items-center justify-between">
          <a href="/" class="flex items-center gap-3">
            <div class="h-7 w-7 rounded-lg bg-foreground flex items-center justify-center">
              <span class="text-background font-bold text-lg">C</span>
            </div>
            <span class="text-lg font-semibold text-foreground tracking-tight">cookbook.run</span>
          </a>
          <nav class="flex items-center gap-8">
            <a href="/" class="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</a>
            <a href="/blog" class="text-sm text-foreground font-medium transition-colors">Blog</a>
          </nav>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-6 py-32">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-5xl md:text-6xl font-bold text-foreground mb-10 tracking-tight">Blog</h1>
        <div class="gap-8 flex flex-col">
          ${blogPostsMetadata.map((post) => `
            <article class="py-6">
              <time class="text-xs text-muted-foreground">${post.date}</time>
              <h2 class="text-xl font-semibold text-foreground mb-3 tracking-tight">
                <a href="/blog/${post.slug}" class="hover:text-muted-foreground transition-colors">${post.title}</a>
              </h2>
              <p class="text-muted-foreground">${post.excerpt}</p>
            </article>
          `).join('')}
        </div>
      </div>
    </main>

    <footer class="py-16">
      <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6 max-w-7xl mx-auto">
          <div class="flex items-center gap-3">
            <div class="h-6 w-6 rounded-lg bg-foreground flex items-center justify-center">
              <span class="text-background font-bold text-sm">C</span>
            </div>
            <span class="text-foreground font-medium tracking-tight">cookbook.run</span>
          </div>
          <p class="text-muted-foreground text-xs">© 2024 cookbook.run. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</body>
</html>
  `;

  return c.html(html);
});

// Embedded blog posts
const markdownFiles: Record<string, string> = {
  'getting-started-with-ai-publishing': `---
title: Getting Started with AI Publishing
date: 2024-10-24
excerpt: Learn how to publish your content in multiple AI formats with cookbook.run.
author: cookbook.run Team
---

Publishing content for AI consumption has never been easier. With cookbook.run, you can transform your content into multiple formats that AI systems understand and can work with.

## Why Multi-Format Publishing?

Different AI systems expect content in different formats. By publishing in multiple formats simultaneously, you ensure your content reaches the widest possible audience.

The modern AI ecosystem includes:
- Large Language Models (LLMs) that need structured text
- AI agents that require specific protocol formats
- Claude and other assistants with custom skill formats
- MCP servers for seamless integration

## Supported Formats

### Claude Skills
Direct integration with Claude AI allows your content to become executable skills that users can leverage in their workflows.

### llms.txt
Standardized format for LLM consumption, making it easy for any language model to understand and utilize your content.

### MCP Server
Model Context Protocol integration provides a robust way to share your content with AI systems that support this emerging standard.

### AI Agent
Autonomous agent capabilities that transform your content into intelligent assistants ready to help users.

## Getting Started

1. **Write your content** - Focus on creating valuable, well-structured content
2. **Choose formats** - Select which AI formats you want to support
3. **Publish** - Deploy with a single click to all selected formats

The platform handles all the complexity of format conversion, letting you focus on what matters: creating great content.

## Next Steps

Ready to start publishing? Check out our [format guide](/blog/why-llms-txt-matters) to learn more about each supported format.`,

  'why-llms-txt-matters': `---
title: Why llms.txt Matters
date: 2024-10-20
excerpt: Understanding the importance of standardized AI content formats.
author: cookbook.run Team
---

The llms.txt format is becoming the standard for how content creators communicate with large language models. But why does this matter, and how can it benefit your content strategy?

## The Need for Standards

As AI systems become more prevalent in how people access and consume information, having a standardized way to structure content for AI consumption becomes critical.

Without standards:
- Each AI system requires custom formatting
- Content must be manually adapted for different platforms
- Maintenance becomes a nightmare
- Your reach is limited by implementation bandwidth

With llms.txt:
- Single format works across multiple AI systems
- Automatic compatibility with new AI platforms
- Reduced maintenance overhead
- Maximum reach with minimal effort

## What is llms.txt?

Think of llms.txt as the robots.txt of the AI era. It provides a standardized, machine-readable format that tells AI systems:

- What content you have available
- How that content is structured
- What context is important
- How to properly attribute your work

## Benefits of llms.txt

### Consistent Structure
Every llms.txt file follows the same format, making it easy for AI models to parse and understand regardless of the underlying content.

### Easy Integration
AI systems can quickly index and utilize your content without custom parsing logic for each source.

### Future Proof
As new AI systems emerge, they can immediately work with your content if they support the llms.txt standard.

### SEO for AI
Just as robots.txt helps search engines index your site, llms.txt helps AI systems discover and properly utilize your content.

## Implementing llms.txt

cookbook.run automatically generates llms.txt files from your content, handling:

- Proper formatting and structure
- Metadata extraction
- Context preservation
- Attribution information

You write content once, and cookbook.run ensures it's available in the llms.txt format (plus others) automatically.

## The Future of AI Content

Standards like llms.txt represent the future of content distribution. As AI becomes the primary interface between humans and information, ensuring your content is AI-ready isn't optional—it's essential.

cookbook.run makes this transition seamless, letting you focus on creating while we handle the technical details of AI-compatible formatting.

## Learn More

Ready to make your content AI-ready? [Get started with cookbook.run](/blog/getting-started-with-ai-publishing) today.`,
};

// Individual blog post
app.get('/blog/:slug', async (c) => {
  const { slug } = c.req.param();

  let postData: { title: string; date: string; excerpt: string; content: string; author: string } | null = null;

  try {
    const markdown = markdownFiles[slug];
    if (!markdown) {
      throw new Error('Post not found');
    }

    const { data, content } = parseFrontmatter(markdown);

    postData = {
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      author: data.author || 'Publisher Team',
      content: await marked.parse(content),
    };
  } catch (error) {
    console.error('Error loading blog post:', error);
  }

  if (!postData) {
    return c.html(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Post Not Found - cookbook.run</title>
  <style>${CSS}</style>
</head>
<body>
  <div class="min-h-screen bg-background flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-foreground mb-6">404</h1>
      <p class="text-lg text-muted-foreground mb-10">Blog post not found</p>
      <a href="/blog" class="inline-flex items-center justify-center gap-2 h-11 bg-foreground text-background hover:bg-foreground/90 font-medium px-10 py-6 rounded-full">Back to Blog</a>
    </div>
  </div>
</body>
</html>
    `, 404);
  }

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${postData.title} - cookbook.run</title>
  <meta name="description" content="${postData.excerpt}">
  <meta name="author" content="${postData.author}">
  <style>
    ${CSS}
    .blog-content h2 { font-size: 2rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; color: hsl(var(--foreground)); }
    .blog-content h3 { font-size: 1.5rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem; color: hsl(var(--foreground)); }
    .blog-content p { margin-bottom: 1rem; line-height: 1.75; color: hsl(var(--foreground)); }
    .blog-content ul { margin-bottom: 1rem; padding-left: 2rem; list-style-type: disc; }
    .blog-content ol { margin-bottom: 1rem; padding-left: 2rem; list-style-type: decimal; }
    .blog-content li { margin-bottom: 0.5rem; color: hsl(var(--foreground)); }
    .blog-content strong { font-weight: 600; }
    .blog-content a { color: hsl(var(--foreground)); text-decoration: underline; }
    .blog-content a:hover { color: hsl(var(--muted-foreground)); }
    .blog-content code { background: hsl(var(--muted)); padding: 0.125rem 0.25rem; border-radius: 0.25rem; font-family: ui-monospace, monospace; font-size: 0.875em; }
  </style>
</head>
<body>
  <div class="min-h-screen bg-background">
    <header class="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm">
      <div class="container mx-auto px-6 py-5">
        <div class="flex items-center justify-between">
          <a href="/" class="flex items-center gap-3">
            <div class="h-7 w-7 rounded-lg bg-foreground flex items-center justify-center">
              <span class="text-background font-bold text-lg">C</span>
            </div>
            <span class="text-lg font-semibold text-foreground tracking-tight">cookbook.run</span>
          </a>
          <nav class="flex items-center gap-8">
            <a href="/" class="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</a>
            <a href="/blog" class="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</a>
          </nav>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-6 py-32">
      <article class="max-w-4xl mx-auto">
        <div class="mb-6">
          <time class="text-sm text-muted-foreground">${postData.date}</time>
          ${postData.author ? `<span class="text-sm text-muted-foreground"> • ${postData.author}</span>` : ''}
        </div>
        <h1 class="text-5xl md:text-6xl font-bold text-foreground mb-10 tracking-tight">${postData.title}</h1>
        <div class="blog-content">
          ${postData.content}
        </div>
        <div class="py-16">
          <a href="/blog" class="text-sm text-muted-foreground hover:text-foreground transition-colors">← Back to Blog</a>
        </div>
      </article>
    </main>

    <footer class="py-16">
      <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6 max-w-7xl mx-auto">
          <div class="flex items-center gap-3">
            <div class="h-6 w-6 rounded-lg bg-foreground flex items-center justify-center">
              <span class="text-background font-bold text-sm">C</span>
            </div>
            <span class="text-foreground font-medium tracking-tight">cookbook.run</span>
          </div>
          <p class="text-muted-foreground text-xs">© 2024 cookbook.run. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</body>
</html>
  `;

  return c.html(html);
});

export default app;
