#!/usr/bin/env node
/**
 * SGE static site audit: links, fragments, metadata, sitemap and orphan pages.
 * Run from repository root: node tools/site-audit.mjs [site-directory]
 */
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(process.argv[2]||'site');
const baseUrl='https://sayedshikh.github.io/SGE-Software-Growth-Engine/';
const files=fs.readdirSync(root,{recursive:true}).map(String).filter(x=>x.endsWith('.html'));
const all=fs.readdirSync(root,{recursive:true}).map(x=>String(x).replaceAll('\\','/'));
const fileSet=new Set(all),htmlSet=new Set(files.map(x=>x.replaceAll('\\','/')));
const issues=[],graph=new Map();
const decode=s=>{try{return decodeURIComponent(s)}catch{return s}};
for(const file of files){
 const html=fs.readFileSync(path.join(root,file),'utf8');
 const refs=[...html.matchAll(/(?:href|src)\\s*=\\s*["']([^"']+)["']/gi)].map(m=>m[1]);
 graph.set(file,new Set());
 for(const ref of refs){
  if(/^(https?:|mailto:|tel:|javascript:|data:)/i.test(ref))continue;
  if(ref.startsWith('#')){const frag=decode(ref.slice(1));const ids=new Set([...html.matchAll(/\\b(?:id|name)=["']([^"']+)["']/gi)].map(m=>m[1]));if(frag&&!ids.has(frag))issues.push({type:'missing-fragment',file,ref});continue;}
  const [rawPath,rawFrag]=ref.split('#'),clean=decode(rawPath.split('?')[0]);
  if(!clean)continue;
  let target=clean.startsWith('/')?clean.replace(/^\\//,''):path.normalize(path.join(path.dirname(file),clean));
  target=target.replaceAll('\\','/');if(target.endsWith('/'))target+='index.html';
  if(!fileSet.has(target)&&!htmlSet.has(target)){issues.push({type:'missing-local-target',file,ref,target});continue;}
  if(target.endsWith('.html'))graph.get(file).add(target);
  if(rawFrag&&target.endsWith('.html')){const frag=decode(rawFrag),targetHtml=fs.readFileSync(path.join(root,target),'utf8'),ids=new Set([...targetHtml.matchAll(/\\b(?:id|name)=["']([^"']+)["']/gi)].map(m=>m[1]));if(!ids.has(frag))issues.push({type:'missing-fragment',file,ref,target,fragment:frag});}
 }
 if(!/<title[^>]*>\\s*[^<]+\\s*<\\/title>/i.test(html))issues.push({type:'missing-title',file});
 if(!/<meta[^>]*name=["']description["'][^>]*content=["'][^"']+["']/i.test(html))issues.push({type:'missing-meta-description',file});
 if(!/<link[^>]*rel=["']canonical["'][^>]*href=/i.test(html))issues.push({type:'missing-canonical',file});
}
const inbound=new Map([...htmlSet].map(f=>[f,0]));for(const links of graph.values())for(const t of links)if(inbound.has(t))inbound.set(t,inbound.get(t)+1);
const orphanCandidates=[...inbound].filter(([f,n])=>n===0&&f!=='index.html').map(([f])=>f);
const sitemapPath=path.join(root,'sitemap.xml');let urls=[];
if(fs.existsSync(sitemapPath)){urls=[...fs.readFileSync(sitemapPath,'utf8').matchAll(/<loc>\\s*(.*?)\\s*<\\/loc>/g)].map(m=>m[1].trim());const dup=urls.filter((u,i)=>urls.indexOf(u)!==i);if(dup.length)issues.push({type:'duplicate-sitemap-urls',urls:[...new Set(dup)]});const entries=urls.map(u=>u.replace(baseUrl,''));for(const f of files.map(x=>x.replaceAll('\\','/')))if(!entries.includes(f))issues.push({type:'html-not-in-sitemap',file:f});for(const e of entries)if(e.endsWith('.html')&&!htmlSet.has(e))issues.push({type:'sitemap-target-not-found',entry:e});}else issues.push({type:'missing-sitemap'});
console.log(JSON.stringify({htmlCount:files.length,sitemapCount:urls.length,internalPageEdges:[...graph.values()].reduce((n,s)=>n+s.size,0),orphanCandidates,issueCount:issues.length,issues},null,2));
process.exitCode=issues.some(i=>!['missing-title','missing-meta-description','missing-canonical'].includes(i.type))?1:0;
