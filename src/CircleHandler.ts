import { create } from "zustand"

interface Circle {
    id: number;
    x: number;
    y: number;
}

interface Circles {
    objects: Circle[];
    lastSpawn: number;

    trySpawn: (max: number, rate: number) => void;
    removeCircle: (id: number) => void;
}

export const CircleHandler = create<Circles>((set, get) => ({
    objects: [],
    lastSpawn: 0,

    trySpawn: (max, rate) => {
        const { objects, lastSpawn } = get();
        const now = Date.now() / 1000;

        if (objects.length >= max) return;
        if (now - lastSpawn < rate) return;

        const newObj: Circle = {
            id: now * 1000,
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
}));