export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Only GET allowed' });
  }
  
  const { uid } = req.query;
  
  if (!uid) {
    return res.status(400).json({ error: 'UID দিন' });
  }
  
  try {
    const response = await fetch(`https://free-fire-api-x6wm.onrender.com/freefire/info/${uid}`);
    
    if (response.ok) {
      const data = await response.json();
      const name = data.nickname || 'Player Not Found';
      
      return res.status(200).json({ 
        name: name,
        uid: uid 
      });
    } else {
      return res.status(404).json({ name: 'Player Not Found' });
    }
  } catch (error) {
    return res.status(500).json({ name: 'API Error' });
  }
      }
