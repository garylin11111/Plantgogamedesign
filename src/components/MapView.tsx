import { useState } from 'react';
import { Camera, Users, BookOpen, Settings, ClipboardList, BarChart3, Sparkles, Navigation } from 'lucide-react';
import { Button } from './ui/button';
import { CaptureModal } from './CaptureModal';
import campusMapImage from 'figma:asset/e6dc47d0959bf7960309650f0f8185a09edbda64.png';

interface MapViewProps {
  onNavigate: (view: 'map' | 'encyclopedia' | 'friends' | 'missions' | 'leaderboard' | 'profile' | 'settings') => void;
}

export function MapView({ onNavigate }: MapViewProps) {
  const [showCaptureModal, setShowCaptureModal] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<{name: string, rarity: number, location?: string} | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<{name: string, description: string} | null>(null);

  // Mock nearby plants on the map with locations
  const nearbyPlants = [
    { id: 1, name: 'Golden Shower Tree', x: '30%', y: '25%', rarity: 4, color: '#ffd700', location: 'Main Library Garden', seasonal: true },
    { id: 2, name: 'Taiwan Acacia', x: '65%', y: '45%', rarity: 2, color: '#9db39d', location: 'Student Center Plaza' },
    { id: 3, name: 'Banyan Tree', x: '45%', y: '60%', rarity: 3, color: '#2d6a5a', location: 'Administration Building' },
    { id: 4, name: 'Bamboo Palm', x: '20%', y: '70%', rarity: 1, color: '#507a6b', location: 'Dormitory Area' },
    { id: 5, name: 'Golden Shower Tree', x: '75%', y: '30%', rarity: 4, color: '#ffd700', location: 'Chapel Garden', seasonal: true },
  ];

  // Campus buildings with descriptions
  const buildings = [
    { 
      id: 1, 
      name: '聖言樓', 
      englishName: 'Main Library',
      description: '校園主要圖書館，藏書豐富', 
      x: '35%', 
      y: '30%', 
      icon: '📚',
      color: '#e8f5e9'
    },
    { 
      id: 2, 
      name: '學生活動中心', 
      englishName: 'Student Center',
      description: '學生社團活動與交流空間', 
      x: '70%', 
      y: '50%', 
      icon: '🏛️',
      color: '#f3e5f5'
    },
    { 
      id: 3, 
      name: '聖言堂', 
      englishName: 'Chapel',
      description: '校園禮拜堂，莊嚴神聖', 
      x: '80%', 
      y: '35%', 
      icon: '⛪',
      color: '#fff3e0'
    },
    { 
      id: 4, 
      name: '行政大樓', 
      englishName: 'Administration',
      description: '校園行政中心', 
      x: '50%', 
      y: '65%', 
      icon: '🏢',
      color: '#e3f2fd'
    },
    { 
      id: 5, 
      name: '體育館', 
      englishName: 'Sports Center',
      description: '運動與體育活動場所', 
      x: '25%', 
      y: '50%', 
      icon: '🏀',
      color: '#fce4ec'
    },
  ];

  const handlePlantClick = (plant: typeof nearbyPlants[0]) => {
    setSelectedPlant({ name: plant.name, rarity: plant.rarity, location: plant.location });
    setSelectedBuilding(null);
    setShowCaptureModal(true);
  };

  const handleBuildingClick = (building: typeof buildings[0]) => {
    setSelectedBuilding({ name: building.name, description: building.description });
  };

  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-[#a8d5ba] via-[#b8dfcc] to-[#c8e6d8] overflow-hidden">
      {/* Map background with paths */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 200 Q 150 100 300 200 T 600 200" stroke="#ffffff" strokeWidth="30" fill="none" />
        <path d="M 100 400 Q 250 300 400 400 T 700 400" stroke="#ffffff" strokeWidth="30" fill="none" />
        <path d="M 50 600 Q 200 500 350 600 T 650 600" stroke="#ffffff" strokeWidth="30" fill="none" />
      </svg>

      {/* Decorative circles for park areas */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#88b899] opacity-20"
          style={{
            width: `${Math.random() * 80 + 40}px`,
            height: `${Math.random() * 80 + 40}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Mini Map in top-left corner */}
      <div className="absolute top-6 left-6 z-20">
        <div className="relative w-32 h-32 rounded-full bg-white shadow-2xl border-4 border-white overflow-hidden">
          {/* Campus map thumbnail */}
          <img 
            src={campusMapImage} 
            alt="Campus Map" 
            className="w-full h-full object-cover opacity-90"
          />
          {/* Player position indicator */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <Navigation className="w-6 h-6 text-blue-600 fill-blue-600 drop-shadow-lg" style={{ transform: 'rotate(45deg)' }} />
              <div className="absolute inset-0 w-6 h-6 bg-blue-400 rounded-full animate-ping opacity-50" />
            </div>
          </div>
          {/* Compass ring */}
          <div className="absolute inset-0 border-2 border-blue-400/30 rounded-full" />
          <div className="absolute top-1 left-1/2 -translate-x-1/2 text-xs text-blue-600 font-semibold">N</div>
        </div>
      </div>

      {/* Player info */}
      <div className="absolute top-6 right-6 bg-white rounded-full shadow-lg px-6 py-3 flex items-center gap-3 z-10 cursor-pointer hover:shadow-xl transition-shadow" onClick={() => onNavigate('profile')}>
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#88b899] to-[#5a9a7a] flex items-center justify-center">
          <span className="text-xl">🌱</span>
        </div>
        <div>
          <div className="font-semibold">Player1</div>
          <div className="text-sm text-[#5a9a7a]">Lv. 12</div>
        </div>
        <div className="ml-2 bg-[#ffd700] rounded-full h-2 w-16">
          <div className="bg-[#ffa500] rounded-full h-2 w-3/4"></div>
        </div>
      </div>

      {/* Quick action buttons */}
      <div className="absolute top-28 right-6 flex flex-col gap-3 z-10">
        <Button
          size="icon"
          className="w-14 h-14 rounded-full bg-white shadow-lg hover:bg-gray-50"
          onClick={() => onNavigate('friends')}
        >
          <Users className="w-6 h-6 text-gray-700" />
        </Button>
        <Button
          size="icon"
          className="w-14 h-14 rounded-full bg-white shadow-lg hover:bg-gray-50"
          onClick={() => onNavigate('encyclopedia')}
        >
          <BookOpen className="w-6 h-6 text-gray-700" />
        </Button>
        <Button
          size="icon"
          className="w-14 h-14 rounded-full bg-white shadow-lg hover:bg-gray-50"
          onClick={() => onNavigate('settings')}
        >
          <Settings className="w-6 h-6 text-gray-700" />
        </Button>
      </div>

      {/* Seasonal Event Banner - moved below mini map */}
      <div className="absolute top-44 left-6 z-10">
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white rounded-2xl px-4 py-2 shadow-xl flex items-center gap-2 border-2 border-yellow-300">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span className="text-sm font-semibold">🌸 Golden Shower Season!</span>
        </div>
      </div>

      {/* Campus Buildings */}
      {buildings.map((building) => (
        <div
          key={building.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: building.x,
            top: building.y,
          }}
        >
          <button
            onClick={() => handleBuildingClick(building)}
            className="relative group cursor-pointer"
          >
            {/* Building icon */}
            <div 
              className="w-20 h-20 rounded-2xl shadow-lg flex items-center justify-center text-3xl hover:scale-110 transition-all duration-300 border-2 border-white/50"
              style={{ backgroundColor: building.color }}
            >
              {building.icon}
            </div>
            
            {/* Building info card */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-xl shadow-xl p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
              <div className="font-semibold text-gray-800">{building.name}</div>
              <div className="text-xs text-gray-500 mb-1">{building.englishName}</div>
              <div className="text-sm text-gray-600">{building.description}</div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45" />
            </div>
          </button>
        </div>
      ))}

      {/* Plant markers on map */}
      {nearbyPlants.map((plant) => (
        <button
          key={plant.id}
          className="absolute w-16 h-16 rounded-lg shadow-lg hover:scale-110 transition-transform animate-pulse"
          style={{
            left: plant.x,
            top: plant.y,
            backgroundColor: plant.color,
            transform: 'translate(-50%, -50%)',
            border: plant.seasonal ? '3px solid #ffd700' : 'none',
            boxShadow: plant.seasonal ? '0 0 20px rgba(255, 215, 0, 0.5)' : undefined,
          }}
          onClick={() => handlePlantClick(plant)}
        >
          <span className="text-2xl">{plant.seasonal ? '🌸' : '🌿'}</span>
          {plant.seasonal && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs border-2 border-white">
              ⭐
            </div>
          )}
        </button>
      ))}

      {/* Selected Building Info Panel */}
      {selectedBuilding && (
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-80 bg-white rounded-2xl shadow-2xl p-6 z-20 animate-in slide-in-from-bottom">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-lg text-gray-800">{selectedBuilding.name}</h3>
            </div>
            <button 
              onClick={() => setSelectedBuilding(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <p className="text-gray-600 mb-4">{selectedBuilding.description}</p>
          <Button 
            className="w-full bg-gradient-to-r from-[#88b899] to-[#5a9a7a] text-white hover:opacity-90"
            onClick={() => setSelectedBuilding(null)}
          >
            探索附近植物
          </Button>
        </div>
      )}

      {/* Bottom navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-end gap-4 z-10">
        <Button
          className="bg-white rounded-full w-20 h-20 shadow-lg hover:bg-gray-50 flex flex-col items-center justify-center gap-1"
          onClick={() => onNavigate('missions')}
        >
          <ClipboardList className="w-7 h-7 text-gray-700" />
          <span className="text-xs text-gray-700">Missions</span>
        </Button>

        {/* Main capture button */}
        <Button
          className="bg-[#4caf50] rounded-full w-28 h-28 shadow-xl hover:bg-[#45a049] flex flex-col items-center justify-center gap-1"
          onClick={() => setShowCaptureModal(true)}
        >
          <Camera className="w-10 h-10 text-white" />
          <span className="text-sm text-white">探索植物</span>
        </Button>

        <Button
          className="bg-white rounded-full w-20 h-20 shadow-lg hover:bg-gray-50 flex flex-col items-center justify-center gap-1"
          onClick={() => onNavigate('leaderboard')}
        >
          <BarChart3 className="w-7 h-7 text-gray-700" />
          <span className="text-xs text-gray-700">Leaderboard</span>
        </Button>
      </div>

      {/* Capture Modal */}
      {showCaptureModal && (
        <CaptureModal
          plantName={selectedPlant?.name}
          location={selectedPlant?.location}
          onClose={() => {
            setShowCaptureModal(false);
            setSelectedPlant(null);
          }}
        />
      )}
    </div>
  );
}
