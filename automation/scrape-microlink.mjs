import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FEED_PATH = path.resolve(__dirname, '../instagram-feed.json');
const OUTPUT_DIR = path.resolve(__dirname, '../public/produtos');

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const rawData = fs.readFileSync(FEED_PATH, 'utf-8');
  let feed = JSON.parse(rawData);
  let updatedCount = 0;

  for (let i = 0; i < feed.length; i++) {
    const post = feed[i];
    const fileName = `${post.id}.jpg`;
    const localPath = path.join(OUTPUT_DIR, fileName);
    const localUrl = `/produtos/${fileName}`;

    if (fs.existsSync(localPath) && post.local_image === localUrl) {
      console.log(`[${i+1}/${feed.length}] Skipping ${post.id}, already downloaded.`);
      continue;
    }

    console.log(`[${i+1}/${feed.length}] Fetching metadata for ${post.id} via Microlink...`);
    try {
      const mlResponse = await fetch(`https://api.microlink.io?url=${post.permalink}`);
      if (!mlResponse.ok) {
        console.warn(`Failed Microlink for ${post.id}: ${mlResponse.status}`);
        await delay(2000);
        continue;
      }
      
      const mlData = await mlResponse.json();
      const imageUrl = mlData.data?.image?.url;
      
      if (!imageUrl) {
        console.warn(`No image URL returned from Microlink for ${post.id}`);
        await delay(2000);
        continue;
      }

      console.log(`Downloading image: ${imageUrl.substring(0, 50)}...`);
      const imgRes = await fetch(imageUrl);
      if (!imgRes.ok) {
        console.warn(`Failed to download image for ${post.id}`);
        await delay(2000);
        continue;
      }

      const buffer = await imgRes.arrayBuffer();
      fs.writeFileSync(localPath, Buffer.from(buffer));
      
      post.local_image = localUrl;
      post.local_image_url = localUrl; // Update both just in case
      updatedCount++;
      
      fs.writeFileSync(FEED_PATH, JSON.stringify(feed, null, 2));
      console.log(`Saved ${fileName}`);
      
    } catch (e) {
      console.error(`Error on ${post.id}:`, e.message);
    }
    
    // Delay to respect rate limits
    await delay(1500);
  }

  console.log(`Done! Downloaded ${updatedCount} new images.`);
}

run();
