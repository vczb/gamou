import BlogPostMeta from '@/components/BlogPostMeta';
import Heading from '@/components/Heading';
import Image from '@/components/Image';
import MDXComponents from '@/components/MDXComponents';
import { BlogPost } from '@/types/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';

type ArticleProps = {
  post: BlogPost;
};

const Article = ({ post }: ArticleProps) => {
  return (
    <div className="container mx-auto px-4 pb-28 max-w-4xl">
      <div className="mb-8">
        <BlogPostMeta date={post.date} backToList={true} />
        <Heading text={post.title} tag="h1" />
        {post.description && (
          <p className="text-xl text-gray-700 mb-6">{post.description}</p>
        )}
        {post.image && (
          <div className="aspect-video w-full overflow-hidden rounded-lg mb-8">
            <Image
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      <article className="prose prose-lg max-w-none">
        <MDXRemote source={post.content} components={MDXComponents} />
      </article>
    </div>
  );
};

export default Article;
