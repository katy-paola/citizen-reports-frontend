import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const backendUrl = process.env.VITE_API_URL as string;

  const targetUrl = backendUrl + req.url!.replace(/^\/api/, "");

  const headers = new Headers();

  for (const [key, value] of Object.entries(req.headers)) {
    if (typeof value === "string") {
      headers.set(key, value);
    }
  }

  const response = await fetch(targetUrl, {
    method: req.method,
    headers,
    body:
      req.method !== "GET" && req.method !== "HEAD"
        ? JSON.stringify(req.body)
        : undefined,
  });

  const body = await response.text();

  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  res.status(response.status).send(body);
}
