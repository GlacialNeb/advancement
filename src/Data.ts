import { create } from "zustand";
import Decimal from "break_infinity.js";

type DataState = {
  ticks: number;
  value: Decimal;
  addValue: (add: number) => void;
};

export const Data = create<DataState>((set, get) => ({
  ticks: 0,
  value: new Decimal(0),

  addValue: (add) => {
    const { value } = get();
    set({
      value: value.add(add)
    });
  },
}));
