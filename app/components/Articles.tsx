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

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isQiitaMaintenance, setIsQiitaMaintenance] = useState(false);
  const [isZennMaintenance, setIsZennMaintenance] = useState(false);

  const INITIAL_DISPLAY = 18;

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
      }

      if (zennResponse.ok) {
        zennArticles = await zennResponse.json();
        console.log("Zenn articles:", zennArticles.length);
      } else if (zennResponse.status === 304) {
        console.log("Zenn: No new content");
      } else {
        console.error("Zenn API error:", zennResponse.status);
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
    const initialFetch = async () => {
      const initialArticles = await fetchAllArticles();
      setArticles(initialArticles.slice(0, INITIAL_DISPLAY));
    };
    initialFetch();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  if (isQiitaMaintenance || isZennMaintenance) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
          role="alert"
        >
          <h2 className="font-bold">記事取得元はただいまメンテナンス中です</h2>
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
            {/* <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-gray-200 rounded-full px-3 py-1 text-sm">
                ストック数: {article.stocks_count}
              </span>
            </div> */}
            <Link
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline"
            >
              記事を読む
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <Link href="/articles" passHref>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            もっと見る
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Articles;