import { ArrowLeft, Trophy, Medal, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

interface LeaderboardProps {
  onNavigate: (view: 'map' | 'encyclopedia' | 'friends' | 'missions' | 'leaderboard' | 'profile' | 'settings') => void;
}

interface Player {
  id: number;
  name: string;
  level: number;
  plantsCollected: number;
  rank: number;
  avatar: string;
}

export function Leaderboard({ onNavigate }: LeaderboardProps) {
  const players: Player[] = [
    { id: 1, name: 'PlantMaster99', level: 45, plantsCollected: 285, rank: 1, avatar: '🌺' },
    { id: 2, name: 'LeoVera', level: 31, plantsCollected: 210, rank: 2, avatar: '🍃' },
    { id: 3, name: 'AlexGreenThumb', level: 24, plantsCollected: 178, rank: 3, avatar: '🌸' },
    { id: 4, name: 'GardenGuru', level: 22, plantsCollected: 165, rank: 4, avatar: '🌻' },
    { id: 5, name: 'BotanyBria', level: 18, plantsCollected: 142, rank: 5, avatar: '🌍' },
    { id: 6, name: 'Player1', level: 12, plantsCollected: 125, rank: 6, avatar: '🌱' },
    { id: 7, name: 'SamSprout', level: 9, plantsCollected: 98, rank: 7, avatar: '🌿' },
  ];

  // Season stats
  const seasonalChallenge = {
    name: '🌸 Golden Shower Tree Season',
    playersParticipating: 1247,
    timeRemaining: '5 days left'
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg text-gray-500">#{rank}</span>;
    }
  };

  const getRankBackground = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3:
        return 'bg-gradient-to-r from-amber-500 to-amber-700';
      default:
        return 'bg-gradient-to-r from-[#88b899] to-[#5a9a7a]';
    }
  };

  return (
    <div className="h-screen w-full bg-[#f5f5f5] overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('map')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl">Leaderboard</h1>
        </div>

        <Tabs defaultValue="global" className="w-full">
          <TabsList className="w-full bg-[#e8f5e8] grid grid-cols-3">
            <TabsTrigger value="global">Global</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
            <TabsTrigger value="local">Local</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Top 3 Podium */}
      <div className="p-6 bg-white border-b border-gray-200">
        <div className="flex items-end justify-center gap-4">
          {/* Rank 2 */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-2xl mb-2">
              {players[1].avatar}
            </div>
            <p className="text-sm mb-1">{players[1].name}</p>
            <div className="bg-gray-300 rounded-t-xl px-6 py-3 flex flex-col items-center">
              <Medal className="w-6 h-6 text-white mb-1" />
              <span className="text-xs text-white">Level {players[1].level}</span>
            </div>
          </div>

          {/* Rank 1 */}
          <div className="flex flex-col items-center -mt-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-3xl mb-2 border-4 border-yellow-300">
              {players[0].avatar}
            </div>
            <p className="text-sm mb-1">{players[0].name}</p>
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-t-xl px-8 py-4 flex flex-col items-center">
              <Trophy className="w-7 h-7 text-white mb-1" />
              <span className="text-xs text-white">Level {players[0].level}</span>
            </div>
          </div>

          {/* Rank 3 */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-2xl mb-2">
              {players[2].avatar}
            </div>
            <p className="text-sm mb-1">{players[2].name}</p>
            <div className="bg-amber-600 rounded-t-xl px-6 py-3 flex flex-col items-center">
              <Award className="w-6 h-6 text-white mb-1" />
              <span className="text-xs text-white">Level {players[2].level}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of Rankings */}
      <div className="p-4">
        {players.slice(3).map((player) => (
          <div
            key={player.id}
            className={`rounded-2xl p-4 mb-3 flex items-center gap-4 shadow-sm ${
              player.name === 'Player1' ? 'bg-[#e8f5e8] border-2 border-[#4caf50]' : 'bg-white'
            }`}
          >
            <div className="flex items-center justify-center w-10">
              {getRankIcon(player.rank)}
            </div>
            <div className={`w-14 h-14 rounded-full ${getRankBackground(player.rank)} flex items-center justify-center text-2xl`}>
              {player.avatar}
            </div>
            <div className="flex-1">
              <h3>{player.name}</h3>
              <p className="text-sm text-gray-600">
                {player.plantsCollected} plants • Level {player.level}
              </p>
            </div>
            {player.name === 'Player1' && (
              <span className="text-xs bg-[#4caf50] text-white px-2 py-1 rounded-full">You</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}