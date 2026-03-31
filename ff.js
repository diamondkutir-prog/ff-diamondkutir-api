export default async function handler(req, res) {
  const { uid } = req.query;
  
  if (!uid) return res.json({ name: 'UID দিন!' });
  
  // BD Region এর জন্য best APIs (2026 updated)
  const apis = [
    // 1. Public FreeFireInfo API (key: astute_ff)
    `https://www.public.freefireinfo.site/api/info/bd/${uid}?key=astute_ff`,
    
    // 2. Multiple region fallback
    `https://www.public.freefireinfo.site/api/info/sg/${uid}?key=astute_ff`,
    
    // 3. Alternative working API
    `https://free-fire-api-x6wm.onrender.com/freefire/info/${uid}`,
    
    // 4. FF Community API (BD region)
    `https://developers.freefirecommunity.com/api/v1/info?region=bd&uid=${uid}`
  ];
  
  for (const apiUrl of apis) {
    try {
      const response = await fetch(apiUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      
      if (response.ok) {
        const data = await response.json();
        
        // Different API response formats handle করি
        if (data.nickname) return res.json({ name: data.nickname });
        if (data.name) return res.json({ name: data.name });
        if (data.Nickname) return res.json({ name: data.Nickname });
        if (data.data?.nickname) return res.json({ name: data.data.nickname });
      }
    } catch {}
  }
  
  res.json({ name: 'Player Not Found' });
    }
