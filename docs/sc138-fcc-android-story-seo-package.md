# SC138 — FCC Android debugging story & SEO research package

## Article
- Site page: `site/fcc-android-white-screen-debugging.html`
- Canonical URL: https://sayedshikh.github.io/SGE-Software-Growth-Engine/fcc-android-white-screen-debugging.html
- Primary keyword: Capacitor Android white screen
- Search intent: troubleshooting / developer problem solving
- Title: Debugging a Capacitor Android White Screen: Following the Evidence
- Meta description: A documented Freelance Command Center Android debugging sequence: blank WebView screen, relative asset paths, startup diagnostics and MobileDB integration—based on repository commits.

## Keyword cluster (provisional, volume not yet validated)
Primary:
- Capacitor Android white screen
Secondary:
- Android WebView blank screen
- Capacitor Android debugging
- Vite relative asset paths
- Android WebView assets not loading
- Capacitor startup error diagnostics
- Capacitor SQLite initialization (cross-link to separate episode, not conflated)
- Android hybrid app login redirect
Questions:
- How do I debug a Capacitor Android white screen?
- Why aren't assets loading in Android WebView?
- What layers should I inspect when a hybrid app starts blank?
- How do I distinguish WebView, JS, plugin and navigation failures?

## Evidence
Git commit search in repository `sayedshikh/freelance-command-center` returned this chronology (commit dates are historical):
- 2026-10-07 22:11 UTC: Fix HTML structure for Android WebView
- 2026-10-07 22:36 UTC: Fix relative asset paths for Capacitor
- 2026-10-07 22:47 UTC: Add Android white screen startup test
- 2026-10-07 23:04 UTC: Add visible Android JavaScript error diagnostics
- 2026-10-07 23:18 UTC: Test Android without early MobileDB module
- 2026-10-07 23:34 UTC: Test direct application boot
- 2026-10-08 00:20 UTC: Fix missing app container
- 2026-10-08 00:35 UTC: Load MobileDB in Android workspace
- 2026-10-08 01:11 UTC: Fix Android MobileDB module startup
- 2026-10-08 00:54 UTC: Fix Android projects query (listed by search; ordering must be reconciled by full commit timestamps before definitive chronology)
- 2026-10-08 08:38 UTC: Fix Android login flow and module handlers
- 2026-10-08 08:55 UTC: Fix Android login redirect loop
- 2026-10-08 09:28 UTC: Fix Android single-page login flow
- 2026-10-08 12:12 UTC: Fix Android SQLite connection reuse
- 2026-10-08 13:28 UTC: Fix Android SQLite open state
- 2026-10-08 13:43 UTC: Fix Android SQLite reconnect handling
- 2026-10-08 14:16 UTC: Fix Android SQLite reconnect without closing

These titles support the existence of targeted changes but not their exact causal relationships, outcomes or completeness. Before splitting them into episode posts, inspect commit patches and test records.

## Publication and link strategy
- Publish the article on the portfolio site first; then a LinkedIn post links to it.
- Cross-link the article to the FCC profile and related SQLite story.
- Use a screenshot/diagram showing diagnostic layers only if safely captured and source-supported. Avoid screenshots with credentials, private paths, identifiers or customer data.
- LinkedIn post: shorter narrative, article link, no keyword stuffing.
- Use descriptive anchor text rather than repetitive exact-match links.

## SEO measurement plan
1. Once site is deployed and verified, add/verify property in Google Search Console.
2. Submit sitemap and inspect URL indexing; don't claim indexing until observed.
3. Review query impressions/clicks/CTR and landing pages after sufficient data accumulates.
4. Expand cluster only where search queries and reader questions justify it.
5. Keep a baseline log; distinguish organic search from social/referral traffic.

## Search architecture rules
- One article should solve one primary problem / intent.
- Use natural, readable keywords, not keyword stuffing.
- Avoid competing pages with identical search intent; link related episodes.
- Canonical, sitemap and indexability should be checked by the automated audit and manually before deployment.
- Article schema is a proposal for a later pass; validate the exact JSON-LD and content before adding.
- No analytics or tracking is active until configured and consent/privacy requirements reviewed.
