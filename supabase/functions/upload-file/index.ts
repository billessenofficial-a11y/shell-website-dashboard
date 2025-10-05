import "jsr:@supabase/functions-js/edge-runtime.d.ts";

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
    const body = await req.json();
    const { file, format } = body;

    if (!file || !format) {
      throw new Error('Missing file or format parameter');
    }

    const response = await fetch(`${TOPVIEW_API_URL}/v1/file/upload`, {
      method: 'POST',
      headers: {
        'X-API-KEY': TOPVIEW_API_KEY,
        'UID': TOPVIEW_UID,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ file, format }),
    });

    const data = await response.json();
    
    console.log('TopView API Response:', JSON.stringify(data));

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