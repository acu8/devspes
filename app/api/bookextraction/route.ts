
// pages/api/fetch-articles.ts
import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { extractBooksFromArticle } from '../../lib/bookExtractor';
import { supabase } from '../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // QiitaとZennから記事を取得（ここでは簡略化のため、固定のURLを使用）
      const qiitaResponse = await axios.get('https://qiita.com/api/v2/items?query=title:技術書+stocks:>50&per_page=100')
      const zennResponse = await axios.get('https://zenn.dev/topics/技術書/feed')

      const qiitaArticles = qiitaResponse.data
      const zennArticles = zennResponse.data.articles

      for (const article of [...qiitaArticles, ...zennArticles]) {
        const content = article.body || article.content // QiitaとZennで異なるプロパティ名を使用
        const extractedBooks = await extractBooksFromArticle(content)

        for (const bookTitle of extractedBooks) {
          // Supabaseに本の情報を追加または更新
          const { data, error } = await supabase.rpc('upsert_book', { 
            p_title: bookTitle,
            p_author: 'Unknown' // 著者情報の抽出は複雑なため、ここでは省略
          })

          if (error) console.error('Error upserting book:', error)
        }
      }

      res.status(200).json({ message: 'Articles processed successfully' })
    } catch (error) {
      console.error('Error processing articles:', error)
      res.status(500).json({ error: 'Failed to process articles' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
