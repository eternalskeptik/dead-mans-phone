import { useGame } from '../context/GameContext';

const CalendarApp = () => {
  const { storyData } = useGame();
  const events = storyData.apps.calendar ?? [];

  // Group events by date
  const groupedEvents = events.reduce((acc, event) => {
    if (!acc[event.date]) {
      acc[event.date] = [];
    }
    acc[event.date].push(event);
    return acc;
  }, {});

  // Sort dates
  const sortedDates = Object.keys(groupedEvents).sort();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-500';
      case 'work':
        return 'bg-blue-500';
      case 'personal':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">Calendar</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        {sortedDates.map((date) => (
          <div key={date} className="border-b border-gray-100">
            <div className="p-4 bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900">
                {formatDate(date)}
              </h2>
            </div>
            <div className="p-4 space-y-3">
              {groupedEvents[date].map((event, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div
                    className={`w-3 h-3 rounded-full mt-1 ${getTypeColor(
                      event.type
                    )}`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {event.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 capitalize">
                      {event.type}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarApp;


