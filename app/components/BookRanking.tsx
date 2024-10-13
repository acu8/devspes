import React, { useState, useEffect } from "react";
import { BookCount } from "../types/book";
import { getBooks } from "../supabaseFunction";

const BookRanking: React.FC = () => {
  const [bookCounts, setBookCounts] = useState<BookCount[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchAndProcessBooks() {
    setLoading(true);
    setError(null);
    try {
      const response = await getBooks();
      if (response === null) {
        throw new Error(`Failed to fetch book data`);
      }
      console.log("Received book counts:", response);
      setBookCounts(response.sort((a, b) => b.count - a.count));
    } catch (err) {
      console.error("Error in fetchAndProcessArticles:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAndProcessBooks();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Tech Book Ranking</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {bookCounts.length === 0 && !loading && !error && <p>No books found.</p>}
      {bookCounts.map((book, index) => (
        <div key={book.url} className="mb-8 p-4 border rounded shadow">
          <h2 className="text-2xl font-semibold mb-2">
            {index + 1}. {book.title || "Unknown Title"}
          </h2>
          {(() => {
            try {
              const authors = JSON.parse(book.authors);
              if (Array.isArray(authors)) {
                if (authors.length === 1) {
                  return <p className="mb-2">Author: {authors[0]}</p>;
                } else if (authors.length > 1) {
                  return <p className="mb-2">Authors: {authors[0]} 他</p>;
                }
              }
              return <p className="mb-2">Author: Unknown</p>;
            } catch (error) {
              console.error("Error parsing authors:", error);
              return <p className="mb-2">Author: Error occurred</p>;
            }
          })()}

          <p className="mb-2">Mentions: {book.count}</p>
          {book.coverUrl && (
            <img
              src={book.coverUrl}
              alt={`Cover of ${book.title}`}
              className="w-32 h-auto mb-4"
            />
          )}
          <h3 className="text-xl font-semibold mb-2">Mentioned in:</h3>
          <ul className="list-disc pl-5">
            {(() => {
              try {
                const articlesArray = JSON.parse(book.articles);
                if (Array.isArray(articlesArray)) {
                  return articlesArray.map((article, index) => (
                    <li key={index}>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {article.title} ({article.source})
                      </a>
                    </li>
                  ));
                }
              } catch (error) {
                console.error("Error parsing articles:", error);
              }
              return <p>No articles available or invalid data</p>;
            })()}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default BookRanking;
