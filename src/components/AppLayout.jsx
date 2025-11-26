import { ChevronLeft } from 'lucide-react';
import { useGame } from '../context/GameContext';

const AppLayout = ({ title, children }) => {
  const { setCurrentApp } = useGame();

  return (
    <div className="w-full h-full bg-black text-white flex flex-col app-transition">
      <header
        className="flex items-center gap-3 px-4 pb-4 min-h-[4rem] border-b border-white/10"
        style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), 3rem)' }}
      >
        <button
          onClick={() => setCurrentApp(null)}
          className="p-2 rounded-full hover:bg-white/10 transition-colors active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <p className="text-xs text-white/60">Back</p>
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 to-black app-transition">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;


