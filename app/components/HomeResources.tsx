"use client";
import React, { useState, useEffect } from "react";
import { Resource } from "../types/resource";
import { getResources } from "../lib/getResources";
import Link from "next/link";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { FreeMode, Pagination, Mousewheel, Navigation } from "swiper/modules";
import "swiper/css/navigation";

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

const HomeResources = () => {
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
      setResources(data.slice(0, 10));
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
    <div className="flex items-center justify-center flex-col h-[1100px] bg-[#dfee9b]">
      <div className="w-full max-w-[95%] text-center mb-12">
        <h1 className="text-3xl font-bold text-white mb-12">
          おすすめのリソース
        </h1>
      </div>
      <div className="relative w-full max-w-[95%]">
        <Swiper
          breakpoints={{
            340: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            700: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          freeMode={true}
          pagination={{
            clickable: true,
            // type: "fraction",
            el: ".swiper-pagination",
          }}
          modules={[FreeMode, Pagination, Mousewheel, Navigation]}
          className="max-w-[100%] lg:max-w-[80%] mb-10"
        >
          {resources.map((resource) => (
            <SwiperSlide key={resource.id}>
              <div className="card bg-white w-full shadow-xl h-[320px] hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden">
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

                  <div className="px-4">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <button className="btn btn-error w-full">
                        詳細を見る
                      </button>
                    </a>
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
            </SwiperSlide>
          ))}

          <div className="swiper-pagination text-center"></div>
        </Swiper>

        <style jsx global>{`
          .swiper-pagination {
            position: relative !important;
            bottom: 0 !important;
            margin-top: 4rem !important;
          }
          .swiper-pagination-fraction {
            color: white !important;
            font-size: 16px !important;
          }
        `}</style>
      </div>
      <Link href="/resources">
        <button className="btn btn-outline btn-success btn-lg">
          すべてのリソースを見る
        </button>
      </Link>
    </div>
  );
};

export default HomeResources;
