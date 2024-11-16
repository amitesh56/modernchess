import React from 'react';
import ChessGame from './components/ChessGame';
import { Sword } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Sword className="h-8 w-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900">Modern Chess</h1>
          </div>
        </div>
      </header>

      <main className="py-8">
        <ChessGame />
      </main>

      <footer className="bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-gray-500">
            Built with React and Chess.js • Inspired by chess.com
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;