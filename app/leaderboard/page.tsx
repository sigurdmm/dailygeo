import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import LeaderboardClient from "./LeaderboardClient";

export default async function LeaderboardPage() {
  const supabase = await createClient<Database>();

  const { data: overallStandings } =
    await supabase.rpc("get_overall_standings");
  const { data: bestRounds } = await supabase.rpc(
    "get_best_rounds"
  );

  if (!bestRounds || !overallStandings) {
    return null;
  }

  return (
    <LeaderboardClient
      overallStandings={overallStandings}
      bestRounds={bestRounds}
    />
  );
}
