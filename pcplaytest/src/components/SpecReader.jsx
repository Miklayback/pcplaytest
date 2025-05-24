import { useEffect, useState } from "react";

function SpecReader() {
  const [specs, setSpecs] = useState({
    cpuCores: null,
    ram: null,
    gpu: "Unknown",
  });

  useEffect(() => {
    const getSpecs = () => {
      const cpuCores = navigator.hardwareConcurrency || "Unknown";
      const ram = navigator.deviceMemory || "Unknown";

      let gpu = "Unknown";
      try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl");
        const debugInfo = gl?.getExtension("WEBGL_debug_renderer_info");
        gpu = debugInfo
          ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
          : "Not Detected";
      } catch (err) {
        gpu = "WebGL Not Supported";
      }

      setSpecs({ cpuCores, ram, gpu });
    };

    getSpecs();
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded-xl w-full max-w-md mx-auto mt-6 text-gray-800">
      <h2 className="text-xl font-semibold mb-4">🔍 Your PC Specs</h2>
      <ul className="space-y-2">
        <li>🧠 CPU Cores: {specs.cpuCores}</li>
        <li>💾 RAM: {specs.ram} GB</li>
        <li>🎮 GPU: {specs.gpu}</li>
      </ul>
    </div>
  );
}

export default SpecReader;
