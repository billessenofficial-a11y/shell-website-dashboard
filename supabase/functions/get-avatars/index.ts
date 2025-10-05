import "jsr:@supabase/functions-js/edge-runtime.d.ts";

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

    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const topviewUrl = new URL(`${TOPVIEW_API_URL}/v1/avatar/list`);
    for (const [key, value] of searchParams.entries()) {
      topviewUrl.searchParams.set(key, value);
    }

    const response = await fetch(topviewUrl.toString(), {
      method: 'GET',
      headers: {
        'X-API-Key': TOPVIEW_API_KEY,
        'X-API-Secret': TOPVIEW_API_SECRET,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

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