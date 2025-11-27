import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useGame } from '../context/GameContext';

const MessagesApp = () => {
  const { storyData } = useGame();
  const contacts = storyData.apps.messages;
  const [selectedContactIndex, setSelectedContactIndex] = useState(null);

  // View B: Chat Thread
  if (selectedContactIndex !== null) {
    const activeContact = contacts[selectedContactIndex];
    return (
      <div className="h-full flex flex-col bg-black">
        {/* Header with Back button */}
        <header className="flex items-center gap-3 p-4 border-b border-white/10">
          <button
            onClick={() => setSelectedContactIndex(null)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-lg font-semibold text-white">
            {activeContact.contact}
          </h2>
        </header>

        {/* Chat area */}
        <section className="flex-1 overflow-y-auto p-4 space-y-3">
          {activeContact.history.map((message, idx) => {
            const isMe = message.sender === 'me';
            return (
              <div
                key={`${message.time}-${idx}`}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl p-3 text-sm ${
                    isMe
                      ? 'bg-blue-500 text-white rounded-br-sm'
                      : 'bg-white/15 text-white rounded-bl-sm'
                  }`}
                >
                  <p>{message.text}</p>
                  <span className="block text-[10px] text-white/60 mt-1 text-right">
                    {message.time}
                  </span>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    );
  }

  // View A: Contact List
  return (
    <div className="h-full flex flex-col bg-black">
      <div className="p-4 border-b border-white/10">
        <h1 className="text-xl font-semibold text-white">Messages</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {contacts.map((contact, index) => (
          <button
            key={contact.contact}
            onClick={() => setSelectedContactIndex(index)}
            className="w-full flex items-center gap-3 p-3 rounded-2xl transition-colors bg-white/5 hover:bg-white/10"
          >
            <img
              src={contact.avatar}
              alt={contact.contact}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="text-left flex-1">
              <p className="font-semibold text-white">{contact.contact}</p>
              <p className="text-xs text-white/60">
                {contact.lastActive} •{' '}
                {contact.history[contact.history.length - 1]?.text}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MessagesApp;



