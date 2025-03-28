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
        <div className="flex justify-between items-center">
          <div className="container mx-auto text-center mb-12 ">
            <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
              Artigos recentes
            </h2>
            <div className="w-full mb-4">
              <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
            </div>
          </div>
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
