import axios from 'axios';
import { BookCount, BookDetails } from '../types/book';
import { extractInfoFromUrl } from './urlInfoExtractor';

export function extractBookUrls(content: string): string[] {
  console.log('extractBookUrls: Extracting URLs from content');
  
  const amazonRegex = /(https?:\/\/(?:www\.)?amazon\.(?:com|co\.jp)\/(?:.*\/)?(?:dp|gp\/product)\/(\w{10}))/g;
  const oreillyRegex = /(https?:\/\/(?:www\.)?oreilly\.co\.jp\/books\/(\d{10}))/g;
  const gihyoRegex = /(https?:\/\/gihyo\.jp\/book\/(\d{4})\/(\d{10}))/g;

  const combinedRegex = new RegExp(`${amazonRegex.source}|${oreillyRegex.source}|${gihyoRegex.source}`, 'g');

  const matches = content.match(combinedRegex) || [];
  console.log(`extractBookUrls: Found ${matches.length} URLs`);
  
  // 重複を除去
  const uniqueMatches = [...new Set(matches)];
  console.log(`extractBookUrls: Found ${uniqueMatches.length} unique URLs`);

  return uniqueMatches;
}

export function extractIsbnFromUrl(url: string): string | null {
  console.log(`extractIsbnFromUrl: Extracting ISBN from URL: ${url}`);
  const match = url.match(/\/dp\/(\w{10})/);
  const result = match ? match[1] : null;
  console.log(`extractIsbnFromUrl: Extracted ISBN: ${result}`);
  return result;
}

export async function fetchBookDetails(isbn: string): Promise<BookDetails | null> {
  console.log(`fetchBookDetails: Fetching details for ISBN: ${isbn}`);
  try {
    const response = await axios.get(`https://openlibrary.org/isbn/${isbn}.json`);
    const data = response.data;
    const result = {
      title: data.title,
      author: data.authors ? data.authors[0].name : 'Unknown',
      coverUrl: `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`
    };
    console.log(`fetchBookDetails: Fetched details:`, result);
    return result;
  } catch (error) {
    console.error(`Error fetching book details for ISBN ${isbn}:`, error);
    return null;
  }
}

export async function countBookUrls(qiitaArticles: any[]): Promise<BookCount[]> {
  console.log(`Starting processing of ${qiitaArticles.length} articles`);
  const urlCounts: { [key: string]: BookCount } = {};

  async function processArticles(articles: any[], source: 'Qiita' | 'Zenn') {
    console.log(`Processing ${articles.length} ${source} articles`);
    for (const article of articles) {
      console.log(`Processing article: "${article.title}"`);
      const urls = extractBookUrls(article.body);
      console.log(`Extracted ${urls.length} URLs from the article`);
      const uniqueUrls = new Set(urls);
      for (const url of uniqueUrls) {
        const { isbn, title } = extractInfoFromUrl(url);
        if (!urlCounts[url]) {
          let bookDetails: BookDetails | null = null;
          if (isbn) {
            try {
              console.log(`Fetching book details for ISBN: ${isbn}`);
              bookDetails = await fetchBookDetails(isbn);
            } catch (error) {
              console.error(`Error fetching book details for ISBN ${isbn}:`, error);
            }
          }
          urlCounts[url] = { 
            url, 
            count: 0,
            articles: [],
            bookDetails: bookDetails || { title: title || 'Unknown Title', author: 'Unknown Author', coverUrl: null }
          };
        }
        urlCounts[url].count += 1;
        urlCounts[url].articles.push({
          title: article.title,
          url: article.url,
          source
        });
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