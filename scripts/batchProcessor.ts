console.log('RUN_IMMEDIATELY:', process.env.RUN_IMMEDIATELY);

import * as dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env');


// 以下、既存のインポートと処理
import { processAndSaveData } from '../app/lib/dataProcessor';
import cron from 'node-cron';


// 以下、既存のコード
// 毎日午前3時に実行
cron.schedule('0 3 * * *', async () => {
  console.log('Starting data processing...');
  try {
    await processAndSaveData();
    console.log('Data processing completed successfully.');
  } catch (error) {
    console.error('Error during data processing:', error);
  }
});

// 即時実行のオプション（開発中やテスト時に便利）
if (process.env.RUN_IMMEDIATELY === 'true') {
  (async () => {
    console.log('Starting immediate data processing...');
    try {
      await processAndSaveData();
      console.log('Immediate data processing completed successfully.');
    } catch (error) {
      console.error('Error during immediate data processing:', error);
    } finally {
      process.exit();
    }
  })();
}