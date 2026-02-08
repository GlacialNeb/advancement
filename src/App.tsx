import { Stage, Layer, Rect, Circle } from "react-konva";
import { useEffect, useState, useRef, type JSX } from "react";
import { Data } from "./Data.ts";
import { CircleHandler } from "./CircleHandler.ts"
import { Format, InitMouseInput, useMouseInputData } from "./Util.ts";
import Sidebar from "./Sidebar";
import { FaHome, FaCog } from "react-icons/fa";

const size = 500;

export default function App() {
  //subscribe to zustand data values
  const addValue = Data((s) => s.addValue);
  const value = Data((s) => s.value);
  const useGlide = Data((s) => s.useGlide);
  const max = Data((s) => s.max);
  const rate = Data((s) => s.rate);
  const selectionRadius = Data((s) => s.selectionRadius);
  const multiplier = Data((s) => s.multiplier);

  //subscribe to zustand circle handler values
  const objects = CircleHandler((s) => s.objects);
  const trySpawn = CircleHandler((s) => s.trySpawn);
  const removeCircle = CircleHandler((s) => s.removeCircle);

  //subscribe to zustand mouse events
  const mouseDown = useMouseInputData((s) => s.mouseDown);
  const mouseX = useMouseInputData((s) => s.mouseX);
  const mouseY = useMouseInputData((s) => s.mouseY);

  //use refs to rendering every mouse event
  const mouseXRef = useRef(mouseX);
  const mouseYRef = useRef(mouseY);
  const mouseDownRef = useRef(mouseDown);

  useEffect(() => {
    mouseXRef.current = mouseX;
    mouseYRef.current = mouseY;
    mouseDownRef.current = mouseDown;
  }, [mouseX, mouseY, mouseDown]);

  //render logic
  useEffect(() => {
    const canvas = document.getElementById("circleCanvas")
    const canvasRect = canvas?.getBoundingClientRect()

    const interval = setInterval(() => {
      trySpawn(max, rate);

      if (!(mouseDownRef.current && useGlide && canvas && canvasRect)) return;
      for (let i = objects.length - 1; i >= 0; i--) {
        const obj = objects[i];
        const dx = mouseXRef.current - canvasRect.left - obj.x + 20 / 2;
        const dy = mouseYRef.current - canvasRect.top - obj.y + 20 / 2;
        if (dx * dx + dy * dy <= selectionRadius * selectionRadius) {
          removeCircle(obj.id);
          addValue(multiplier.toNumber());
        }
      }
    }, 16);

    return () => clearInterval(interval);
  }, [max, rate, objects, addValue, useGlide, selectionRadius, multiplier, trySpawn, removeCircle]);

  //cancel dragging ew annoying
  window.ondragstart = function () { return false; }

  //set up pages
  const [currentRoute, setCurrentRoute] = useState("home");

  const HomePage = () => <>
    <p>Value: {Format(value)}</p>
    <p>Circles: {objects.length}/{max} {1 / rate}/s</p>
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
  </>;

  const SkillTree = () => <>

  </>

  const pages: { [key: string]: JSX.Element } = {
    home: <HomePage />,
    skillTree: <SkillTree />,
  };

  const sidebarItems = [
    { title: "Home", icon: <FaHome />, route: "home" },
    { title: "Skill Tree", icon: <FaCog />, route: "skillTree" }
  ];

  //return app object
  return (
    <div className="app-container">
      <Sidebar
        items={sidebarItems}
        currentRoute={currentRoute}
        onSelect={setCurrentRoute}
      />
      <div className="content-area">
        {pages[currentRoute]}
      </div>
    </div>
  )
}