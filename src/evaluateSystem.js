import cpuScores from "./data/cpuScores.json";
import gpuScores from "./data/gpuScores.json";
import gameRequirements from "./data/gameRequirements.json";

function getScore(name, scoreDict) {
  if (!name) return 0;
  const lowerName = name.toLowerCase();
  let bestMatch = Object.entries(scoreDict).find(([key]) =>
    lowerName.includes(key.toLowerCase())
  );
  return bestMatch ? bestMatch[1].score : 0;
}

function getBrand(name) {
  if (!name) return "unknown";
  const val = name.toLowerCase();
  if (val.includes("intel")) return "intel";
  if (val.includes("amd") || val.includes("ryzen")) return "amd";
  return "unknown";
}

function isLikelyMobileGPU(name) {
  if (!name) return false;
  const val = name.toLowerCase();
  return val.includes("apple") || val.includes("mali") || val.includes("adreno") || val.includes("powervr");
}

export function evaluateSystem(userSpecs) {
  const { cpuModel, gpuModel, ramGB, hasSSD, selectedGame } = userSpecs;
  const cpuBrand = getBrand(cpuModel);
  const gpuBrand = getBrand(gpuModel);

  const cpuScore = getScore(cpuModel, cpuScores);
  const gpuScore = getScore(gpuModel, gpuScores);

  const game = gameRequirements.find((g) => g.name === selectedGame);
  if (!game) return { status: "❌ Unknown game", detail: ["Game not found."] };

  const spec = game.specs;

  const req = spec.recommended[cpuBrand] || spec.recommended.intel;
  const min = spec.min[cpuBrand] || spec.min.intel;

  const recCpuScore = getScore(req.cpu, cpuScores);
  const recGpuScore = getScore(req.gpu, gpuScores);
  const minCpuScore = getScore(min.cpu, cpuScores);
  const minGpuScore = getScore(min.gpu, gpuScores);

  const messages = [];

  // CPU Check
  if (cpuScore >= recCpuScore) messages.push("✅ CPU meets recommended level");
  else if (cpuScore >= minCpuScore) messages.push("⚠️ CPU meets minimum");
  else messages.push("❌ CPU is below minimum");

  // GPU Check
  if (!gpuModel || gpuScore === 0) {
    if (isLikelyMobileGPU(gpuModel)) {
      messages.push("❌ GPU is not a PC-class graphics card (detected mobile GPU)");
    } else {
      messages.push("❌ GPU not recognized");
    }
  } else if (gpuScore >= recGpuScore) {
    messages.push("✅ GPU meets recommended level");
  } else if (gpuScore >= minGpuScore) {
    messages.push("⚠️ GPU meets minimum");
  } else {
    messages.push("❌ GPU is below minimum");
  }

  // RAM Check
  const recRam = spec.recommended.ram;
  const minRam = spec.min.ram;
  const ram = parseInt(ramGB);
  if (ram >= recRam) messages.push("✅ RAM is sufficient");
  else if (ram >= minRam) messages.push("⚠️ RAM meets minimum");
  else messages.push("❌ RAM is too low");

  // SSD Check
  const requiresSSD = spec.recommended.ssd || spec.min.ssd;
  if (requiresSSD) {
    if (hasSSD) messages.push("✅ SSD is present");
    else messages.push("❌ SSD is missing (recommended)");
  }

  const good = messages.filter((m) => m.startsWith("✅")).length;
  const warning = messages.filter((m) => m.startsWith("⚠️")).length;
  const bad = messages.filter((m) => m.startsWith("❌")).length;

  let verdict = "❌ Cannot run the game.";
  if (gpuScore > 0 && bad === 0 && warning >= 1) verdict = "⚠️ Playable at Low settings";
  if (gpuScore > 0 && bad === 0 && warning === 0) verdict = "✅ Smooth at Medium/High settings";

  return {
    status: verdict,
    detail: messages,
  };
}
