import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const QIITA_API_TOKEN = process.env.NEXT_PUBLIC_QIITA_API_TOKEN;
  const per_page = 20;

  if (!QIITA_API_TOKEN) {
    return NextResponse.json({ error: "Qiita API token is not set" }, { status: 500 });
  }

  try {
    let allArticles = [];
    let page = 1;
    let hasMoreArticles = true;

    while (hasMoreArticles) {
      const response = await fetch(
        `https://qiita.com/api/v2/items?query=title:チュートリアル+stocks:>50&page=${page}&per_page=${per_page}`,
        {
          headers: {
            Authorization: `Bearer ${QIITA_API_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch Qiita articles: ${response.status} ${response.statusText}`);
      }

      const articles = await response.json();
      allArticles = allArticles.concat(articles);

      if (articles.length < per_page) {
        hasMoreArticles = false;
      } else {
        page++;
      }
    }

    return NextResponse.json(allArticles);
  } catch (error) {
    console.error("Error fetching Qiita articles:", error);
    return NextResponse.json({ error: "Failed to fetch Qiita articles" }, { status: 500 });
  }
}