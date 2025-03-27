import { BlogPost as BlogPostType } from '@/types/blog';
import Image from '../Image';
import Link from '../Link';

type BlogPostProps = {
  post: BlogPostType;
};

const BlogPost = ({ post }: BlogPostProps) => {
  return (
    <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
        {post.image && (
          <div className="aspect-video overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
        )}
        <div className="p-4">
          <p className="text-sm text-gray-500 mb-1">{post.date}</p>
          <b className="text-xl font-semibold mb-2 text-black group-hover:text-primary-600 transition-colors">
            {post.title}
          </b>
          <p className="text-gray-700 line-clamp-3">{post.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogPost;
