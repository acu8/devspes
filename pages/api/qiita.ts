import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const QIITA_API_TOKEN = process.env.NEXT_PUBLIC_QIITA_API_TOKEN;
    const per_page = 100; 
    // const { page = 1, per_page = 20 } = req.query;

    console.log("QIITA_API_TOKEN is set:", !!QIITA_API_TOKEN);

    if (!QIITA_API_TOKEN) {
        return res.status(500).json({ error: "Qiita API token is not set" });
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

            console.log("Response status:", response.status);
            console.log("Response headers:", response.headers);

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error response body:", errorText);
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
        res.status(200).json(allArticles);
        console.log(allArticles);
    } catch (error) {
      console.error("Error fetching Qiita articles:", error);
      res.status(500).json({ error: "Failed to fetch Qiita articles" });
    }
  }