import { NextResponse } from "next/server";
import { BookCount } from "../../types/book";
import { countBookUrls } from '../../lib/bookExtractor';
import { createClient } from '@supabase/supabase-js'


export const runtime = 'edge';

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  )

async function fetchAndProcessBooks(): Promise<BookCount[]> {
    const qiitaResponse = await fetch('https://qiita.com/api/v2/items?per_page=80&query=tag:本%20OR%20tag:本%20OR%20tag:書籍%20stocks:>50', {
      headers: {
        Authorization: `Bearer ${process.env.QIITA_API_TOKEN}`
      }
    });
    
    const data = await qiitaResponse.json();
    return await countBookUrls(data);
  }

export async function GET(request: Request) {
    const authHeader = request.headers.get('authorization');

    if (authHeader !== `Bearer ${process.env.CRON_TOKEN}`) { 
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

    try{
        const response = await fetchAndProcessBooks();
    
        const { data, error } = await supabase
            .from('books')
            .upsert(
                response.map((book: BookCount) =>({
                    url: book.url,
                    title: book.bookDetails.title,
                    authors:JSON.stringify(book.bookDetails.author),
                    articles: JSON.stringify(book.articles),
                    coverUrl: book.bookDetails.coverUrl,
                    count: book.count
        }))
      )
      if (error) {
        console.error('Error inserting data:', error)
        throw error;
      }
      return NextResponse.json({ success: true, message: "Data processed and inserted" });
    
    } catch (error){
        console.error("Batch process failed:", error); 
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });

    }
}