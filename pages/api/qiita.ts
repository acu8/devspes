import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const QIITA_API_TOKEN = process.env.NEXT_PUBLIC_QIITA_API_TOKEN;
    const { page = 1, per_page = 20 } = req.query;

    if (!QIITA_API_TOKEN) {
        return res.status(500).json({ error: "Qiita API token is not set" });
      }
  
    try {
      const response = await fetch(
        `https://qiita.com/api/v2/items?query=title:チュートリアル+stocks:>50&page=${page}&per_page=${per_page}`,
        {
          headers: {
            Authorization: `Bearer ${QIITA_API_TOKEN}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch Qiita articles");
      }
  
      const articles = await response.json();
      res.status(200).json(articles);
      console.log(articles)
    } catch (error) {
      console.error("Error fetching Qiita articles:", error);
      res.status(500).json({ error: "Failed to fetch Qiita articles" });
    }
  }