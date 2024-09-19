"use client";

import React, { useState } from "react";
import QiitaArticles from "./QiitaArticles";
import ZennArticles from "./ZennArticles";
import Resources from "./Resources";

type TabType = "home" | "resources";

interface TabContent {
  title: string;
  content: JSX.Element;
}

const Header: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("home");

  const tabContents: Record<TabType, TabContent> = {
    home: {
      title: "ホーム",
      content: (
        <div>
          <h2 className="text-2xl font-bold mb-4">ホーム</h2>
          <QiitaArticles />
          <ZennArticles />
        </div>
      ),
    },
    resources: {
      title: "Resources",
      content: (
        <div>
          <h2 className="text-2xl font-bold mb-4">トピックス</h2>
          <Resources />
        </div>
      ),
    },
  };

  const tabs: TabType[] = ["home", "resources"];

  return (
    <div className="bg-white shadow-md h-25">
      <div className="container mx-auto px-4  h-full">
        <div className="flex flex-col w-full">
          <h1 className="text-2xl font-bold text-gray-600 mt-4 mb-4">
            Learn Hub
          </h1>
          <nav className="w-full">
            <ul className="flex justify-center space-x-4">
              {tabs.map((tab) => (
                <li key={tab}>
                  <button
                    className={`px-3 py-2 rounded-md ${
                      activeTab === tab
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tabContents[tab].title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="container mx-auto px-4 py-6">
        {tabContents[activeTab].content}
      </div>
    </div>
  );
};

export default Header;
