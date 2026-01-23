import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl) {
    return res.status(500).json({ error: "BACKEND_URL not defined" });
  }

  const rawPath = req.query.path;

  const pathArray = Array.isArray(rawPath) ? rawPath : rawPath ? [rawPath] : [];

  const url = `${backendUrl}/${pathArray.join("/")}`;

  const response = await fetch(url, {
    method: req.method,
    headers: { "content-type": "application/json" },
    body: req.method === "GET" ? undefined : JSON.stringify(req.body),
  });

  const text = await response.text();
  res.status(response.status).send(text);
}
