import { getAllPostSlugs, getPostData } from "@/lib/markdown";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const post = await getPostData((await params).slug);

    return (
      <article className="min-h-screen">
        {/* Featured Image */}
        {post.image && (
          <div className="w-full h-96 relative mb-8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4">
          {/* Article Header */}
          <header className="py-12 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
              {post.title}
            </h1>
            
            {/* Author and Date */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <Image
                src="/logo.jpg"
                alt="Dimas Mufid"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div className="text-left">
                <p className="font-medium text-black">Dimas Mufid</p>
                <time className="text-sm text-gray-600">
                  {formatDate(post.date)}
                </time>
              </div>
            </div>

            {/* Tags */}
            {post.tag && post.tag.length > 0 && (
              <div className="flex justify-center gap-2 flex-wrap">
                {post.tag.map((tag: string) => (
                  <Link
                    key={tag}
                    href={`/tag/${tag}`}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-black transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
          </header>

          {/* Article Content */}
          <div className="max-w-3xl mx-auto">
            <div
              className="prose prose-lg prose-gray max-w-none
                prose-headings:text-black prose-headings:font-bold
                prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8
                prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8
                prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6
                prose-p:text-gray-800 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-black prose-a:font-medium hover:prose-a:text-gray-600
                prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-6 prose-blockquote:italic
                prose-ul:mb-6 prose-ol:mb-6
                prose-li:mb-2 prose-li:text-gray-800
                prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-4
                prose-img:rounded-lg prose-img:shadow-lg"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Author Bio */}
          <div className="max-w-3xl mx-auto mt-16 pt-12 border-t border-gray-200">
            <div className="flex items-start gap-4">
              <Image
                src="/logo.jpg"
                alt="Dimas Mufid"
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <h3 className="font-bold text-black text-lg mb-2">Dimas Mufid</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Building AI startups and documenting the journey. Currently working on Mark, 
                  an AI-powered project management tool. Follow along as I share insights, 
                  challenges, and learnings from the world of AI entrepreneurship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}
