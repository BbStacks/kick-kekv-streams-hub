
import React, { useState } from 'react';
import Header from '@/components/Header';
import StreamerCard from '@/components/StreamerCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Users, Zap, RefreshCw, Loader2 } from 'lucide-react';
import { useStreamers } from '@/hooks/useStreamers';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLive, setFilterLive] = useState(false);
  const { streamers, loading, error, refreshStreamers } = useStreamers();
  
  const filteredStreamers = streamers.filter(streamer => {
    const matchesSearch = streamer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         streamer.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLive = !filterLive || streamer.isLive;
    return matchesSearch && matchesLive;
  });
  
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
            <Button onClick={refreshStreamers} className="bg-neon-purple hover:bg-neon-pink">
              <RefreshCw className="w-4 h-4 mr-2" />
              Tekrar Dene
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Zap className="w-8 h-8 text-neon-purple mr-2" />
              <span className="text-2xl font-bold text-white">{liveStreamers.length}</span>
            </div>
            <p className="text-white/70">Canlı Yayın</p>
          </div>
          
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-8 h-8 text-neon-pink mr-2" />
              <span className="text-2xl font-bold text-white">{totalViewers.toLocaleString()}</span>
            </div>
            <p className="text-white/70">Toplam İzleyici</p>
          </div>
          
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-8 h-8 text-neon-cyan mr-2" />
              <span className="text-2xl font-bold text-white">{streamers.length}</span>
            </div>
            <p className="text-white/70">Toplam Yayıncı</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="glass-effect rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <Input 
                placeholder="Yayıncı ara..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black/30 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={filterLive ? "default" : "outline"}
                onClick={() => setFilterLive(!filterLive)}
                className={`${
                  filterLive 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'border-white/20 text-white hover:bg-white/10'
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                Sadece Canlı
              </Button>
              
              <Button
                variant="outline"
                onClick={refreshStreamers}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Yenile
              </Button>
            </div>
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
          <h2 className="text-3xl font-bold text-white mb-6">
            {searchTerm ? 'Arama Sonuçları' : 'Tüm Yayıncılar'}
          </h2>
          
          {filteredStreamers.length === 0 ? (
            <div className="text-center py-12">
              <div className="glass-effect rounded-xl p-8 max-w-md mx-auto">
                <Search className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Sonuç bulunamadı</h3>
                <p className="text-white/60">Arama kriterlerinizi değiştirmeyi deneyin.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStreamers.map(streamer => (
                <StreamerCard key={streamer.id} {...streamer} />
              ))}
            </div>
          )}
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
