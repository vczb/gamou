import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';
import { BlogPost } from '@/types/blog';



const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

// Using the cache function to memoize expensive operations
export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  const mdxFiles = files.filter(file => file.endsWith('.mdx'));
  
  const posts = mdxFiles.map(file => {
    const filePath = path.join(BLOG_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    const slug = file.replace(/\.mdx$/, '');

    const sort = data.date ? new Date(data.date) : null;
    
    return {
      slug,
      title: data.title,
      date: data.date ? new Date(data.date).toLocaleDateString('pt-BR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }) : '',
      description: data.description || '',
      image: data.image || undefined,
      content,
      sort: sort?.toISOString() || ''
    };
  });
  
  // Sort posts by date (most recent first)
  return posts.sort((a, b) => {
    return new Date(b.sort).getTime() - new Date(a.sort).getTime();
  });
});

export const getBlogPost = cache(async (slug: string): Promise<BlogPost | null> => {
  const posts = await getBlogPosts();
  return posts.find(post => post.slug === slug) || null;
});