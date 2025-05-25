// ✅ Updated App.jsx - passes autoSpecs, removes browser-detected RAM from final view
import { useEffect, useState } from "react";
import SpecReader from "./components/SpecReader";
import CheckSpecsGuide from "./components/CheckSpecsGuide";

function App() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    deviceType: "",
    cpuModel: "",
    ramSpeed: "",
    manualRam: "",
    diskC: "",
    diskD: "",
    game: "",
  });

  const [autoSpecs, setAutoSpecs] = useState({
    cores: null,
    ram: null,
    gpu: null,
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">🧪 PCPlayTest</h1>

      {step === 4 && (
        <div className="bg-white shadow p-6 rounded-xl mb-6 max-w-xl mx-auto text-gray-800">
          <h2 className="text-xl font-bold mb-4">🔍 Info summary </h2>
          <ul className="space-y-1">
            <li>🎮 Tested Game: {formData.game || "-"}</li>
            <li>📌 Device Type: {formData.deviceType || "-"}</li>
            <li>🧠 CPU Model: {formData.cpuModel || "-"}</li>
            <li>🧠 CPU Cores (estimated): {autoSpecs.cores || "-"}</li>
            <li>⚡ RAM Speed: {formData.ramSpeed || "-"}</li>
            <li>📦 RAM Capacity: {formData.manualRam || "-"}</li>
            <li>💾 Storage C: {formData.diskC || "-"}</li>
            <li>💾 Storage D: {formData.diskD || "-"}</li>
            <li>🎮 GPU: {autoSpecs.gpu || "-"}</li>
          </ul>
        </div>
      )}

      {/* ✅ Always render CheckSpecsGuide */}
      <CheckSpecsGuide
        step={step}
        setStep={setStep}
        formData={formData}
        setFormData={setFormData}
        autoSpecs={autoSpecs}
      />

      {/* ✅ Automatically read browser specs */}
      <SpecReader onDetect={setAutoSpecs} />
    </div>
  );
}

export default App;
