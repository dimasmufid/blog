import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeRaw from "rehype-raw";
import rehypePrism from "rehype-prism-plus";

const postsDirectory = path.join(process.cwd(), "src/content/blog");

export interface BlogPostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tag?: string[];
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(slug: string): Promise<BlogPostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Parse markdown metadata and content
  const { data, content } = matter(fileContents);

  // Convert markdown to HTML with enhanced processing
  const processedContent = await remark()
    .use(remarkParse)
    .use(remarkGfm) // GitHub Flavored Markdown
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw) // Parse HTML in markdown
    .use(rehypePrism) // Syntax highlighting
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    content: contentHtml,
    tag: data.tag,
  };
}

export function getAllPosts(): BlogPostData[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsDataUnsorted = fileNames.map((fileName) => {
    // Remove ".md" from file name to get slug
    const slug = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Parse markdown metadata
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      content: "", // We don't need the full content for the list view
      tag: data.tag,
    };
  });

  const sortedPostsData = allPostsDataUnsorted.sort((a, b) => {
    // Handle cases where dates might be undefined or null for robustness
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1; // Posts without dates go to the end (as if older)
    if (!b.date) return -1; // Posts without dates go to the end

    // Standard descending sort for "YYYY-MM-DD" date strings
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0; // Dates are equal
  });

  return sortedPostsData;
}
