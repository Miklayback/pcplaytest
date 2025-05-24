import SpecReader from "./components/SpecReader";
import CheckSpecsGuide from "./components/CheckSpecsGuide";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600">🧪 PCPlayTest</h1>
      <SpecReader />
      <CheckSpecsGuide />
    </div>
  );
}

export default App;
