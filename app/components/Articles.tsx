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
    const initialFetch = async () => {
      const initialArticles = await fetchAllArticles();
      setArticles(initialArticles.slice(0, INITIAL_DISPLAY));
    };
    initialFetch();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (

     
      <div className="container mx-auto px-4 py-16">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article: Article) => (
            <div
              className="bg-white rounded-lg p-6 shadow-lg"
              key={article.url}
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                {article.title}
              </h2>
              <p className="text-gray-600 mb-4">作者: {article.user.name}</p>
              <p className="text-gray-600 mb-6">
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
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600"
              >
                記事を読む
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/articles" passHref>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full">
              もっと見る
            </button>
          </Link>
        </div>
      </div>
  );
};

export default Articles;
