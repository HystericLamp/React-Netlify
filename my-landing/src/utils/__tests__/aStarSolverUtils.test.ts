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
        const tiles = [1, 2, 3, 4, 5, 6, 7, 8, null];
        const path = calculatePath(tiles);

        expect(path).not.toBeNull();
        expect(path.length).toEqual(0);
    });

    it('solves simple scrambled puzzle', () => {
        const tiles = [1, 2, 3, 4, 5, 6, 7, null, 8];
        const path = calculatePath(tiles);
        
        let pathStr = "";
        expect(path).not.toBeNull();
        expect(path.length).toEqual(1);
        for(const move of path) {
            expect(move).not.toEqual("Nill")
            pathStr += move + " "
        }

        expect(pathStr).toEqual("Right ")
    });

    it('returns Nill for unsolvable puzzle', () => {
        const unsolvable = [1, 2, 3, 4, 5, 6, 8, 7, null];
        const path = calculatePath(unsolvable);

        expect(path).not.toBeNull();
        expect(path.length).toEqual(1);
        for(const move of path) {
            expect(move).toEqual("Nill")
        }
    });
});