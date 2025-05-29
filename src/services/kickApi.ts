
export interface KickChannelData {
  id: number;
  user: {
    username: string;
  };
  slug: string;
  playback_url: string;
  thumbnail?: {
    responsive: string;
  };
  category?: {
    name: string;
  };
  livestream?: {
    id: number;
    is_live: boolean;
    viewer_count: number;
    thumbnail: {
      responsive: string;
    };
  } | null;
}

export const fetchKickChannelData = async (username: string): Promise<KickChannelData | null> => {
  try {
    const response = await fetch(`https://kick.com/api/v1/channels/${username}`);
    if (!response.ok) {
      console.error(`Failed to fetch data for ${username}:`, response.status);
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data for ${username}:`, error);
    return null;
  }
};

export const fetchMultipleChannels = async (usernames: string[]): Promise<KickChannelData[]> => {
  const promises = usernames.map(username => fetchKickChannelData(username));
  const results = await Promise.all(promises);
  return results.filter((data): data is KickChannelData => data !== null);
};
