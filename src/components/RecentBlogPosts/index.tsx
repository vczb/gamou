import { getBlogPosts } from '@/utils/blog';
import BlogPost from '../BlogPost';
import Link from '../Link';
import Heading from '../Heading';

export default async function RecentBlogPosts() {
  const posts = await getBlogPosts();
  const recentPosts = posts.slice(0, 3); // Get only the 3 most recent posts

  if (recentPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50 pb-48">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <Heading
            className="text-2xl font-bold text-black"
            text="Artigos recentes"
          />
          <Link href="/blog" className="text-primary-600 text-sm font-medium">
            Ver todos os artigos →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <BlogPost post={post} key={post.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}
