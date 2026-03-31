import fetch from "node-fetch";

export default async function handler(req, res) {
  const uid = req.query.uid; // Browser থেকে ?uid=12345
  if (!uid) return res.status(400).json({ error: "UID required" });

  try {
    const response = await fetch(`https://api.gameskinbo.com/ff-info/get?uid=${uid}`, {
      headers: {
        "x-api-key": process.env.FF_API_KEY // environment variable
      }
    });

    const data = await response.json();
    const name = data?.AccountInfo?.AccountName || "Not found";

    res.status(200).json({ name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
                          }
