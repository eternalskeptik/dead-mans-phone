import { useGame } from '../context/GameContext';
import { RefreshCw, MoreHorizontal } from 'lucide-react';

const BrowserApp = () => {
  const { storyData } = useGame();
  const historyItems = storyData.apps.browser ?? [];

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
        <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-4 py-2 border border-white/10">
          <RefreshCw className="w-4 h-4 text-white/70" />
          <input
            readOnly
            value="google.com"
            className="bg-transparent flex-1 text-sm text-white/90 outline-none select-none"
          />
          <MoreHorizontal className="w-4 h-4 text-white/70" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <h2 className="text-lg font-semibold mb-4 text-white/90">
          Recent History
        </h2>
        <div className="space-y-3">
          {historyItems.map((item, index) => (
            <article
              key={`${item.url}-${index}`}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors"
            >
              <p className="text-sm text-white/80 font-medium">{item.title}</p>
              <a
                href={`https://${item.url}`}
                className="text-sky-400 text-sm mt-1 block break-all"
                target="_blank"
                rel="noreferrer"
              >
                {item.url}
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowserApp;


