import { GameProvider, useGame } from './context/GameContext';
import PhoneContainer from './components/PhoneContainer';
import LockScreen from './components/LockScreen';
import HomeScreen from './components/HomeScreen';
import AppLayout from './components/AppLayout';
import MessagesApp from './components/MessagesApp';
import PhotosApp from './components/PhotosApp';
import NotesApp from './components/NotesApp';
import ReportApp from './components/ReportApp';
import BrowserApp from './components/BrowserApp';
import MailApp from './components/MailApp';
import CalendarApp from './components/CalendarApp';
import BankApp from './components/BankApp';
import GenericListApp from './components/GenericListApp';

const AppContent = () => {
  const { isUnlocked, currentApp } = useGame();

  if (!isUnlocked) {
    return (
      <PhoneContainer>
        <LockScreen />
      </PhoneContainer>
    );
  }

  const renderAppView = () => {
    switch (currentApp) {
      case 'messages':
        return (
          <AppLayout title="Messages">
            <MessagesApp />
          </AppLayout>
        );
      case 'photos':
        return (
          <AppLayout title="Photos">
            <PhotosApp />
          </AppLayout>
        );
      case 'notes':
        return (
          <AppLayout title="Notes">
            <NotesApp />
          </AppLayout>
        );
      case 'mail':
        return (
          <AppLayout title="Mail">
            <MailApp />
          </AppLayout>
        );
      case 'calendar':
        return (
          <AppLayout title="Calendar">
            <CalendarApp />
          </AppLayout>
        );
      case 'bank':
        return (
          <AppLayout title="Bank">
            <BankApp />
          </AppLayout>
        );
      case 'browser':
        return (
          <AppLayout title="Browser">
            <BrowserApp />
          </AppLayout>
        );
      case 'report':
        return (
          <AppLayout title="Report">
            <ReportApp />
          </AppLayout>
        );
      case 'news':
        return (
          <AppLayout title="News">
            <GenericListApp type="news" />
          </AppLayout>
        );
      case 'rides':
        return (
          <AppLayout title="Rides">
            <GenericListApp type="rides" />
          </AppLayout>
        );
      case 'food':
        return (
          <AppLayout title="Food">
            <GenericListApp type="food" />
          </AppLayout>
        );
      case 'sports':
        return (
          <AppLayout title="Sports">
            <GenericListApp type="sports" />
          </AppLayout>
        );
      case 'ai':
        return (
          <AppLayout title="AI">
            <GenericListApp type="ai" />
          </AppLayout>
        );
      case 'music':
        return (
          <AppLayout title="Music">
            <GenericListApp type="music" />
          </AppLayout>
        );
      case 'settings':
        return (
          <AppLayout title="Settings">
            <GenericListApp type="settings" />
          </AppLayout>
        );
      default:
        return <HomeScreen />;
    }
  };

  return (
    <PhoneContainer>
      {renderAppView()}
    </PhoneContainer>
  );
};

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;
