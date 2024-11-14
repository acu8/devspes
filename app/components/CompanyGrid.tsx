import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const CompanyGrid = () => {
  const companies = [
    {
      name: "株式会社リクルート",
      logo: "/company/Recruit.jpg",
      company: "株式会社リクルート",
    },
    {
      name: "サイボウズ株式会社",
      logo: "/company/サイボウズ.png",
      company: "サイボウズ株式会社",
    },
    { name: "MIXI", logo: "/company/MIXI_works_01.jpg", company: "MIXI" },
    { name: "メルカリ", logo: "/company/mercari.png", company: "メルカリ" },
    {
      name: "KDDIアジャイル開発センター",
      logo: "/company/124341.jpg",
      company: "KDDIアジャイル開発センター",
    },
    { name: "ゆめみ", logo: "/company/yumemi.svg", company: "ゆめみ" },
    {
      name: "GMOペパボ",
      logo: "/company/GMO .png",
      company: "株式会社リクルート",
    },
  ];

  return (
    <div className="flex items-center justify-center flex-col h-[1000px] bg-[#b9d0c0]">
      <div className="container mx-auto px-4 py-8 w-full bg-[#b9c330]">
        <h1 className="text-2xl font-bold mb-8">注目の技術・ツール</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {companies.map((tech) => (
            <Link
              key={tech.name}
              href={`/resources/${tech.company}`}
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

export default CompanyGrid;
