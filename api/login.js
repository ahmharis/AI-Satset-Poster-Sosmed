export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Metode tidak diizinkan.' });
  }

  const { email, deviceId } = req.query;
  const GAS_URL = process.env.GOOGLE_APPS_SCRIPT_URL;

  if (!GAS_URL) {
    return res.status(500).json({ success: false, message: 'Sistem Error: Variabel GOOGLE_APPS_SCRIPT_URL belum disetel di Vercel.' });
  }

  try {
    const targetUrl = `${GAS_URL}?action=login&email=${encodeURIComponent(email)}&deviceId=${encodeURIComponent(deviceId)}`;
    const response = await fetch(targetUrl);
    
    if (!response.ok) throw new Error("Google Script menolak permintaan.");
    
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Gagal terhubung ke Database.' });
  }
}
