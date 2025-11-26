import { createContext, useContext, useState } from 'react';
import storyData from '../story.json';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [currentApp, setCurrentApp] = useState(null);

  const unlockPhone = (code) => {
    if (code === storyData.device.passcode) {
      setIsUnlocked(true);
      return true;
    }
    return false;
  };

  return (
    <GameContext.Provider
      value={{
        isUnlocked,
        currentApp,
        setCurrentApp,
        unlockPhone,
        storyData,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};



