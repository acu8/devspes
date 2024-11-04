import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const TechGrid = () => {
  const technologies = [
    { name: "Python", logo: "/logo/python.png", category: "python" },
    { name: "Javascript", logo: "/logo/js.jpg", category: "Javascript" },
    { name: "Typescript", logo: "/logo/ts.png", category: "Typescript" },
    { name: "React", logo: "/logo/react.svg", category: "Typescript" },
    { name: "Go", logo: "/logo/go.jpg", category: "Typescript" },
    { name: "Vue", logo: "/logo/vue.png", category: "Typescript" },
    { name: "C++", logo: "/logo/cplus.png", category: "Typescript" },
    { name: "Go", logo: "/logo/go.jpg", category: "Typescript" },
    { name: "Next.js", logo: "/logo/Next.png", category: "Typescript" },
    { name: "Ruby", logo: "/logo/ruby.png", category: "Typescript" },
    { name: "Vercel", logo: "/logo/vercel.png", category: "Typescript" },
    { name: "Docker", logo: "/logo/docker.png", category: "Typescript" },
    { name: "CSS", logo: "/logo/css.png", category: "Typescript" },
    { name: "HTML5", logo: "/logo/html.png", category: "Typescript" },
    { name: "Laravel", logo: "/logo/laravel.png", category: "Typescript" },
    { name: "Linux", logo: "/logo/linux.gif", category: "Typescript" },
    { name: "PHP", logo: "/logo/php.png", category: "Typescript" },
    { name: "Vite", logo: "/logo/vite.png", category: "Typescript" },
    { name: "AWS", logo: "/logo/aws.svg.png", category: "Typescript" },
    {
      name: "Ruby on Rails",
      logo: "/logo/rubyonrails.png",
      category: "Typescript",
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
              href={`/resources/${tech.category}`}
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
