import Link from 'next/link';
import GoBackLink from '../GoBackLink';

interface BlogPostMetaProps {
  date: string;
  readingTime?: string;
  backToList?: boolean;
}

export default function BlogPostMeta({
  date,
  readingTime,
  backToList = false,
}: BlogPostMetaProps) {
  return (
    <div className="flex items-center justify-between text-sm text-gray-500 mb-8 md:mb-4">
      <div className="flex items-center gap-3">
        <span>{date}</span>
        {readingTime && (
          <>
            <span className="inline-block w-1 h-1 rounded-full bg-gray-500"></span>
            <span>{readingTime}</span>
          </>
        )}
      </div>
      {backToList && <GoBackLink path="/blog" text="Blog" />}
    </div>
  );
}
