"use client";
import React, { useState, useEffect } from "react";
import { Resource } from "../types/resource";
import { getResources } from "../lib/getResources";

const Resources = () => {
  const [resources, setResources] = useState<Resource[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        Engineering Resources
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <div key={resource.id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-gray-600">
              {resource.title}
            </h2>
            <p className="text-gray-600 mb-2">{resource.company}</p>
            <p className="text-sm text-gray-500 mb-4">{resource.author}</p>
            <p className="mb-4 text-gray-600">{resource.description}</p>
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
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View Resource
            </a>
            {resource.video_flag && resource.video_url && (
              <a
                href={resource.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 text-green-500 hover:underline"
              >
                Watch Video
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
