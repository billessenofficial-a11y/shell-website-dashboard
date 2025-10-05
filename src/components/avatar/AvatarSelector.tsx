import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { getAvatars } from '../../lib/avatarApi';
import type { Avatar } from '../../lib/supabase';

interface AvatarSelectorProps {
  selectedAvatarId: string | null;
  onSelectAvatar: (avatarId: string) => void;
}

export function AvatarSelector({ selectedAvatarId, onSelectAvatar }: AvatarSelectorProps) {
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAvatars();
  }, []);

  const loadAvatars = async () => {
    setLoading(true);
    try {
      const response = await getAvatars({
        isCustom: false,
        pageSize: 50,
      });

      if (response.code === '200' && response.result?.data) {
        setAvatars(response.result.data);
      }
    } catch (error) {
      console.error('Failed to load avatars:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
      {avatars.map((avatar) => (
        <div
          key={avatar.avatarId}
          onClick={() => onSelectAvatar(avatar.avatarId)}
          className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-4 transition-all ${
            selectedAvatarId === avatar.avatarId
              ? 'border-blue-500 shadow-lg'
              : 'border-transparent hover:border-gray-300'
          }`}
        >
          <img
            src={avatar.imageS3Path}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
          {selectedAvatarId === avatar.avatarId && (
            <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
