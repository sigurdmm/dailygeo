"use client";

import { Database } from "@/types/supabase";
import { Button, Link } from "@nextui-org/react";
import { PressEvent } from "@react-types/shared";

interface Props {
  challenge: Database["public"]["Tables"]["challenges"]["Row"];
}

export default function HomeClient({ challenge }: Props) {
  const challengeUrl = challenge.challenge_token
    ? `https://www.geoguessr.com/challenge/${challenge.challenge_token}`
    : undefined;

  return (
    <div className="flex flex-col items-center justify-center w-full gap-2">
      {challengeUrl ? (
        <Button
          showAnchorIcon
          as={Link}
          color="default"
          href={challengeUrl}
          variant="bordered"
          target="_blank"
          size="lg"
        >
          Open todays geo
        </Button>
      ) : (
        <h2>No content? Just vibes. ✨</h2>
      )}
    </div>
  );
}
