import React, { useState } from "react";
import { calculatePath, isAdjacent, swapTiles,  } from "../utils/AStarSolverUtils";
/**
 * This component builds a 3x3 grid that simulates an interactive sliding puzzle
 * User can move tiles around and randomize tile locations
 * It will then be automatically solved after user clicks 'solve'
 */

const initialTiles: (number | null)[] = [1, 2, 3, 4, 5, 6, 7, 8, null];

const ASolverDemo: React.FC = () => {
    const [tiles, setTiles] = useState<(number | null)[]>(initialTiles);
    const [solutionPath, setSolutionPath] = useState<string[]>([]);
    
    const handleClick = (index: number) => {
        // Swaps tile if there is an empty slot
        const emptyIndex = tiles.indexOf(null);
        if (!isAdjacent(index, emptyIndex)) return;

        const newTiles = swapTiles(tiles, emptyIndex, index);
        setTiles(newTiles);
    };

    const shuffleTiles = () => {
        // Shuffles all tiles
        const shuffledTiles = [...initialTiles];
        for (let i = shuffledTiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); 
            [shuffledTiles[i], shuffledTiles[j]] = [shuffledTiles[j], shuffledTiles[i]];
        }

        setTiles(shuffledTiles);
    };

    const solvePuzzle = () => {
        const solvedPath = calculatePath(tiles)
        setSolutionPath(solvedPath);
    }

    return (
        <div className="flex flex-col items-center mt-10">
            <div className="grid grid-cols-3 gap-1 mb-10">
                {tiles.map((tile, i) => (
                    <div
                    key={i}
                    onClick={() => handleClick(i)}
                    className={`
                        w-20 h-20 border flex items-center justify-center text-xl font-bold rounded
                        ${tile === null ? 'bg-white' : 'bg-blue-400 text-white'}
                    `}
                    >
                        {tile ?? ''}
                    </div>
                ))}
            </div>
            <button
                onClick={shuffleTiles}
                className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
            >
                Shuffle
            </button>

            <button
                onClick={solvePuzzle}
                className="mb-4 px-4 py-2 bg-red-500 text-white rounded"
            >
                Solve
            </button>

            {solutionPath.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-lg font-bold mb-2">Move Directions:</h2>
                    <p>{solutionPath.join(" → ")}</p>
                </div>
            )}

        </div>
    );
};

export default ASolverDemo;