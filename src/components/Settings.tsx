import { ArrowLeft, User, Bell, Shield, Globe, Palette, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';

interface SettingsProps {
  onNavigate: (view: 'map' | 'encyclopedia' | 'friends' | 'missions' | 'leaderboard' | 'profile' | 'settings') => void;
}

export function Settings({ onNavigate }: SettingsProps) {
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
          <h1 className="text-xl">設定</h1>
        </div>
      </div>

      {/* Profile Section */}
      <div className="p-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <button 
            className="w-full flex items-center gap-4"
            onClick={() => onNavigate('profile')}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#88b899] to-[#5a9a7a] flex items-center justify-center text-2xl">
              🌱
            </div>
            <div className="flex-1 text-left">
              <h2 className="mb-1">Player1</h2>
              <p className="text-sm text-gray-600">查看個人檔案</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Account Settings */}
        <div className="mb-6">
          <h3 className="text-sm text-gray-600 px-2 mb-3">帳號設定</h3>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#e8f5e8] flex items-center justify-center">
                <User className="w-5 h-5 text-[#4caf50]" />
              </div>
              <div className="flex-1 text-left">
                <p>編輯個人資料</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <Separator />
            <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#e8f5e8] flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#4caf50]" />
              </div>
              <div className="flex-1 text-left">
                <p>隱私與安全</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="mb-6">
          <h3 className="text-sm text-gray-600 px-2 mb-3">通知設定</h3>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-full bg-[#e8f5e8] flex items-center justify-center">
                <Bell className="w-5 h-5 text-[#4caf50]" />
              </div>
              <div className="flex-1">
                <p>推送通知</p>
                <p className="text-sm text-gray-500">當有新植物在附近時提醒</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-full bg-[#e8f5e8] flex items-center justify-center">
                <Bell className="w-5 h-5 text-[#4caf50]" />
              </div>
              <div className="flex-1">
                <p>好友請求通知</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-full bg-[#e8f5e8] flex items-center justify-center">
                <Bell className="w-5 h-5 text-[#4caf50]" />
              </div>
              <div className="flex-1">
                <p>任務完成通知</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* App Settings */}
        <div className="mb-6">
          <h3 className="text-sm text-gray-600 px-2 mb-3">應用程式設定</h3>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#e8f5e8] flex items-center justify-center">
                <Globe className="w-5 h-5 text-[#4caf50]" />
              </div>
              <div className="flex-1 text-left">
                <p>語言</p>
                <p className="text-sm text-gray-500">繁體中文</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <Separator />
            <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#e8f5e8] flex items-center justify-center">
                <Palette className="w-5 h-5 text-[#4caf50]" />
              </div>
              <div className="flex-1 text-left">
                <p>主題</p>
                <p className="text-sm text-gray-500">淺色模式</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Support */}
        <div className="mb-6">
          <h3 className="text-sm text-gray-600 px-2 mb-3">支援</h3>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#e8f5e8] flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-[#4caf50]" />
              </div>
              <div className="flex-1 text-left">
                <p>幫助中心</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <Separator />
            <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#e8f5e8] flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-[#4caf50]" />
              </div>
              <div className="flex-1 text-left">
                <p>關於 PlantGo</p>
                <p className="text-sm text-gray-500">版本 1.0.0</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Logout */}
        <div className="mb-6">
          <Button className="w-full bg-red-500 hover:bg-red-600 text-white h-14 rounded-2xl">
            <LogOut className="w-5 h-5 mr-2" />
            登出
          </Button>
        </div>
      </div>
    </div>
  );
}
