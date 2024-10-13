export interface Book {
    id: number
    title: string
    mention_count: number
  }
  

export interface BookDetails {
    title: string | null;
    author: string | string[] | null;
    coverUrl: string | null;
  }
  
export interface ArticleReference {
    title: string;
    url: string;
    source: 'Qiita' | 'Zenn';
  }
  
export interface BookCount {
    url: string;
    title:string;
    authors: string;
    count: number;
    articles: string;
    bookDetails: BookDetails;
    coverUrl: string;
  }
