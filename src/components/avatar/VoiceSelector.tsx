import { useState, useEffect, useRef } from 'react';
import { Volume2, Play, Pause, Loader2 } from 'lucide-react';
import { getVoices } from '../../lib/avatarApi';
import type { Voice } from '../../lib/supabase';

interface VoiceSelectorProps {
  selectedVoiceId: string | null;
  onSelectVoice: (voiceId: string) => void;
}

export function VoiceSelector({ selectedVoiceId, onSelectVoice }: VoiceSelectorProps) {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const [filter, setFilter] = useState({ gender: '', age: '', style: '' });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    loadVoices();
  }, [filter]);

  const loadVoices = async () => {
    setLoading(true);
    try {
      const response = await getVoices({
        language: 'en',
        gender: filter.gender || undefined,
        age: filter.age || undefined,
        style: filter.style || undefined,
        pageSize: 100,
      });

      if (response.code === '200' && response.result?.data) {
        setVoices(response.result.data);
      }
    } catch (error) {
      console.error('Failed to load voices:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayPause = (voice: Voice) => {
    if (!voice.demoAudioUrl) return;

    if (playingVoiceId === voice.voiceId) {
      audioRef.current?.pause();
      setPlayingVoiceId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(voice.demoAudioUrl);
      audioRef.current.play();
      audioRef.current.onended = () => setPlayingVoiceId(null);
      setPlayingVoiceId(voice.voiceId);
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
    <div className="space-y-4">
      <div className="flex gap-3">
        <select
          value={filter.gender}
          onChange={(e) => setFilter({ ...filter, gender: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select
          value={filter.age}
          onChange={(e) => setFilter({ ...filter, age: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Ages</option>
          <option value="Young">Young</option>
          <option value="Middle Age">Middle Age</option>
          <option value="Old">Old</option>
        </select>

        <select
          value={filter.style}
          onChange={(e) => setFilter({ ...filter, style: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Styles</option>
          <option value="UGC">UGC</option>
          <option value="Advertisement">Advertisement</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
        {voices.map((voice) => (
          <div
            key={voice.voiceId}
            onClick={() => onSelectVoice(voice.voiceId)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedVoiceId === voice.voiceId
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{voice.voiceName}</h4>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                  {voice.gender && <span className="capitalize">{voice.gender}</span>}
                  {voice.age && <span>• {voice.age}</span>}
                  {voice.style && <span>• {voice.style}</span>}
                </div>
                {voice.accent && (
                  <p className="text-xs text-gray-500 mt-1">{voice.accent}</p>
                )}
              </div>
              {voice.demoAudioUrl && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayPause(voice);
                  }}
                  className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {playingVoiceId === voice.voiceId ? (
                    <Pause className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Play className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
