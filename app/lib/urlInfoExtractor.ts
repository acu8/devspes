interface BookUrlInfo {
    isbn: string | null;
    title: string | null;
  }
  
  export function extractInfoFromUrl(url: string): BookUrlInfo {
    let isbn: string | null = null;
    let title: string | null = null;
  
    if (url.includes('amazon')) {
      let match = url.match(/\/(?:dp|gp\/product|ASIN)\/(\d{10})(?:\/|\?|$)/);
      if (!match) {
        match = url.match(/\/([A-Z0-9]{10})(?:\/|\?|$)/);
      }
      if (match) {
        isbn = match[1];
      }
      match = url.match(/\/([^\/]+)\/dp\//);
      if (match) {
        title = decodeURIComponent(match[1].replace(/-/g, ' '));
        title = title.replace(/^(www\.)?amazon\.co\.jp\s?/, '')
        .replace(/\s?(?:Amazon|\(著\)|\(単行本\)|\(文庫\)).*$/, '')
        .trim();
      }
    }
    else if (url.includes('oreilly.co.jp')) {
      const match = url.match(/\/books\/(\d{10})(?:\/|\?|$)/);
      if (match) {
        isbn = match[1];
      }
    }
    else if (url.includes('gihyo.jp')) {
      const match = url.match(/\/book\/(\d{4})\/(\d{10})(?:\/|\?|$)/);
      if (match) {
        isbn = match[2];
      }
    }

    if (!title && url) {
        const urlParts = url.split('/');
        title = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2] || 'Unknown Title';
        title = decodeURIComponent(title.replace(/-/g, ' '));
      }
  
    return { isbn, title };
  }