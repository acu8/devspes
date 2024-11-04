"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "./Footer";
import HomeResources from "./HomeResources";
import TechGrid from "./TechGrid";

interface TeamCardProps {
  title: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  path: string;
}

const TeamCard: React.FC<TeamCardProps> = ({
  title,
  icon,
  isActive,
  onClick,
  path,
}) => (
  <Link href={path}>
    <div
      className={`bg-white rounded-lg shadow-md p-6 flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out ${
        isActive ? "transform scale-105 bg-[#f0f5ff]" : ""
      }`}
      onClick={onClick}
    >
      <div className="mb-4 w-24 h-24">{icon}</div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <button
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
          isActive ? "bg-[#2f54eb]" : "bg-[#c5ff3d]"
        }`}
      >
        <ArrowRight
          className={`w-6 h-6 ${isActive ? "text-white" : "text-black"}`}
        />
      </button>
    </div>
  </Link>
);

const Home = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const teams = [
    {
      title: "記事から探す",
      path: "/articles",
      icon: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect width="100" height="100" fill="#e6f7ff" />
          <circle cx="50" cy="50" r="30" fill="#1890ff" />
          <text x="50" y="55" fontSize="12" fill="white" textAnchor="middle">
            Articles
          </text>
        </svg>
      ),
    },
    {
      title: "大学や企業のリソースを確認する",
      path: "/resources",
      icon: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect width="100" height="100" fill="#f6ffed" />
          <rect x="20" y="20" width="60" height="60" fill="#52c41a" rx="8" />
          <text x="50" y="55" fontSize="12" fill="white" textAnchor="middle">
            Resources
          </text>
        </svg>
      ),
    },
    {
      title: "本から探す",
      path: "/books",
      icon: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect width="100" height="100" fill="#fff7e6" />
          <polygon points="50,20 80,80 20,80" fill="#fa8c16" />
          <text x="50" y="65" fontSize="12" fill="white" textAnchor="middle">
            Book
          </text>
        </svg>
      ),
    },
    {
      title: "無料プラットフォームを確認",
      path: "/platforms",
      icon: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect width="100" height="100" fill="#f0f5ff" />
          <circle cx="30" cy="30" r="20" fill="#2f54eb" />
          <circle cx="70" cy="30" r="20" fill="#722ed1" />
          <circle cx="30" cy="70" r="20" fill="#13c2c2" />
          <circle cx="70" cy="70" r="20" fill="#eb2f96" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-[1000px] bg-[#fffaf0] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/3 mb-8 lg:mb-0 lg:pr-8">
              <h2 className="text-5xl font-bold leading-tight text-[#1a1a1a]">
                Learn Hub makes work better for everyone.
              </h2>
            </div>
            <div className="lg:w-2/3 pt-20 pb-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {teams.map((team) => (
                  <TeamCard
                    key={team.title}
                    title={team.title}
                    icon={team.icon}
                    path={team.path}
                    isActive={activeCard === team.title}
                    onClick={() =>
                      setActiveCard(
                        activeCard === team.title ? null : team.title
                      )
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <HomeResources />
      <TechGrid />
      <Footer />
    </div>
  );
};

export default Home;
