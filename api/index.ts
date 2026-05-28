import { VercelRequest, VercelResponse } from "@vercel/node";

let serverHandler:
  | { fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response }
  | undefined;

async function getServerHandler() {
  if (!serverHandler) {
    try {
      const mod = await import("../dist/server/index.js");
      serverHandler = mod.default || mod;
    } catch (error) {
      console.error("Failed to load server handler:", error);
      throw error;
    }
  }
  return serverHandler;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const handler = await getServerHandler();
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
    const url = new URL(req.url || "/", `${protocol}://${host}`);

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value) {
        headers.set(key, Array.isArray(value) ? value.join(", ") : value);
      }
    }

    const request = new Request(url, {
      method: req.method,
      headers,
      body:
        req.method !== "GET" && req.method !== "HEAD" && req.body
          ? typeof req.body === "string"
            ? req.body
            : JSON.stringify(req.body)
          : undefined,
    });

    const response = await handler.fetch(request, {}, {});

    response.headers.forEach((value, key) => {
      if (!["transfer-encoding", "connection", "keep-alive"].includes(key.toLowerCase())) {
        res.setHeader(key, value);
      }
    });

    res.status(response.status);

    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const json = await response.json();
      res.json(json);
    } else {
      const body = await response.text();
      res.send(body);
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
