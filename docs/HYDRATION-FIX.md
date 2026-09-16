# Hydration console fix

Lighthouse reported minified React error #418 on the production site. The interactive app reads browser-local progress during its initial client render, while static HTML is generated without browser storage. That can make the first browser render differ from the generated HTML and trigger a hydration mismatch.

The catch-all/core typing routes now render the interactive application through `src/ClientApp.tsx`, a client-only dynamic boundary. Search-facing metadata, structured data, and the server-rendered SEO information section remain in the Next.js route.

This avoids hydrating browser-specific application state against static server output while preserving crawlable supporting content.
