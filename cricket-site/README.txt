README - Cricket Pulse (packaged)
------------------------------

What's included:
- index.html, news.html, matches.html, features.html, about.html
- assets/styles.css  (theme)
- assets/main.js    (live-score hooks; set API_URL and API_KEY)
- README.txt

Live scores / API integration:
- This template does NOT include a hard-coded API key.
- Recommended API providers (examples; sign up to get keys):
  * CricketData / CricAPI (https://cricketdata.org/)  -- free signup & docs.
  * SportMonks (https://sportmonks.com/) -- paid, trial available.
  * API-Cricket (https://api-cricket.com/) -- paid, trial available.
  * RapidAPI marketplace providers (search "cricket live score" on https://rapidapi.com)

How to configure:
1) In assets/main.js set API_CONFIG.API_URL to your provider's base URL, and API_CONFIG.API_KEY to your key.
   Example (CricketData hypothetical):
     API_URL: "https://cricketdata.org/api"
     API_KEY: "YOUR_KEY"

2) Different providers return different JSON shapes. Edit the mapping in fetchLiveScores() in assets/main.js
   to match the keys your provider returns (the code currently tries common field names).

CORS note:
- Some providers may block client-side browser requests (CORS). If you get CORS errors, either:
  a) use a small server-side proxy that adds the API key server-side, or
  b) choose a provider that supports CORS / client-side access, or
  c) deploy a serverless function (Netlify/AWS/GCP) that proxies requests.

Animations & extras:
- The site includes basic visual style. Add animations by editing styles.css or adding small JS animations.
- The match filter is client-side and uses the same live endpoint.

If you'd like, I can:
- wire up a small Node/Express proxy (server.js) you can run locally to avoid CORS and securely store your API key,
- or adapt the client code to a specific provider (I can patch the mapping for CricketData.org or SportMonks if you tell me which one),
- or produce a ZIP that includes a simple Node proxy and instructions.

