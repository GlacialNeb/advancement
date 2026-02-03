import { CircleCanvas } from "./CircleCanvas.tsx"
import { useEffect } from "react";
import { Data } from "./Data.ts";
import { CircleHandler } from "./CircleHandler.ts"
import { Format } from "./Format.ts";

export default function App() {
  const trySpawn = CircleHandler((s) => s.trySpawn);
  useEffect(() => {
    const interval = setInterval(() => {
      trySpawn();
    }, 50);

    return () => clearInterval(interval);
  }, [trySpawn]);

  const value = Data((s) => s.value);
  return (
    <div>
      <p>Value: {Format(value)}</p>
      <CircleCanvas size={500} />
    </div>
  )
}