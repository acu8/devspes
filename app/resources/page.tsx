"use client";
import React, { useState, useEffect } from "react";
import { getResources } from "../lib/getResources";
import { Resource } from "@/app/types/resource";

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

export default function Page() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getRandomGitmoji = () => {
    const randomIndex = Math.floor(Math.random() * gitmojis.length);
    return gitmojis[randomIndex];
  };

  const fetchResources = async () => {
    try {
      setIsLoading(true);
      const data = await getResources();
      setResources(data);
    } catch (err) {
      setError("Error fetching resources");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-600">
        無料で学べるリソース
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="card bg-white w-full shadow-xl h-[380px] hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-2/3 flex items-center justify-center opacity-[0.15]">
              <span className="text-[200px]">{getRandomGitmoji()}</span>
            </div>

            <div className="relative z-10 h-full flex flex-col">
              <div className="flex-1"></div>

              <div className="flex flex-col items-center justify-center p-4 space-y-3">
                <h2 className="card-title text-2xl font-bold text-center line-clamp-3">
                  {resource.title}
                </h2>
                <p className="text-gray-700 font-medium text-lg">
                  {resource.company}
                </p>
              </div>

              <div className="flex-1"></div>

              <div className="px-4 space-y-4">
                <div>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <button className="btn btn-error w-full">詳細を見る</button>
                  </a>
                </div>
                {resource.video_flag && resource.video_url && (
                  <div>
                    <a
                      href={resource.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <button className="btn btn-success w-full">
                        ビデオを見る
                      </button>
                    </a>
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {resource.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-green-50 text-green-700 rounded-full px-2.5 py-0.5 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
