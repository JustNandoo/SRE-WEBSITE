"use client";

import React, { useState, useEffect } from "react";
import ArticleCard, {
  ArticleCardProps,
} from "../../components/article/ArticleCard";
import { articleContent } from "../../../../lib/articleData";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "500",
});

export default function ArticleSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState<ArticleCardProps[]>(
    []
  );

  // Filter articles based on search term
  useEffect(() => {
    const results = articleContent.filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArticles(results);
  }, [searchTerm]);

  // Initialize filtered articles with all articles
  useEffect(() => {
    setFilteredArticles(articleContent);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#134576] to-[#022321]">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-20 md:py-48 lg:py-32">
        {/* Header with search box */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h2
            className={`text-3xl md:text-4xl font-bold text-white ${poppins.variable} mb-4 sm:mb-0`}
          >
            Latest
          </h2>
          <div className="w-full sm:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Keyword..."
                className="bg-[#FFF1AA] text-[#022E21] pl-4 pr-10 py-3 rounded-full text-sm w-full sm:w-40 md:w-[20rem] focus:ring-0 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <svg
                  className="h-6 w-6 mr-2 text-[#022e21]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Articles List */}
        <div className="space-y-4">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              id={article.id}
              title={article.title}
              image={article.image}
              description={article.description}
            />
          ))}
        </div>

        {/* Show message when no results found */}
        {filteredArticles.length === 0 && (
          <div className="p-4 rounded-md text-center">
            <p className={`${poppins.variable} text-white text-base`}>
              No articles found matching your search.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
