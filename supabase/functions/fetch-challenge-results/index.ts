import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { ApiResponse } from "./types.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { fetchGeoGuessrApi, upsertData } from "../utils/apiUtils.ts";

Deno.serve(async (req) => {
  const apiToken = Deno.env.get("GEOGUESSR_API_TOKEN");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  // Validate environment variables
  if (!apiToken || !supabaseUrl || !supabaseServiceRoleKey) {
    return new Response("Missing API URL, Token, or Supabase credentials", {
      status: 500,
    });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  try {
    const { challenge_token, limit } = await req.json();

    const data = await fetchGeoGuessrApi<ApiResponse>(
      `/results/highscores/${challenge_token}?limit=${limit}`,
      "GET",
      apiToken,
      null
    );

    // Populate player table
    await upsertData(
      supabase,
      "player",
      data.items.map((item) => ({
        player_id: item.userId,
        player_name: item.playerName,
        pin_url: item.pinUrl,
      }))
    );

    // Populate challenge_scores table
    const winningItem = data.items[0] || undefined;
    await upsertData(supabase, "challenge_scores", [
      {
        challenge_token,
        winning_player_id: winningItem?.userId ?? null,
        winning_score: winningItem?.totalScore ?? null,
      },
    ]);

    // Populate player_challenge_scores table
    await upsertData(
      supabase,
      "player_challenge_scores",
      data.items.map((item) => ({
        challenge_token,
        player_id: item.userId,
        total_score: item.totalScore,
      }))
    );

    return new Response("Game scores successfully parsed", { status: 200 });
  } catch (error) {
    console.error("Error during fetch-challenge-results: ", error.message);
    return new Response(`Error during fetch-challenge-results: ${error.message}`, {
      status: 500,
    });
  }
});
