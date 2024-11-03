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

const HomeResources = () => {
  const [resources, setResources] = useState<Resource[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  console.log(resources);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex items-center justify-center flex-col h-[900px] bg-[#9498a5]">
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
              <div className="card bg-gray-50 w-full shadow-xl h-[600px]">
                <figure className="px-10 pt-10">
                  <img src="apple.jpg" alt="Shoes" className="rounded-xl" />
                </figure>
                <div
                  key={resource.id}
                  className="card-body items-center text-center"
                >
                  <h2 className="card-title">{resource.title}</h2>
                  <p className="text-gray-600 mb-1">{resource.company}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    {resource.author}
                  </p>
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
                      <button className="btn btn-primary">詳細を見る</button>
                    </a>
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
        <button className="btn btn-accent btn-lg">
          すべてのリソースを見る
        </button>
      </Link>
    </div>
  );
};

export default HomeResources;
