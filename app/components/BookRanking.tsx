import React, { useState, useEffect } from "react";
import { BookCount } from "../types/book";
import { updateBooksTable } from "../supabaseFunction";

const BookRanking: React.FC = () => {
  const [bookCounts, setBookCounts] = useState<BookCount[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAndProcessArticles();
  }, []);

  async function fetchAndProcessArticles() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/bookextraction");
      if (!response.ok) {
        throw new Error(`Failed to fetch book data: ${response.status}`);
      }
      const bookCounts = await response.json();
      console.log("Received book counts:", bookCounts);
      setBookCounts(bookCounts.sort((a, b) => b.count - a.count));

      await updateBooksTable(bookCounts);
    } catch (err) {
      console.error("Error in fetchAndProcessArticles:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Tech Book Ranking</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {bookCounts.length === 0 && !loading && !error && <p>No books found.</p>}
      {bookCounts.map((book, index) => (
        <div key={book.url} className="mb-8 p-4 border rounded shadow">
          <h2 className="text-2xl font-semibold mb-2">
            {index + 1}. {book.bookDetails?.title || "Unknown Title"}
          </h2>

          {Array.isArray(book.bookDetails?.author) &&
          book.bookDetails?.author?.length === 1 ? (
            <p className="mb-2">Author: {book.bookDetails?.author}</p>
          ) : (
            <p className="mb-2">Author: {book.bookDetails?.author?.[0]} 他</p>
          )}
          <p className="mb-2">Mentions: {book.count}</p>
          {book.bookDetails?.coverUrl && (
            <img
              src={book.bookDetails.coverUrl}
              alt={`Cover of ${book.bookDetails.title}`}
              className="w-32 h-auto mb-4"
            />
          )}
          <h3 className="text-xl font-semibold mb-2">Mentioned in:</h3>
          <ul className="list-disc pl-5">
            {book.articles.map((article, articleIndex) => (
              <li key={articleIndex}>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {article.title} ({article.source})
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default BookRanking;
