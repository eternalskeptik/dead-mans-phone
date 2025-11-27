import { useGame } from '../context/GameContext';

const GenericListApp = ({ type }) => {
  const { storyData } = useGame();
  const appData = storyData.apps.genericApps?.[type] ?? { title: '', items: [] };
  const isAI = type === 'ai';

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-white">
        <h1 className="text-xl font-semibold text-gray-900">{appData.title}</h1>
      </div>

      {/* Body - Scrollable List */}
      <div className="flex-1 overflow-y-auto">
        {appData.items.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>No items</p>
          </div>
        ) : (
          <div className={isAI ? '' : 'divide-y divide-gray-100'}>
            {appData.items.map((item, index) => (
              <div
                key={index}
                className={`px-4 py-3 transition-colors ${
                  isAI
                    ? 'border-b border-gray-100 bg-gray-50/30 hover:bg-gray-50/50'
                    : 'hover:bg-gray-50 border-b border-gray-100'
                }`}
              >
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GenericListApp;

