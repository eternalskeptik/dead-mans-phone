import { useGame } from '../context/GameContext';
import {
  MessageCircle,
  Image as ImageIcon,
  FileText,
  Globe,
  ShieldAlert,
  Mail,
  Calendar,
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
      id: 'photos',
      name: 'Photos',
      icon: ImageIcon,
      color: 'bg-blue-500',
      count: storyData.apps.photos.length,
    },
    {
      id: 'notes',
      name: 'Notes',
      icon: FileText,
      color: 'bg-yellow-500',
      count: storyData.apps.notes.length,
    },
    {
      id: 'mail',
      name: 'Mail',
      icon: Mail,
      color: 'bg-purple-500',
      count: storyData.apps.mail?.length ?? 0,
    },
    {
      id: 'calendar',
      name: 'Calendar',
      icon: Calendar,
      color: 'bg-orange-500',
      count: storyData.apps.calendar?.length ?? 0,
    },
    {
      id: 'browser',
      name: 'Browser',
      icon: Globe,
      color: 'bg-indigo-500',
      count: storyData.apps.browser?.length ?? 0,
    },
    {
      id: 'report',
      name: 'Report Case',
      icon: ShieldAlert,
      color: 'bg-red-600',
      count: 0,
    },
  ];

  return (
    <div
      className="w-full h-full relative"
      style={{
        backgroundImage: `url(${storyData.device.wallpaperUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 h-full p-6">
        {/* Status Bar */}
        <div className="flex justify-between items-center text-white text-sm mb-8">
          <div>9:41</div>
          <div className="flex items-center gap-1">
            <div className="text-xs">🔋</div>
            <div className="text-xs">{storyData.device.batteryLevel}%</div>
          </div>
        </div>

        {/* App Grid */}
        <div className="grid grid-cols-3 gap-6 max-h-[calc(100%-80px)] overflow-y-auto">
          {apps.map((app) => {
            const IconComponent = app.icon;
            return (
              <button
                key={app.id}
                onClick={() => setCurrentApp(app.id)}
                className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
              >
                <div
                  className={`${app.color} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg`}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <span className="text-white text-xs">{app.name}</span>
                {app.count > 0 && (
                  <span className="text-white/60 text-[10px]">{app.count}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;

