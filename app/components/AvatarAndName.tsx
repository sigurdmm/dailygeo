"use client";

import { getAvatarUrl } from "@/utils/geoguessr";
import { Avatar } from "@nextui-org/react";

interface AvatarAndNameProps {
  name: string;
  url: string;
}

export function AvatarAndName({ name, url }: AvatarAndNameProps) {
  return (
    <div className="flex items-center gap-2">
      <Avatar src={getAvatarUrl(url)} />
      {name}
    </div>
  );
}
