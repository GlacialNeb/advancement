import Decimal from "break_infinity.js";
import { useEffect } from "react";
import { create } from "zustand";

const suffixes = ["k", "M", "B", "T", "qd", "Qn", "sx", "Sp", "O", "N", "de", "Ud", "DD", "tdD", "qdD", "QnD", "sxD", "SpD", "OcD", "NvD", "Vgn", "UVg", "DVg", "TVg", "qtV", "QnV", "SeV", "SPG", "OVG", "NVG", "TGN", "UTG", "DTG", "tsTG", "qtTG", "QnTG", "ssTG", "SpTG", "OcTG", "NoTG", "QdDR", "uQDR", "dQDR", "tQDR", "qdQDR", "QnQDR", "sxQDR", "SpQDR", "OQDDr", "NQDDr", "qQGNT", "uQGNT", "dQGNT", "tQGNT", "qdQGNT", "QnQGNT", "sxQGNT", "SpQGNT", "OQQGNT", "NQQGNT", "SXGNTL"]

export function Format(value: Decimal, decimals?: number): string {
  const tier = Math.floor(Math.floor(value.log10()) / 3);
  if (tier - 1 < 0) {
    return value.toFixed(decimals || 0);
  }

  const suffix = suffixes[tier - 1] ?? `e${tier * 3}`;
  const scaled = value.div(Decimal.pow(10, tier * 3));

  return `${scaled.toFixed(2).replace(/\.?0+$/, "")}${suffix}`;
}

type InputState = {
  mouseDown: boolean;
  mouseX: number;
  mouseY: number;
  setMouseDown: (v: boolean) => void;
  setMousePos: (x: number, y: number) => void;
};

export const useMouseInputData = create<InputState>((set) => ({
  mouseDown: false,
  mouseX: 0,
  mouseY: 0,
  setMouseDown: (v) => set({ mouseDown: v }),
  setMousePos: (x, y) => set({ mouseX: x, mouseY: y }),
}));

export function InitMouseInput() {
  const setMouseDown = useMouseInputData((s) => s.setMouseDown);
  const setMousePos = useMouseInputData((s) => s.setMousePos);

  useEffect(() => {
    const down = () => setMouseDown(true);
    const up = () => setMouseDown(false);
    const move = (e: PointerEvent) => setMousePos(e.clientX, e.clientY);

    document.addEventListener("pointerdown", down);
    document.addEventListener("pointerup", up);
    document.addEventListener("pointercancel", up);
    document.addEventListener("pointermove", move);

    return () => {
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("pointerup", up);
      document.removeEventListener("pointercancel", up);
      document.removeEventListener("pointermove", move);
    };
  }, [setMouseDown, setMousePos]);

  return null;
}