# SC133 — Website Analytics & Measurement Plan

## Objective
Measure aggregate traffic and useful visitor actions on the public portfolio website so marketing decisions are informed by actual data. Avoid identity profiling and never claim individual identities from analytics.

## Proposed stack
- Google Search Console: organic search queries, clicks, impressions, CTR, indexed pages and technical search visibility.
- GA4: traffic acquisition, page performance, events, outbound seller clicks, tool usage and visitor journeys, configured with applicable privacy/consent requirements.
- Optional Plausible: privacy-focused aggregate analytics if an additional lightweight dashboard is desired. Avoid deploying redundant trackers without a reason.

## Event taxonomy (GA4 planning)
- portfolio_project_click: project/product profile click, with page/product category labels (avoid personal data).
- seller_outbound_click: outbound click to a verified marketplace, event parameters seller_name and product_slug.
- free_tool_open: tool page visited/opened.
- free_tool_complete: tool completed, only where meaningful and not recording user inputs.
- guide_read_engagement: optional threshold-based engagement, not text/input capture.
- contact_link_click: contact route clicked; do not transmit email contents or form contents.
- github_outbound_click: outbound repository/project link.
- newsletter_signup: only if a real consent-based subscription exists; do not send email addresses to analytics.
- search_used: site search used, with search query only after reviewing privacy implications and ensuring no personal data can be entered; otherwise omit the query.

## Campaign attribution
Use consistent UTM values for campaigns and links:
- utm_source: linkedin, facebook, reddit, newsletter, partner etc.
- utm_medium: social, referral, email, community, affiliate etc.
- utm_campaign: meaningful campaign slug
- utm_content: content variation or post identifier
Never put personal data in UTM parameters.

## Dashboard questions
1. What are total sessions and engaged sessions?
2. Which source/medium/campaign attracts traffic?
3. Which pages and guides get attention?
4. Which product profiles are viewed after problem-solving pages?
5. Which free tools are opened and completed?
6. How often do visitors click verified marketplace links?
7. Which campaign or content path contributes to seller-outbound clicks?
8. What is the trend by country/device, where reporting is available and appropriate?

## Setup prerequisites
- Create/own GA4 property and web data stream.
- Obtain measurement ID.
- Configure privacy, data retention, consent settings and applicable notices before adding tracking code.
- Create/own Search Console property and verify it. GitHub Pages can use HTML-tag verification if supported by the deployed page or DNS verification where domain control is available; choose the method actually available.
- Verify actual implementation and live collection using GA4 DebugView/Realtime and Search Console verification; no data is assumed before these checks.

## Implementation status
Proposal and event taxonomy only. No analytics account, measurement ID, Search Console verification, tracking script, consent mechanism or data collection has been set up in this branch yet.
