#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const landingCandidates = [
  path.join(projectRoot, "brilho-artesanal.html"),
  path.join(projectRoot, "legacy", "brilho-artesanal.html")
];
const outputPath = path.join(projectRoot, "instagram-feed.json");
const outputJsPath = path.join(projectRoot, "instagram-feed.js");

const categoryRules = [
  { key: "porta-chaves", terms: ["porta-chaves", "porta chaves", "chaveiro"] },
  { key: "bases", terms: ["bases", "base decorativa"] },
  { key: "decoracao", terms: ["decoracao", "decoração", "difusor", "vaso"] },
  { key: "conjuntos", terms: ["conjuntos", "lembranças", "lembrancas", "kit"] },
  { key: "especiais", terms: ["especiais", "dia da mae", "dia da mãe", "natal"] },
  { key: "momentos", terms: ["momentos", "memoria", "memória", "casamento"] },
  { key: "capas", terms: ["capas", "telemóvel", "telemovel"] }
];

function normalizeText(text) {
  return (text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function classifyCategory(sectionId, sectionTitle, sectionDesc) {
  const text = normalizeText(`${sectionId} ${sectionTitle} ${sectionDesc}`);
  for (const rule of categoryRules) {
    if (rule.terms.some((term) => text.includes(normalizeText(term)))) return rule.key;
  }
  return "outros";
}

function dedupeByPermalink(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (!item.permalink || seen.has(item.permalink)) return false;
    seen.add(item.permalink);
    return true;
  });
}

function postIdFromPermalink(permalink) {
  const match = permalink.match(/instagram\.com\/p\/([^/]+)\//i);
  return match ? match[1] : permalink;
}

function extractSections(html) {
  const sectionRegex = /<section class="cat-section" id="([^"]+)">([\s\S]*?)<\/section>/g;
  const sections = [];
  let match;
  while ((match = sectionRegex.exec(html)) !== null) {
    const sectionId = match[1];
    const content = match[2];
    const titleMatch = content.match(/<h2 class="cat-name">([^<]+)<\/h2>/);
    const descMatch = content.match(/<p class="cat-desc">([^<]+)<\/p>/);
    const links = [...content.matchAll(/data-instgrm-permalink="([^"]+)"/g)].map((m) => m[1]);
    sections.push({
      id: sectionId,
      title: titleMatch ? titleMatch[1].trim() : sectionId,
      desc: descMatch ? descMatch[1].trim() : "",
      permalinks: links
    });
  }
  return sections;
}

async function resolveLandingPath() {
  for (const candidate of landingCandidates) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      // try next
    }
  }
  throw new Error(
    `Landing não encontrada. Procurado: ${landingCandidates.join(", ")}`
  );
}

async function main() {
  const landingPath = await resolveLandingPath();
  const html = await fs.readFile(landingPath, "utf8");
  console.log(`Fonte: ${landingPath}`);
  const sections = extractSections(html);
  const rows = [];

  for (const section of sections) {
    const category = classifyCategory(section.id, section.title, section.desc);
    for (const permalink of section.permalinks) {
      const id = postIdFromPermalink(permalink);
      rows.push({
        id,
        permalink,
        title: `${section.title} · ${id}`,
        caption: section.desc,
        comments: [],
        media_url: "",
        category
      });
    }
  }

  const deduped = dedupeByPermalink(rows);
  await fs.writeFile(outputPath, `${JSON.stringify(deduped, null, 2)}\n`, "utf8");
  await fs.writeFile(
    outputJsPath,
    `window.__IG_FEED__ = ${JSON.stringify(deduped, null, 2)};\n`,
    "utf8"
  );
  console.log(`Built ${deduped.length} unique products into instagram-feed.json`);
}

main().catch((error) => {
  console.error(`Build failed: ${error.message}`);
  process.exit(1);
});
