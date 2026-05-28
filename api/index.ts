import { VercelRequest, VercelResponse } from "@vercel/node";

// Import the server handler from the built dist
let serverHandler: any;

async function getServerHandler() {
  if (!serverHandler) {
    try {
      const mod = await import("../dist/server/index.js");
      serverHandler = mod.default;
    } catch (error) {
      console.error("Failed to load server handler:", error);
      throw error;
    }
  }
  return serverHandler;
}

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const handler = await getServerHandler();

    // Create a proper Request object for the handler
    const url = new URL(req.url || "/", `http://${req.headers.host}`);
    const request = new Request(url, {
      method: req.method,
      headers: new Headers(req.headers as Record<string, string>),
      body: req.method !== "GET" && req.method !== "HEAD" ? JSON.stringify(req.body) : undefined,
    });

    // Call the server handler
    const response = await handler.fetch(request, {}, {});

    // Set response headers
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // Set status code
    res.status(response.status);

    // Send the response body
    const body = await response.text();
    res.send(body);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
