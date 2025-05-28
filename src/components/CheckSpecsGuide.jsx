import { useState } from "react";
import { gameList } from "./gameList";
import { cpuList } from "./cpulist";

export default function CheckSpecsGuide({ step, setStep, formData, setFormData, autoSpecs = {} }) {
  const [cpuValid, setCpuValid] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const normalize = (str = "") =>
    str.toLowerCase().replace(/(intel|amd|ryzen|core|\(r\)|\(tm\)|gen|cpu|processor|@|™|®)/gi, "")
      .replace(/[^a-z0-9\- ]/gi, "").trim();

  const extractCpuKeywords = (input) => {
    const pattern = /\b(?:i[3579]-\d{4,5}[a-z]{0,2}|[rm]\d{4,5}[a-z]*|[a-z]{1,10}\d{3,5}[a-z]*|m1|m2|天玑\d+)\b/gi;
    return input.match(pattern) || [];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "cpuModel") {
      const exactMatch = cpuList.includes(value.trim());
      if (exactMatch) {
        setCpuValid(true);
        return;
      }

      const keywords = extractCpuKeywords(value.toLowerCase());
      const matched = cpuList.find((cpu) =>
        keywords.some((key) => cpu.toLowerCase().includes(key))
      );
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">📝 Enter Basic Computer Info</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Find Performance in Task Manager</span>
              <img
                src={`${import.meta.env.BASE_URL}assets/find-performance.png`}
                alt="Task Manager"
                className="w-6 h-6 rounded cursor-pointer border hover:scale-105"
                onClick={() => setPreviewImage(`/pcplaytest/assets/find-performance.png`)}
              />
            </div>
          </div>

          {/* CPU */}
          <label className="block mb-4 text-lg">
            <div className="flex items-center gap-2">
              CPU Model:
              <img
                src={`${import.meta.env.BASE_URL}assets/cpu-example.png`}
                alt="CPU"
                className="w-5 h-5 cursor-pointer"
                onClick={() => setPreviewImage(`/pcplaytest/assets/cpu-example.png`)}
              />
            </div>
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

          {/* RAM Speed */}
          <label className="block mb-4 text-lg">
            <div className="flex items-center gap-2">
              RAM Speed (MT/s):
              <img
                src={`${import.meta.env.BASE_URL}assets/ram-speed-example.png`}
                alt="RAM Speed"
                className="w-5 h-5 cursor-pointer"
                onClick={() => setPreviewImage(`/pcplaytest/assets/ram-speed-example.png`)}
              />
            </div>
            <input
              type="text"
              name="ramSpeed"
              value={formData.ramSpeed || ""}
              onChange={handleChange}
              placeholder="e.g., 3200 MT/s"
              className="mt-1 w-full border rounded p-3 text-base"
            />
          </label>

          {/* RAM Capacity */}
          <label className="block mb-4 text-lg">
            <div className="flex items-center gap-2">
              RAM Capacity:
              <img
                src={`${import.meta.env.BASE_URL}assets/ram-capacity-example.png`}
                alt="RAM Capacity"
                className="w-5 h-5 cursor-pointer"
                onClick={() => setPreviewImage(`/pcplaytest/assets/ram-capacity-example.png`)}
              />
            </div>
            <input
              type="text"
              name="manualRam"
              value={formData.manualRam || ""}
              onChange={handleChange}
              placeholder="e.g., 32 GB"
              className="mt-1 w-full border rounded p-3 text-base"
            />
          </label>

          {/* Disk C */}
          <label className="block mb-4 text-lg">
            <div className="flex items-center gap-2">
              C: Drive Storage Type:
              <img
                src={`${import.meta.env.BASE_URL}assets/disk-c-example.png`}
                alt="Disk C"
                className="w-5 h-5 cursor-pointer"
                onClick={() => setPreviewImage(`/pcplaytest/assets/disk-c-example.png`)}
              />
            </div>
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

          {/* Disk D */}
          <label className="block mb-4 text-lg">
            <div className="flex items-center gap-2">
              D: Drive Storage Type:
              <img
                src={`${import.meta.env.BASE_URL}assets/disk-d-example.png`}
                alt="Disk D"
                className="w-5 h-5 cursor-pointer"
                onClick={() => setPreviewImage(`/pcplaytest/assets/disk-d-example.png`)}
              />
            </div>
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

        {/* 教学图文右栏 */}
        <div className="bg-white shadow p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">📘 How to Check Specs in Task Manager</h2>
          <ol className="list-decimal pl-5 space-y-3 text-lg text-gray-800">
            <li><strong>Open Task Manager</strong>: Click the <strong>Windows search bar</strong> and search for <code>Task Manager</code></li>
            <li>Go to the <strong>Performance</strong> tab</li>
            <li>Click <strong>CPU</strong> section to check CPU model</li>
            <li>Click <strong>Memory</strong> to check RAM speed (bottom-right) and total GB (top-right)</li>
            <li>Click each <strong>Disk (C:, D:)</strong> to check SSD or HDD label</li>
          </ol>
          <hr className="my-6 border-gray-300" />
          <h2 className="text-2xl font-bold mb-4">📘 如何在任务管理器中查看电脑配置</h2>
          <ol className="list-decimal pl-5 space-y-3 text-lg text-gray-800">
            <li><strong>打开任务管理器</strong>：点击 <strong>Windows 搜索栏</strong>，搜索 <code>任务管理器</code></li>
            <li>切换到 <strong>性能 Performance</strong> 标签页</li>
            <li>点击 <strong>CPU</strong> 看右上角的型号</li>
            <li>点击 <strong>内存 Memory</strong> 看右下角速度、右上角容量</li>
            <li>点击每一个 <strong>磁盘 Disk</strong> 看是否为 SSD 或 HDD</li>
          </ol>
        </div>
      </div>

      {/* 点击放大图像模态框 */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <img src={previewImage} alt="Preview" className="max-w-[90%] max-h-[90%] rounded shadow-xl" />
        </div>
      )}
    </div>
  );

  if (step === 1) return renderGameStep();
  if (step === 2) return renderDeviceStep();
  if (step === 3) return renderSpecInputStep();
  return null;
}
