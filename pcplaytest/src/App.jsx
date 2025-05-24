import { useEffect, useState } from "react";
import SpecReader from "./components/SpecReader";
import CheckSpecsGuide from "./components/CheckSpecsGuide";

function App() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    deviceType: "",
    cpuModel: "",
    ramSpeed: "",
    diskTypes: "",
  });

  const [autoSpecs, setAutoSpecs] = useState({
    cores: null,
    ram: null,
    gpu: null,
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">🧪 PCPlayTest</h1>

      {step === 3 && (
        <div className="bg-white shadow p-6 rounded-xl mb-6 max-w-xl mx-auto text-gray-800">
          <h2 className="text-xl font-bold mb-4">🔍 Your PC Specs</h2>
          <ul className="space-y-1">
            <li>📌 Device Type: {formData.deviceType || "-"}</li>
            <li>🧠 CPU Model: {formData.cpuModel || "-"}</li>
            <li>🧠 CPU Cores: {autoSpecs.cores || "-"}</li>
            <li>⚡ RAM Speed: {formData.ramSpeed || "-"}</li>
            <li>💽 RAM: {autoSpecs.ram ? `${autoSpecs.ram} GB` : "-"}</li>
            <li>💾 Storage: {formData.diskTypes || "-"}</li>
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
      />

      {/* ✅ Automatically read browser specs */}
      <SpecReader onDetect={setAutoSpecs} />
    </div>
  );
}

export default App;
