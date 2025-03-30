# Blog Content

This directory contains all blog posts for the Gamou website. Each post is written in MDX format, which allows you to use JSX components within Markdown.

## Creating a new blog post

1. Create a new `.mdx` file in this directory. Use kebab-case for the filename, which will become the URL slug.

   - Example: `como-aumentar-vendas-online.mdx` will be accessible at `/blog/como-aumentar-vendas-online`

2. Add frontmatter at the beginning of the file:

```mdx
---
title: 'Título do seu post aqui'
date: '2025-03-27'
description: 'Uma breve descrição do seu post'
image: '/img/blog/nome-da-imagem.jpg'
author: 'Nome do Autor' # opcional
tags: ['tag1', 'tag2'] # opcional
featured: true # opcional, para destacar o post
---

Conteúdo do post aqui...
```

3. Write your content using Markdown and JSX components.

## Images

- Place blog post images in `/public/img/blog/`
- Reference them in frontmatter and content using `/img/blog/nome-da-imagem.jpg`
- Use optimal image sizes:
  - Featured/header images: 1200×630px (aspect ratio 1.91:1)
  - In-content images: Recommended width 800px

## MDX Features

You can use React components within your MDX content:

```mdx
<Callout type="info">Informação importante que você deseja destacar.</Callout>
```

## Custom Components Available

- `<Callout>` - For highlighting important information
- `<CodeBlock>` - For syntax-highlighted code examples
- Regular Markdown features (headings, lists, images, etc.)
