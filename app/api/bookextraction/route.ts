import { NextResponse } from 'next/server';
import axios from 'axios';
import { countBookUrls } from '../../lib/bookExtractor';

export async function GET() {
  try {
    console.log('API route: Fetching Qiita articles...');
    const qiitaResponse = await axios.get('https://qiita.com/api/v2/items', {
      params: {
        per_page: 100,
        query: 'tag:技術書 OR tag:本 OR tag:書籍 stocks:>50', 
      },
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_QIITA_API_TOKEN}`
      }
    });
    console.log('API route: Qiita response received. Article count:', qiitaResponse.data.length);

    console.log('API route: Processing articles...');
    const bookCounts = await countBookUrls(qiitaResponse.data);
    console.log('API route: Book counts processed. Count:', bookCounts.length);

    return NextResponse.json(bookCounts);
  } catch (error) {
    console.error('API route: Error fetching or processing articles:', error);
    return NextResponse.json({ error: 'Failed to fetch or process articles' }, { status: 500 });
  }
}