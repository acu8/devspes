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
  const [isQiitaMaintenance, setIsQiitaMaintenance] = useState(false);
  const [isZennMaintenance, setIsZennMaintenance] = useState(false);
  const INITIAL_DISPLAY = 10;

  const fetchAllArticles = async (): Promise<Article[]> => {
    try {
      setIsLoading(true);
      const qiitaResponse = await fetch("/api/qiita");
      const zennResponse = await fetch("/api/zenn");

      if (!qiitaResponse.ok) {
        if (qiitaResponse.status === 500) {
          setIsQiitaMaintenance(true);
          throw new Error("Qiita is currently under maintenance");
        }
        throw new Error(`Qiita API error: ${qiitaResponse.status}`);
      }
      if (!zennResponse.ok) {
        if (zennResponse.status === 500) {
          setIsZennMaintenance(true);
          throw new Error("Zenn is currently under maintenance");
        }
        throw new Error(`Zenn API error: ${zennResponse.status}`);
      }

      const qiitaArticles: Article[] = await qiitaResponse.json();
      let zennArticles: Article[] = [];

      if (zennResponse.status !== 304) {
        if (!zennResponse.ok) {
          throw new Error(`Zenn API error: ${zennResponse.status}`);
        }
        zennArticles = await zennResponse.json();
      }

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

  if (isQiitaMaintenance || isZennMaintenance) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 max-w-md"
          role="alert"
        >
          <h2 className="font-bold text-xl mb-2">
            記事取得元はただいまメンテナンス中です
          </h2>
          <p>
            記事の閲覧は一時的に利用できません。しばらくしてからもう一度お試しください。
          </p>
        </div>
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article: Article) => (
          <div className="border rounded-lg p-4 shadow-md" key={article.url}>
            <h2 className="text-xl font-semibold mb-2 text-gray-600">
              {article.title}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              作者: {article.user.name}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              作成日: {new Date(article.created_at).toLocaleDateString()}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-gray-200 rounded-full px-3 py-1 text-sm">
                ストック数: {article.stocks_count}
              </span>
            </div>
            <Link href={article.url} target="_blank" rel="noopener noreferrer">
              記事を読む
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default fullArticles;
