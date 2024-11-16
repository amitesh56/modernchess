import React, { useState, useCallback } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { RotateCw, Crown } from 'lucide-react';
import MoveHistory from './MoveHistory';

export default function ChessGame() {
  const [game, setGame] = useState(new Chess());
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [boardOrientation, setBoardOrientation] = useState('white');

  const makeMove = useCallback((move: any) => {
    try {
      const result = game.move(move);
      if (result) {
        setGame(new Chess(game.fen()));
        setMoveHistory([...moveHistory, game.history().slice(-1)[0]]);
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  }, [game, moveHistory]);

  function onDrop(sourceSquare: string, targetSquare: string) {
    const move = makeMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });
    return move;
  }

  function resetGame() {
    setGame(new Chess());
    setMoveHistory([]);
  }

  function flipBoard() {
    setBoardOrientation(boardOrientation === 'white' ? 'black' : 'white');
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center w-full max-w-7xl mx-auto p-4">
      <div className="w-full lg:w-[600px]">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <Chessboard 
            position={game.fen()}
            onPieceDrop={onDrop}
            boardOrientation={boardOrientation}
            customBoardStyle={{
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={resetGame}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <RotateCw size={20} />
              Reset Game
            </button>
            <button
              onClick={flipBoard}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Crown size={20} />
              Flip Board
            </button>
          </div>
        </div>
      </div>
      
      <div className="w-full lg:w-80">
        <MoveHistory moves={moveHistory} />
        <div className="mt-4 bg-white rounded-xl shadow-lg p-4">
          <h2 className="text-xl font-bold mb-2">Game Status</h2>
          <div className="space-y-2">
            <p>Turn: <span className="font-semibold">{game.turn() === 'w' ? 'White' : 'Black'}</span></p>
            <p>Check: <span className="font-semibold">{game.isCheck() ? 'Yes' : 'No'}</span></p>
            <p>Game Over: <span className="font-semibold">{game.isGameOver() ? 'Yes' : 'No'}</span></p>
            {game.isGameOver() && (
              <p className="text-red-500 font-bold">
                {game.isCheckmate() ? 'Checkmate!' : game.isDraw() ? 'Draw!' : 'Game Over!'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}