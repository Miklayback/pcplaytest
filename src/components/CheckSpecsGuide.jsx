import { useState } from "react";
import { gameList } from "./gameList";
import { cpuList } from "./cpulist";

export default function CheckSpecsGuide({ step, setStep, formData, setFormData, autoSpecs = {} }) {
  const [cpuValid, setCpuValid] = useState(false);

  const normalize = (str = "") => {
    return str
      .toLowerCase()
      .replace(/(intel|amd|ryzen|core|\(r\)|\(tm\)|gen|cpu|processor|@|\d+\.\d+\s*ghz)/gi, "")
      .replace(/[^a-z0-9\- ]/gi, "")
      .trim();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "cpuModel") {
      const inputNorm = normalize(value);
      const matched = cpuList.find((cpu) => normalize(cpu).includes(inputNorm));
      setCpuValid(!!matched);
    }
  };

  const filteredCpuOptions = cpuList
    .filter((cpu) => normalize(cpu).includes(normalize(formData.cpuModel || "")))
    .slice(0, 20);

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
              {filteredCpuOptions.map((cpu, idx) => (
                <option key={idx} value={cpu} />
              ))}
            </datalist>
            {!cpuValid && formData.cpuModel && (
              <p className="text-red-600 mt-1 text-sm">❌ CPU not recognized</p>
            )}
            {cpuValid && (
              <p className="text-green-600 mt-1 text-sm">✅ CPU recognized</p>
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
            <li><strong>Open Task Manager</strong>: Click the <strong>Windows search bar</strong> and search for <code>Task Manager</code></li>
            <li>Go to the <strong>Performance</strong> tab</li>
            <li>For CPU model: Click on <strong>CPU</strong> section, check the top-right model</li>
            <li>For RAM speed: Click on <strong>Memory</strong>, look for "Speed" at the bottom right (listed in MT/s)</li>
            <li>For RAM capacity: Click on <strong>Memory</strong> section, check the top-right number to see how many GB</li>
            <li>For storage: Click each Disk (C:, D:, etc.) and look at the top right (e.g., SSD / HDD)</li>
          </ol>
          <hr className="my-6 border-gray-300" />
          <h2 className="text-2xl font-bold mb-4">📘 如何在任务管理器中查看电脑配置</h2>
          <ol className="list-decimal pl-5 space-y-3 text-lg text-gray-800">
            <li><strong>打开任务管理器</strong>：点击 <strong>Windows 搜索栏</strong>，搜索 <code>任务管理器 Task Manager</code></li>
            <li>切换到 <strong>性能 Performance</strong> 标签页</li>
            <li>查看 CPU 型号：点击 <strong>CPU</strong>，看右上角显示的型号</li>
            <li>查看内存速度：点击 <strong>内存 Memory</strong>，右下角有 “速度 Speed” 一栏（单位是 MT/s）</li>
            <li>查看内存容量：点击 <strong>内存</strong>，看右上角显示的多少GB</li>
            <li>查看硬盘类型：点击每一个磁盘（C:, D: 等），右上角会显示类型（例如 SSD 或 HDD）</li>
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
