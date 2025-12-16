import { ArrowLeft, Target, Trophy, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface MissionsProps {
  onNavigate: (view: 'map' | 'encyclopedia' | 'friends' | 'missions' | 'leaderboard' | 'profile' | 'settings') => void;
}

interface Mission {
  id: number;
  title: string;
  description: string;
  progress: number;
  total: number;
  reward: string;
  type: 'daily' | 'weekly' | 'special';
}

export function Missions({ onNavigate }: MissionsProps) {
  const missions: Mission[] = [
    {
      id: 1,
      title: 'Daily Collector',
      description: 'Collect 5 different plants today',
      progress: 3,
      total: 5,
      reward: '50 XP',
      type: 'daily',
    },
    {
      id: 2,
      title: 'Friend Zone',
      description: 'Add 3 new friends',
      progress: 1,
      total: 3,
      reward: '100 XP',
      type: 'daily',
    },
    {
      id: 3,
      title: 'Plant Explorer',
      description: 'Discover 10 new plant species',
      progress: 7,
      total: 10,
      reward: '200 XP',
      type: 'weekly',
    },
    {
      id: 4,
      title: 'Rare Hunter',
      description: 'Collect a 5-star rarity plant',
      progress: 0,
      total: 1,
      reward: '500 XP',
      type: 'special',
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'daily':
        return 'bg-blue-500';
      case 'weekly':
        return 'bg-purple-500';
      case 'special':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="h-screen w-full bg-[#f5f5f5] overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('map')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl">Missions</h1>
        </div>
      </div>

      {/* Missions List */}
      <div className="p-4">
        {missions.map((mission) => (
          <div key={mission.id} className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
            <div className="flex items-start gap-4 mb-3">
              <div className={`w-12 h-12 rounded-full ${getTypeColor(mission.type)} flex items-center justify-center`}>
                {mission.type === 'special' ? (
                  <Star className="w-6 h-6 text-white" />
                ) : mission.type === 'weekly' ? (
                  <Trophy className="w-6 h-6 text-white" />
                ) : (
                  <Target className="w-6 h-6 text-white" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3>{mission.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full text-white ${getTypeColor(mission.type)}`}>
                    {mission.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{mission.description}</p>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-[#4caf50]">
                      {mission.progress}/{mission.total}
                    </span>
                  </div>
                  <Progress value={(mission.progress / mission.total) * 100} className="h-2" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Reward: {mission.reward}</span>
                  {mission.progress === mission.total && (
                    <Button size="sm" className="bg-[#4caf50] hover:bg-[#45a049] text-white">
                      Claim
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}