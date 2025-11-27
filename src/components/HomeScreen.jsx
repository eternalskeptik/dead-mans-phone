import { useGame } from '../context/GameContext';
import {
  MessageCircle,
  Image as ImageIcon,
  FileText,
  Globe,
  Siren,
  Mail,
  Calendar,
  CreditCard,
  Newspaper,
  Car,
  Pizza,
  Trophy,
  Bot,
  Headphones,
  Settings,
} from 'lucide-react';

const HomeScreen = () => {
  const { setCurrentApp, storyData } = useGame();

  const apps = [
    {
      id: 'messages',
      name: 'Messages',
      icon: MessageCircle,
      color: 'bg-green-500',
      count: storyData.apps.messages.length,
    },
    {
      id: 'mail',
      name: 'Mail',
      icon: Mail,
      color: 'bg-purple-500',
      count: (storyData.apps.mail?.inbox ?? []).length,
    },
    {
      id: 'news',
      name: 'News',
      icon: Newspaper,
      color: 'bg-rose-500',
      count: storyData.apps.genericApps?.news?.items?.length ?? 0,
    },
    {
      id: 'rides',
      name: 'Rides',
      icon: Car,
      color: 'bg-slate-600',
      count: storyData.apps.genericApps?.rides?.items?.length ?? 0,
    },
    {
      id: 'notes',
      name: 'Notes',
      icon: FileText,
      color: 'bg-yellow-500',
      count: storyData.apps.notes.length,
    },
    {
      id: 'browser',
      name: 'Browser',
      icon: Globe,
      color: 'bg-indigo-500',
      count: storyData.apps.browser?.length ?? 0,
    },
    {
      id: 'bank',
      name: 'Bank',
      icon: CreditCard,
      color: 'bg-emerald-500',
      count: storyData.apps.bank?.length ?? 0,
    },
    {
      id: 'photos',
      name: 'Photos',
      icon: ImageIcon,
      color: 'bg-blue-500',
      count: storyData.apps.photos.length,
    },
    {
      id: 'calendar',
      name: 'Calendar',
      icon: Calendar,
      color: 'bg-orange-500',
      count: storyData.apps.calendar?.length ?? 0,
    },
    {
      id: 'food',
      name: 'Food',
      icon: Pizza,
      color: 'bg-orange-600',
      count: storyData.apps.genericApps?.food?.items?.length ?? 0,
    },
    {
      id: 'sports',
      name: 'Sports',
      icon: Trophy,
      color: 'bg-amber-500',
      count: storyData.apps.genericApps?.sports?.items?.length ?? 0,
    },
    {
      id: 'ai',
      name: 'AI',
      icon: Bot,
      color: 'bg-cyan-500',
      count: storyData.apps.genericApps?.ai?.items?.length ?? 0,
    },
    {
      id: 'music',
      name: 'Music',
      icon: Headphones,
      color: 'bg-pink-500',
      count: storyData.apps.genericApps?.music?.items?.length ?? 0,
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: Settings,
      color: 'bg-gray-600',
      count: 0,
    },
    {
      id: 'report',
      name: 'Report Case',
      icon: Siren,
      color: 'bg-red-600',
      count: 0,
      isReport: true,
    },
  ];

  return (
    <>
      <style>{`
        .app-grid-scroll::-webkit-scrollbar {
          display: none;
        }
        .app-grid-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div
        className="w-full h-full relative"
        style={{
          backgroundImage: `url(${storyData.device.wallpaperUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex flex-col">
          {/* Status Bar */}
          <div className="flex justify-between items-center text-white text-sm px-6 pt-6 pb-4">
            <div>9:41</div>
            <div className="flex items-center gap-1">
              <div className="text-xs">🔋</div>
              <div className="text-xs">{storyData.device.batteryLevel}%</div>
            </div>
          </div>

          {/* App Grid */}
          <div className="flex-1 grid grid-cols-3 gap-y-8 gap-x-6 px-6 pb-6 overflow-y-auto overflow-x-hidden app-grid-scroll">
          {apps.map((app) => {
            const IconComponent = app.icon;
            return (
              <button
                key={app.id}
                onClick={() => setCurrentApp(app.id)}
                className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
              >
                <div
                  className={`${app.color} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${
                    app.isReport ? 'ring-2 ring-red-400' : ''
                  }`}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <span
                  className={`text-xs text-center ${
                    app.isReport
                      ? 'text-red-400 font-semibold'
                      : 'text-white font-medium'
                  }`}
                >
                  {app.name}
                </span>
                {app.count > 0 && (
                  <span className="text-white/60 text-[10px]">{app.count}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
};

export default HomeScreen;

