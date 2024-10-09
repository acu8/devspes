// lib/urlInfoExtractor.ts

interface BookUrlInfo {
    isbn: string | null;
    title: string | null;
  }
  
  export function extractInfoFromUrl(url: string): BookUrlInfo {
    console.log(`Extracting info from URL: ${url}`);
    
    let isbn: string | null = null;
    let title: string | null = null;
  
    // Amazon URL処理
    if (url.includes('amazon')) {
      // ISBNの抽出
      let match = url.match(/\/(?:dp|gp\/product|ASIN)\/(\d{10})(?:\/|\?|$)/);
      if (!match) {
        match = url.match(/\/([A-Z0-9]{10})(?:\/|\?|$)/);
      }
      if (match) {
        isbn = match[1];
      }
  
      // タイトルの抽出
      match = url.match(/\/([^\/]+)\/dp\//);
      if (match) {
        title = decodeURIComponent(match[1].replace(/-/g, ' '));
        title = title.replace(/^(www\.)?amazon\.co\.jp\s?/, '')
        .replace(/\s?(?:Amazon|\(著\)|\(単行本\)|\(文庫\)).*$/, '')
        .trim();
      }
    }
    // O'Reilly URL処理
    else if (url.includes('oreilly.co.jp')) {
      const match = url.match(/\/books\/(\d{10})(?:\/|\?|$)/);
      if (match) {
        isbn = match[1];
      }
      // O'ReillyのURLにはタイトルが含まれていないことが多いため、ここではタイトル抽出は行わない
    }
    // 技術評論社 URL処理
    else if (url.includes('gihyo.jp')) {
      const match = url.match(/\/book\/(\d{4})\/(\d{10})(?:\/|\?|$)/);
      if (match) {
        isbn = match[2];
      }
      // 技術評論社のURLにもタイトルが含まれていないことが多いため、ここではタイトル抽出は行わない
    }

    if (!title && url) {
        const urlParts = url.split('/');
        title = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2] || 'Unknown Title';
        title = decodeURIComponent(title.replace(/-/g, ' '));
      }
  
    console.log(`Extracted ISBN: ${isbn}, Title: ${title}`);
    return { isbn, title };
  }