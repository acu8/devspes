// import puppeteer from 'puppeteer';
// import * as cheerio from 'cheerio';
// import { Resource } from '../types/resource';
// import { ScrapingError } from '../types/scrapingError';
// import { VERIFIED_COMPANIES } from '../config/companies';
// import { 
//     TRAINING_KEYWORDS, 
//     DEFAULT_CATEGORY, 
//     DEFAULT_TYPE, 
//     DEFAULT_PLATFORM 
// } from './constants';
// import { supabase } from './supabase';


// export class SpeakerDeckScraper {
//     //URLからアカウント名を取得する
//     private extractAccountName(url: string): string {
//         const matches = url.match(/speakerdeck\.com\/([^\/]+)/);
//         return matches ? matches[1] : '';
//     }
//     //アカウント名から会社名を確認
//     private isVerifiedCompany(accountName: string): string | null {
//         return VERIFIED_COMPANIES.get(accountName) || null;
//     }
//     //研修用のマテリアルかタイトルなどから確認
//     private isTrainingMaterial(title: string, description: string): boolean {
//         return TRAINING_KEYWORDS.some(keyword => 
//             title.toLowerCase().includes(keyword.toLowerCase()) || 
//             description.toLowerCase().includes(keyword.toLowerCase())
//         );
//     }

//     async scrape(url: string): Promise<Omit<Resource, 'id'>> {
//         const accountName = this.extractAccountName(url);
//         const companyName = this.isVerifiedCompany(accountName);
        
//         if (!companyName) {
//             throw new Error('Not a verified company account');
//         }

//         const browser = await puppeteer.launch({
//             headless: false,
//             args: [
//                 '--no-sandbox',
//                 '--disable-setuid-sandbox',
//                 '--disable-dev-shm-usage',
//                 '--disable-gpu',
//                 '--window-size=1920,1080'
//             ],
//             defaultViewport: {
//                 width: 1920,
//                 height: 1080
//             },
//             timeout: 60000,
//         });

//         try {
//             const page = await browser.newPage();


//             page.on('console', msg => console.log('Browser console:', msg.text()));
        
//         // ネットワークエラーを監視
//         page.on('requestfailed', request => {
//             console.log(`Request failed: ${request.url()}`);
//             console.log(`Error: ${request.failure()?.errorText}`);
//         });

//         console.log('Setting timeouts...');
//         await page.setDefaultNavigationTimeout(60000);
//         await page.setDefaultTimeout(60000);

//         console.log('Navigating to page...');
//         const response = await page.goto(url, {
//             waitUntil: ['networkidle0', 'domcontentloaded'],
//             timeout: 60000
//         });

//         console.log('Response status:', response?.status());
//         console.log('Response headers:', response?.headers());

//         // ページの読み込みを待機
//         await page.waitForSelector('h1', { timeout: 60000 })
//             .catch(e => console.log('Timeout waiting for h1:', e));

//         const content = await page.content();
//         console.log('Page content length:', content.length);

//         const $ = cheerio.load(content);
        
//         // 各要素の取得を試み、結果をログ
//         const title = $('h1').text().trim();
//         console.log('Found title:', title);

//         const description = $('.description').text().trim();
//         console.log('Found description:', description);

//         // スクリーンショットを保存（デバッグ用）
//         await page.screenshot({ 
//             path: './debug-screenshot.png',
//             fullPage: true 
//         });

//             // 既存のResource型に合わせたオブジェクト
//             const resource: Omit<Resource, 'id'> = {
//                 title,
//                 url,
//                 company: companyName,
//                 s
//                 author: $('.author-title').text().trim() || accountName,
//                 description,
//                 category: DEFAULT_CATEGORY,
//                 type: DEFAULT_TYPE,
//                 platform: DEFAULT_PLATFORM,
//                 tags: [
//                     ...new Set([
//                         ...($('.tags').map((_, el) => $(el).text().trim()).get()),
//                         'training'
//                     ])
//                 ],
//                 thumbnail_url: $('.slide-preview img').attr('src') || null, // nullを許容
               
//                 published_at: this.parseDateSafely($('.published-at').text()),
//                 video_url: null,
//                 video_flag: false
//             };

//             return resource;

//         } finally {
//             await browser.close().catch(console.error);
//         }
//     }

//     async saveToDatabase(resource: Omit<Resource, 'id'>): Promise<void> {
//         const { error } = await supabase
//             .from('resources')
//             .insert([resource]);

//         if (error) {
//             throw new Error(`Failed to save to database: ${error.message}`);
//         }
//     }

//     private parseDateSafely(dateStr: string): string {
//         try {
//             const date = new Date(dateStr);
//             if (isNaN(date.getTime())) {
//                 return new Date().toISOString();
//             }
//             return date.toISOString();
//         } catch {
//             return new Date().toISOString();
//         }
//     }
// }



