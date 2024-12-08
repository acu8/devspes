import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const UniversityGrid = () => {
  const universities = [
    {
      name: "東京大学",
      logo: "/company/todai.jpg",
      company: "東京大学",
      slug: "todai",
    },
    {
      name: "京都大学",
      logo: "/company/kyodai.avif",
      company: "京都大学",
      slug: "kyodai",
    },
    {
      name: "東京工業大学",
      logo: "/company/tokyokogyodai.png",
      company: "東京工業大学",
      slug: "tokyokogyodai",
    },
    {
      name: "筑波大学",
      logo: "/company/tsukuba.png",
      company: "筑波大学",
      slug: "tsukuba",
    },
    {
      name: "千葉大学",
      logo: "/company/chibadai.webp",
      company: "千葉大学",
      slug: "chiba",
    },
    {
      name: "放送大学",
      logo: "/company/hoso.png",
      company: "放送大学",
      slug: "hoso",
    },
    {
      name: "ハーバード大学",
      logo: "/company/Harvard_University_logo.svg",
      company: "ハーバード大学",
      slug: "harvard",
    },
    {
      name: "マサチューセッツ工科大学",
      logo: "/company/MIT.png",
      company: "マサチューセッツ工科大学",
      slug: "mit",
    },
  ];

  return (
    <div className="flex items-center justify-center flex-col h-[800px] bg-[#b9e1af]">
      <div className="w-full px-4 py-8">
        <h1 className="text-3xl font-bold mb-20 text-center">
          大学が提供する無料リソース
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {universities.map((university) => (
            <Link
              key={university.name}
              href={`/company/${university.slug}`}
              className="block"
            >
              <Card className="h-full transition-transform hover:scale-105">
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <div className="w-42 h-32 mb-2">
                    <Image
                      src={university.logo}
                      alt={`${university.name} logo`}
                      width={300}
                      height={300}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-center">
                    {university.name}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-20">
          <Link href="/company">
            <button className="btn btn-outline btn-success btn-lg">
              すべての大学リソースを見る
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UniversityGrid;
