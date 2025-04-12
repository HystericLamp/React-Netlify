import { calculatePath, Move } from "./aStarSolverUtils"

self.onmessage = (e: MessageEvent<{ tiles: (number | null)[] }>) => {
    const { tiles } = e.data;
    const result: Move[] = calculatePath(tiles);
    self.postMessage(result);
};

export {};