"use client";

import { Database } from "@/types/supabase";
import { getAvatarUrl } from "@/utils/geoguessr";
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

interface OverallTableProps {
  data: Database["public"]["Functions"]["get_overall_standings"]["Returns"];
}

export function OverallTable({ data }: OverallTableProps) {
  return (
    <Table isStriped aria-label="Overall Leaderboard">
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Victories</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.player_id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar src={getAvatarUrl(row.pin_url)} />
                {row.player_name}
              </div>
            </TableCell>
            <TableCell>{row.victories}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
