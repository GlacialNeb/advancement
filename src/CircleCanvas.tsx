import { Stage, Layer, Rect, Circle } from "react-konva";
import { CircleHandler } from "./CircleHandler.ts";
import { Data } from "./Data.ts";

interface CircleCanvasProps {
    size: number;
}

export function CircleCanvas({ size }: CircleCanvasProps) {
    const objects = CircleHandler((s) => s.objects);
    const addValue = Data((s) => s.addValue);
    const removeCircle = CircleHandler((s) => s.removeCircle);

    const useGlide = false;
    let mouseDown = false;
    document.body.onmousedown = function () {
        mouseDown = true;
    }
    document.body.onmouseup = function () {
        mouseDown = false;
    }

    return (
        <Stage width={size} height={size}>
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
                        onClick={() => {
                            if (useGlide) return;
                            removeCircle(obj.id);
                            addValue(1);
                        }}
                        onHover={() => { //i don't think this is a hook
                            if (!useGlide && !mouseDown) return;
                            removeCircle(obj.id);
                            addValue(1);
                        }}
                    />
                ))}
            </Layer>
        </Stage>
    );
}
