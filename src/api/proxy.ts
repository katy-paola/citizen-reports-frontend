import type { VercelRequest, VercelResponse } from "@vercel/node";

const API_URL = process.env.API_URL!;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const path = req.url?.replace(/^\/api/, "") ?? "";

  const targetUrl = `${API_URL}${path}`;

  const response = await fetch(targetUrl, {
    method: req.method,
    headers: {
      "content-type": req.headers["content-type"] ?? "application/json",
      cookie: req.headers.cookie ?? "",
    },
    body:
      req.method !== "GET" && req.method !== "HEAD"
        ? JSON.stringify(req.body)
        : undefined,
  });

  const text = await response.text();

  const setCookie = response.headers.get("set-cookie");
  if (setCookie) {
    res.setHeader("set-cookie", setCookie);
  }

  res.status(response.status).send(text);
}
