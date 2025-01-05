import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { ApiResponse } from "./types.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const upsertData = async (supabase, table: string, data: any[]) => {
  const { error } = await supabase.from(table).upsert(data);
  if (error) {
    console.error(`Error inserting/updating ${table}:`, error.message);
    throw new Error(`Error inserting/updating ${table}: ${error.message}`);
  }
};

// Fetch results from GeoGuessr API
const fetchResults = async (
  challenge_token: string,
  limit: string,
  apiToken: string
): Promise<ApiResponse> => {
  const apiUrl = `https://www.geoguessr.com/api/v3/results/highscores/${challenge_token}?limit=${limit}`;
  const response = await fetch(apiUrl, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `_ncfa=${apiToken}`,
    },
  });
  return response.json() as ApiResponse;
};

Deno.serve(async (req) => {
  const apiToken = Deno.env.get("GEOGUESSR_API_TOKEN");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  // Validate environment variables
  if (!apiToken || !supabaseUrl || !supabaseServiceRoleKey) {
    console.error("Missing API URL, Token, or Supabase credentials");
    return new Response("Missing API URL, Token, or Supabase credentials", {
      status: 500,
    });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  try {
    // Extract request data
    const { challenge_token, limit } = await req.json();
    const data = await fetchResults(challenge_token, limit, apiToken);

    // Prepare and upsert player data
    const playerUpserts = data.items.map((item) => ({
      player_id: item.userId,
      player_name: item.playerName,
      pin_url: item.pinUrl,
    }));
    await upsertData(supabase, "player", playerUpserts);

    // Prepare and upsert challenge score data
    const winningItem = data.items[0] || undefined;
    const challengeScoreData = [
      {
        challenge_token,
        winning_player_id: winningItem?.userId ?? null,
        winning_score: winningItem?.totalScore ?? null,
      },
    ];
    await upsertData(supabase, "challenge_scores", challengeScoreData);

    // Prepare and upsert player challenge score data
    const playerScoreUpserts = data.items.map((item) => ({
      challenge_token,
      player_id: item.userId,
      total_score: item.totalScore,
    }));
    await upsertData(supabase, "player_challenge_scores", playerScoreUpserts);

    return new Response("Game scores successfully parsed", {
      status: 200,
    });
  } catch (error) {
    console.error("Error processing challenge: ", error.message);
    return new Response(`Error processing challenge: ${error.message}`, {
      status: 500,
    });
  }
});
