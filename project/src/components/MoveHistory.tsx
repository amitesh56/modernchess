import React from 'react';
import { ScrollText } from 'lucide-react';

interface MoveHistoryProps {
  moves: string[];
}

export default function MoveHistory({ moves }: MoveHistoryProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <ScrollText className="text-blue-500" />
        <h2 className="text-xl font-bold">Move History</h2>
      </div>
      <div className="h-60 overflow-y-auto">
        {moves.length === 0 ? (
          <p className="text-gray-500 italic">No moves yet</p>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {moves.map((move, index) => (
              <div
                key={index}
                className={`p-2 ${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'
                } rounded`}
              >
                {index % 2 === 0 && (
                  <span className="text-gray-500 mr-2">
                    {Math.floor(index / 2) + 1}.
                  </span>
                )}
                {move}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}