import { create } from "zustand";
import Decimal from "break_infinity.js";

type DataState = {
  ticks: number;
  max: number;
  rate: number;
  useGlide: boolean;
  selectionRadius: number;

  //actual currencies and stuff
  value: Decimal;
  multiplier: Decimal;

  addValue: (add: number) => void;
};

export const Data = create<DataState>((set, get) => ({
  ticks: 0,
  max: 500,
  rate: 1/60,
  useGlide: true,
  selectionRadius: 100,

  value: new Decimal(0),
  multiplier: new Decimal(1),

  addValue: (add) => {
    const { value } = get();
    set({
      value: value.add(add)
    });
  },
}));
