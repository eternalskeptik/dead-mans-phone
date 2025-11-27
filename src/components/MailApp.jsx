import { useState } from 'react';
import { useGame } from '../context/GameContext';

const MailApp = () => {
  const { storyData } = useGame();
  const mailData = storyData.apps.mail ?? {};
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [activeTab, setActiveTab] = useState('Inbox');
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [isLocked, setIsLocked] = useState(true);
  const [showReset, setShowReset] = useState(false);
  const [password, setPassword] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [error, setError] = useState('');

  const formatDate = (dateStr) => {
    if (dateStr === 'Today' || dateStr === 'Yesterday') {
      return dateStr;
    }
    return dateStr;
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setError('Incorrect Password');
    setPassword('');
    setTimeout(() => setError(''), 3000);
  };

  const handleSecurityVerify = (e) => {
    e.preventDefault();
    if (securityAnswer.trim().toLowerCase() === 'oak creek') {
      setIsLocked(false);
      setShowReset(false);
      setSecurityAnswer('');
      setError('');
    } else {
      setError('Identity Verification Failed');
      setSecurityAnswer('');
      setTimeout(() => setError(''), 3000);
    }
  };

  // Locked Screen View
  if (isLocked && !showReset) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white p-8">
        <div className="w-full max-w-sm">
          {/* Mail Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8">
            Welcome Back
          </h2>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors active:scale-95"
            >
              Sign In
            </button>
          </form>

          <button
            onClick={() => {
              setShowReset(true);
              setError('');
              setPassword('');
            }}
            className="w-full mt-4 text-blue-500 text-sm hover:text-blue-600 transition-colors"
          >
            Forgot Password?
          </button>
        </div>
      </div>
    );
  }

  // Security Question View
  if (isLocked && showReset) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white p-8">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">
            Security Check
          </h2>

          <p className="text-gray-600 text-center mb-6">
            Please answer your security question to reset access.
          </p>

          <form onSubmit={handleSecurityVerify} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What is the name of your first elementary school?
              </label>
              <input
                type="text"
                value={securityAnswer}
                onChange={(e) => {
                  setSecurityAnswer(e.target.value);
                  setError('');
                }}
                placeholder="Enter your answer"
                className="w-full px-4 py-3 bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors active:scale-95"
            >
              Verify
            </button>
          </form>

          <button
            onClick={() => {
              setShowReset(false);
              setError('');
              setSecurityAnswer('');
            }}
            className="w-full mt-4 text-gray-500 text-sm hover:text-gray-700 transition-colors"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  // Get current email list based on active tab and selected label
  const getCurrentEmailList = () => {
    if (activeTab === 'Labels' && selectedLabel) {
      return mailData.labels?.[selectedLabel] ?? [];
    }
    
    switch (activeTab) {
      case 'Inbox':
        return mailData.inbox ?? [];
      case 'Sent':
        return mailData.sent ?? [];
      case 'Drafts':
        return mailData.drafts ?? [];
      case 'Trash':
        return mailData.trash ?? [];
      case 'Spam':
        return mailData.spam ?? [];
      default:
        return [];
    }
  };

  // Get label folders list
  const getLabelFolders = () => {
    return Object.keys(mailData.labels ?? {});
  };

  // Handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSelectedEmail(null);
    setSelectedLabel(null);
  };

  // Handle label folder click
  const handleLabelFolderClick = (labelName) => {
    setSelectedLabel(labelName);
    setSelectedEmail(null);
  };

  // Email Detail View
  if (selectedEmail) {
    const isSentOrDrafts = activeTab === 'Sent' || activeTab === 'Drafts';
    const isTrash = activeTab === 'Trash';
    const hasToField = selectedEmail.to !== undefined;

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
            {isSentOrDrafts || hasToField ? (
              <>To: {selectedEmail.to} • {formatDate(selectedEmail.date)}</>
            ) : (
              <>From: {selectedEmail.from} • {formatDate(selectedEmail.date)}</>
            )}
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

  // Labels Folder List View
  if (activeTab === 'Labels' && !selectedLabel) {
    const labelFolders = getLabelFolders();
    
    return (
      <div className="h-full flex flex-col bg-white">
        {/* Email List Area */}
        <div className="flex-1 overflow-y-auto">
          {labelFolders.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p>No labels</p>
            </div>
          ) : (
            labelFolders.map((labelName) => {
              const labelEmails = mailData.labels?.[labelName] ?? [];
              return (
                <button
                  key={labelName}
                  onClick={() => handleLabelFolderClick(labelName)}
                  className="w-full p-4 border-b border-gray-100 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-1">
                        {labelName}
                      </div>
                      <p className="text-sm text-gray-500">
                        {labelEmails.length} {labelEmails.length === 1 ? 'email' : 'emails'}
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Tab Bar */}
        <div className="border-t border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <div className="flex min-w-max">
              {['Inbox', 'Sent', 'Drafts', 'Labels', 'Trash', 'Spam'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab
                      ? 'text-blue-500 border-b-2 border-blue-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Label Folder Email List View
  if (activeTab === 'Labels' && selectedLabel) {
    const currentList = getCurrentEmailList();
    
    return (
      <div className="h-full flex flex-col bg-white">
        {/* Email List */}
        <div className="flex-1 overflow-y-auto">
          {currentList.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p>No emails in {selectedLabel}</p>
            </div>
          ) : (
            <>
              {/* Back Button */}
              <button
                onClick={() => {
                  setSelectedLabel(null);
                  setSelectedEmail(null);
                }}
                className="w-full p-4 border-b border-gray-200 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2 text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span className="font-medium">Back to Labels</span>
                </div>
              </button>
              
              {currentList.map((email) => (
                <button
                  key={email.id}
                  onClick={() => setSelectedEmail(email)}
                  className="w-full p-4 border-b border-gray-100 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-1">
                        {email.from || email.to}
                      </div>
                      <p className="text-sm text-gray-700 font-medium">
                        {email.subject}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 ml-4 whitespace-nowrap">
                      {formatDate(email.date)}
                    </span>
                  </div>
                </button>
              ))}
            </>
          )}
        </div>

        {/* Tab Bar */}
        <div className="border-t border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <div className="flex min-w-max">
              {['Inbox', 'Sent', 'Drafts', 'Labels', 'Trash', 'Spam'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab
                      ? 'text-blue-500 border-b-2 border-blue-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Regular Tab Email List View (Inbox, Sent, Drafts, Trash, Spam)
  const currentList = getCurrentEmailList();
  const isSentOrDrafts = activeTab === 'Sent' || activeTab === 'Drafts';

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Email List */}
      <div className="flex-1 overflow-y-auto">
        {currentList.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>No {activeTab.toLowerCase()}</p>
          </div>
        ) : (
          currentList.map((email) => {
            const hasToField = email.to !== undefined;
            const displayName = isSentOrDrafts || hasToField ? email.to : email.from;
            
            return (
              <button
                key={email.id}
                onClick={() => setSelectedEmail(email)}
                className={`w-full p-4 border-b border-gray-100 text-left hover:bg-gray-50 transition-colors ${
                  !email.read && activeTab === 'Inbox' ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">
                        {displayName}
                      </span>
                      {!email.read && activeTab === 'Inbox' && (
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
              </button>
            );
          })
        )}
      </div>

      {/* Tab Bar */}
      <div className="border-t border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <div className="flex min-w-max">
            {['Inbox', 'Sent', 'Drafts', 'Labels', 'Trash', 'Spam'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'text-blue-500 border-b-2 border-blue-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailApp;


