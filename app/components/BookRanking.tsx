"use client"
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Book } from "../types/book";

const BookRanking: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .order("mention_count", { ascending: false })
        .limit(20);

      if (error) throw error;
      setBooks(data || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Top Tech Books</h1>
      <ul>
        {books.map((book, index) => (
          <li key={book.id}>
            {index + 1}. {book.title} - Mentions: {book.mention_count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookRanking;
