import { ArrowLeft, MapPin, Calendar, Award, Share2, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Progress } from './ui/progress';

interface ProfileProps {
  onNavigate: (view: 'map' | 'encyclopedia' | 'friends' | 'missions' | 'leaderboard' | 'profile' | 'settings') => void;
}

export function Profile({ onNavigate }: ProfileProps) {
  const achievements = [
    { id: 1, name: '新手探險家', description: 'Visit 5 campus locations', icon: '🌱', unlocked: true, tier: 'bronze' },
    { id: 2, name: '植物愛好者', description: 'Collect 20 different plants', icon: '🌿', unlocked: true, tier: 'silver' },
    { id: 3, name: '黃金雨季獵人', description: 'Find all Golden Shower Trees', icon: '🌸', unlocked: true, tier: 'gold' },
    { id: 4, name: '社交達人', description: 'Add 10 friends', icon: '👥', unlocked: true, tier: 'silver' },
    { id: 5, name: '校園專家', description: 'Discover all landmarks', icon: '🗺️', unlocked: false, tier: 'gold' },
    { id: 6, name: '傳奇收集家', description: 'Complete the entire collection', icon: '👑', unlocked: false, tier: 'legendary' },
  ];

  const recentCaptures = [
    { id: 1, name: 'Golden Shower Tree', rarity: 4, date: '2天前', location: 'Main Library Garden' },
    { id: 2, name: 'Taiwan Acacia', rarity: 2, date: '3天前', location: 'Student Center Plaza' },
    { id: 3, name: 'Banyan Tree', rarity: 3, date: '5天前', location: 'Administration Building' },
  ];

  const stats = [
    { label: '總收集數', value: '125', icon: '🌿' },
    { label: '稀有植物', value: '18', icon: '⭐' },
    { label: '好友數量', value: '42', icon: '👥' },
    { label: '完成任務', value: '87', icon: '✅' },
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'from-amber-600 to-amber-800';
      case 'silver': return 'from-gray-300 to-gray-500';
      case 'gold': return 'from-yellow-400 to-yellow-600';
      case 'legendary': return 'from-purple-500 to-pink-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getTierGlow = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'shadow-lg shadow-amber-500/50';
      case 'silver': return 'shadow-lg shadow-gray-400/50';
      case 'gold': return 'shadow-xl shadow-yellow-500/60';
      case 'legendary': return 'shadow-2xl shadow-purple-500/70 animate-pulse';
      default: return '';
    }
  };

  return (
    <div className="h-screen w-full bg-[#f5f5f5] overflow-auto">
      {/* Header with cover */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-br from-[#4caf50] to-[#66bb6a]" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 text-white hover:bg-white/20"
          onClick={() => onNavigate('map')}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white hover:bg-white/20"
        >
          <Share2 className="w-5 h-5" />
        </Button>
      </div>

      {/* Profile Info */}
      <div className="px-6 -mt-16 pb-6 relative z-10">
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#88b899] to-[#5a9a7a] flex items-center justify-center text-4xl border-4 border-white shadow-lg">
              🌱
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl">Player1</h1>
                <Button size="sm" variant="outline" className="rounded-full" onClick={() => onNavigate('settings')}>
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-gray-600 mb-2">植物收集者 | 探險家</p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>台北市</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>加入於 2024</span>
                </div>
              </div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="bg-[#e8f5e8] rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span>等級 12</span>
              <span className="text-sm text-gray-600">75% 到達等級 13</span>
            </div>
            <Progress value={75} className="h-3" />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>7500 XP</span>
              <span>10000 XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 pb-6">
        <Tabs defaultValue="achievements" className="w-full">
          <TabsList className="w-full bg-white grid grid-cols-2 mb-4">
            <TabsTrigger value="achievements">成就</TabsTrigger>
            <TabsTrigger value="recent">最近收集</TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="mt-0">
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`relative bg-white rounded-2xl p-4 shadow-sm overflow-hidden ${
                    !achievement.unlocked ? 'opacity-60 grayscale' : ''
                  }`}
                >
                  {/* Badge Background Glow */}
                  {achievement.unlocked && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${getTierColor(achievement.tier)} opacity-10`} />
                  )}
                  
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    {/* Badge Icon with Tier Styling */}
                    <div className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${achievement.unlocked ? getTierColor(achievement.tier) : 'from-gray-300 to-gray-400'} flex items-center justify-center ${achievement.unlocked ? getTierGlow(achievement.tier) : ''}`}>
                      <span className="text-3xl filter drop-shadow-lg">
                        {achievement.icon}
                      </span>
                      {achievement.unlocked && achievement.tier === 'legendary' && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white">
                          <span className="text-xs">✨</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm font-semibold mb-1">{achievement.name}</p>
                      <p className="text-xs text-gray-500">{achievement.description}</p>
                    </div>
                    
                    {achievement.unlocked && (
                      <div className="mt-1">
                        <Award className={`w-5 h-5 ${achievement.tier === 'gold' ? 'text-yellow-500' : achievement.tier === 'legendary' ? 'text-purple-500' : 'text-[#4caf50]'}`} />
                      </div>
                    )}
                    
                    {!achievement.unlocked && (
                      <div className="absolute inset-0 bg-gray-900/5 flex items-center justify-center">
                        <div className="text-5xl opacity-30">🔒</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="mt-0">
            <div className="space-y-3">
              {recentCaptures.map((plant) => (
                <div key={plant.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#e8f5e8] to-[#c8e6d8] rounded-xl flex items-center justify-center">
                    <span className="text-3xl">🌿</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1">{plant.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-xs ${i < plant.rarity ? 'text-[#ffd700]' : 'text-gray-300'}`}>
                            ⭐
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">{plant.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}