import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const TOPVIEW_API_KEY = Deno.env.get('TOPVIEW_API_KEY');
const TOPVIEW_API_SECRET = Deno.env.get('TOPVIEW_API_SECRET');
const TOPVIEW_API_URL = 'https://api.topview.ai';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (!TOPVIEW_API_KEY || !TOPVIEW_API_SECRET) {
      throw new Error('TopView API credentials not configured');
    }

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    const body = await req.json();

    const response = await fetch(`${TOPVIEW_API_URL}/v1/avatar/submit`, {
      method: 'POST',
      headers: {
        'X-API-Key': TOPVIEW_API_KEY,
        'X-API-Secret': TOPVIEW_API_SECRET,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.code === '200' && data.result?.taskId) {
      const { error: dbError } = await supabase.from('tasks').insert({
        user_id: user.id,
        topview_task_id: data.result.taskId,
        status: 'processing',
        mode: body.mode,
        script_mode: body.scriptMode,
        tts_text: body.ttsText,
        voice_id: body.voiceId,
        avatar_id: body.avatarId,
        template_image_file_id: body.templateImageFileId,
        audio_file_id: body.audioFileId,
        caption_id: body.captionId,
        custom_motion: body.customMotion,
      });

      if (dbError) {
        console.error('Failed to save task to database:', dbError);
      }
    }

    return new Response(JSON.stringify(data), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message, code: '500' }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});