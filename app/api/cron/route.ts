import { NextResponse } from "next/server";
import { supabase } from "../../lib/supabase";

export const runtime = 'edge';

export async function GET(request: Request) {
    const authHeader = request.headers.get('authorization');

    if (authHeader !== `Bearer ${process.env.NEXT_PUBLIC_CRON_TOKEN}`) { 
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

    try{
        const response = await fetch("/api/bookextraction");
        const data = await response.json();

        const { data: insertedData, error } = await supabase
            .from('books')
            .upsert(
                data.map(book =>({
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
        return NextResponse.json({ success: false, error: "Data processed and inserted" }, { status: 500 });

    }
}