"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";

interface BlogPostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tag?: string[];
}

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<BlogPostData[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const searchPosts = async () => {
      if (searchQuery.trim()) {
        setIsSearching(true);
        try {
          const response = await fetch(
            `/api/search?q=${encodeURIComponent(searchQuery)}`
          );
          if (response.ok) {
            const results = await response.json();
            setSearchResults(results);
          }
        } catch (error) {
          console.error("Search failed:", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    };

    const debounceTimer = setTimeout(searchPosts, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Mark", href: "/tag/mark" },
    { name: "Computer Science", href: "/tag/ai" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white flex items-center">
        <div className="w-full">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.jpg"
                alt="Dimas Mufid"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-semibold text-lg text-black hidden sm:block">
                Dimas Mufid
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-black"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-600 hover:text-black transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-600 hover:text-black transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600 hover:text-black transition-colors"
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <nav className="px-4 py-4 space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-black"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm"
          onClick={closeSearch}
        >
          <div
            className="bg-white mt-20 rounded-lg shadow-xl max-w-2xl mx-auto border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-sm border-0 focus:ring-0 focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={closeSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {searchResults.length > 0 && (
              <div className="max-h-96 overflow-y-auto">
                {searchResults.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    onClick={closeSearch}
                    className="block p-4 hover:bg-gray-50"
                  >
                    <h3 className="font-medium text-black mb-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      {post.tag && (
                        <>
                          <span>•</span>
                          <span>{post.tag.join(", ")}</span>
                        </>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {isSearching && (
              <div className="p-8 text-center text-gray-500">
                <p>Searching...</p>
              </div>
            )}

            {!isSearching && searchQuery && searchResults.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <p>No posts found for &quot;{searchQuery}&quot;</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
