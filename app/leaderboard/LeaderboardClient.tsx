"use client";

import { Database } from "@/types/supabase";
import { Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import { OverallTable } from "./components/OverallTable";
import { BestRoundsTable } from "./components/BestRoundsTable";

interface LeaderboardClientProps {
  overallStandings: Database["public"]["Functions"]["get_overall_standings"]["Returns"];
  bestRounds: Database["public"]["Functions"]["get_best_rounds"]["Returns"];
}

export default function LeaderboardClient({
  overallStandings,
  bestRounds,
}: LeaderboardClientProps) {
  const [activeTab, setActiveTab] = useState<string>("bestrounds");

  return (
    <div>
      <Tabs
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key.toString())}
      >
        <Tab key="overall">Overall</Tab>
        <Tab key="bestrounds">Best Rounds</Tab>
      </Tabs>

      <div className="mt-4">
        {activeTab === "overall" && <OverallTable data={overallStandings} />}
        {activeTab === "bestrounds" && <BestRoundsTable data={bestRounds} />}
      </div>
    </div>
  );
}
