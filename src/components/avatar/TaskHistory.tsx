import { useState, useEffect } from 'react';
import { Download, Loader2, RefreshCw, Play, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { queryTaskStatus } from '../../lib/avatarApi';
import type { Task } from '../../lib/supabase';

export function TaskHistory() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
    const interval = setInterval(checkPendingTasks, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkPendingTasks = async () => {
    const pendingTasks = tasks.filter(
      (task) => task.status === 'processing' || task.status === 'pending'
    );

    for (const task of pendingTasks) {
      if (task.topview_task_id) {
        try {
          await queryTaskStatus(task.topview_task_id);
        } catch (error) {
          console.error('Failed to check task status:', error);
        }
      }
    }

    await loadTasks();
  };

  const handleRefresh = async (taskId: string, topviewTaskId: string) => {
    setRefreshing(taskId);
    try {
      await queryTaskStatus(topviewTaskId);
      await loadTasks();
    } catch (error) {
      console.error('Failed to refresh task:', error);
    } finally {
      setRefreshing(null);
    }
  };

  const handleDownload = (url: string, taskId: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `avatar-video-${taskId}.mp4`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <Play className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No videos generated yet</p>
        <p className="text-sm text-gray-400 mt-1">Create your first AI avatar video above</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
        >
          <div className="flex items-start gap-4">
            {task.finished_video_cover_url ? (
              <div className="relative w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={task.finished_video_cover_url}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
                {task.status === 'success' && task.finished_video_url && (
                  <a
                    href={task.finished_video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                  >
                    <Play className="w-8 h-8 text-white" />
                  </a>
                )}
              </div>
            ) : (
              <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                {task.status === 'processing' ? (
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                ) : task.status === 'failed' ? (
                  <AlertCircle className="w-8 h-8 text-red-500" />
                ) : (
                  <Play className="w-8 h-8 text-gray-400" />
                )}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        task.status === 'success'
                          ? 'bg-green-100 text-green-800'
                          : task.status === 'processing'
                          ? 'bg-blue-100 text-blue-800'
                          : task.status === 'failed'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {task.status}
                    </span>
                    <span className="text-xs text-gray-500 uppercase">{task.mode}</span>
                  </div>
                  {task.tts_text && (
                    <p className="mt-2 text-sm text-gray-700 line-clamp-2">{task.tts_text}</p>
                  )}
                  {task.error_message && (
                    <p className="mt-2 text-sm text-red-600">{task.error_message}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    {new Date(task.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  {(task.status === 'processing' || task.status === 'pending') &&
                    task.topview_task_id && (
                      <button
                        onClick={() => handleRefresh(task.id, task.topview_task_id!)}
                        disabled={refreshing === task.id}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        <RefreshCw
                          className={`w-5 h-5 ${refreshing === task.id ? 'animate-spin' : ''}`}
                        />
                      </button>
                    )}
                  {task.status === 'success' && task.finished_video_url && (
                    <button
                      onClick={() => handleDownload(task.finished_video_url!, task.id)}
                      className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
