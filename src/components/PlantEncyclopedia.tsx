import { useState } from 'react';
import { ArrowLeft, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';

interface PlantEncyclopediaProps {
  onNavigate: (view: 'map' | 'encyclopedia' | 'friends' | 'missions' | 'leaderboard' | 'profile' | 'settings') => void;
}

interface Plant {
  id: number;
  name: string;
  rarity: number;
  count: number;
  discovered: boolean;
  image?: string;
}

interface Landmark {
  id: number;
  name: string;
  description: string;
  discovered: boolean;
  icon: string;
}

export function PlantEncyclopedia({ onNavigate }: PlantEncyclopediaProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rarity');

  const plants: Plant[] = [
    { id: 1, name: 'Golden Shower Tree', rarity: 4, count: 5, discovered: true },
    { id: 2, name: 'Banyan Tree', rarity: 3, count: 2, discovered: true },
    { id: 3, name: 'Taiwan Acacia', rarity: 2, count: 12, discovered: true },
    { id: 4, name: 'Bamboo Palm', rarity: 1, count: 8, discovered: true },
    { id: 5, name: 'Flame Tree', rarity: 4, count: 3, discovered: true },
    { id: 6, name: 'Rare Orchid', rarity: 5, count: 0, discovered: false },
    { id: 7, name: 'Royal Poinciana', rarity: 4, count: 0, discovered: false },
    { id: 8, name: 'Taiwan Cherry', rarity: 5, count: 0, discovered: false },
  ];

  const landmarks: Landmark[] = [
    { id: 1, name: 'Main Library', description: 'Central learning hub', discovered: true, icon: '📚' },
    { id: 2, name: 'Student Center', description: 'Social gathering place', discovered: true, icon: '🏛️' },
    { id: 3, name: 'Chapel', description: 'Spiritual sanctuary', discovered: true, icon: '⛪' },
    { id: 4, name: 'Sports Complex', description: 'Athletic facilities', discovered: true, icon: '🏃' },
    { id: 5, name: 'Science Building', description: 'Research laboratories', discovered: false, icon: '🔬' },
    { id: 6, name: 'Art Gallery', description: 'Creative exhibition space', discovered: false, icon: '🎨' },
  ];

  const totalPlants = 120;
  const totalLandmarks = 15;
  const collectedPlants = 45;
  const collectedLandmarks = 8;
  const totalProgress = ((collectedPlants + collectedLandmarks) / (totalPlants + totalLandmarks)) * 100;

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLandmarks = landmarks.filter(landmark =>
    landmark.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStars = (rarity: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < rarity ? 'text-[#ffd700]' : 'text-gray-300'}>
            ⭐
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="h-screen w-full bg-[#f5f5f5] overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate('map')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl">PU CampusDex</h1>
          </div>
          <BookOpen className="w-6 h-6" />
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Collection Progress</span>
            <span>{collectedPlants + collectedLandmarks}/{totalPlants + totalLandmarks}</span>
          </div>
          <div className="w-full bg-[#d0e8d0] rounded-full h-3">
            <div
              className="bg-gradient-to-r from-[#4caf50] to-[#66bb6a] h-3 rounded-full transition-all"
              style={{ width: `${totalProgress}%` }}
            />
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            className="pl-10 bg-[#e8f5e8] border-none"
            placeholder="Search for plants or landmarks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs for Plants and Landmarks */}
      <div className="px-4 pt-4">
        <Tabs defaultValue="plants" className="w-full">
          <TabsList className="w-full bg-white grid grid-cols-2 mb-4">
            <TabsTrigger value="plants">
              <span className="mr-2">🌿</span>
              Plants ({collectedPlants}/{totalPlants})
            </TabsTrigger>
            <TabsTrigger value="landmarks">
              <span className="mr-2">🏛️</span>
              Buildings ({collectedLandmarks}/{totalLandmarks})
            </TabsTrigger>
          </TabsList>

          {/* Plants Tab */}
          <TabsContent value="plants" className="mt-0">
            <div className="grid grid-cols-2 gap-4 pb-4">
              {filteredPlants.map((plant) => (
                <div
                  key={plant.id}
                  className={`bg-white rounded-2xl p-4 shadow-sm ${
                    plant.discovered ? '' : 'border-2 border-dashed border-gray-300'
                  }`}
                >
                  {plant.discovered ? (
                    <>
                      <div className="aspect-square bg-gradient-to-br from-[#e8f5e8] to-[#c8e6d8] rounded-xl mb-3 flex items-center justify-center">
                        <span className="text-5xl">
                          {plant.name.includes('Golden Shower') || plant.name.includes('Flame') || plant.name.includes('Cherry') ? '🌸' : '🌿'}
                        </span>
                      </div>
                      <h3 className="text-sm mb-2">{plant.name}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-xs ${i < plant.rarity ? 'text-[#ffd700]' : 'text-gray-300'}`}>
                              ⭐
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-1 text-[#4caf50] text-sm">
                          <span>🌱</span>
                          <span>x{plant.count}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="aspect-square bg-gray-100 rounded-xl mb-3 flex items-center justify-center border-2 border-dashed border-gray-300">
                        <span className="text-5xl text-gray-400">❓</span>
                      </div>
                      <h3 className="text-sm text-gray-500 text-center">Undiscovered</h3>
                    </>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Landmarks Tab */}
          <TabsContent value="landmarks" className="mt-0">
            <div className="grid grid-cols-2 gap-4 pb-4">
              {filteredLandmarks.map((landmark) => (
                <div
                  key={landmark.id}
                  className={`bg-white rounded-2xl p-4 shadow-sm ${
                    landmark.discovered ? '' : 'border-2 border-dashed border-gray-300'
                  }`}
                >
                  {landmark.discovered ? (
                    <>
                      <div className="aspect-square bg-gradient-to-br from-[#e8f5e8] to-[#c8e6d8] rounded-xl mb-3 flex items-center justify-center">
                        <span className="text-5xl">{landmark.icon}</span>
                      </div>
                      <h3 className="text-sm mb-2">{landmark.name}</h3>
                      <p className="text-xs text-gray-500">{landmark.description}</p>
                    </>
                  ) : (
                    <>
                      <div className="aspect-square bg-gray-100 rounded-xl mb-3 flex items-center justify-center border-2 border-dashed border-gray-300">
                        <span className="text-5xl text-gray-400">❓</span>
                      </div>
                      <h3 className="text-sm text-gray-500 text-center">Undiscovered</h3>
                    </>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function BookOpen({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      strokeWidth="2"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}