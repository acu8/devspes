import { NextResponse } from 'next/server';
import axios from 'axios';
import { countBookUrls } from '../../lib/bookExtractor';

export async function GET() {
  try {
    const qiitaResponse = await axios.get('https://qiita.com/api/v2/items', {
      params: {
        per_page: 5,
        query: 'tag:技術書 OR tag:本 OR tag:書籍 stocks:>50', 
      },
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_QIITA_API_TOKEN}`
      }
    });
    const bookCounts = await countBookUrls(qiitaResponse.data);
    return NextResponse.json(bookCounts);
  } catch (error) {
    console.error('API route: Error fetching or processing articles:', error);
    return NextResponse.json({ error: 'Failed to fetch or process articles' }, { status: 500 });
  }
}