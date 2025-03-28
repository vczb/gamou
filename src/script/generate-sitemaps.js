const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gamou.app';
const PAGE_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'];

const EXCLUDED_SEGMENTS = [
  '(auth)',
  '(private)',
  'layout',
  'error',
  'not-found',
  '_app',
  '_document',
  '_middleware',
  'api',
  '[', // dynamic routes
];

function shouldExclude(entryPath) {
  return EXCLUDED_SEGMENTS.some((segment) => entryPath.includes(segment));
}

function isPageFile(entryName) {
  const ext = path.extname(entryName);
  const base = path.basename(entryName, ext);
  return (
    PAGE_EXTENSIONS.includes(ext) &&
    !shouldExclude(entryName) &&
    base === 'page'
  );
}

function getAllPages(dirPath, baseUrl = '') {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      if (shouldExclude(entry.name)) return [];
      return getAllPages(fullPath, path.posix.join(baseUrl, entry.name));
    }

    if (!isPageFile(entry.name)) return [];

    const url = baseUrl === '' ? '/' : `/${baseUrl}/`;
    return {
      loc: `${BASE_URL}${url}`,
      lastmod: new Date(fs.statSync(fullPath).mtime).toISOString(),
    };
  });
}

function getBlogPosts() {
  const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  const mdxFiles = files.filter((file) => file.endsWith('.mdx'));

  return mdxFiles.map((file) => {
    const filePath = path.join(BLOG_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    const slug = file.replace(/\.mdx$/, '');

    return {
      loc: `${BASE_URL}/blog/${slug}`,
      lastmod: data.date
        ? new Date(data.date).toISOString()
        : new Date(fs.statSync(filePath).mtime).toISOString(),
    };
  });
}

function generateSitemap(pages) {
  const urls = pages
    .map(
      (page) => `
  <url>
    <loc>${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;
}

const tryPaths = [
  path.join(__dirname, '../app'),
  path.join(__dirname, '../src/app'),
  path.join(__dirname, '../pages'),
  path.join(__dirname, '../src/pages'),
];

const pagesDirectory = tryPaths.find((p) => fs.existsSync(p));
if (!pagesDirectory) throw new Error('❌ Pages/app directory not found.');

// Get regular pages
const pages = getAllPages(pagesDirectory);

// Get blog posts
const blogPosts = getBlogPosts();

// Combine both
const allPages = [...pages, ...blogPosts];

const sitemap = generateSitemap(allPages);

const publicDir = path.join(__dirname, '../../public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
console.log(
  `✅ sitemap.xml generated with ${allPages.length} pages (${pages.length} app pages, ${blogPosts.length} blog posts).`
);
