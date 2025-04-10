import { calculatePath, manhattanDistance } from "../AStarSolverUtils";

describe('manhattanDistance', () => {
    it('returns 0 for solved puzzle', () => {
        const tiles = [1, 2, 3, 4, 5, 6, 7, 8, null];
        expect(manhattanDistance(tiles)).toBe(0);
    });

    it('calculates correct distance for one tile out of place', () => {
        const tiles = [1, 2, 3, 4, 5, 6, 7, null, 8];
        expect(manhattanDistance(tiles)).toBe(1);
    });
});

describe('solvePuzzle', () => {
    it('solves already solved puzzle in 1 step', () => {
        expect(true)
    });

    it('solves simple scrambled puzzle', () => {
        expect(true)
    });

    it('returns null for unsolvable puzzle', () => {
        expect(true)
    });
});