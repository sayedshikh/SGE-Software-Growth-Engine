# SC136 — Repeatable static site audit

## Automated workflow
The GitHub Actions workflow `.github/workflows/site-audit.yml` runs the repository's static audit on pull requests targeting `main`, pushes to `main` or the portfolio integration branch, and manual dispatch.

## Local run (free)
From the repository root, with Node.js 20 or newer:

```bash
node tools/site-audit.mjs site
```

## Scope
- Static local `href` and `src` target checks
- Local fragment checks
- Title, description and canonical presence
- Sitemap coverage and duplicate URLs
- Orphan candidates (zero inbound HTML links)

## Limitations
The audit is heuristic: it does not execute JavaScript, render pages, verify external links, check accessibility, confirm canonical correctness, or crawl the live deployed website. Orphan candidates can include intentionally standalone or externally linked pages. The audit script's existing logic has not been independently executed in this work batch; the workflow is committed for GitHub-hosted execution, and its actual result must be observed in Actions before claiming a pass.

## Status
SC136 workflow and documentation are proposed/implemented on the draft review branch only. PR #1 remains unmerged; nothing is deployed or published by this batch.
