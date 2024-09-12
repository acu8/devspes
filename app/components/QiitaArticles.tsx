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

const QiitaArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllArticles = async (): Promise<Article[]> => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/qiita");
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }
      return await response.json();
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
      <h1 className="text-2xl font-bold m-8">Qiita記事一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article: Article) => (
          <div className="card bg-base-100 shadow-xl" key={article.url}>
            <div className="card-body">
              <h2 className="card-title">{article.title}</h2>
              <p>作者: {article.user.name}</p>

              <p>ストック数: {article.stocks_count}</p>
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

export default QiitaArticles;
