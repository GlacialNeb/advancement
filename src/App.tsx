import { Stage, Layer, Rect, Circle } from "react-konva";
import { useEffect } from "react";
import { Data } from "./Data.ts";
import { CircleHandler } from "./CircleHandler.ts"
import { Format } from "./Util.ts";
import { useMouseInputData, InitMouseInput } from "./Util.ts"

export default function App() {
  //begin circle spawning logic + glide pickup logic
  const addValue = Data((s) => s.addValue);
  const value = Data((s) => s.value);
  const useGlide = Data((s) => s.useGlide);
  const selectionRadius = Data((s) => s.selectionRadius);
  const max = Data((s) => s.max);
  const rate = Data((s) => s.rate);

  const mouseDown = useMouseInputData((s) => s.mouseDown);
  const mouseX = useMouseInputData((s) => s.mouseX);
  const mouseY = useMouseInputData((s) => s.mouseY);

  const objects = CircleHandler((s) => s.objects);
  const trySpawn = CircleHandler((s) => s.trySpawn);
  const removeCircle = CircleHandler((s) => s.removeCircle);
  useEffect(() => {
    const interval = setInterval(() => {
      trySpawn(max, rate);
      const canvas = document.getElementById("circleCanvas")
      if (!(mouseDown && canvas && useGlide)) return;
      const canvasRect = canvas.getBoundingClientRect()
      objects.forEach((obj) => {
        const dx = mouseX - canvasRect.left - obj.x + 20 / 2;
        const dy = mouseY - canvasRect.top - obj.y + 20 / 2;
        if (Math.sqrt(dx * dx + dy * dy) <= selectionRadius) {
          //begin on pickup logic
          removeCircle(obj.id);
          addValue(1);
        }
      });
    }, 1);

    return () => clearInterval(interval);
  }, [mouseDown, mouseX, mouseY, objects, removeCircle, addValue, selectionRadius, trySpawn, useGlide, max, rate]);

  //return app object
  const size = 500;
  return (
    <div>
      <p>Value: {Format(value)}</p>
      <InitMouseInput />
      <Stage width={size} height={size} id="circleCanvas">
        <Layer>
          <Rect width={size} height={size} fill="#111" />
          {objects.map((obj) => (
            <Circle
              key={obj.id}
              x={obj.x}
              y={obj.y}
              radius={20}
              fill={"#FFF"}
              stroke="#000"
              strokeWidth={2}
              onmousedown={() => {
                if (useGlide) return;
                removeCircle(obj.id);
                addValue(1);
              }}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}