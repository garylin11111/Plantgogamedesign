import { useState } from 'react';
import { X, Camera, MapPin, Info } from 'lucide-react';
import { Button } from './ui/button';

interface CaptureModalProps {
  plantName?: string;
  location?: string;
  onClose: () => void;
}

export function CaptureModal({ plantName, location, onClose }: CaptureModalProps) {
  const [capturing, setCapturing] = useState(false);
  const [captured, setCaptured] = useState(false);
  const [scanning, setScanning] = useState(false);

  const handleCapture = () => {
    setScanning(true);
    setCapturing(true);
    setTimeout(() => {
      setScanning(false);
      setTimeout(() => {
        setCapturing(false);
        setCaptured(true);
      }, 500);
    }, 2000);
  };

  // Mock location descriptions based on landmarks
  const getLocationDescription = (loc?: string) => {
    const descriptions: Record<string, string> = {
      'Main Library Garden': 'A peaceful spot perfect for studying among nature',
      'Student Center Plaza': 'The heart of campus social life',
      'Administration Building': 'Historic trees surrounding the main office',
      'Dormitory Area': 'Green spaces near student housing',
      'Chapel Garden': 'Spiritual sanctuary with beautiful landscaping',
    };
    return loc ? descriptions[loc] || 'An interesting location on campus' : '';
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-[#4caf50] text-white p-4 flex items-center justify-between">
          <h2 className="text-lg">
            {captured ? '成功捕獲!' : plantName ? `發現 ${plantName}` : '探索植物'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!captured ? (
            <>
              {/* AR Camera View */}
              <div className="aspect-square bg-gradient-to-br from-[#a8d5ba] via-[#b8dfcc] to-[#c8e6d8] rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden">
                {scanning && (
                  <div className="absolute inset-0 z-20">
                    {/* AR Scanning Grid Animation */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#4caf50]/20 to-transparent animate-pulse" />
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#4caf50] animate-scan" />
                    {/* Scanning Text */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Analyzing plant...
                    </div>
                  </div>
                )}
                {capturing && !scanning && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-20">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#4caf50] border-t-transparent" />
                  </div>
                )}
                <div className={`text-8xl ${scanning ? 'animate-pulse' : 'animate-bounce'}`}>
                  {plantName?.includes('Golden Shower') ? '🌸' : '🌿'}
                </div>
                {/* AR Targeting Reticle */}
                <div className="absolute inset-8 border-4 border-white/50 rounded-2xl pointer-events-none">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#4caf50]" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#4caf50]" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#4caf50]" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#4caf50]" />
                  {/* Center crosshair */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8">
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#4caf50]/50" />
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#4caf50]/50" />
                  </div>
                </div>
              </div>

              {/* Location Info Card */}
              {plantName && location && (
                <div className="bg-[#e8f5e8] rounded-xl p-4 mb-4 border-2 border-[#4caf50]/30">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#4caf50] rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-[#2d6a5a]">Location: {location}</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {getLocationDescription(location)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <p className="text-gray-600 mb-2">
                  對準植物並點擊捕獲按鈕
                </p>
                {plantName && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-[#e8f5e8] rounded-full text-sm">
                    <span className="w-2 h-2 bg-[#4caf50] rounded-full animate-pulse" />
                    <span>植物在附近</span>
                  </div>
                )}
              </div>

              <Button
                className="w-full bg-[#4caf50] hover:bg-[#45a049] text-white h-14 rounded-full"
                onClick={handleCapture}
                disabled={capturing}
              >
                <Camera className="w-6 h-6 mr-2" />
                {capturing ? '捕獲中...' : '捕獲植物'}
              </Button>
            </>
          ) : (
            <>
              {/* Success View */}
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-[#4caf50] to-[#66bb6a] rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-6xl">🎉</span>
                </div>
                <h3 className="text-xl mb-2">
                  成功捕獲 {plantName || '神秘植物'}!
                </h3>
                <p className="text-gray-600 mb-4">
                  這個植物已加入你的收藏
                </p>

                {/* Location Badge */}
                {location && (
                  <div className="inline-flex items-center gap-2 bg-[#e8f5e8] rounded-full px-4 py-2 mb-4">
                    <MapPin className="w-4 h-4 text-[#4caf50]" />
                    <span className="text-sm">{location}</span>
                  </div>
                )}

                <div className="bg-[#e8f5e8] rounded-2xl p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">獲得經驗值</span>
                    <span className="text-[#4caf50]">+50 XP</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">稀有度</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-sm ${i < 3 ? 'text-[#ffd700]' : 'text-gray-300'}`}>
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-[#4caf50] hover:bg-[#45a049] text-white h-12 rounded-full"
                  onClick={onClose}
                >
                  繼續探索
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}