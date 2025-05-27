// ✅ FINAL App.jsx with evaluation result panel + action buttons
import { useEffect, useState } from "react";
import SpecReader from "./components/SpecReader";
import CheckSpecsGuide from "./components/CheckSpecsGuide";
import { evaluateSystem } from "./evaluateSystem";

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

  const handleTryAnotherGame = () => {
    setFormData({
      ...formData,
      game: "",
    });
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">🧪 PCPlayTest</h1>

      {step === 4 && (
        <div className="flex flex-col md:flex-row justify-center items-start gap-10">
          {/* PC Info Summary */}
          <div className="bg-white shadow p-6 rounded-xl text-gray-800 w-full md:w-[44rem] h-[50rem] leading-loose">
            <h2 className="text-xl font-bold mb-4">🧠 Your PC Specs</h2>
            <ul className="space-y-1">
              <li>🎮 Game: {formData.game || "-"}</li>
              <li>📌 Device Type: {formData.deviceType || "-"}</li>
              <li>🧠 CPU: {formData.cpuModel || "-"}</li>
              <li>🔢 Cores (est.): {autoSpecs.cores || "-"}</li>
              <li>⚡ RAM Speed: {formData.ramSpeed || "-"}</li>
              <li>📦 RAM Size: {formData.manualRam || "-"}</li>
              <li>💾 Storage C: {formData.diskC || "-"}</li>
              <li>💾 Storage D: {formData.diskD || "-"}</li>
              <li>🎮 GPU: {autoSpecs.gpu || "-"}</li>
            </ul>
          </div>

          {/* Evaluation Result */}
          <div className="bg-white shadow p-6 rounded-xl text-gray-800 w-full md:w-[44rem] h-[50rem] leading-loose">
            <h2 className="text-xl font-bold mb-4">📊 Evaluation Result</h2>
            {(() => {
              const result = evaluateSystem({
                cpuModel: formData.cpuModel,
                gpuModel: autoSpecs.gpu,
                ramGB: formData.manualRam,
                hasSSD: formData.diskC === "SSD" || formData.diskD === "SSD",
                selectedGame: formData.game,
              });

              return (
                <>
                  <p className="text-lg font-semibold mb-3">{result.status}</p>
                  <ul className="list-disc pl-5 space-y-1 text-base">
                    {result.detail.map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-col gap-3">
                    <button
                      className="bg-blue-600 text-white py-2 px-6 rounded"
                      onClick={handleTryAnotherGame}
                    >
                      🔁 Try Another Game
                    </button>

                    <button
                      className="bg-green-600 text-white py-2 px-6 rounded"
                      onClick={() => alert("This AI-based test is part of our upcoming pro version.")}
                    >
                      💡 AI Deep Test (Pro)
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
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