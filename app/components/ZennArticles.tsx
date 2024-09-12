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

const ZennArticles = () => {
  const [zennArticles, setZennArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);



  const fetchZennArticles = async (): Promise<Article[]> => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/zenn");
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
    fetchZennArticles().then(setZennArticles);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold m-8">Zenn記事一覧</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {zennArticles.map((zennArticle: Article) => (
            <div key={zennArticle.url} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{zennArticle.title}</h2>
                <p>作者: {zennArticle.user.name}</p>
                <p>
                  作成日:{" "}
                  {new Date(zennArticle.created_at).toLocaleDateString()}
                </p>

                <Link
                  href={zennArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  記事を読む
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ZennArticles;
