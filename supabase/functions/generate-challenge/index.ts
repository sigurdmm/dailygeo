import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { gameSettings } from "./config.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { fetchGeoGuessrApi } from "../utils/apiUtils.ts";

const apiUrl = "https://www.geoguessr.com/api/v3";
const apiToken = Deno.env.get("GEOGUESSR_API_TOKEN");
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

interface ChallengeResponse {
  token: string;
}

Deno.serve(async (req: Request) => {
  try {

    if (!apiUrl || !apiToken || !supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error(`Missing API URL, Token, or Supabase credentials`);
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    const data = await fetchGeoGuessrApi<ChallengeResponse>(
      "/challenges",
      "POST",
      apiToken,
      gameSettings
    );

    if (!data || !data.token) {
      throw new Error("No token found");
    }

    const { data: insertedData, error } = await supabase
      .from("challenges")
      .insert([
        {
          challenge_token: data.token,
          map: gameSettings.map,
          forbid_moving: gameSettings.forbidMoving,
          forbid_rotating: gameSettings.forbidRotating,
          forbid_zooming: gameSettings.forbidZooming,
          time_limit: gameSettings.timeLimit,
          rounds: gameSettings.rounds,
        },
      ]);

    if (error) {
      throw new Error("Error inserting challenge to challenges table");
    }

    return new Response("generate-challenge function run successfully!", {
      status: 200,
    });
  } catch (error) {
    console.error("Error: ", error.message);
    return new Response(error.message, { status: 500 });
  }
});