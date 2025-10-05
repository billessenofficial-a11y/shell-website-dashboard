import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface VideoItem {
  video_id: string;
  video_name: string;
  status: 'queued' | 'generating' | 'ready' | 'deleted' | 'error';
  created_at: string;
  updated_at?: string;
}

interface VideoDetailPageProps {
  video: VideoItem;
  onBack: () => void;
}

export const VideoDetailPage: React.FC<VideoDetailPageProps> = ({
  video,
  onBack
}) => {
  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Projects
      </button>

      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">{video.video_name}</h1>

        <div className="space-y-4">
          <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p className="text-lg font-medium mb-2">Video Player</p>
              <p className="text-sm">Video playback functionality will be available soon</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Status:</span>
              <span className="ml-2 font-medium capitalize">{video.status}</span>
            </div>
            <div>
              <span className="text-gray-500">Created:</span>
              <span className="ml-2 font-medium">{new Date(video.created_at).toLocaleString()}</span>
            </div>
            <div>
              <span className="text-gray-500">Video ID:</span>
              <span className="ml-2 font-mono text-xs">{video.video_id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
