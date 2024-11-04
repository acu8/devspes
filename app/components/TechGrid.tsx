import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const TechGrid = () => {
  const technologies = [
    { name: "Python", logo: "/logo/python.png", url: "https://yamory.io" },
    { name: "Javascript", logo: "/logo/js.jpg", url: "https://yamory.io" },
    { name: "Typescript", logo: "/logo/ts.png", url: "https://yamory.io" },
    { name: "React", logo: "/logo/react.svg", url: "https://yamory.io" },
    { name: "Go", logo: "/logo/go.jpg", url: "https://yamory.io" },
    { name: "Vue", logo: "/logo/vue.png", url: "https://yamory.io" },
    { name: "C++", logo: "/logo/cplus.png", url: "https://yamory.io" },
    { name: "Go", logo: "/logo/go.jpg", url: "https://yamory.io" },
    { name: "Next.js", logo: "/logo/Next.png", url: "https://yamory.io" },
    { name: "Ruby", logo: "/logo/ruby.png", url: "https://yamory.io" },
    { name: "Vercel", logo: "/logo/vercel.png", url: "https://yamory.io" },
    { name: "Docker", logo: "/logo/docker.png", url: "https://yamory.io" },
    { name: "CSS", logo: "/logo/css.png", url: "https://yamory.io" },
    { name: "HTML5", logo: "/logo/html.png", url: "https://yamory.io" },
    { name: "Laravel", logo: "/logo/laravel.png", url: "https://yamory.io" },
    { name: "Linux", logo: "/logo/linux.gif", url: "https://yamory.io" },
    { name: "PHP", logo: "/logo/php.png", url: "https://yamory.io" },
    { name: "Vite", logo: "/logo/vite.png", url: "https://yamory.io" },
    { name: "AWS", logo: "/logo/aws.svg.png", url: "https://yamory.io" },
    {
      name: "Ruby on Rails",
      logo: "/logo/rubyonrails.png",
      url: "https://yamory.io",
    },
  ];

  return (
    <div className="flex items-center justify-center flex-col h-[1000px] bg-[#b9d0c0]">
      <div className="container mx-auto px-4 py-8 w-full bg-[#b9c330]">
        <h1 className="text-2xl font-bold mb-8">注目の技術・ツール</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {technologies.map((tech) => (
            <Link
              key={tech.name}
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="h-full transition-transform hover:scale-105">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="w-12 h-12 mb-4">
                    <Image
                      src={tech.logo}
                      alt={`${tech.name} logo`}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-center">
                    {tech.name}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechGrid;
