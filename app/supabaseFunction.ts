import { supabase } from "./lib/supabase"
import { BookCount } from "./types/book";


export async function updateBooksTable(books: BookCount[]) {
      const { data, error } = await supabase
      .from('books')
      .insert(
        books.map(book =>({
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
    

      return data;
}

export async function getBooks(){
    const { data, error } = await supabase 
    .from("books")
    .select()

    if(error) {
        console.error('Error fetching data:', error)
    }
    console.log(`User data:`, data);
    return data;
}