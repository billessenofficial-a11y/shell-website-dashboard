import React, { useState } from 'react';
import { Video, Sparkles } from 'lucide-react';
import { ImageUploader } from '../avatar/ImageUploader';
import { AvatarSelector } from '../avatar/AvatarSelector';
import { VoiceSelector } from '../avatar/VoiceSelector';
import { TaskHistory } from '../avatar/TaskHistory';
import { submitAvatarTask } from '../../lib/avatarApi';

type TabType = 'upload' | 'template';

export const DashboardAvatarIV: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('upload');
  const [uploadedFileId, setUploadedFileId] = useState<string | null>(null);
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);
  const [selectedAvatarId, setSelectedAvatarId] = useState<string | null>(null);
  const [selectedVoiceId, setSelectedVoiceId] = useState<string | null>(null);
  const [ttsText, setTtsText] = useState('');
  const [mode, setMode] = useState<'avatar2' | 'avatar4'>('avatar4');
  const [customMotion, setCustomMotion] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUploadComplete = (fileId: string, previewUrl: string) => {
    setUploadedFileId(fileId);
    setUploadedPreview(previewUrl);
  };

  const handleSubmit = async () => {
    if (!selectedVoiceId || !ttsText.trim()) {
      setError('Please select a voice and enter text');
      return;
    }

    if (activeTab === 'upload' && !uploadedFileId) {
      setError('Please upload an image');
      return;
    }

    if (activeTab === 'template' && !selectedAvatarId) {
      setError('Please select an avatar template');
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      const params: any = {
        mode,
        scriptMode: 'text',
        ttsText: ttsText.trim(),
        voiceId: selectedVoiceId,
        saveCustomAiAvatar: activeTab === 'upload',
      };

      if (activeTab === 'upload') {
        params.templateImageFileId = uploadedFileId;
      } else {
        params.avatarId = selectedAvatarId;
      }

      if (customMotion.trim()) {
        params.customMotion = customMotion.trim();
      }

      const response = await submitAvatarTask(params);

      if (response.code === '200') {
        setTtsText('');
        setCustomMotion('');
        setUploadedFileId(null);
        setUploadedPreview(null);
        setSelectedAvatarId(null);
        alert('Video generation started! Check the history below for progress.');
      } else {
        setError(response.message || 'Failed to submit task');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit task');
    } finally {
      setSubmitting(false);
    }
  };

  const isFormValid =
    selectedVoiceId &&
    ttsText.trim() &&
    (activeTab === 'upload' ? uploadedFileId : selectedAvatarId);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Video className="w-8 h-8 text-brand-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Avatar IV</h1>
          <p className="text-gray-600 mt-1">Transform photos into talking avatar videos with AI</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create Video</h2>

            <div className="mb-6">
              <div className="flex gap-2 border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`px-4 py-2 font-medium transition-colors ${
                    activeTab === 'upload'
                      ? 'text-brand-600 border-b-2 border-brand-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Upload Image
                </button>
                <button
                  onClick={() => setActiveTab('template')}
                  className={`px-4 py-2 font-medium transition-colors ${
                    activeTab === 'template'
                      ? 'text-brand-600 border-b-2 border-brand-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Choose Template
                </button>
              </div>
            </div>

            <div className="mb-6">
              {activeTab === 'upload' ? (
                <ImageUploader onUploadComplete={handleUploadComplete} />
              ) : (
                <AvatarSelector
                  selectedAvatarId={selectedAvatarId}
                  onSelectAvatar={setSelectedAvatarId}
                />
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Voice
              </label>
              <VoiceSelector
                selectedVoiceId={selectedVoiceId}
                onSelectVoice={setSelectedVoiceId}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avatar Mode
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setMode('avatar2')}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                    mode === 'avatar2'
                      ? 'border-brand-500 bg-brand-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">Avatar 2</div>
                  <div className="text-xs text-gray-600 mt-1">Up to 28 seconds</div>
                </button>
                <button
                  onClick={() => setMode('avatar4')}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                    mode === 'avatar4'
                      ? 'border-brand-500 bg-brand-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">Avatar 4</div>
                  <div className="text-xs text-gray-600 mt-1">Up to 120 seconds</div>
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Script Text
              </label>
              <textarea
                value={ttsText}
                onChange={(e) => setTtsText(e.target.value)}
                placeholder="Enter the text you want the avatar to say..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
              />
              <div className="flex justify-between mt-1">
                <p className="text-xs text-gray-500">
                  Maximum {mode === 'avatar2' ? '28' : '120'} seconds of speech
                </p>
                <p className="text-xs text-gray-500">{ttsText.length} characters</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Motion (Optional)
              </label>
              <input
                type="text"
                value={customMotion}
                onChange={(e) => setCustomMotion(e.target.value)}
                placeholder="e.g., The person is waving their hand"
                maxLength={600}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Describe the actions you want the avatar to perform
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={!isFormValid || submitting}
              className="w-full px-6 py-3 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? 'Generating...' : 'Generate Video'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Videos</h2>
            <TaskHistory />
          </div>
        </div>
      </div>
    </div>
  );
};
