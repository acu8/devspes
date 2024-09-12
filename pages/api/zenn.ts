import { NextApiRequest, NextApiResponse } from "next";
import Parser from 'rss-parser';

interface ZennArticle {
    title: string;
    link: string;
    pubDate: string;
    creator: string;
  }

  export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
  
      res.status(200).json(filteredArticles);
    } catch (error) {
      console.error("Error fetching Zenn articles:", error);
      res.status(500).json({ error: "Failed to fetch Zenn articles" });
    }
  }