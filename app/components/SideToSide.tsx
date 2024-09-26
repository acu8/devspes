import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, ThumbsUp, ThumbsDown, Copy } from "lucide-react";

export default function SideToSide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - AI Assistant Mockup */}
        <div className="relative bg-white rounded-3xl shadow-lg p-6 max-w-md mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl -z-10"></div>
          <Card className="bg-white shadow-sm">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Platform expansion strategy
                    </h3>
                    <p className="text-sm text-gray-500">
                      Tim Scanlan • June 6, 2023
                    </p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-purple-600 mb-2">Assistant</h4>
                <p className="text-sm text-gray-700">
                  This document outlines Acme's platform expansion strategy in
                  the gaming industry. It emphasizes the importance of assessing
                  current platforms, conducting market research, and
                  establishing selection criteria. The strategy includes
                  partnerships, development and optimization efforts, user
                  acquisition and marketing strategies, monitoring and
                  evaluation, and a future expansion roadmap to stay ahead in
                  the dynamic gaming landscape.
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <button>
                  <Copy className="w-4 h-4 text-gray-400" />
                </button>
                <button>
                  <ThumbsUp className="w-4 h-4 text-gray-400" />
                </button>
                <button>
                  <ThumbsDown className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
            <div className="border-t p-4 flex space-x-2">
              <Button
                variant="outline"
                className="text-gray-500 flex-grow justify-start"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Ask a follow-up...
              </Button>
              <Button variant="outline" className="text-blue-600">
                How will we ...?
              </Button>
            </div>
          </Card>
          <div className="mt-4 px-4">
            <h3 className="font-semibold">Platform expansion strategy</h3>
            <p className="text-sm text-gray-500">Maria Alfaro, June 2023</p>
          </div>
        </div>

        {/* Right side - Product Information */}
        <div className="text-center md:text-left md:pl-8">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">
            AI assistant
          </h2>
          <h1 className="text-5xl font-bold mb-8 leading-tight">
            Find answers & generate content you can trust.
          </h1>
          <Button className="bg-[#d1fa84] hover:bg-[#c2eb75] text-gray-800 font-semibold py-2 px-6 rounded-full text-lg">
            Explore Glean Assistant
          </Button>
        </div>
      </div>
    </div>
  );
}
