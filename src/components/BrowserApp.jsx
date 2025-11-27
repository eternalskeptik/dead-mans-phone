import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { RefreshCw, MoreHorizontal } from 'lucide-react';

const BrowserApp = () => {
  const { storyData } = useGame();
  const historyItems = storyData.apps.browser ?? [];
  const [showTrackingPage, setShowTrackingPage] = useState(false);
  const [flightNumber, setFlightNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [urlInput, setUrlInput] = useState('');
  const [searchError, setSearchError] = useState('');
  const [showSearchError, setShowSearchError] = useState(false);

  return (
    <div className="h-full w-full bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white flex flex-col">
      {/* Browser chrome */}
      <div className="px-4 py-3 bg-black/60 border-b border-white/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex gap-4 text-white/60 text-sm">
            <button className="hover:text-white transition-colors">
              Back
            </button>
            <button className="hover:text-white transition-colors">
              Forward
            </button>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const searchTerm = urlInput.trim().toLowerCase();
            
            // Check for F404 or Flight F404 - show error
            if (searchTerm === 'f404' || searchTerm === 'flight f404' || searchTerm.includes('f404')) {
              setShowSearchError(true);
              setSearchError('Error: Flight code is ambiguous. Multiple airlines found. Please visit the specific carrier\'s website to track.');
              setShowTrackingPage(false);
              setUrlInput('');
              return;
            }
            
            // Check for AeroCharter - show tracking page
            if (searchTerm.includes('aerocharter') || searchTerm === 'aerocharter.com' || searchTerm.includes('aerocharter.com/track')) {
              setShowTrackingPage(true);
              setShowSearchError(false);
              setSearchError('');
              setUrlInput('aerocharter.com/track');
              return;
            }
            
            // Default: clear error and reset
            setShowSearchError(false);
            setSearchError('');
          }}
          className="flex items-center gap-3 bg-white/10 rounded-2xl px-4 py-2 border border-white/10"
        >
          <RefreshCw className="w-4 h-4 text-white/70" />
          <input
            type="text"
            value={showTrackingPage ? 'aerocharter.com/track' : urlInput}
            onChange={(e) => {
              setUrlInput(e.target.value);
              setShowSearchError(false);
              setSearchError('');
            }}
            placeholder="Search or enter URL"
            className="bg-transparent flex-1 text-sm text-white/90 outline-none placeholder-white/40"
            readOnly={showTrackingPage}
          />
          <MoreHorizontal className="w-4 h-4 text-white/70" />
        </form>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {showSearchError ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-6">
              <p className="text-red-300 font-semibold text-center">
                {searchError}
              </p>
              <button
                onClick={() => {
                  setShowSearchError(false);
                  setSearchError('');
                  setUrlInput('');
                }}
                className="w-full mt-4 text-white/60 hover:text-white transition-colors text-sm"
              >
                ← Back
              </button>
            </div>
          </div>
        ) : showTrackingPage ? (
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-white mb-6">
              AeroCharter Logistics
            </h1>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <div>
                <label className="block text-sm text-white/80 mb-2">
                  Enter Flight Number
                </label>
                <input
                  type="text"
                  value={flightNumber}
                  onChange={(e) => {
                    setFlightNumber(e.target.value);
                    setTrackingResult(null);
                  }}
                  placeholder="Ex: G626"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => {
                  const flight = flightNumber.trim().toUpperCase();
                  if (flight === 'F404') {
                    // The winning clue
                    setTrackingResult({
                      success: true,
                      isWinning: true,
                      message: 'STATUS: ARRIVED - KINGSTON (KIN). PASSENGER: DAVID WEBB.',
                    });
                  } else if (flight === 'A745') {
                    // Decoy flight 1
                    setTrackingResult({
                      success: true,
                      isWinning: false,
                      message: 'STATUS: LANDED - BUENOS AIRES (EZE). PASSENGER: [REDACTED].',
                    });
                  } else if (flight === 'G321') {
                    // Decoy flight 2
                    setTrackingResult({
                      success: true,
                      isWinning: false,
                      message: 'STATUS: IN TRANSIT - PANAMA CITY (PTY). PASSENGER: [REDACTED].',
                    });
                  } else {
                    // Default error
                    setTrackingResult({
                      success: false,
                      error: 'FLIGHT NOT FOUND. PLEASE CHECK YOUR TICKET REFERENCE.',
                    });
                  }
                }}
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors active:scale-95"
              >
                Track
              </button>
              {trackingResult && (
                <div
                  className={`mt-4 p-4 rounded-lg ${
                    trackingResult.success
                      ? trackingResult.isWinning
                        ? 'bg-green-500/20 border border-green-500/50'
                        : 'bg-blue-500/20 border border-blue-500/50'
                      : 'bg-red-500/20 border border-red-500/50'
                  }`}
                >
                  {trackingResult.success ? (
                    <p className="text-white font-semibold">
                      {trackingResult.message}
                    </p>
                  ) : (
                    <p className="text-red-300 font-semibold">
                      ERROR: {trackingResult.error}
                    </p>
                  )}
                </div>
              )}
              <button
                onClick={() => {
                  setShowTrackingPage(false);
                  setFlightNumber('');
                  setTrackingResult(null);
                  setUrlInput('');
                }}
                className="w-full mt-4 text-white/60 hover:text-white transition-colors text-sm"
              >
                ← Back to History
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-4 text-white/90">
              Recent History
            </h2>
            <div className="space-y-3">
              {historyItems.map((item, index) => {
                const isAeroCharter =
                  item.url.includes('aerocharter') ||
                  item.title.toLowerCase().includes('aerocharter');
                return (
                  <article
                    key={`${item.url}-${index}`}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors"
                  >
                    <p className="text-sm text-white/80 font-medium">
                      {item.title}
                    </p>
                    {isAeroCharter ? (
                      <button
                        onClick={() => setShowTrackingPage(true)}
                        className="text-sky-400 text-sm mt-1 block break-all hover:underline"
                      >
                        {item.url}
                      </button>
                    ) : (
                      <a
                        href={`https://${item.url}`}
                        className="text-sky-400 text-sm mt-1 block break-all"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.url}
                      </a>
                    )}
                  </article>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BrowserApp;


