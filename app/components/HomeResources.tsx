"use client";
import React, { useState, useEffect } from "react";
import { Resource } from "../types/resource";
import { getResources } from "../lib/getResources";
import Link from "next/link";

const HomeResources = () => {
  const [resources, setResources] = useState<Resource[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResources = async () => {
    try {
      setIsLoading(true);
      const data = await getResources();
      setResources(data.slice(0, 5));
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
    <div className="flex flex-wrap ">
      {resources.map((resource) => (
        <div className="card bg-gray-50 w-96 shadow-xl mx-3">
          <figure className="px-10 pt-10">
            <img src="apple.jpg" alt="Shoes" className="rounded-xl" />
          </figure>
          <div key={resource.id} className="card-body items-center text-center">
            <h2 className="card-title">{resource.title}</h2>
            <p className="text-gray-600 mb-1">{resource.company}</p>
            <p className="text-sm text-gray-500 mb-2">{resource.author}</p>
            {/* <p className="mb-4 text-gray-600">{resource.description}</p> */}
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
      ))}
    </div>
  );
};

export default HomeResources;
