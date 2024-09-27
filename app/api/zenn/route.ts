import { NextRequest, NextResponse } from 'next/server';
import Parser from 'rss-parser';

export async function GET(request: NextRequest) {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL('https://zenn.dev/topics/tutorial/feed');

    const filteredArticles = feed.items.map((item: any) => ({
      title: item.title,
      url: item.link,
      created_at: item.pubDate,
      user: {
        name: item.creator,
      },
    }));

    return NextResponse.json(filteredArticles);
  } catch (error) {
    console.error("Error fetching Zenn articles:", error);
    return NextResponse.json({ error: "Failed to fetch Zenn articles" }, { status: 500 });
  }
}
