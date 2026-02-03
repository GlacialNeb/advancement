import { create } from "zustand"

interface Circle {
    id: number;
    x: number;
    y: number;
}

interface Circles {
    objects: Circle[];
    max: number;
    rate: number;
    lastSpawn: number;

    trySpawn: () => void;
    removeCircle: (id: number) => void;
    setRate: (value: number) => void;
    setMax: (value: number) => void;
}

export const CircleHandler = create<Circles>((set, get) => ({
    objects: [],
    max: 10,
    rate: 1,
    lastSpawn: 0,

    trySpawn: () => {
        const { objects, max, rate, lastSpawn } = get();
        const now = Date.now() / 1000;

        if (objects.length >= max) return;
        if (now - lastSpawn < rate) return;

        const newObj: Circle = {
            id: now * 1000 + Math.random() * 1000,
            x: Math.random() * 460 + 20,
            y: Math.random() * 460 + 20,
        };

        set({
            objects: [...objects, newObj],
            lastSpawn: now,
        });
    },

    removeCircle: (id) => {
        set((state) => ({
            objects: state.objects.filter((obj) => obj.id !== id),
        }));
    },

    setRate: (value) => set({ rate: value }),
    setMax: (value) => set({ max: value }),
}));