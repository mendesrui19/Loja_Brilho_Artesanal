#!/usr/bin/env node

/**
 * Re-download all product images from Instagram in full resolution (1080x1080)
 * using the public /media/?size=l endpoint. No API token needed.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FEED_PATH = path.resolve(__dirname, "../instagram-feed.json");
const IMAGES_DIR = path.resolve(__dirname, "../public/produtos");
const DELAY_MS = 1500; // Be polite to Instagram

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function extractShortcode(permalink) {
  // permalink format: https://www.instagram.com/p/SHORTCODE/
  const match = permalink.match(/\/p\/([^/]+)/);
  return match ? match[1] : null;
}

async function main() {
  // Read existing feed
  const feedRaw = await fs.readFile(FEED_PATH, "utf8");
  const feed = JSON.parse(feedRaw);

  console.log(`Found ${feed.length} posts in instagram-feed.json`);
  console.log(`Saving images to: ${IMAGES_DIR}\n`);

  // Ensure output directory exists
  await fs.mkdir(IMAGES_DIR, { recursive: true });

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < feed.length; i++) {
    const post = feed[i];
    const shortcode = extractShortcode(post.permalink);
    
    if (!shortcode) {
      console.warn(`  [${i + 1}/${feed.length}] No shortcode for ${post.id} — skipping`);
      skipped++;
      continue;
    }

    const filename = `${post.id}.jpg`;
    const filepath = path.join(IMAGES_DIR, filename);

    // Check current file size — skip if already full-res (>100KB)
    try {
      const stat = await fs.stat(filepath);
      if (stat.size > 100000) {
        console.log(`  [${i + 1}/${feed.length}] ${filename} already full-res (${(stat.size / 1024).toFixed(0)}KB) — skipping`);
        skipped++;
        continue;
      }
    } catch {
      // File doesn't exist, download it
    }

    const url = `https://www.instagram.com/p/${shortcode}/media/?size=l`;

    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        redirect: "follow",
      });

      if (!res.ok) {
        console.warn(`  [${i + 1}/${feed.length}] HTTP ${res.status} for ${shortcode} — skipping`);
        failed++;
        continue;
      }

      const buffer = await res.arrayBuffer();
      await fs.writeFile(filepath, Buffer.from(buffer));

      const sizeKB = (buffer.byteLength / 1024).toFixed(0);
      console.log(`  [${i + 1}/${feed.length}] ✓ ${filename} (${sizeKB}KB)`);
      downloaded++;
    } catch (err) {
      console.warn(`  [${i + 1}/${feed.length}] ✗ Failed ${shortcode}: ${err.message}`);
      failed++;
    }

    // Delay between requests
    if (i < feed.length - 1) {
      await sleep(DELAY_MS);
    }
  }

  // Update feed JSON to point to /produtos/ paths
  let updated = 0;
  for (const post of feed) {
    const filename = `${post.id}.jpg`;
    const expectedPath = `/produtos/${filename}`;
    if (post.local_image_url !== expectedPath || post.local_image !== expectedPath) {
      post.local_image_url = expectedPath;
      post.local_image = expectedPath;
      updated++;
    }
  }

  if (updated > 0) {
    await fs.writeFile(FEED_PATH, JSON.stringify(feed, null, 2) + "\n", "utf8");
    console.log(`\nUpdated ${updated} paths in instagram-feed.json`);
  }

  console.log(`\n✅ Done!`);
  console.log(`   Downloaded: ${downloaded}`);
  console.log(`   Skipped:    ${skipped}`);
  console.log(`   Failed:     ${failed}`);
}

main().catch((err) => {
  console.error(`Script failed: ${err.message}`);
  process.exitCode = 1;
});
