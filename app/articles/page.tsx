"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

interface User {
  id: string;
  name: string;
  profile_image_url: string;
}

interface Article {
  title: string;
  created_at: string;
  url: string;
  stocks_count: number;
  user: User;
}

const fullArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const INITIAL_DISPLAY = 10;

  const fetchAllArticles = async (): Promise<Article[]> => {
    try {
      setIsLoading(true);
      const qiitaResponse = await fetch("/api/qiita");
      const zennResponse = await fetch("/api/zenn");

      if (!qiitaResponse.ok || !zennResponse.ok) {
        throw new Error("Failed to fetch articles");
      }
      const qiitaArticles: Article[] = await qiitaResponse.json();
      const zennArticles: Article[] = await zennResponse.json();

      const articles: Article[] = [...qiitaArticles, ...zennArticles];
      return articles;
    } catch (err) {
      setError("Error fetching articles");
      console.error(err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllArticles().then(setArticles);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article: Article) => (
          <div className="card text-gray-600 shadow-xl" key={article.url}>
            <div className="card-body">
              <h2 className="card-title">{article.title}</h2>
              <p>作者: {article.user.name}</p>
              <p>作成日: {new Date(article.created_at).toLocaleDateString()}</p>
              <div className="card-actions justify-end">
                <Link
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  記事を読む
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default fullArticles;
