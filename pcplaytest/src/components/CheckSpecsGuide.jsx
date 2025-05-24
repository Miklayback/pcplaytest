import { useState } from "react";

export default function CheckSpecsGuide({ step, setStep, formData, setFormData }) {
  const [cpuValid, setCpuValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // CPU validation logic
    if (name === "cpuModel") {
      const lower = value.toLowerCase();
      const isValid =
        (lower.includes("intel") && /i[3579]/.test(lower)) ||
        (lower.includes("amd") && lower.includes("ryzen"));
      setCpuValid(isValid);
    }
  };

  const renderSpecSummary = () => (
    <div className="bg-white shadow p-6 rounded-xl mb-6 text-base max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">🔍 Your PC Specs</h2>
      <ul className="space-y-1 text-gray-800">
        <li>📌 Device Type: {formData.deviceType || "-"}</li>
        <li>🧠 CPU Model: {formData.cpuModel || "-"}</li>
        <li>⚡ RAM Speed: {formData.ramSpeed || "-"}</li>
        <li>💾 Storage: {formData.diskTypes || "-"}</li>
      </ul>
    </div>
  );

  if (step === 1) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-xl p-12 rounded-2xl text-center w-[60rem] h-[28rem] flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-8">🖥️ First, are you using a desktop or laptop?</h2>
          <select
            name="deviceType"
            value={formData.deviceType}
            onChange={handleChange}
            className="w-1/2 mx-auto border rounded p-4 text-lg mb-6"
          >
            <option value="">Select one</option>
            <option value="desktop">Desktop</option>
            <option value="laptop">Laptop</option>
          </select>
          <button
            onClick={() => formData.deviceType && setStep(2)}
            disabled={!formData.deviceType}
            className="bg-blue-600 text-white px-10 py-4 rounded text-lg disabled:opacity-50 mx-auto"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="bg-gray-100 min-h-screen px-6 py-8">
        {renderSpecSummary()}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">📝 Enter Basic Computer Info</h2>

            <label className="block mb-4 text-lg">
              CPU Model:
              <input
                type="text"
                name="cpuModel"
                value={formData.cpuModel}
                onChange={handleChange}
                placeholder="e.g., Intel Core i5-12400F"
                className="mt-1 w-full border rounded p-3 text-base"
              />
              {!cpuValid && formData.cpuModel && (
                <p className="text-red-600 mt-1 text-sm">❌ Invalid format. Example: Intel i5 or AMD Ryzen</p>
              )}
              {cpuValid && (
                <p className="text-green-600 mt-1 text-sm">✅ Format looks good</p>
              )}
            </label>

            <label className="block mb-4 text-lg">
              RAM Speed (MHz):
              <input
                type="text"
                name="ramSpeed"
                value={formData.ramSpeed}
                onChange={handleChange}
                placeholder="e.g., 3200 MHz"
                className="mt-1 w-full border rounded p-3 text-base"
              />
            </label>

            <label className="block mb-4 text-lg">
              What storage types do you see (from Task Manager)?
              <input
                type="text"
                name="diskTypes"
                value={formData.diskTypes}
                onChange={handleChange}
                placeholder="e.g., SSD (C:) + HDD (D:)"
                className="mt-1 w-full border rounded p-3 text-base"
              />
            </label>

            <button
              onClick={() => setStep(3)}
              disabled={!cpuValid}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded text-lg disabled:opacity-50"
            >
              Continue
            </button>
          </div>

          <div className="bg-white shadow p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">📘 How to Check Specs in Task Manager</h2>
            <ol className="list-decimal pl-5 space-y-3 text-lg text-gray-800">
              <li>
                <strong>Open Task Manager</strong>: Click the <strong>Windows search bar</strong> and search for <code>Task Manager</code>
              </li>
              <li>Go to the <strong>Performance</strong> tab</li>
              <li>For CPU model: Click on <strong>CPU</strong> section, check the top-right model</li>
              <li>For RAM speed: Click on <strong>Memory</strong>, look for "Speed" at the bottom right</li>
              <li>For storage: Click each Disk (C:, D:, etc.) and look at the top right (e.g., SSD / HDD)</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
