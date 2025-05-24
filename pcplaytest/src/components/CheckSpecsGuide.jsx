import { useState } from "react";

export default function CheckSpecsGuide() {
  const [formData, setFormData] = useState({
    deviceType: "",
    ssd: "",
    ramSlots: "",
    gpuCount: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* 左侧：用户输入区域 */}
      <div className="bg-white shadow p-4 rounded-xl">
        <h2 className="text-lg font-semibold mb-4">📝 Help Us Understand Your Setup</h2>

        <label className="block mb-3">
          Are you using a desktop or a laptop?
          <select
            name="deviceType"
            value={formData.deviceType}
            onChange={handleChange}
            className="mt-1 w-full border rounded p-2"
          >
            <option value="">Select</option>
            <option value="desktop">Desktop</option>
            <option value="laptop">Laptop</option>
          </select>
        </label>

        <label className="block mb-3">
          Do you have an SSD installed?
          <select
            name="ssd"
            value={formData.ssd}
            onChange={handleChange}
            className="mt-1 w-full border rounded p-2"
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No / Not sure</option>
          </select>
        </label>

        <label className="block mb-3">
          How many RAM sticks (modules) are installed?
          <select
            name="ramSlots"
            value={formData.ramSlots}
            onChange={handleChange}
            className="mt-1 w-full border rounded p-2"
          >
            <option value="">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="More">More than 2</option>
            <option value="unknown">I’m not sure</option>
          </select>
        </label>

        <label className="block mb-3">
          How many graphics processors (GPUs) does your system show?
          <select
            name="gpuCount"
            value={formData.gpuCount}
            onChange={handleChange}
            className="mt-1 w-full border rounded p-2"
          >
            <option value="">Select</option>
            <option value="1">1 (Only integrated or discrete)</option>
            <option value="2">2 (Integrated + Discrete)</option>
            <option value="unknown">Not sure</option>
          </select>
        </label>
      </div>

      {/* 右侧：图文教程部分 */}
      <div className="bg-white shadow p-4 rounded-xl">
        <h2 className="text-lg font-semibold mb-4">🔍 How to Check Your Specs (Windows)</h2>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
          <li>
            <strong>Open Task Manager</strong>: Press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Esc</kbd>
          </li>
          <li>
            Go to the <strong>Performance</strong> tab
          </li>
          <li>
            Check each section:
            <ul className="list-disc pl-5">
              <li><strong>CPU</strong>: Core count and model</li>
              <li><strong>Memory</strong>: Total size, slots used</li>
              <li><strong>Disk</strong>: SSD or HDD</li>
              <li><strong>GPU</strong>: Integrated and/or Discrete GPU</li>
            </ul>
          </li>
          <li>
            Optionally, run <code>dxdiag</code> via <kbd>Win</kbd> + <kbd>R</kbd> → type <code>dxdiag</code> → Enter
          </li>
          <li>
            For advanced users: Open PowerShell and run <br /><code>Get-PhysicalDisk</code> or <code>wmic MEMORYCHIP get BankLabel, Capacity</code>
          </li>
        </ol>
      </div>
    </div>
  );
}
