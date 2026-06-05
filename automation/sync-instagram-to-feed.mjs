#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.resolve(__dirname, "../instagram-feed.json");
const outputJsPath = path.resolve(__dirname, "../instagram-feed.js");

const GRAPH_BASE = "https://graph.facebook.com/v20.0";
const REQUIRED_ENV = ["IG_USER_ID", "IG_ACCESS_TOKEN"];

const categoryRules = [
  { key: "porta-chaves", terms: ["#portachaves", "porta chaves", "porta-chaves", "chaveiro"] },
  { key: "bases", terms: ["#base", "#bases", "base decorativa"] },
  { key: "decoracao", terms: ["#decoracao", "decoração", "difusor", "vaso"] },
  { key: "conjuntos", terms: ["#conjunto", "#lembranca", "lembrança", "kit"] },
  { key: "especiais", terms: ["dia da mae", "dia da mãe", "natal", "valentine", "presente"] },
  { key: "momentos", terms: ["memoria", "memória", "casamento", "batizado", "recordação"] }
];

function assertEnv() {
  const missing = REQUIRED_ENV.filter((name) => !process.env[name]);
  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(", ")}`);
  }
}

function buildUrl(base, params) {
  const url = new URL(base);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") {
      url.searchParams.set(k, String(v));
    }
  });
  return url.toString();
}

async function graphFetch(endpoint, params = {}) {
  const token = process.env.IG_ACCESS_TOKEN;
  const url = buildUrl(`${GRAPH_BASE}${endpoint}`, {
    ...params,
    access_token: token
  });

  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok || data.error) {
    const message = data?.error?.message || `Graph API error (${response.status})`;
    throw new Error(message);
  }
  return data;
}

function categorizePost(post) {
  const text = `${post.title || ""} ${post.caption || ""}`.toLowerCase();
  for (const rule of categoryRules) {
    if (rule.terms.some((term) => text.includes(term.toLowerCase()))) return rule.key;
  }
  return "outros";
}

function toTitle(caption, fallback = "Produto Instagram") {
  if (!caption) return fallback;
  const clean = caption.replace(/\s+/g, " ").trim();
  return clean.length > 64 ? `${clean.slice(0, 61)}...` : clean;
}

function dedupeByIdentity(posts) {
  const seen = new Set();
  return posts.filter((post) => {
    const key = post.id || post.permalink;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function fetchLatestComment(mediaId) {
  try {
    const data = await graphFetch(`/${mediaId}/comments`, {
      fields: "text,username,timestamp",
      limit: 1
    });
    if (!Array.isArray(data.data) || data.data.length === 0) return [];
    const comment = data.data[0];
    return [comment.text].filter(Boolean);
  } catch {
    // Comments can fail due to permissions. Keep sync resilient.
    return [];
  }
}

const DELAY_BETWEEN_PAGES_MS = 500;
const DELAY_BETWEEN_COMMENTS_MS = 200;
const MEDIA_FIELDS = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch ALL media from the Instagram Graph API using cursor-based pagination.
 * The API returns a `paging.next` URL when more results exist.
 * We follow that cursor until there are no more pages.
 */
async function fetchAllMedia(igUserId) {
  const allMedia = [];
  let page = 1;

  // First request — use our helper to build the URL
  let response = await graphFetch(`/${igUserId}/media`, {
    fields: MEDIA_FIELDS,
    limit: 100
  });

  const firstBatch = Array.isArray(response.data) ? response.data : [];
  allMedia.push(...firstBatch);
  console.log(`  Page ${page}: ${firstBatch.length} posts`);

  // Follow paging cursors until exhausted
  while (response.paging?.next) {
    page++;
    await sleep(DELAY_BETWEEN_PAGES_MS);

    const nextUrl = response.paging.next;
    const nextResponse = await fetch(nextUrl);
    response = await nextResponse.json();

    if (!nextResponse.ok || response.error) {
      const message = response?.error?.message || `Graph API paging error (${nextResponse.status})`;
      console.warn(`  Warning on page ${page}: ${message} — stopping pagination.`);
      break;
    }

    const batch = Array.isArray(response.data) ? response.data : [];
    allMedia.push(...batch);
    console.log(`  Page ${page}: ${batch.length} posts`);

    // Safety: stop if an empty page is returned (shouldn't happen with cursor, but be safe)
    if (batch.length === 0) break;
  }

  console.log(`  Total pages fetched: ${page}`);
  return allMedia;
}

async function main() {
  assertEnv();

  const igUserId = process.env.IG_USER_ID;

  console.log(`Fetching ALL posts for user ${igUserId}...`);
  const rawMedia = await fetchAllMedia(igUserId);
  console.log(`Fetched ${rawMedia.length} total posts from Instagram.`);

  const normalized = [];

  for (let i = 0; i < rawMedia.length; i++) {
    const media = rawMedia[i];
    if (i > 0 && i % 10 === 0) {
      // Small delay every 10 comment fetches to respect rate limits
      await sleep(DELAY_BETWEEN_COMMENTS_MS);
    }
    const comments = await fetchLatestComment(media.id);
    const mediaUrl = media.media_url || media.thumbnail_url || "";
    
    // Download image locally to prevent 403 CDN expirations
    let localImagePath = "";
    if (mediaUrl) {
      try {
        const imageRes = await fetch(mediaUrl);
        if (imageRes.ok) {
          const buffer = await imageRes.arrayBuffer();
          // use post ID as filename to avoid duplicates
          const filename = `${media.id}.jpg`;
          const filepath = path.join(__dirname, "../public/instagram", filename);
          await fs.writeFile(filepath, Buffer.from(buffer));
          localImagePath = `/instagram/${filename}`;
          console.log(`    Saved image ${filename}`);
        }
      } catch (err) {
        console.warn(`    Failed to download image for ${media.id}: ${err.message}`);
      }
    }

    const base = {
      id: media.id,
      permalink: media.permalink,
      title: toTitle(media.caption),
      caption: media.caption || "",
      comments,
      media_url: mediaUrl,
      local_image_url: localImagePath,
      timestamp: media.timestamp || null
    };
    normalized.push({
      ...base,
      category: categorizePost(base)
    });
  }

  const deduped = dedupeByIdentity(normalized);

  // Write both .json (for fetch) and .js (for file:// fallback)
  const jsonContent = JSON.stringify(deduped, null, 2);
  await fs.writeFile(outputPath, `${jsonContent}\n`, "utf8");
  await fs.writeFile(outputJsPath, `window.__IG_FEED__ = ${jsonContent};\n`, "utf8");

  console.log(`\nSynced ${deduped.length} unique Instagram posts`);
  console.log(`  → ${outputPath}`);
  console.log(`  → ${outputJsPath}`);
  console.log(`  (${rawMedia.length} total fetched → ${deduped.length} after dedup)`);
}

main().catch((error) => {
  console.error(`Sync failed: ${error.message}`);
  process.exitCode = 1;
});
