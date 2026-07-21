import express from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import { createServer as createViteServer } from "vite";
import { testConnection } from "./server/db.js";
import settingsRouter from "./server/routes/settings.js";
import blogRouter from "./server/routes/blog.js";
import portfolioRouter from "./server/routes/portfolio.js";
import servicesRouter from "./server/routes/services.js";
import pricingRouter from "./server/routes/pricing.js";
import authRouter from "./server/routes/auth.js";
import newsletterRouter from "./server/routes/newsletter.js";
import pressReleaseRouter from "./server/routes/press-release.js";
import contactRouter from "./server/routes/contact.js";
import dotenv from "dotenv";

dotenv.config();

// Multer config for image uploads
const uploadDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || "3000");

  // Body parsers
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));

  // Test DB connection on startup
  await testConnection();

  // ─── API Routes ─────────────────────────────────────────────
  app.use("/api/auth", authRouter);
  app.use("/api/settings", settingsRouter);
  app.use("/api/blog", blogRouter);
  app.use("/api/portfolio", portfolioRouter);
  app.use("/api/services", servicesRouter);
  app.use("/api/pricing", pricingRouter);
  app.use("/api/newsletter", newsletterRouter);
  app.use("/api/press-release", pressReleaseRouter);
  app.use("/api/contact", contactRouter);

  // Image upload endpoint
  app.post("/api/upload", upload.single("image"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const url = `/uploads/${req.file.filename}`;
    res.json({ success: true, url });
  });

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });
  // ─────────────────────────────────────────────────────────────

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom", // custom mode agar kita bisa kontrol routing HTML
    });

    // Gunakan Vite middleware (untuk HMR, static assets, dll)
    app.use(vite.middlewares);

    // Route: /admin* → serve cms/index.html melalui Vite transform
    app.get("/admin*", async (req, res) => {
      try {
        const htmlPath = path.join(process.cwd(), "cms", "index.html");
        let html = fs.readFileSync(htmlPath, "utf-8");
        html = await vite.transformIndexHtml(req.originalUrl, html);
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        res.status(500).end((e as Error).message);
      }
    });

    // Route: / dan semua lainnya → serve web/index.html melalui Vite transform
    app.get("*", async (req, res) => {
      try {
        const htmlPath = path.join(process.cwd(), "web", "index.html");
        let html = fs.readFileSync(htmlPath, "utf-8");
        html = await vite.transformIndexHtml(req.originalUrl, html);
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        res.status(500).end((e as Error).message);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));

    // CMS admin route in production
    app.get("/admin*", (_req, res) => {
      res.sendFile(path.join(distPath, "cms", "index.html"));
    });

    // Main website fallback
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "web", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Admin CMS: http://localhost:${PORT}/admin`);
  });
}

startServer();
