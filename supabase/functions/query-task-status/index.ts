import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const TOPVIEW_API_KEY = 'sk--uF5HPbwY-HF1_fd9Zmt543m2Pz58ARPeu96-pnBcJ8';
const TOPVIEW_UID = 'vQIQpbYzxQWSj7zVGwIz';
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

    const url = new URL(req.url);
    const taskId = url.searchParams.get('taskId');

    if (!taskId) {
      throw new Error('Missing taskId parameter');
    }

    const response = await fetch(
      `${TOPVIEW_API_URL}/v1/avatar/query?taskId=${taskId}`,
      {
        method: 'GET',
        headers: {
          'X-API-KEY': TOPVIEW_API_KEY,
          'UID': TOPVIEW_UID,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    
    console.log('TopView API Response:', JSON.stringify(data));

    if (data.code === '200' && data.result) {
      const result = data.result;
      const updateData: any = {};

      if (result.status === 'success') {
        updateData.status = 'success';
        updateData.finished_video_url = result.videoUrl;
        updateData.finished_video_cover_url = result.videoCoverUrl;
      } else if (result.status === 'failed') {
        updateData.status = 'failed';
        updateData.error_message = result.errorMessage || 'Task failed';
      } else if (result.status === 'processing') {
        updateData.status = 'processing';
      }

      if (Object.keys(updateData).length > 0) {
        const { error: dbError } = await supabase
          .from('tasks')
          .update(updateData)
          .eq('topview_task_id', taskId)
          .eq('user_id', user.id);

        if (dbError) {
          console.error('Failed to update task in database:', dbError);
        }
      }
    }

    return new Response(JSON.stringify(data), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error calling TopView API:', error);
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