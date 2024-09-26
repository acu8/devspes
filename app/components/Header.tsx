import React from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <div className="flex flex-col">
      {/* Top banner */}
      <div className="bg-[#c5ff3d] p-2 text-center text-sm font-medium">
        🚀 Learn Hub GO: Fall'24 - introducing next-generation prompting.{" "}
        <a href="#" className="underline">
          Watch now →
        </a>
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-between p-4">
        <div className="text-2xl font-bold text-blue-600">
          <h1>Learn Hub</h1>
        </div>
        <div className="hidden md:flex space-x-4">
          <a href="#" className="text-gray-600">
            Product
          </a>
          <a href="#" className="text-gray-600">
            Solutions
          </a>
          <a href="#" className="text-gray-600">
            Resources
          </a>
          <a href="#" className="text-gray-600">
            About
          </a>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">Sign in</Button>
          <Button>Get a demo</Button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
