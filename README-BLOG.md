# Blog Implementation

This document outlines the blog implementation for the Gamou project, based on Next.js MDX.

## Features

- MDX-based blog posts with frontmatter support
- Responsive blog listing page
- Individual blog post pages
- Blog management interface for admins
- Recent blog posts component for homepage integration
- Custom styling with Tailwind CSS Typography

## File Structure

```
/src
  /app
    /blog                      # Blog routes
      /[slug]                  # Dynamic route for individual blog posts
        page.tsx
      layout.tsx               # Blog layout component
      not-found.tsx            # 404 page for blog
      page.tsx                 # Blog listing page
    /(auth)/(private)/painel
      /blog                    # Admin blog management routes
        page.tsx               # Blog admin page
  /components
    /BlogPostMeta              # Blog post metadata component
    /MDXComponents             # Custom MDX components
    /RecentBlogPosts           # Component to display recent posts
  /containers
    /Blog                      # Blog container component
  /content
    /blog                      # Where blog post MDX files are stored
      README.md                # Documentation for content creators
      schema.ts                # TypeScript schema for blog frontmatter
      bem-vindo-ao-blog.mdx    # Sample blog post
      dicas-para-vendas-online.mdx # Sample blog post
  /utils
    /blog                      # Blog utility functions
      index.ts                 # Functions to fetch and process blog posts
```

## How It Works

1. **Content Management**:
   - Blog posts are written in MDX format and stored in `/src/content/blog/`
   - Each post includes frontmatter with metadata (title, date, description, etc.)
   - Posts are automatically displayed on the blog listing page

2. **Routing**:
   - `/blog` - Main blog listing page
   - `/blog/[slug]` - Individual blog post pages

3. **Admin Interface**:
   - `/painel/blog` - Admin page to manage blog posts
   - Future enhancement: Add editor for creating/editing posts directly in the admin

## Technologies Used

- Next.js App Router
- MDX for content authoring
- gray-matter for frontmatter parsing
- next-mdx-remote for rendering MDX
- Tailwind CSS with @tailwindcss/typography for styling

## Future Enhancements

- Add categories and tags filtering
- Implement search functionality
- Add pagination for blog listing
- Create a WYSIWYG editor for blog post creation in the admin
- Add analytics to track post performance
- Implement commenting system

## How to Create a New Blog Post

1. Create a new MDX file in `/src/content/blog/`
2. Add frontmatter with required fields:
   ```
   ---
   title: 'Your Post Title'
   date: 'YYYY-MM-DD'
   description: 'A brief description of your post'
   image: '/images/blog/your-image.jpg' (optional)
   ---
   ```
3. Write your content using Markdown syntax
4. Save the file, and it will automatically appear in the blog