'use strict';

/**
 * One-time enrichment pass: pulls each legacy project's REAL content
 * straight from its existing live page — the rendered <p class="cs-desc">
 * body copy (untruncated, unlike the meta tags) and the "Project Data"
 * meta rows (Client / Location / Sector / Total Built-up Area / Start
 * Date / Completion / Structural Type / Stories / Status).
 *
 * The source pages mark rows with data-placeholder="true" when the value
 * is a generic filler/guess rather than confirmed data (e.g. Client "—",
 * or "Reinforced concrete frame" used as a default guess) — those rows
 * are skipped so nothing fabricated leaks into the new site.
 *
 * Safe to re-run: always re-derives from the live legacy pages, so it's
 * the source of truth for legacy project content (edit the legacy .html
 * files, not projects.json, if this data needs correcting).
 *
 * Usage: node build/enrich-legacy-content.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE_ROOT = path.join(ROOT, '..');
const DATA_PATH = path.join(ROOT, 'data', 'projects.json');

function decodeEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "’")
    .replace(/&quot;/g, '"')
    .replace(/&middot;/g, '·')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function extractTag(html, className, tag = '[a-z0-9]+') {
  const re = new RegExp(`<${tag}[^>]*class="[^"]*\\b${className}\\b[^"]*"[^>]*>([\\s\\S]*?)<\\/${tag.replace(/\[.*/, '\\w+')}>`, 'i');
  const m = html.match(re);
  return m ? decodeEntities(m[1].replace(/<[^>]+>/g, '').trim()) : null;
}

function extractMetaRows(html) {
  const rows = {};
  const rowRe = /<div class="cs-meta-row"(\s+data-placeholder="true")?>\s*<span class="cs-meta-label">([\s\S]*?)<\/span>\s*<span class="cs-meta-value">([\s\S]*?)<\/span>/g;
  let m;
  while ((m = rowRe.exec(html))) {
    const isPlaceholder = !!m[1];
    const label = decodeEntities(m[2].trim());
    const value = decodeEntities(m[3].trim());
    // Some rows aren't flagged data-placeholder="true" but still contain an
    // unfilled em-dash blank inside otherwise-templated text (e.g. "G + — floors")
    // — treat any "—" in the value as an unconfirmed field and skip it too.
    if (!isPlaceholder && value && !value.includes('—')) {
      rows[label] = value;
    }
  }
  return rows;
}

function main() {
  const db = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  let enriched = 0;
  const missing = [];
  const placeholderNote = [];

  db.projects.forEach((project) => {
    if (!project.legacySlug) return;

    const pagePath = path.join(SITE_ROOT, project.legacySlug + '.html');
    if (!fs.existsSync(pagePath)) {
      missing.push(project.slug);
      return;
    }

    const html = fs.readFileSync(pagePath, 'utf8');
    const desc = extractTag(html, 'cs-desc', 'p');
    const rows = extractMetaRows(html);

    if (!desc) {
      missing.push(project.slug);
      return;
    }

    project.description = [desc];
    project.summary = desc.split(/(?<=[.!?])\s+/)[0];

    // Clear fields this script owns before re-deriving, so a value that
    // was real on a previous run but is filtered out this run (e.g. found
    // to contain an unfilled "—" blank) doesn't linger stale in the JSON.
    delete project.client;
    delete project.builtUpArea;
    delete project.status;
    delete project.year;
    delete project.startDate;
    delete project.configuration;

    if (rows['Client']) project.client = rows['Client'];
    if (rows['Location']) project.location = rows['Location'];
    if (rows['Total Built-up Area']) project.builtUpArea = rows['Total Built-up Area'];
    if (rows['Status']) project.status = rows['Status'];
    if (rows['Completion']) project.year = rows['Completion'];
    if (rows['Start Date']) project.startDate = rows['Start Date'];
    if (rows['Stories']) project.configuration = rows['Stories'];

    const keptFields = Object.keys(rows).length;
    if (keptFields < 3) placeholderNote.push(`${project.slug} (only ${keptFields} confirmed field(s))`);

    enriched++;
  });

  fs.writeFileSync(DATA_PATH, JSON.stringify(db, null, 2) + '\n', 'utf8');
  console.log(`Enriched ${enriched} legacy project(s) from their existing pages' real body copy + confirmed Project Data fields.`);
  if (missing.length) console.log(`Could not find description for: ${missing.join(', ')}`);
  if (placeholderNote.length) console.log(`Sparse confirmed data (mostly placeholders on the source page): ${placeholderNote.join('; ')}`);
}

main();
