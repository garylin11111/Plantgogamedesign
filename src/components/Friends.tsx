import { useState } from 'react';
import { ArrowLeft, Search, UserPlus, MoreVertical } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Badge } from './ui/badge';

interface FriendsProps {
  onNavigate: (view: 'map' | 'encyclopedia' | 'friends' | 'missions' | 'leaderboard' | 'profile' | 'settings') => void;
}

interface Friend {
  id: number;
  name: string;
  level: number;
  online: boolean;
  avatar: string;
}

export function Friends({ onNavigate }: FriendsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('friends');

  const friends: Friend[] = [
    { id: 1, name: 'AlexGreenThumb', level: 24, online: true, avatar: '🌸' },
    { id: 2, name: 'BotanyBria', level: 18, online: true, avatar: '🌍' },
    { id: 3, name: 'LeoVera', level: 31, online: false, avatar: '🍃' },
    { id: 4, name: 'SamSprout', level: 9, online: false, avatar: '🌿' },
  ];

  const requests = [
    { id: 5, name: 'PlantMaster99', level: 45, avatar: '🌺' },
    { id: 6, name: 'GardenGuru', level: 22, avatar: '🌻' },
  ];

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <h1 className="text-xl">Friends</h1>
          </div>
        </div>

        {/* Add Friend Button */}
        <Button className="w-full bg-[#4caf50] hover:bg-[#45a049] text-white rounded-full h-12 mb-4">
          <UserPlus className="w-5 h-5 mr-2" />
          Add Friend
        </Button>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-transparent border-b border-gray-200 rounded-none h-auto p-0">
            <TabsTrigger
              value="friends"
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-[#4caf50] data-[state=active]:bg-transparent pb-3"
            >
              Friends
            </TabsTrigger>
            <TabsTrigger
              value="requests"
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-[#4caf50] data-[state=active]:bg-transparent pb-3 relative"
            >
              Requests
              <Badge className="ml-2 bg-[#4caf50] text-white rounded-full w-6 h-6 flex items-center justify-center p-0">
                {requests.length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            className="pl-10 bg-[#e8f5e8] border-none"
            placeholder="Search for a friend"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Friends List */}
      {activeTab === 'friends' && (
        <div className="px-4 pb-4">
          {filteredFriends.map((friend) => (
            <div
              key={friend.id}
              className="bg-white rounded-2xl p-4 mb-3 flex items-center gap-4 shadow-sm"
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-2xl">
                  {friend.avatar}
                </div>
                {friend.online && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#4caf50] rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1">
                <h3>{friend.name}</h3>
                <p className="text-sm text-[#4caf50]">Level {friend.level}</p>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Requests List */}
      {activeTab === 'requests' && (
        <div className="px-4 pb-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-2xl p-4 mb-3 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-2xl">
                  {request.avatar}
                </div>
                <div className="flex-1">
                  <h3>{request.name}</h3>
                  <p className="text-sm text-[#4caf50]">Level {request.level}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 bg-[#4caf50] hover:bg-[#45a049] text-white">
                  Accept
                </Button>
                <Button variant="outline" className="flex-1">
                  Decline
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}