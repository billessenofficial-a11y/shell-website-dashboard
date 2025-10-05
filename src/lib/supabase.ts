import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Task = {
  id: string;
  user_id?: string;
  topview_task_id?: string;
  status: string;
  mode: string;
  script_mode: string;
  tts_text?: string;
  voice_id?: string;
  avatar_id?: string;
  template_image_file_id?: string;
  audio_file_id?: string;
  caption_id?: string;
  custom_motion?: string;
  finished_video_url?: string;
  finished_video_cover_url?: string;
  error_message?: string;
  created_at: string;
  updated_at: string;
};

export type CustomAvatar = {
  id: string;
  user_id?: string;
  topview_avatar_id: string;
  template_image_file_id: string;
  cover_url?: string;
  name?: string;
  created_at: string;
};

export type Voice = {
  voiceId: string;
  voiceName: string;
  bestSupportLanguage?: string;
  accent?: string;
  gender?: string;
  age?: string;
  style?: string;
  demoAudioUrl?: string;
};

export type Avatar = {
  avatarId: string;
  imageS3Path: string;
  voiceId?: string;
  categoryList?: Array<{
    categoryId: string;
    categoryName: string;
  }>;
};
