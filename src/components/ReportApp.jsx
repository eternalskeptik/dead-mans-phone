import { useState } from 'react';
import { CheckCircle, Share2 } from 'lucide-react';
import { useGame } from '../context/GameContext';

const ReportApp = () => {
  const { setCurrentApp } = useGame();
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('idle'); // idle | error | success

  const handleSubmit = (event) => {
    event.preventDefault();
    const normalized = location.trim().toLowerCase();
    const isCorrect =
      normalized === 'jamaica' ||
      normalized === 'kingston' ||
      normalized === 'kingston, jamaica';

    if (isCorrect) {
      setStatus('success');
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  const resetGame = () => {
    setLocation('');
    setStatus('idle');
    setCurrentApp(null);
  };

  const handleShareTime = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('URL copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  if (status === 'success') {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center bg-[#0f172a] text-green-400 p-6 font-mono">
        <div className="match-found text-center">
          <h1 className="text-6xl font-bold text-green-400 mb-6 tracking-wider">
            MATCH FOUND
          </h1>
          <div className="space-y-4 max-w-md">
            <p className="text-xl text-green-300 font-semibold">
              Case Closed
            </p>
            <p className="text-sm text-green-400/80">
              Suspect Apprehended. Good work, Detective.
            </p>
            <div className="mt-8 space-y-3">
              <button
                onClick={handleShareTime}
                className="w-full px-6 py-3 bg-green-500 text-black font-bold rounded-lg hover:bg-green-400 transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Share Your Time
              </button>
              <button
                onClick={resetGame}
                className="w-full px-6 py-3 bg-gray-700 text-green-400 font-semibold rounded-lg hover:bg-gray-600 transition-colors"
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`h-full w-full bg-[#0f172a] text-green-400 flex flex-col justify-between p-6 font-mono ${
        status === 'error' ? 'flash-red' : ''
      }`}
    >
      <header className="space-y-3">
        <h1 className="text-2xl font-bold text-green-400 tracking-wider">
          INTERPOL RED NOTICE DATABASE
        </h1>
        <div className="text-sm text-green-400/70 space-y-1">
          <p>SUBJECT: ALEX MILLER</p>
          <p>STATUS: AT LARGE</p>
          <p>PRIORITY: HIGH</p>
        </div>
      </header>

      <div className="flex-1 flex flex-col justify-center">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label
            htmlFor="report-location"
            className="block text-xs text-green-400/70 uppercase tracking-wider"
          >
            ENTER SUSPECT&apos;S CONFIRMED LOCATION
          </label>
          <div className="relative">
            <input
              id="report-location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-black/50 border border-green-500/50 rounded px-4 py-3 text-green-400 font-mono focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
              placeholder=">_"
              autoFocus
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400 blink-cursor">
              |
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500/20 border border-green-500 text-green-400 font-bold py-3 rounded hover:bg-green-500/30 transition-colors uppercase tracking-wider"
          >
            Submit Query
          </button>
          {status === 'error' && (
            <p className="text-sm text-red-400 font-bold text-center mt-2 uppercase tracking-wider">
              LOCATION INVALID - NO EXTRADITION MATCH
            </p>
          )}
        </form>
      </div>

      <footer className="text-xs text-green-400/50 text-center font-mono">
        CLASSIFIED - INTERPOL SECURE NETWORK
      </footer>
    </div>
  );
};

export default ReportApp;

