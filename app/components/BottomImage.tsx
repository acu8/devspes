import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageCircle, Twitter, Linkedin, Youtube } from "lucide-react";

export default function BottomImage() {
  return (
    <div className="w-full h-[600px] flex flex-col">
      {/* Header */}
      <header className="relative h-screen bg-gradient-to-br from-blue-300 via-green-300 to-blue-400">
        <div className="absolute inset-0">
          <div className="absolute right-0 top-0 w-1/2 h-1/3 bg-lime-300 transform -skew-y-6"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8">
            Start Now, Be Engineer.
          </h1>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full text-lg">
            Join US
          </Button>
        </div>
        <div className="absolute bottom-4 right-4">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full bg-white/20 hover:bg-white/30"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>
      </header>
    </div>
  );
}
