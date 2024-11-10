import { NextResponse } from 'next/server';
import { SpeakerDeckScraper } from '../../lib/scraper';
import { ScrapingError } from '../../types/scrapingError';

export async function POST(request: Request) {
    try {
        const { url } = await request.json(); // 単一のURLのみを受け取る

        console.log('Received request for URL:', url);
        
        if (!url || typeof url !== 'string') {
            return NextResponse.json(
                { error: '有効なURLが必要です' },
                { status: 400 }
            );
        }

        const scraper = new SpeakerDeckScraper();
        const resource = await scraper.scrape(url);
        await scraper.saveToDatabase(resource);
        
        return NextResponse.json({ 
            success: true, 
            resource  // 単一のリソースを返す
        });

    } catch (error) {
        console.error(error);
        
        let scrapingError: ScrapingError;

        if (error.message === 'Not a verified company account') {
            scrapingError = {
                message: '認証済み企業アカウントではありません',
                type: 'UNVERIFIED_COMPANY'
            };
        } else if (error.message === 'Not a training material') {
            scrapingError = {
                message: '研修資料ではないと判断されました',
                type: 'NOT_TRAINING_MATERIAL'
            };
        } else {
            scrapingError = {
                message: 'スクレイピングに失敗しました',
                type: 'SCRAPING_ERROR'
            };
        }

        return NextResponse.json(
            { error: scrapingError },
            { status: 500 }
        );
    }
}