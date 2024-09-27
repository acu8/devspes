import { load } from 'cheerio'

export async function extractBooksFromArticle(content: string): Promise<string[]> {
  const $ = load(content)
  const bookTitles: string[] = []

  // h1, h2, h3タグから本のタイトルを抽出
  $('h1, h2, h3').each((_, element) => {
    const text = $(element).text().trim()
    if (isValidBookTitle(text)) {
      bookTitles.push(text)
    }
  })

  // 本文中の『』で囲まれたタイトルを抽出
  const bodyText = $('body').text()
  const quotedTitles = bodyText.match(/『(.+?)』/g)
  if (quotedTitles) {
    quotedTitles.forEach(title => {
      const cleanTitle = title.replace(/『|』/g, '').trim()
      if (isValidBookTitle(cleanTitle)) {
        bookTitles.push(cleanTitle)
      }
    })
  }

  return [...new Set(bookTitles)] // 重複を除去
}

function isValidBookTitle(title: string): boolean {
  // タイトルのバリデーションロジック
  // 例: 長さチェック、特定のキーワードを含むかどうか、など
  return title.length > 3 && title.length < 100 && !title.includes('http')
}