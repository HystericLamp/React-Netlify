/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { isAdjacent, swapTiles, Move } from "../utils/aStarSolverUtils";
import SolverWorker from '../utils/solverWorker?worker';

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
    const [isSolving, setIsSolving] = useState(false);

    const resetPuzzle = () => {
        setTiles(initialTiles)
        setSolutionPath([])
    }
    
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
        const worker = new SolverWorker();

        setIsSolving(true);
        setSolutionPath([]);

        worker.postMessage({ tiles });

        worker.onmessage = (event: MessageEvent<Move[]>) => {
            const solvedPath = event.data;
            setSolutionPath(solvedPath);
            animateSolutionFromPath(solvedPath);
            setIsSolving(false);
            worker.terminate();
        };

        worker.onerror = (error: any) => {
            console.error("Worker error:", error);
            setIsSolving(false);
            setSolutionPath(["Nill"]);
            worker.terminate();
        };
    };
    
    return (
        <section className="text-center">
            <div className="max-w-screen-lg mx-auto">
                <h2 className="text-4xl font-semibold mb-8 gradient-light-text dark:gradient-dark-text">
                    Interactive Demo
                </h2>

                <p className="text-xl">
                    This demo showcases the A* Solver algorithm by trying to solve a sliding-puzzle problem.
                    The tiles move around so long as there is an empty slot nearby.
                    You can "shuffle" the puzzle or get the algorithm to "solve" it for you.
                    <br/>
                    <span className="font-bold text-indigo-700 dark:text-yellow-200">Keep in mind</span>: Sometimes the puzzle is un-solvable 
                </p>
            </div>
            
            <div className="flex flex-col items-center mt-10">
                <div className="grid grid-cols-3 gap-1 mb-10">
                    {tiles.map((tile, index) => (
                        <div
                            key={index}
                            onClick={() => handleClick(index)}
                            className={`
                                w-20 h-20 flex items-center justify-center text-xl font-bold rounded
                                ${tile === null ? 
                                    'bg-white dark:bg-indigo-800/80' : 
                                    'bg-white dark:bg-indigo-800/80'
                                }
                                ${!isAnimating && !isSolving && isAdjacent(index, tiles.indexOf(null)) ? 
                                    'hover:scale-105 hover:shadow-lg cursor-pointer' : 
                                    'cursor-default'
                                }
                            `}
                        >
                            {tile ?? ''}
                        </div>
                    ))}
                </div>
            </div>

            <div className="items-center space-x-4">
                <button
                    onClick={resetPuzzle}
                    disabled={isAnimating || isSolving}
                    className="button-light-hollow dark:button-dark-hollow"
                >
                    Reset
                </button>

                <button
                    onClick={shuffleTiles}
                    disabled={isAnimating || isSolving}
                    className="button-light-hollow dark:button-dark-hollow"
                >
                    Shuffle
                </button>

                <button
                    onClick={solvePuzzle}
                    disabled={isAnimating || isSolving}
                    className={`button-light-gradient-filled dark:button-dark-gradient-filled
                        ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
                >
                    Solve
                </button>
            </div>

            {isSolving && <p className="mt-2">Resolving path...</p>}

            {solutionPath.length > 0 && (
                <div className="mt-4">
                {solutionPath[0] === "Nill" ? (
                    <p>Unsolvable puzzle</p>
                ) : (
                    <>
                        <h2 className="text-lg font-bold mb-2 gradient-light-text dark:gradient-dark-text">Move Directions:</h2>
                        <p>{solutionPath.join(" → ")}</p>
                    </>
                )}
              </div>
            )}

                
        </section>
    );
};

export default ASolverDemo;