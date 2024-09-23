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

  const fetchAllArticles = async (): Promise<Article[]> => {
    try {
      setIsLoading(true);
      const [qiitaResponse, zennResponse] = await Promise.all([
        fetch("/api/qiita"),
        fetch("/api/zenn"),
      ]);

      let qiitaArticles: Article[] = [];
      let zennArticles: Article[] = [];

      if (qiitaResponse.ok) {
        qiitaArticles = await qiitaResponse.json();
        console.log("Qiita articles:", qiitaArticles.length);
      } else {
        console.error("Qiita API error:", qiitaResponse.status);
        setIsQiitaMaintenance(true);
      }

      if (zennResponse.ok) {
        zennArticles = await zennResponse.json();
        console.log("Zenn articles:", zennArticles.length);
      } else if (zennResponse.status === 304) {
        console.log("Zenn: No new content");
      } else {
        console.error("Zenn API error:", zennResponse.status);
        setIsZennMaintenance(true);
      }

      return [...qiitaArticles, ...zennArticles];
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
    <div className="container mx-auto px-4 py-8">
      {isQiitaMaintenance && (
        <div
          className="mb-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
          role="alert"
        >
          <h2 className="font-bold">Qiitaはただいまメンテナンス中です</h2>
          <p>
            Qiita記事の閲覧は一時的に利用できません。しばらくしてからもう一度お試しください。
          </p>
        </div>
      )}
      {isZennMaintenance && (
        <div
          className="mb-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
          role="alert"
        >
          <h2 className="font-bold">Zennはただいまメンテナンス中です</h2>
          <p>
            Zenn記事の閲覧は一時的に利用できません。しばらくしてからもう一度お試しください。
          </p>
        </div>
      )}
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
