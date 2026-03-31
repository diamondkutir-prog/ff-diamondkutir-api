export default async function handler(req, res) {
  const { uid, key } = req.query;
  
  if (!uid || !key) {
    return res.json({ name: 'UID ও Key দিন!' });
  }
  
  // GamesKinbo BD API (আপনার key বসান)
  const apiUrl = `https://gameskinbo.com/api/ff-check?uid=${uid}&key=${key}`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    // Name extract
    const name = data.name || data.nickname || data.playerName || 'Player Not Found';
    res.json({ name });
    
  } catch {
    res.json({ name: 'API Error' });
  }
}
