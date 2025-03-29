import { Metadata } from 'next';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Blog | Gamou',
  description: 'Artigos e notícias sobre a Gamou',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-24 md:pt-28 bg-gray-50">{children}</main>
      <Footer />
    </div>
  );
}
