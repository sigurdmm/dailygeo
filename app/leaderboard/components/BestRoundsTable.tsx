import { AvatarAndName } from "@/app/components/AvatarAndName";
import { Database } from "@/types/supabase";
import { getChallengeUrl } from "@/utils/geoguessr";
import { formatPostgresTimestamp } from "@/utils/time";
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

interface BestRoundsTableProps {
  data: Database["public"]["Functions"]["get_best_rounds"]["Returns"];
}

export function BestRoundsTable({ data }: BestRoundsTableProps) {
  const handleRowClick = (challengeToken: string) => {
    window.open(
      getChallengeUrl(challengeToken),
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <Table isStriped aria-label="Best Rounds Leaderboard">
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Date</TableColumn>
        <TableColumn>Score</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow
            key={`${row.challenge_token}${row.player_id}`}
            onClick={() => handleRowClick(row.challenge_token)}
            className="hover:bg-purple-200 hover:cursor-pointer"
          >
            <TableCell>
              <AvatarAndName name={row.player_name} url={row.pin_url} />
            </TableCell>
            <TableCell>{formatPostgresTimestamp(row.created_at)}</TableCell>
            <TableCell>{row.total_score}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
