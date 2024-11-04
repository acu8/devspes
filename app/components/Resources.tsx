"use client";
import React, { useState, useEffect } from "react";
import { Resource } from "../types/resource";
import { getResources } from "../lib/getResources";

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
  "💩",
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

const Resources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getRamdomGitmoji = () => {
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
          <div className="card bg-gray-50 w-full shadow-xl h-[600px]">
            <figure className="px-10 pt-10">
              <div className="flex items-center justify-center rounded-xl w-full h-48">
                <span
                  className="text-8xl"
                  role="img"
                  aria-label="resource icon"
                >
                  {getRamdomGitmoji()}
                </span>
              </div>
            </figure>
            <div
              key={resource.id}
              className="card-body items-center text-center"
            >
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
};

export default Resources;
