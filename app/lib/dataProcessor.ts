import { supabase } from './supabase';
import { fetchAllQiitaArticles } from './qiitaApi';
import { fetchBookDetails } from './bookDetailsFetcher';
import { extractBookUrls } from './urlExtractor';
import { extractIsbnFromUrl } from './bookTitleExtractor';

interface SavedArticle {
  id: number;
  qiita_id: string;
  title: string;
  url: string;
  created_at: string;
}

interface SavedBook {
  id: number;
  isbn: string;
  title: string;
  authors: string;
  published_date: string;
  publisher?: string;
  cover_url?: string;
}

export async function processAndSaveData() {
  const articles = await fetchAllQiitaArticles();
  
  for (const article of articles) {
    // Save article
    const { data: savedArticle, error: articleError } = await supabase
      .from('qiita_articles')
      .upsert({ 
        qiita_id: article.id, 
        title: article.title, 
        url: article.url,
        created_at: article.created_at
      }, { onConflict: 'qiita_id' })
      .single<SavedArticle>();

    if (articleError) {
      console.error('Error saving article:', articleError);
      continue;
    }

    if (!savedArticle) {
      console.error('Failed to save article:', article.id);
      continue;
    }

    // Save tags
    for (const tag of article.tags) {
      const { data: savedTag, error: tagError } = await supabase
        .from('tags')
        .upsert({ name: tag.name }, { onConflict: 'name' })
        .single<{ id: number, name: string }>();

      if (tagError) {
        console.error('Error saving tag:', tagError);
        continue;
      }

      if (savedTag) {
        // Link article and tag
        await supabase
          .from('article_tags')
          .upsert({ 
            article_id: savedArticle.id, 
            tag_id: savedTag.id 
          }, { onConflict: 'article_id,tag_id' });
      }
    }

    // Process books
    const bookUrls = extractBookUrls(article.body);
    for (const url of bookUrls) {
      const isbn = extractIsbnFromUrl(url);
      if (isbn) {
        const bookDetails = await fetchBookDetails(isbn);
        if (bookDetails) {
          const { data: savedBook, error: bookError } = await supabase
            .from('books')
            .upsert({
              isbn: bookDetails.isbn,
              title: bookDetails.title,
              authors: bookDetails.authors.join(', '),
              published_date: bookDetails.publishedDate,
              publisher: bookDetails.publisher,
              cover_url: bookDetails.coverUrl
            }, { onConflict: 'isbn' })
            .single<SavedBook>();

          if (bookError) {
            console.error('Error saving book:', bookError);
            continue;
          }

          if (savedBook) {
            await supabase
              .from('book_mentions')
              .upsert({ 
                book_id: savedBook.id, 
                article_id: savedArticle.id 
              }, { onConflict: 'book_id,article_id' });
          }
        }
      }
    }
  }
}