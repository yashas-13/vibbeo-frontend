const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api", async (req, res) => {
  try {
    const targetPath = req.originalUrl.replace(/^\/api/, "");
    const targetUrl = "https://vibbeo-backend.onrender.com" + targetPath;
    const headers = { "key": "5TIvw5cpc0" };
    if (req.headers["content-type"]) headers["Content-Type"] = req.headers["content-type"];
    if (req.headers["authorization"]) headers["Authorization"] = req.headers["authorization"];
    const fetchOptions = { method: req.method, headers };
    if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method) && req.body && Object.keys(req.body).length > 0) {
      fetchOptions.body = JSON.stringify(req.body);
      if (!headers["Content-Type"]) headers["Content-Type"] = "application/json";
    }
    const response = await fetch(targetUrl, fetchOptions);
    const data = await response.text();
    res.status(response.status);
    const ct = response.headers.get("content-type");
    if (ct) res.setHeader("Content-Type", ct);
    res.send(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy request failed" });
  }
});

app.use(express.static(path.join(__dirname, "public")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("Vibbeo frontend serving on port " + PORT);
});
