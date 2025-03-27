import { Metadata } from 'next';
import { getBlogPosts } from '@/utils/blog';
import Blog from '@/containers/Blog';

export const metadata: Metadata = {
  title: 'Blog | Gamou',
  description: 'Artigos e notícias sobre a Gamou',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return <Blog posts={posts} />;
}
