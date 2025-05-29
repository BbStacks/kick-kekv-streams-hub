
import React from 'react';
import StreamerCard from '@/components/StreamerCard';
import { Badge } from "@/components/ui/badge";
import { Users, Zap, RefreshCw, Loader2 } from 'lucide-react';
import { useStreamers } from '@/hooks/useStreamers';

const Index = () => {
  const { streamers, loading, error, refreshStreamers } = useStreamers();
  
  const liveStreamers = streamers.filter(s => s.isLive);
  const totalViewers = liveStreamers.reduce((sum, s) => sum + s.viewers, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-neon-purple animate-spin mx-auto mb-4" />
          <p className="text-white text-xl">Yayıncı verileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="glass-effect rounded-xl p-8 max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-white mb-2">Hata Oluştu</h3>
            <p className="text-white/60 mb-4">{error}</p>
            <button onClick={refreshStreamers} className="bg-neon-purple hover:bg-neon-pink px-4 py-2 rounded text-white">
              <RefreshCw className="w-4 h-4 mr-2 inline" />
              Tekrar Dene
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-4">
        
        {/* Compact Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="glass-effect rounded-lg p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <Zap className="w-5 h-5 text-neon-purple mr-1" />
              <span className="text-lg font-bold text-white">{liveStreamers.length}</span>
            </div>
            <p className="text-white/70 text-sm">Canlı Yayın</p>
          </div>
          
          <div className="glass-effect rounded-lg p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <Users className="w-5 h-5 text-neon-pink mr-1" />
              <span className="text-lg font-bold text-white">{totalViewers.toLocaleString()}</span>
            </div>
            <p className="text-white/70 text-sm">Toplam İzleyici</p>
          </div>
          
          <div className="glass-effect rounded-lg p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <Users className="w-5 h-5 text-neon-cyan mr-1" />
              <span className="text-lg font-bold text-white">{streamers.length}</span>
            </div>
            <p className="text-white/70 text-sm">Toplam Yayıncı</p>
          </div>
        </div>

        {/* Live Streamers Section */}
        {liveStreamers.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl font-bold text-white">Canlı Yayınlar</h2>
              <Badge className="bg-red-500 text-white animate-pulse">
                🔴 {liveStreamers.length} yayın
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveStreamers.map(streamer => (
                <StreamerCard key={streamer.id} {...streamer} />
              ))}
            </div>
          </div>
        )}

        {/* All Streamers Section */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-6">Tüm Yayıncılar</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {streamers.map(streamer => (
              <StreamerCard key={streamer.id} {...streamer} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center py-8 border-t border-white/10">
          <div className="glass-effect rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-2">KEKV FiveM Sunucusu</h3>
            <p className="text-white/70 mb-4">
              Türkiye'nin en büyük FiveM sunucularından biri olan KEKV'de 
              en sevdiğiniz yayıncıları takip edin!
            </p>
            <div className="flex justify-center gap-4">
              <Badge variant="outline" className="border-neon-purple text-neon-purple">
                GTA V
              </Badge>
              <Badge variant="outline" className="border-neon-pink text-neon-pink">
                FiveM
              </Badge>
              <Badge variant="outline" className="border-neon-cyan text-neon-cyan">
                Roleplay
              </Badge>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
