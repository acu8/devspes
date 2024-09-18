"use client";

import React, { useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Resources from "./components/Resources";

type TabType = "home" | "resources";

const Layout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "resources":
        return <Resources />;
    }
  };

  return (
    <div className="bg-white">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto px-4 py-6">{renderContent()}</main>
    </div>
  );
};

export default Layout;
