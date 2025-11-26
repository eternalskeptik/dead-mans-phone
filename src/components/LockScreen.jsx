import { useState } from 'react';
import { useGame } from '../context/GameContext';

const LockScreen = () => {
  const { unlockPhone, storyData } = useGame();
  const [enteredCode, setEnteredCode] = useState('');
  const [error, setError] = useState(false);

  const handleNumberPress = (num) => {
    if (enteredCode.length < 4) {
      const newCode = enteredCode + num;
      setEnteredCode(newCode);
      setError(false);

      if (newCode.length === 4) {
        const success = unlockPhone(newCode);
        if (!success) {
          setError(true);
          setTimeout(() => {
            setEnteredCode('');
            setError(false);
          }, 1000);
        }
      }
    }
  };

  const handleDelete = () => {
    setEnteredCode(enteredCode.slice(0, -1));
    setError(false);
  };

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

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
      <div className="relative z-10 h-full flex flex-col items-center justify-between p-8">
        {/* Time Display */}
        <div className="mt-20 text-center">
          <div className="text-6xl font-light text-white mb-2 tracking-tight" style={{ fontWeight: 200 }}>
            {currentTime}
          </div>
          <div className="text-lg text-white/90 font-light">{currentDate}</div>
        </div>

        {/* Keypad */}
        <div className="w-full max-w-xs mb-16">
          {/* Code Dots */}
          <div className="flex justify-center gap-3 mb-8">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full border-2 ${
                  index < enteredCode.length
                    ? error
                      ? 'bg-red-500 border-red-500'
                      : 'bg-white border-white'
                    : 'border-white/50'
                }`}
              />
            ))}
          </div>

          {/* Number Pad */}
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleNumberPress(num.toString())}
                className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm text-white text-2xl font-light hover:bg-white/30 transition-colors active:scale-95"
              >
                {num}
              </button>
            ))}
            <div className="w-16 h-16" /> {/* Empty space */}
            <button
              onClick={() => handleNumberPress('0')}
              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm text-white text-2xl font-light hover:bg-white/30 transition-colors active:scale-95"
            >
              0
            </button>
            <button
              onClick={handleDelete}
              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors active:scale-95 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.25-2.25L12 9.75m-4.5 4.5L9.75 12m0 0L12 9.75"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LockScreen;

