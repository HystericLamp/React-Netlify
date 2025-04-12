const gridSize = 3;
const goalState: (number | null)[] = [1, 2, 3, 4, 5, 6, 7, 8, null];

export type Move = "Up" | "Down" | "Left" | "Right" | "Nill";

// Manhattan Distance Heuristic
// Calculates the difference in rows (dx) and columns (dy) between the current position and the target position.
export function manhattanDistance(tiles: (number | null)[]) {
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

export function getNeighbors(emptyIndex: number): number[] {
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
export function swapTiles(tiles: (number | null)[], i: number, j: number): (number | null)[] {
    const newTiles = [...tiles];
    [newTiles[i], newTiles[j]] = [newTiles[j], newTiles[i]];
    return newTiles;
}

function processMove(path: Move[], newState: (number | null)[], oldState: (number | null)[]): Move[] {
    const newStateIndex = newState.indexOf(null)
    const oldStateIndex = oldState.indexOf(null)

    if ((oldStateIndex- newStateIndex) == 3) path.push("Up");
    if ((oldStateIndex- newStateIndex) == -3) path.push("Down");
    if ((oldStateIndex- newStateIndex) == 1) path.push("Left");
    if ((oldStateIndex- newStateIndex) == -1) path.push("Right");

    return path;
}

function reconstructSteps(cameFrom: Map<string, string>, current: string): Move[] {
    const path: Move[] = [];
    let curr = current;

    while (cameFrom.has(curr)) {
        const prev = cameFrom.get(curr)!;
        const prevState = JSON.parse(prev) as (number | null)[];
        const currState = JSON.parse(curr) as (number | null)[];
        processMove(path, currState, prevState);
        curr = prev;
    }

    return path.reverse();
}

// A* Algorithm
// f(n) = g(n) + h(n): This is the total estimated cost to reach the goal.
// g(n): The cost of getting from the start node to node n.
// h(n): The heuristic — an estimate of the cost from n to the goal. In this case, the Manhattan distance heuristic will measure how far each tile is from its target position.
export function calculatePath(currentTileState: (number | null)[]): Move[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const openList: any[] = [];
    const closedList: Set<string> = new Set();
    const cameFrom: Map<string, string> = new Map();
    const gScore: Map<string, number> = new Map();
    const fScore: Map<string, number> = new Map();

    // Set the starting state
    const startState = currentTileState;
    const startStateStr = JSON.stringify(startState);
    openList.push({ state: startState, gScore: 0, fScore: manhattanDistance(startState) });
    gScore.set(startStateStr, 0);
    fScore.set(startStateStr, manhattanDistance(startState));

    while (openList.length > 0) {
        // Sort openList by fScore (lowest fScore first)
        openList.sort((a, b) => a.fScore - b.fScore);
        const current = openList.shift()!;
        const currentState = current.state;
        const currentStateStr = JSON.stringify(currentState);
  
        if (currentStateStr === JSON.stringify(goalState)) {
            return reconstructSteps(cameFrom, currentStateStr);
        }

        // Holds already visited states
        closedList.add(currentStateStr);

        // Get valid neighbors (tiles that can be swapped with the empty space)
        const emptyIndex = currentState.indexOf(null);
        const neighbors = getNeighbors(emptyIndex);

        for (const neighbor of neighbors) {
            const newState = swapTiles(currentState, emptyIndex, neighbor);
            const newStateStr = JSON.stringify(newState);
    
            if (closedList.has(newStateStr)) continue;
    
            const tentativeGScore = gScore.get(currentStateStr)! + 1;
    
            if (!gScore.has(newStateStr) || tentativeGScore < gScore.get(newStateStr)!) {
                cameFrom.set(newStateStr, currentStateStr);
                gScore.set(newStateStr, tentativeGScore);
                fScore.set(newStateStr, tentativeGScore + manhattanDistance(newState));
    
                if (!openList.some((item) => item.state === newState)) {
                    openList.push({ state: newState, gScore: tentativeGScore, fScore: fScore.get(newStateStr)! });
                }
            }
        }
    }

    return ["Nill"];
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