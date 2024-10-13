import { supabase } from "./lib/supabase"
import { BookCount } from "./types/book";

export async function getBooks(): Promise<BookCount[]>{
    const { data, error } = await supabase 
    .from("books")
    .select()

    if(error) {
        console.error('Error fetching data:', error)
        throw error;
    }
    console.log(`User data:`, data);
    return data;
}