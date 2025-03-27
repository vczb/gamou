import Heading from '@/components/Heading';
import BlogPost from '@/components/BlogPost';
import Breadcrumb from '@/components/Breadcrumb';
import { BlogPost as BlogPropsType } from '@/types/blog';

const BREADCUMB = [
  { link: '/', label: 'Gamou' },
  { link: '/blog', label: 'Blog', active: true },
];

type BlogProps = {
  posts: BlogPropsType[];
};

const Blog = ({ posts }: BlogProps) => {
  return (
    <div className="container mx-auto px-4 pb-28 ">
      <Breadcrumb items={BREADCUMB} />
      <Heading
        text="Publicações recentes"
        className="text-3xl my-8"
        tag="h1"
      ></Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogPost post={post} key={post.slug} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
