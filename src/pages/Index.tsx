
import React, { useState } from 'react';
import Header from '@/components/Header';
import StreamerCard from '@/components/StreamerCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Users, Zap } from 'lucide-react';

// Örnek yayıncı verileri - gerçek verilerle değiştirilebilir
const streamers = [
  {
    id: 1,
    name: "Enes Batur",
    username: "enesbatur",
    isLive: true,
    viewers: 2450,
    category: "GTA V - FiveM KEKV",
    kickUrl: "https://kick.com/enesbatur",
    thumbnail: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Pqueen",
    username: "pqueen",
    isLive: true,
    viewers: 1850,
    category: "GTA V - FiveM KEKV",
    kickUrl: "https://kick.com/pqueen",
    thumbnail: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Orkun Işıtmak",
    username: "orkunisitmak",
    isLive: false,
    viewers: 0,
    category: "GTA V - FiveM KEKV",
    kickUrl: "https://kick.com/orkunisitmak",
    thumbnail: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Reynmen",
    username: "reynmen",
    isLive: true,
    viewers: 3200,
    category: "GTA V - FiveM KEKV",
    kickUrl: "https://kick.com/reynmen",
    thumbnail: "/placeholder.svg"
  },
  {
    id: 5,
    name: "Pintipanda",
    username: "pintipanda",
    isLive: false,
    viewers: 0,
    category: "GTA V - FiveM KEKV",
    kickUrl: "https://kick.com/pintipanda",
    thumbnail: "/placeholder.svg"
  },
  {
    id: 6,
    name: "Jahrein",
    username: "jahrein",
    isLive: true,
    viewers: 5670,
    category: "GTA V - FiveM KEKV",
    kickUrl: "https://kick.com/jahrein",
    thumbnail: "/placeholder.svg"
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLive, setFilterLive] = useState(false);
  
  const filteredStreamers = streamers.filter(streamer => {
    const matchesSearch = streamer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         streamer.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLive = !filterLive || streamer.isLive;
    return matchesSearch && matchesLive;
  });
  
  const liveStreamers = streamers.filter(s => s.isLive);
  const totalViewers = liveStreamers.reduce((sum, s) => sum + s.viewers, 0);

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
