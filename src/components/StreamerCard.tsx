
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Users, Eye } from 'lucide-react';

interface StreamerCardProps {
  name: string;
  username: string;
  isLive: boolean;
  viewers?: number;
  category?: string;
  thumbnail?: string;
  kickUrl: string;
}

const StreamerCard: React.FC<StreamerCardProps> = ({
  name,
  username,
  isLive,
  viewers = 0,
  category = "GTA V - FiveM",
  thumbnail,
  kickUrl
}) => {
  return (
    <Card className="group relative overflow-hidden glass-effect hover:scale-105 transition-all duration-300 hover:animate-pulse-glow">
      <div className="relative">
        {/* Thumbnail */}
        <div className="aspect-video bg-gradient-to-br from-gaming-600 to-gaming-800 relative overflow-hidden">
          {thumbnail ? (
            <img 
              src={thumbnail} 
              alt={`${name} yayını`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gaming-700 via-gaming-600 to-gaming-800 flex items-center justify-center">
              <div className="text-center text-white/70">
                <Eye className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm">Yayın Önizlemesi</p>
              </div>
            </div>
          )}
          
          {/* Live indicator */}
          {isLive && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-red-500 text-white font-bold animate-pulse">
                🔴 CANLI
              </Badge>
            </div>
          )}
          
          {/* Viewer count */}
          {isLive && (
            <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-md text-sm flex items-center gap-1">
              <Users className="w-4 h-4" />
              {viewers.toLocaleString()}
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Streamer info */}
            <div>
              <h3 className="font-bold text-lg text-white group-hover:text-neon-purple transition-colors">
                {name}
              </h3>
              <p className="text-white/60 text-sm">@{username}</p>
            </div>
            
            {/* Category */}
            <Badge variant="secondary" className="bg-gaming-700/50 text-white">
              {category}
            </Badge>
            
            {/* Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-sm text-white/70">
                {isLive ? 'Şu anda yayında' : 'Çevrimdışı'}
              </span>
            </div>
            
            {/* Action button */}
            <Button 
              className={`w-full ${
                isLive 
                  ? 'bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-pink hover:to-neon-purple text-white font-bold' 
                  : 'bg-gray-600 hover:bg-gray-500 text-white'
              } transition-all duration-300`}
              onClick={() => window.open(kickUrl, '_blank')}
              disabled={!isLive}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {isLive ? 'Yayını İzle' : 'Çevrimdışı'}
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default StreamerCard;
