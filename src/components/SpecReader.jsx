import { useEffect } from "react";

export default function SpecReader({ onDetect }) {
  useEffect(() => {
    const cores = navigator.hardwareConcurrency;
    const ram = navigator.deviceMemory || "-";
    const gpu = getGPU();

    onDetect({ cores, ram, gpu });
  }, []);

  const getGPU = () => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl");
    if (!gl) return "Not available";

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    return debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      : "Unknown";
  };

  return null; // no UI, just logic
}