
import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CPU Benchmark 网站
const url = "https://www.cpubenchmark.net/cpu_list.php";

async function scrapeCpuScores() {
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);

  const cpuMap = {};

  $("tr").each((i, row) => {
    const columns = $(row).find("td");
    if (columns.length >= 2) {
      const name = $(columns[0]).text().trim();
      const scoreText = $(columns[1]).text().trim().replace(/,/g, "");
      const score = parseInt(scoreText, 10);
      if (!isNaN(score)) {
        const brand = name.toLowerCase().includes("intel")
          ? "intel"
          : name.toLowerCase().includes("amd") || name.toLowerCase().includes("ryzen")
          ? "amd"
          : "other";

        if (!cpuMap[name]) {
          cpuMap[name] = { brand, score };
        }
      }
    }
  });

  const outputPath = path.join(__dirname, "../public/cpuScores.json");
  fs.writeFileSync(outputPath, JSON.stringify(cpuMap, null, 2));
  console.log(`✅ CPU scores saved to ${outputPath}`);
}

scrapeCpuScores();
