// components/Header.tsx
import React from "react";

type TabType = "home" | "resources";

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const tabs: TabType[] = ["home", "resources"];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-600 mt-4 mb-4">DevSpes</h1>
        <nav>
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
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
