/*
  # Create Tasks and Custom Avatars Tables

  ## Purpose
  This migration creates tables to store video generation tasks and custom avatars
  for the AI video platform.

  ## New Tables
  
  ### `tasks`
  Stores video generation task information
  - `id` (uuid, primary key) - Unique task identifier
  - `user_id` (uuid, foreign key) - References auth.users.id
  - `topview_task_id` (text) - External TopView API task ID
  - `status` (text) - Task status (pending, processing, success, failed)
  - `mode` (text) - Generation mode (avatar2, avatar4)
  - `script_mode` (text) - Script input mode (text, audio)
  - `tts_text` (text) - Text-to-speech input text
  - `voice_id` (text) - Selected voice ID
  - `avatar_id` (text) - Selected avatar ID
  - `template_image_file_id` (text) - Uploaded template image file ID
  - `audio_file_id` (text) - Uploaded audio file ID
  - `caption_id` (text) - Caption template ID
  - `custom_motion` (text) - Custom motion settings
  - `finished_video_url` (text) - URL to completed video
  - `finished_video_cover_url` (text) - URL to video thumbnail
  - `error_message` (text) - Error details if failed
  - `created_at` (timestamptz, default now())
  - `updated_at` (timestamptz, default now())

  ### `custom_avatars`
  Stores user's custom avatar creations
  - `id` (uuid, primary key) - Unique avatar identifier
  - `user_id` (uuid, foreign key) - References auth.users.id
  - `topview_avatar_id` (text, not null) - External TopView avatar ID
  - `template_image_file_id` (text, not null) - Template image file ID
  - `cover_url` (text) - Avatar thumbnail URL
  - `name` (text) - Custom avatar name
  - `created_at` (timestamptz, default now())

  ## Security
  
  ### Row Level Security (RLS)
  Both tables have RLS enabled with policies that:
  - Allow users to read only their own data
  - Allow users to create their own data
  - Allow users to update only their own data
  - All policies require authentication

  ## Important Notes
  - Tasks automatically link to the authenticated user
  - Custom avatars are scoped per user
  - Updated_at timestamp is automatically maintained for tasks
*/

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  topview_task_id text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'success', 'failed')),
  mode text DEFAULT 'avatar2' CHECK (mode IN ('avatar2', 'avatar4')),
  script_mode text DEFAULT 'text' CHECK (script_mode IN ('text', 'audio')),
  tts_text text,
  voice_id text,
  avatar_id text,
  template_image_file_id text,
  audio_file_id text,
  caption_id text,
  custom_motion text,
  finished_video_url text,
  finished_video_cover_url text,
  error_message text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create custom_avatars table
CREATE TABLE IF NOT EXISTS custom_avatars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  topview_avatar_id text NOT NULL,
  template_image_file_id text NOT NULL,
  cover_url text,
  name text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on tasks
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Enable RLS on custom_avatars
ALTER TABLE custom_avatars ENABLE ROW LEVEL SECURITY;

-- Tasks policies
CREATE POLICY "Users can read own tasks"
  ON tasks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own tasks"
  ON tasks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks"
  ON tasks
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Custom avatars policies
CREATE POLICY "Users can read own custom avatars"
  ON custom_avatars
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own custom avatars"
  ON custom_avatars
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own custom avatars"
  ON custom_avatars
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own custom avatars"
  ON custom_avatars
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Reuse the update_updated_at function from previous migration
DROP TRIGGER IF EXISTS update_tasks_updated_at ON tasks;
CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();