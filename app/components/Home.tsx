"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Information from "./Information";
import SideToSide from "./SideToSide";
import BottomImage from "./BottomImage";
import Footer from "./Footer";

interface TeamCardProps {
  title: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const TeamCard: React.FC<TeamCardProps> = ({
  title,
  icon,
  isActive,
  onClick,
}) => (
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
);

const Home = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const teams = [
    {
      title: "記事から探す",
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
      {/* Hero Section */}
      <section className="relative h-[1000px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#c5ff3d] via-[#8ee7f3] to-[#405bff] z-0"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold mb-8">Start Today</h1>
          <Button size="lg">Join US ! </Button>
          {/* <Button variant="outline" size="lg">
            Watch video →
          </Button> */}
        </div>
      </section>
      {/* Feature section */}
      <section className="bg-blue-600 text-white p-8">
        <h2 className="text-3xl font-bold mb-8">
          The Work AI platform for quickly & securely bringing AI into the
          enterprise.
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-700 p-4 rounded">
            <h3 className="font-semibold mb-2">GenAI engine</h3>
          </div>
          <div className="bg-blue-700 p-4 rounded">
            <h3 className="font-semibold mb-2">AI-powered search</h3>
          </div>
          <div className="bg-blue-700 p-4 rounded">
            <h3 className="font-semibold mb-2">Security & governance</h3>
          </div>
        </div>
      </section>
      {/* Capabilities section */}

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
      <Information />
      <SideToSide />
      <BottomImage />
      <Footer />
    </div>
  );
};

export default Home;
