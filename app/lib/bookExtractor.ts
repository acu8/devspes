import axios from 'axios';
import { BookCount, BookDetails } from '../types/book';
import { extractInfoFromUrl } from './urlInfoExtractor';

export function extractBookUrls(content: string): string[] {
  const amazonRegex = /(https?:\/\/(?:www\.)?amazon\.(?:com|co\.jp)\/(?:.*\/)?(?:dp|gp\/product)\/(\w{10}))/g;
  const oreillyRegex = /(https?:\/\/(?:www\.)?oreilly\.co\.jp\/books\/(\d{10}))/g;
  const gihyoRegex = /(https?:\/\/gihyo\.jp\/book\/(\d{4})\/(\d{10}))/g;

  const combinedRegex = new RegExp(`${amazonRegex.source}|${oreillyRegex.source}|${gihyoRegex.source}`, 'g');
  const matches = content.match(combinedRegex) || [];
  const uniqueMatches = [...new Set(matches)];
  return uniqueMatches;
}

export function extractIsbnFromUrl(url: string): string | null {
  const match = url.match(/\/dp\/(\w{10})/);
  const result = match ? match[1] : null;
  return result;
}

// export async function fetchBookDetails(isbn: string): Promise<BookDetails | null> {
//   try {
//     const response = await axios.get(`https://openlibrary.org/isbn/${isbn}.json`);
//     const data = response.data;
//     const result = {
//       title: data.title,
//       author: data.authors ? data.authors[0].name : 'Unknown',
//       coverUrl: `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`
//     };
//     return result;
//   } catch (error) {
//     console.error(`Error fetching book details for ISBN ${isbn}:`, error);
//     return null;
//   }
// }

export async function fetchBookDetails(isbn: string): Promise<BookDetails | null> {
  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
    const data = response.data;
    const result = {
      title: data.items[0].volumeInfo.title,
      author: data.items[0].volumeInfo.authors,
      coverUrl: data.items[0].volumeInfo.imageLinks.thumbnail
    };
    
    return result;
  } catch (error) {
    console.error(`Error fetching book details for ISBN ${isbn}:`, error);
    return null;
  }
}
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function ensureStringArray(value: string | string[] | null | undefined): string[] {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === 'string') {
    return [value];
  }
  return ['Unknown Author'];
}


export async function countBookUrls(qiitaArticles: any[]): Promise<BookCount[]> {
  const urlCounts: { [key: string]: BookCount } = {};

  async function processArticles(articles: any[], source: 'Qiita' | 'Zenn') {
    for (const article of articles) {
      const urls = extractBookUrls(article.body);
      const uniqueUrls = new Set(urls);
      for (const url of uniqueUrls) {
        const { isbn, title } = extractInfoFromUrl(url);
        if (!urlCounts[url]) {
          let bookDetails: BookDetails | null = null;
          if (isbn) {
            try {
              bookDetails = await fetchBookDetails(isbn);
              await delay(1000);
            } catch (error) {
              console.error(`Error fetching book details for ISBN ${isbn}:`, error);
            }
          }
          urlCounts[url] = { 
            url, 
            title: bookDetails?.title || title || "Unknown Title",
            authors: JSON.stringify(ensureStringArray(bookDetails?.author)),
            count: 0,
            articles: JSON.stringify([]),
            bookDetails: bookDetails || { title: title || 'Unknown Title', author: ['Unknown Author'], coverUrl: null },
            coverUrl: bookDetails?.coverUrl || ''
          };
        }
        urlCounts[url].count += 1;
        const currentArticles = JSON.parse(urlCounts[url].articles);
        currentArticles.push({
          title: article.title,
          url: article.url,
          source
        });
        urlCounts[url].articles = JSON.stringify(currentArticles);
      }
    }
  }

  try {
    await processArticles(qiitaArticles, 'Qiita');
  } catch (error) {
    console.error('Error processing articles:', error);
  }

  return Object.values(urlCounts);
}