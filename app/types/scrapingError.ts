export type ScrapingError = {
    message: string;
    type: 'INVALID_URL' | 'UNVERIFIED_COMPANY' | 'NOT_TRAINING_MATERIAL' | 'SCRAPING_ERROR';
};