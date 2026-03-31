export default async function handler(req, res) {
  const { uid } = req.query;
  
  if (!uid) return res.status(400).json({ name: 'UID দিন!' });
  
  try {
    const response = await fetch(`https://free-fire-api-x6wm.onrender.com/freefire/info/${uid}`);
    
    if (response.ok) {
      const data = await response.json();
      return res.json({ name: data.nickname || 'Player Not Found' });
    }
    return res.json({ name: 'Player Not Found' });
  } catch {
    return res.json({ name: 'API Error' });
  }
}
