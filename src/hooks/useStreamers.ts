
import { useState, useEffect } from 'react';
import { fetchMultipleChannels, KickChannelData } from '@/services/kickApi';

export interface StreamerData {
  id: string;
  name: string;
  username: string;
  isLive: boolean;
  viewers: number;
  category: string;
  kickUrl: string;
  thumbnail?: string;
}

const KICK_USERNAMES = [
  'enesbatur',
  'pqueen', 
  'orkunisitmak',
  'reynmen',
  'pintipanda',
  'jahrein',
  'skygun'
];

const transformKickData = (kickData: KickChannelData): StreamerData => {
  return {
    id: kickData.slug,
    name: kickData.user.username,
    username: kickData.slug,
    isLive: kickData.livestream?.is_live || false,
    viewers: kickData.livestream?.viewer_count || 0,
    category: kickData.category?.name || "GTA V - FiveM KEKV",
    kickUrl: `https://kick.com/${kickData.slug}`,
    thumbnail: kickData.livestream?.thumbnail?.responsive || kickData.thumbnail?.responsive
  };
};

export const useStreamers = () => {
  const [streamers, setStreamers] = useState<StreamerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStreamers = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching streamers data...');
      
      const kickData = await fetchMultipleChannels(KICK_USERNAMES);
      const transformedData = kickData.map(transformKickData);
      
      console.log('Fetched streamers:', transformedData);
      setStreamers(transformedData);
    } catch (err) {
      console.error('Error fetching streamers:', err);
      setError('Yayıncı verileri yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStreamers();
    
    // Refresh data every 2 minutes
    const interval = setInterval(fetchStreamers, 120000);
    
    return () => clearInterval(interval);
  }, []);

  return { streamers, loading, error, refreshStreamers: fetchStreamers };
};
