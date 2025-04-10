const gridSize = 3;
const goalState: (number | null)[] = [1, 2, 3, 4, 5, 6, 7, 8, null];

export type Move = "Up" | "Down" | "Left" | "Right";

// Manhattan Distance Heuristic
// Calculates the difference in rows (dx) and columns (dy) between the current position and the target position.
export const manhattanDistance = (tiles: (number | null)[]) => {
    let distance = 0
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i] !== null) {
            const targetIndex = goalState.indexOf(tiles[i]!);
            const targetRow = Math.floor(targetIndex / gridSize);
            const targetCol = targetIndex % gridSize;
            const currentRow = Math.floor(i / gridSize);
            const currentCol = i % gridSize;
            distance += Math.abs(currentRow - targetRow) + Math.abs(currentCol - targetCol);
        }
    }

    return distance
}

export const getNeighbors = (emptyIndex: number): number[] => {
    // Get all valid neighbors of an empty tile
    const neighbors: number[] = []
    const row = Math.floor(emptyIndex / gridSize);
    const col = emptyIndex % gridSize;

    if (row > 0) neighbors.push(emptyIndex - gridSize); // Up
    if (row < (gridSize - 1)) neighbors.push(emptyIndex + gridSize) // Down
    if (col > 0) neighbors.push(emptyIndex - 1); // Left
    if (col < gridSize - 1) neighbors.push(emptyIndex + 1); // Right

    return neighbors;
}

// Swaps selected tile with the empty tile, if adjacent
export const swapTiles = (tiles: (number | null)[], i: number, j: number): (number | null)[] => {
    const newTiles = [...tiles];
    [newTiles[i], newTiles[j]] = [newTiles[j], newTiles[i]];
    return newTiles;
}

// A* Algorithm
// f(n) = g(n) + h(n): This is the total estimated cost to reach the goal.
// g(n): The cost of getting from the start node to node n.
// h(n): The heuristic — an estimate of the cost from n to the goal. In this case, the Manhattan distance heuristic will measure how far each tile is from its target position.
export const calculatePath = (currentTileState: (number | null)[]): Move[] => {
    // A*Solver logic

    const path: Move[] = ["Right", "Down", "Left", "Up"];
    return path
};

export const isAdjacent = (index: number, empty: number): boolean => {
    const x1 = index % gridSize;
    const y1 = Math.floor(index / gridSize);
    const x2 = empty % gridSize;
    const y2 = Math.floor(empty / gridSize);

    const dx = Math.abs(x1 - x2);
    const dy = Math.abs(y1 - y2);

    return (dx + dy === 1);
};