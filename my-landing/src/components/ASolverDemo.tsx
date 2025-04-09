import React, { useState } from "react";
/**
 * This component builds a 3x3 grid that simulates an interactive sliding puzzle
 * User can move tiles around and randomize tile locations
 * It will then be automatically solved after user clicks 'solve'
 */

const initialTiles: (number | null)[] = [1, 2, 3, 4, 5, 6, 7, 8, null];
const gridSize = 3;

const ASolverDemo: React.FC = () => {
    const [tiles, setTiles] = useState<(number | null)[]>(initialTiles);

    const handleClick = (index: number) => {
        // Swaps tile if empty
        const emptyIndex = tiles.indexOf(null);
        if (!isAdjacent(index, emptyIndex)) return;
    
        const newTiles = [...tiles];
        [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
        setTiles(newTiles);
    };
    
    const isAdjacent = (index: number, empty: number): boolean => {
        const x1 = index % gridSize;
        const y1 = Math.floor(index / gridSize);
        const x2 = empty % gridSize;
        const y2 = Math.floor(empty / gridSize);
    
        const dx = Math.abs(x1 - x2);
        const dy = Math.abs(y1 - y2);
    
        return (dx + dy === 1);
    };

    const shuffleTiles = () => {
        const shuffledTiles = [...initialTiles];
        for (let i = shuffledTiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); 
            [shuffledTiles[i], shuffledTiles[j]] = [shuffledTiles[j], shuffledTiles[i]]; // Swap
        }

        setTiles(shuffledTiles);
    };

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
        </div>
    );
};

export default ASolverDemo;