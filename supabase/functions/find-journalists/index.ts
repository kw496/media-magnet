import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const OPENAI_MODEL = 'gpt-4o-mini';
const TARGET_JOURNALIST_COUNT = 20;

const buildPrompt = ({
  companyName,
  companyDescription,
  website,
}: {
  companyName: string;
  companyDescription: string;
  website: string;
}) => `You are an expert at finding PR leads for tech startups. You are provided with [Customer company name], [company description], and [URL] which needs media outreach. They need to be covered by premier journalists in prominent media such as WSJ, Forbes, TechCrunch, BusinessInsider, WaPo, NYTimes etc. Find and search ${TARGET_JOURNALIST_COUNT} different journalists who have covered a product like the one specified in the URL. If the URL is not descriptive enough, use the company description text instead. Search for the journalist's email, their LinkedIn address, their X handle, and their instagram.

While doing the search, indicate your sources, and the relevance score.

Return the data as JSON with a top-level "journalists" array of exactly ${TARGET_JOURNALIST_COUNT} entries. Each entry MUST match the following schema and use null when data is unavailable:
{
  "name": string,
  "parentMediaOrganization": string,
  "coverageSummary": string,
  "coverageLink": string (absolute URL),
  "email": string | null,
  "linkedIn": string | null,
  "twitter": string | null,
  "instagram": string | null,
  "relevanceScore": number (0-100),
  "sources": [
    { "description": string, "url": string (absolute URL) }
  ]
}

Customer company name: ${companyName}
Company description: ${companyDescription}
URL: ${website}

Ensure that: (1) at least one source with a working link is provided per journalist, (2) relevanceScore is a whole number between 0 and 100, and (3) coverageSummary references the linked article. Do not include any extra commentary outside of the JSON.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { website, companyName, companyDescription } = await req.json();
    console.log('Finding journalists for:', { website, companyName, companyDescription });

    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    const prompt = buildPrompt({
      website,
      companyName,
      companyDescription,
    });

    const response = await fetch(OPENAI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        temperature: 0.3,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: 'You are a meticulous media researcher who only responds with valid JSON and never includes commentary outside of the JSON object.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content;

    if (typeof rawContent !== 'string') {
      console.error('Unexpected response shape:', data);
      throw new Error('Unexpected OpenAI response format.');
    }

    let parsed: any;
    try {
      parsed = JSON.parse(rawContent);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', rawContent);
      throw new Error('Failed to parse OpenAI response as JSON.');
    }

    const journalists = Array.isArray(parsed.journalists) ? parsed.journalists : [];

    console.log('Found journalists:', journalists.length);

    return new Response(JSON.stringify({ journalists }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in find-journalists function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
