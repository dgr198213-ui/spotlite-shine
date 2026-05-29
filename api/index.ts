// @ts-nocheck
import { VercelRequest, VercelResponse } from "@vercel/node";

// @ts-expect-error - This file is generated during the build process
import { handler } from "../dist/server/server.js";

export default async function (req: VercelRequest, res: VercelResponse) {
  try {
    if (handler) {
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
    } else {
      res.status(500).send("Server handler not initialized");
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
