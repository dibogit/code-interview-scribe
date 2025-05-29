
import React from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User } from 'lucide-react';

interface VideoCallInterfaceProps {
  isVideoOff: boolean;
  isMuted: boolean;
  currentQuestion: string;
}

const VideoCallInterface: React.FC<VideoCallInterfaceProps> = ({ 
  isVideoOff, 
  isMuted, 
  currentQuestion 
}) => {
  return (
    <div className="h-full flex flex-col space-y-4">
      {/* AI Interviewer Video */}
      <Card className="flex-1 bg-gray-800 border-gray-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
        
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
              <Bot className="w-16 h-16 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">AI Interviewer</h3>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">Speaking</span>
            </div>
          </div>
        </div>

        {/* Current Question Overlay */}
        {currentQuestion && (
          <div className="absolute bottom-4 left-4 right-4 bg-black/70 rounded-lg p-4">
            <p className="text-white text-sm leading-relaxed">
              <span className="text-blue-400 font-medium">Current Question: </span>
              {currentQuestion}
            </p>
          </div>
        )}
      </Card>

      {/* User Video */}
      <Card className="h-48 bg-gray-800 border-gray-600 relative overflow-hidden">
        {isVideoOff ? (
          <div className="h-full flex items-center justify-center bg-gray-700">
            <div className="text-center">
              <Avatar className="w-16 h-16 mx-auto mb-2">
                <AvatarFallback className="bg-gray-600">
                  <User className="w-8 h-8 text-gray-300" />
                </AvatarFallback>
              </Avatar>
              <p className="text-gray-300 text-sm">Camera Off</p>
            </div>
          </div>
        ) : (
          <div className="h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
            <div className="text-center">
              <Avatar className="w-16 h-16 mx-auto mb-2">
                <AvatarFallback className="bg-blue-600 text-white">
                  <User className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
              <p className="text-white text-sm">You</p>
            </div>
          </div>
        )}

        {/* Mute Indicator */}
        {isMuted && (
          <div className="absolute top-2 right-2 bg-red-500 rounded-full p-1">
            <span className="text-white text-xs px-2">MUTED</span>
          </div>
        )}

        {/* User Label */}
        <div className="absolute bottom-2 left-2 bg-black/50 rounded px-2 py-1">
          <span className="text-white text-xs">You</span>
        </div>
      </Card>
    </div>
  );
};

export default VideoCallInterface;
