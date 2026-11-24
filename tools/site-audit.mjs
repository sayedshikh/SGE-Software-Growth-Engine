#!/usr/bin/env node
/**
 * Static audit for the SGE GitHub Pages site.
 * Usage: node tools/site-audit.mjs [site-directory]
 * Audits local href/src targets, title/description/canonical presence,
 * sitemap URL uniqueness and sitemap-vs-HTML coverage.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || 'site');
const baseUrl = 'https://sayedshikh.github.io/SGE-Software-Growth-Engine/';
const files = fs.readdirSync(root, {recursive:true}).map(x=>String(x)).filter(x=>x.endsWith('.html'));
const allFiles = new Set(fs.readdirSync(root,{recursive:true}).map(x=>String(x).replaceAll('\\\\','/')));
const issues = [];
const htmlNames = new Set(files.map(x=>x.replaceAll('\\\\','/')));
const getAttr = (html, re) => [...html.matchAll(re)].map(m=>m[1]);
for (const file of files) {
  const text = fs.readFileSync(path.join(root,file),'utf8');
  const refs = [...text.matchAll(/(?:href|src)\\s*=\\s*["']([^"']+)["']/gi)].map(m=>m[1]);
  for (const ref of refs) {
    if (/^(https?:|mailto:|tel:|javascript:|data:|#)/i.test(ref)) continue;
    const clean = decodeURIComponent(ref.split('#')[0].split('?')[0]);
    if (!clean) continue;
    const target = path.normalize(path.join(path.dirname(file),clean)).replaceAll('\\\\','/');
    if (!allFiles.has(target) && !allFiles.has(clean.replace(/^\\//,''))) issues.push({file,ref,target});
  }
  if (!/<title[^>]*>\\s*[^<]+\\s*<\\/title>/i.test(text)) issues.push({file,type:'missing-title'});
  if (!/<meta[^>]*name=["']description["'][^>]*content=["'][^"']+["']/i.test(text)) issues.push({file,type:'missing-meta-description'});
  if (!/<link[^>]*rel=["']canonical["'][^>]*href=/i.test(text)) issues.push({file,type:'missing-canonical'});
}
const sitemapPath = path.join(root,'sitemap.xml');
let sitemapUrls = [];
if (fs.existsSync(sitemapPath)) {
  sitemapUrls = [...fs.readFileSync(sitemapPath,'utf8').matchAll(/<loc>\\s*(.*?)\\s*<\\/loc>/g)].map(m=>m[1].trim());
  const dup = sitemapUrls.filter((u,i)=>sitemapUrls.indexOf(u)!==i);
  if (dup.length) issues.push({type:'duplicate-sitemap-urls',urls:[...new Set(dup)]});
  const entries = sitemapUrls.map(u=>u.replace(baseUrl,''));
  for (const f of files.map(x=>x.replaceAll('\\\\','/'))) if (!entries.includes(f)) issues.push({type:'html-not-in-sitemap',file:f});
  for (const e of entries) if (e.endsWith('.html')&&!htmlNames.has(e)) issues.push({type:'sitemap-target-not-found',entry:e});
} else issues.push({type:'missing-sitemap'});
console.log(JSON.stringify({root,htmlCount:files.length,sitemapCount:sitemapUrls.length,issueCount:issues.length,issues},null,2));
process.exitCode=issues.length?1:0;
