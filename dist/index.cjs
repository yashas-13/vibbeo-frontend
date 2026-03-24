"use strict";
const express = require("express");
const path = require("path");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(cors());

app.use("/client", createProxyMiddleware({
  target: "https://vibbeo-backend.onrender.com",
  changeOrigin: true,
  onProxyReq: (proxyReq) => {
    proxyReq.setHeader("key", "5TIvw5cpc0");
  }
}));

app.use("/admin", createProxyMiddleware({
  target: "https://vibbeo-backend.onrender.com",
  changeOrigin: true,
  onProxyReq: (proxyReq) => {
    proxyReq.setHeader("key", "5TIvw5cpc0");
  }
}));

app.use(express.static(path.join(__dirname, "public")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("Vibbeo frontend serving on port " + PORT);
});
