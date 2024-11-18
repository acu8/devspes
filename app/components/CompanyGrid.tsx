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
      slug: "recruit",
    },
    {
      name: "サイボウズ株式会社",
      logo: "/company/サイボウズ.png",
      company: "サイボウズ株式会社",
      slug: "cybozu",
    },
    {
      name: "MIXI",
      logo: "/company/MIXI_works_01.jpg",
      company: "MIXI",
      slug: "mixi",
    },
    {
      name: "メルカリ",
      logo: "/company/mercari.png",
      company: "メルカリ",
      slug: "mercari",
    },
    {
      name: "KDDIアジャイル開発センター",
      logo: "/company/124341.jpg",
      company: "KDDIアジャイル開発センター",
      slug: "kddi",
    },
    {
      name: "ゆめみ",
      logo: "/company/yumemi.svg",
      company: "ゆめみ",
      slug: "yumemi",
    },
    {
      name: "GMOペパボ",
      logo: "/company/GMO .png",
      company: "GMOペパボ",
      slug: "gmo",
    },
  ];

  return (
    <div className="flex items-center justify-center flex-col h-[600px] bg-[#f7ea3a]">
      <div className="w-full px-4 py-8">
        <h1 className="text-3xl font-bold mb-20 text-center">
          最近追加された企業リソース
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {companies.map((tech) => (
            <Link
              key={tech.name}
              href={`/company/${tech.slug}`}
              className="block"
            >
              <Card className="h-full transition-transform hover:scale-105">
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <div className="w-42 h-32 mb-2">
                    <Image
                      src={tech.logo}
                      alt={`${tech.name} logo`}
                      width={300}
                      height={300}
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
        <div className="flex justify-center mt-20">
          <Link href="/company">
            <button className="btn btn-outline btn-success btn-lg">
              すべての企業リソースを見る
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyGrid;
