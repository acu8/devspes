"use client";
import React, { useState, useEffect } from "react";
import { getResources } from "../../lib/getResources";
import { Resource } from "@/app/types/resource";
import Image from "next/image";

const gitmojis = [
  "🎨",
  "⚡️",
  "🔥",
  "🐛",
  "✨",
  "📝",
  "🚀",
  "💄",
  "🎉",
  "✅",
  "🔒",
  "🔖",
  "🚨",
  "🚧",
  "💚",
  "⬇️",
  "⬆️",
  "📌",
  "👷",
  "📈",
  "♻️",
  "➕",
  "➖",
  "🔧",
  "🔨",
  "🌐",
  "✏️",
  "⏪",
  "🔀",
  "📦",
  "👽",
  "🚚",
  "📄",
  "💥",
  "🍱",
  "♿️",
  "💡",
  "🍻",
  "💬",
  "🗃️",
  "🔊",
  "🔇",
  "👥",
  "🚸",
  "🏗️",
  "📱",
  "🤡",
  "🥚",
  "🙈",
  "📸",
  "⚗️",
  "🔍",
  "🏷️",
];

interface Props {
  params: {
    slug: string;
  };
}

const companyNameMap = {
  recruit: {
    name: "株式会社リクルート",
    logo: "/company/Recruit.jpg",
  },
  cybozu: {
    name: "サイボウズ株式会社",
    logo: "/company/サイボウズ.png",
  },
  mixi: {
    name: "MIXI",
    logo: "/company/MIXI_works_01.jpg",
  },
  mercari: {
    name: "メルカリ",
    logo: "/company/mercari.png",
  },
  kddi: {
    name: "KDDIアジャイル開発センター",
    logo: "/company/124341.jpg",
  },
  yumemi: {
    name: "ゆめみ",
    logo: "/company/yumemi.svg",
  },
  gmo: {
    name: "GMOペパボ",
    logo: "/company/GMO .png",
  },
};

export default function CompanyPage({ params }: Props) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const company = companyNameMap[params.slug as keyof typeof companyNameMap];
  const companyName = company ? company.name : params.slug;
  const logoPath = company ? company.logo : "";

  const getRamdomGitmoji = () => {
    const randomIndex = Math.floor(Math.random() * gitmojis.length);
    return gitmojis[randomIndex];
  };

  const fetchResources = async () => {
    try {
      setIsLoading(true);
      const data = await getResources();

      const filteredResources = data.filter(
        (resource) => resource.slug === params.slug
      );

      setResources(filteredResources);
    } catch (err) {
      setError("Error fetching resources");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [params.slug]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-600">
        {companyName}のリソース
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="card bg-gray-50 w-full shadow-xl h-[600px]"
          >
            <figure className="px-10 pt-10">
              <div className="flex items-center justify-center rounded-xl w-full h-48">
                <Image
                  src={logoPath}
                  alt={`${companyName} logo`}
                  width={200}
                  height={200}
                  className="object-contain w-full h-full"
                />
              </div>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{resource.title}</h2>
              <p className="text-gray-600 mb-1">{resource.company}</p>
              <p className="text-sm text-gray-500 mb-2">{resource.author}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {resource.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 rounded-full px-3 py-1 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="card-actions">
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  <button className="btn btn-outline btn-info">
                    詳細を見る
                  </button>
                </a>
                {resource.video_flag && resource.video_url && (
                  <a
                    href={resource.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="btn btn-outline btn-success">
                      ビデオを見る
                    </button>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
