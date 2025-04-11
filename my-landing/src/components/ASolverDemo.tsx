import React, { useState } from "react";
import { calculatePath, isAdjacent, swapTiles, Move } from "../utils/AStarSolverUtils";
/**
 * This component builds a 3x3 grid that simulates an interactive sliding puzzle
 * User can move tiles around and randomize tile locations
 * It will then be automatically solved after user clicks 'solve'
 */

const initialTiles: (number | null)[] = [1, 2, 3, 4, 5, 6, 7, 8, null];

const ASolverDemo: React.FC = () => {
    const [tiles, setTiles] = useState<(number | null)[]>(initialTiles);
    const [solutionPath, setSolutionPath] = useState<string[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);
    
    const handleClick = (index: number) => {
        if (isAnimating) return;

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

    const animateSolutionFromPath = async (path: Move[]) => {
        setIsAnimating(true);
        
        let currentTiles = [...tiles];
        for (const move of path) {
            const emptyIndex = currentTiles.indexOf(null);
            let targetIndex = emptyIndex;
    
            if (move === "Up") targetIndex = emptyIndex - 3;
            if (move === "Down") targetIndex = emptyIndex + 3;
            if (move === "Left") targetIndex = emptyIndex - 1;
            if (move === "Right") targetIndex = emptyIndex + 1;
    
            currentTiles = swapTiles(currentTiles, emptyIndex, targetIndex);
            setTiles([...currentTiles]);
            await new Promise(res => setTimeout(res, 400));
        }

        setIsAnimating(false);
    };
    

    const solvePuzzle = () => {
        const solvedPath = calculatePath(tiles)
        setSolutionPath(solvedPath);
        animateSolutionFromPath(solvedPath)
    };
    
    return (
        <div className="flex flex-col items-center mt-10">
            <div className="grid grid-cols-3 gap-1 mb-10 relative">
                {tiles.map((tile, index) => (
                    <div
                    key={index}
                    onClick={() => handleClick(index)}
                    className={`
                        w-20 h-20 border flex items-center justify-center text-xl font-bold rounded
                        ${tile === null ? 'bg-gray-300' : 'bg-white'}
                        ${!isAnimating && isAdjacent(index, tiles.indexOf(null)) ? 'hover:bg-blue-100 cursor-pointer' : 'cursor-default'}
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
                disabled={isAnimating}
                className={`bg-red-500 text-white px-4 py-2 rounded transition 
                    ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
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