import { useState } from 'react';
import { useGame } from '../context/GameContext';

const MailApp = () => {
  const { storyData } = useGame();
  const emails = storyData.apps.mail ?? [];
  const [selectedEmail, setSelectedEmail] = useState(null);

  const formatDate = (dateStr) => {
    if (dateStr === 'Today' || dateStr === 'Yesterday') {
      return dateStr;
    }
    return dateStr;
  };

  if (selectedEmail) {
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={() => setSelectedEmail(null)}
            className="text-blue-500 text-sm mb-2"
          >
            ← Back
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            {selectedEmail.subject}
          </h2>
          <div className="text-sm text-gray-600 mt-1">
            From: {selectedEmail.from} • {formatDate(selectedEmail.date)}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
            {selectedEmail.body}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">Inbox</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        {emails.map((email) => (
          <button
            key={email.id}
            onClick={() => setSelectedEmail(email)}
            className={`w-full p-4 border-b border-gray-100 text-left hover:bg-gray-50 transition-colors ${
              !email.read ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-1">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900">
                    {email.from}
                  </span>
                  {!email.read && (
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                  )}
                </div>
                <p className="text-sm text-gray-700 font-medium">
                  {email.subject}
                </p>
              </div>
              <span className="text-xs text-gray-500 ml-4 whitespace-nowrap">
                {formatDate(email.date)}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1 line-clamp-1">
              {email.body.substring(0, 60)}...
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MailApp;


