import Controls from "./Controls";
import Stopwatch from "./Stopwatch";

function App() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-50">
      <h1 className="p-5 flex w-full justify-center text-5xl font-bold text-gray-500">
        Timer
      </h1>

      <Stopwatch></Stopwatch>
      <Controls></Controls>
    </div>
  );
}

export default App;
