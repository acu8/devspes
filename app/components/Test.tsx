import React, { useEffect, useState } from "react";
import { Resource } from "../types/resource";

const Test = () => {
  const [resource, setResource] = useState<Resource | null>(null);

  const fetchResources = async () => {
    try {
      const response = await fetch("/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: "https://speakerdeck.com/cyberagentdevelopers/kubernetesnosusume2024",
        }),
      });

      const data = await response.json();
      if (data.success) {
        setResource(data.resource);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  // 早期リターンでnullチェック
  if (!resource) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card bg-gray-50 w-full shadow-xl h-[600px]">
      <div key={resource.id} className="card-body items-center text-center">
        <h2 className="card-title">{resource.title}</h2>
        <p className="text-gray-600 mb-1">{resource.company}</p>
        <p className="text-sm text-gray-500 mb-2">{resource.author}</p>
      </div>
    </div>
  );
};

export default Test;
