import { gameSettings } from "./config.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

Deno.serve(async () => {
  console.log("Fetching a new challenge");

  const apiUrl = "https://www.geoguessr.com/api/v3";
  const apiToken = Deno.env.get("GEOGUESSR_API_TOKEN");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!apiUrl || !apiToken || !supabaseUrl || !supabaseServiceRoleKey) {
    console.error("Missing API URL, Token, or Supabase credentials");
    return new Response("Missing API URL, Token, or Supabase credentials", {
      status: 500,
    });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  try {
    const response = await fetch(`${apiUrl}/challenges`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `_ncfa=${apiToken}`,
      },
      body: JSON.stringify(gameSettings),
    });

    if (!response.ok) {
      console.error(`Failed to fetch challenge: ${response.statusText}`);
      return new Response(`Failed to fetch challenge: ${response.statusText}`, {
        status: response.status,
      });
    }

    const data = await response.json();

    if (data && data.token) {
      const { data: insertedData, error } = await supabase.from("challenges").insert([
        {
          challenge_id: data.token,
          map: gameSettings.map,
          forbid_moving: gameSettings.forbidMoving,
          forbid_rotating: gameSettings.forbidRotating,
          forbid_zooming: gameSettings.forbidZooming,
          time_limit: gameSettings.timeLimit,
          rounds: gameSettings.rounds,
        },
      ]);

      if (error) {
        console.error("Error inserting challenge ID:", error.message);
        return new Response(`Error inserting challenge ID: ${error.message}`, {
          status: 500,
        });
      }
      return new Response(`Challenge ID successfully inserted: ${data.token}`, {
        status: 200,
      });
    } else {
      console.error("No challenge token received from API");
      return new Response("No challenge token received from API", {
        status: 400,
      });
    }
  } catch (error) {
    console.error("Error fetching challenge: ", error.message);
    return new Response(`Error fetching challenge: ${error.message}`, {
      status: 500,
    });
  }
});
