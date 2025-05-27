
import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// GPU Benchmark 网站
const url = "https://www.videocardbenchmark.net/gpu_list.php";

async function scrapeGpuScores() {
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);

  const gpuMap = {};

  $("tr").each((i, row) => {
    const columns = $(row).find("td");
    if (columns.length >= 2) {
      const name = $(columns[0]).text().trim();
      const scoreText = $(columns[1]).text().trim().replace(/,/g, "");
      const score = parseInt(scoreText, 10);
      if (!isNaN(score)) {
        const brand = name.toLowerCase().includes("radeon") || name.toLowerCase().includes("rx")
          ? "amd"
          : name.toLowerCase().includes("nvidia") || name.toLowerCase().includes("gtx") || name.toLowerCase().includes("rtx")
          ? "nvidia"
          : "other";

        if (!gpuMap[name]) {
          gpuMap[name] = { brand, score };
        }
      }
    }
  });

  const outputPath = path.join(__dirname, "../public/gpuScores.json");
  fs.writeFileSync(outputPath, JSON.stringify(gpuMap, null, 2));
  console.log(`✅ GPU scores saved to ${outputPath}`);
}

scrapeGpuScores();
