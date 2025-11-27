/* main.js: navigation helpers, live score integration hooks
   IMPORTANT: set API_URL and API_KEY in this file to point to the cricket API provider you choose.
   Example API providers (you can sign up for a key): cricketdata.org, sportmonks.com, api-cricket.com, or RapidAPI providers.
   In this template the fetchLiveScores() function expects JSON with structure:
   { matches: [ {id, teams: 'A vs B', status, score } ] }
   Adapt mapping according to the API you pick.
*/

const API_CONFIG = {
  // Replace these with your chosen provider's base URL and key.
  // Examples found: https://cricketdata.org/ and https://sportmonks.com/
  API_URL: "", // e.g. "https://cricketdata.org/api"
  API_KEY: ""  // your API key
};

async function fetchLiveScores() {
  const output = document.getElementById('live-scores-output');
  if(!output) return;
  output.innerHTML = '<div class="small">Loading live scores...</div>';
  if(!API_CONFIG.API_URL || !API_CONFIG.API_KEY){
    output.innerHTML = '<div class="small">No API configured. Please set API_URL and API_KEY in assets/main.js</div>';
    return;
  }
  try {
    // Example generic endpoint; change to the endpoint your provider uses.
    const url = `${API_CONFIG.API_URL}/matches/live?apikey=${API_CONFIG.API_KEY}`;
    const res = await fetch(url);
    if(!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    // Standardize to an array of match objects
    const matches = data.matches || data.data || [];
    if(matches.length === 0) {
      output.innerHTML = '<div class="small">No live matches right now.</div>';
      return;
    }
    output.innerHTML = '';
    matches.forEach(m => {
      const d = document.createElement('div');
      d.className = 'card match';
      const title = m.teams || m.title || (m.home+' vs '+m.away);
      const status = m.status || m.state || '';
      const score = m.score || m.score_text || m.currentScore || '';
      d.innerHTML = `<div><div style="font-weight:800">${title}</div><div class="small">${status}</div></div><div style="text-align:right"><div class="small">Score</div><div style="font-weight:700">${score}</div></div>`;
      output.appendChild(d);
    });
  } catch (err) {
    output.innerHTML = '<div class="small">Error fetching live scores: '+err.message+'</div>';
    console.error(err);
  }
}

// Simple page-specific init
document.addEventListener('DOMContentLoaded', () => {
  // If a live scores container exists, refresh every 20s
  if(document.getElementById('live-scores-output')) {
    fetchLiveScores();
    setInterval(fetchLiveScores, 20000);
  }
});
