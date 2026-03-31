export default async function handler(req, res) {
  const { uid } = req.query;
  const key = 'YOUR_API_KEY_HERE'; // এখানে তোমার API Key বসাও

  if (!uid) {
    return res.status(400).json({ name: 'UID দিন!' });
  }

  const apiUrl = `https://gameskinbo.com/api/ff-check?uid=${uid}&key=${key}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const name = data.name || data.nickname || data.playerName || 'Player Not Found';
    res.status(200).json({ name });

  } catch (err) {
    console.error(err);
    res.status(500).json({ name: 'API Error' });
  }
}
