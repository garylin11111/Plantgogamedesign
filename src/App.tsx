import { useState } from 'react';
import { MapView } from './components/MapView';
import { PlantEncyclopedia } from './components/PlantEncyclopedia';
import { Friends } from './components/Friends';
import { Missions } from './components/Missions';
import { Leaderboard } from './components/Leaderboard';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';

export default function App() {
  const [currentView, setCurrentView] = useState<'map' | 'encyclopedia' | 'friends' | 'missions' | 'leaderboard' | 'profile' | 'settings'>('map');

  return (
    <div className="h-screen w-full overflow-hidden bg-[#e8f5e8]">
      {currentView === 'map' && <MapView onNavigate={setCurrentView} />}
      {currentView === 'encyclopedia' && <PlantEncyclopedia onNavigate={setCurrentView} />}
      {currentView === 'friends' && <Friends onNavigate={setCurrentView} />}
      {currentView === 'missions' && <Missions onNavigate={setCurrentView} />}
      {currentView === 'leaderboard' && <Leaderboard onNavigate={setCurrentView} />}
      {currentView === 'profile' && <Profile onNavigate={setCurrentView} />}
      {currentView === 'settings' && <Settings onNavigate={setCurrentView} />}
    </div>
  );
}