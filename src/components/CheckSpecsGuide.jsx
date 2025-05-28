// ✅ FINAL VERSION - With CPU Smart Autocomplete Input
import { useState } from "react";
import { gameList } from "./gameList";
import { cpuList } from "./cpuList";

export default function CheckSpecsGuide({ step, setStep, formData, setFormData, autoSpecs = {} }) {
  const [cpuValid, setCpuValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "cpuModel") {
      const lower = value.toLowerCase();
      const isValid =
        (lower.includes("intel") && /i[3579]/.test(lower)) ||
        (lower.includes("amd") && /ryzen\s*[3579]/.test(lower)) ||
        cpuList.some((cpu) => cpu.toLowerCase().includes(lower));
      setCpuValid(isValid);
    }
  };

  const renderGameStep = () => (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-20">
      <div className="bg-white shadow-xl p-12 rounded-2xl text-center w-[60rem] h-[28rem] flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-8">🎮 What game would you like to test?</h2>
        <input
          type="text"
          name="game"
          value={formData.game || ""}
          onChange={handleChange}
          list="games"
          placeholder="Start typing game name..."
          className="w-1/2 mx-auto border rounded p-4 text-lg mb-6"
        />
        <datalist id="games">
          {gameList.map((name, index) => (
            <option key={index} value={name} />
          ))}
        </datalist>

        <button
          onClick={() => formData.game && setStep(2)}
          disabled={!formData.game}
          className="bg-blue-600 text-white px-10 py-4 rounded text-lg disabled:opacity-50 mx-auto"
        >
          Continue
        </button>
      </div>
    </div>
  );

  const renderDeviceStep = () => (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-20">
      <div className="bg-white shadow-xl p-12 rounded-2xl text-center w-[60rem] h-[28rem] flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-8">🖥️ Are you using a desktop or laptop?</h2>
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
          onClick={() => formData.deviceType && setStep(3)}
          disabled={!formData.deviceType}
          className="bg-blue-600 text-white px-10 py-4 rounded text-lg disabled:opacity-50 mx-auto"
        >
          Continue
        </button>
      </div>
    </div>
  );

  const renderSpecInputStep = () => (
    <div className="bg-gray-100 min-h-screen px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-6">📝 Enter Basic Computer Info</h2>

          <label className="block mb-4 text-lg">
            CPU Model:
            <input
              type="text"
              name="cpuModel"
              value={formData.cpuModel || ""}
              onChange={handleChange}
              list="cpus"
              placeholder="e.g., Intel i5-12400F"
              className="mt-1 w-full border rounded p-3 text-base"
            />
            <datalist id="cpus">
              {cpuList.map((cpu, idx) => (
                <option key={idx} value={cpu} />
              ))}
            </datalist>
            {!cpuValid && formData.cpuModel && (
              <p className="text-red-600 mt-1 text-sm">❌ Invalid format or unknown CPU</p>
            )}
            {cpuValid && (
              <p className="text-green-600 mt-1 text-sm">✅ Format looks good</p>
            )}
          </label>

          <label className="block mb-4 text-lg">
            RAM Speed (MT/s):
            <input
              type="text"
              name="ramSpeed"
              value={formData.ramSpeed || ""}
              onChange={handleChange}
              placeholder="e.g., 3200 MT/s"
              className="mt-1 w-full border rounded p-3 text-base"
            />
          </label>

          <label className="block mb-4 text-lg">
            RAM Capacity:
            <input
              type="text"
              name="manualRam"
              value={formData.manualRam || ""}
              onChange={handleChange}
              placeholder="e.g., 32 GB"
              className="mt-1 w-full border rounded p-3 text-base"
            />
          </label>

          <label className="block mb-4 text-lg">
            What storage type do you have for C: drive?
            <select
              name="diskC"
              value={formData.diskC || ""}
              onChange={handleChange}
              className="mt-1 w-full border rounded p-3 text-base"
            >
              <option value="">Select one</option>
              <option value="SSD">SSD</option>
              <option value="HDD">HDD</option>
            </select>
          </label>

          <label className="block mb-4 text-lg">
            What storage type do you have for D: drive?
            <select
              name="diskD"
              value={formData.diskD || ""}
              onChange={handleChange}
              className="mt-1 w-full border rounded p-3 text-base"
            >
              <option value="">Select one</option>
              <option value="SSD">SSD</option>
              <option value="HDD">HDD</option>
              <option value="None">Not Present</option>
            </select>
          </label>

          <button
            onClick={() => setStep(4)}
            disabled={!cpuValid}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded text-lg disabled:opacity-50"
          >
            Continue
          </button>
        </div>

        <div className="bg-white shadow p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">📘 How to Check Specs in Task Manager</h2>
          <ol className="list-decimal pl-5 space-y-3 text-lg text-gray-800">
            <li>Open Task Manager</li>
            <li>Go to the <strong>Performance</strong> tab</li>
            <li>Look for <strong>CPU</strong> on the top right for model</li>
            <li>Check <strong>Memory</strong> for RAM speed and size</li>
            <li>Click each <strong>Disk</strong> (C:, D:) to see type (SSD/HDD)</li>
          </ol>
          <hr className="my-6 border-gray-300" />
          <h2 className="text-2xl font-bold mb-4">📘 如何在任务管理器中查看电脑配置</h2>
          <ol className="list-decimal pl-5 space-y-3 text-lg text-gray-800">
            <li>打开任务管理器</li>
            <li>切换到 <strong>性能</strong> 标签</li>
            <li>看 <strong>CPU</strong> 右上角的型号</li>
            <li>看 <strong>内存</strong> 的速度和容量</li>
            <li>点击 <strong>磁盘</strong> 看是否为 SSD / HDD</li>
          </ol>
        </div>
      </div>
    </div>
  );

  if (step === 1) return renderGameStep();
  if (step === 2) return renderDeviceStep();
  if (step === 3) return renderSpecInputStep();

  return null;
}
