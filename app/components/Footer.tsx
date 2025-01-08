"use client";

import Link from "next/link";
import { Button } from "@nextui-org/react";
import { AiFillGithub } from "react-icons/ai";

const GITHUB_REPO_URL = "https://github.com/sigurdmm/dailygeo";

export default function Footer() {
  return (
    <footer className="flex justify-end items-center text-white p-4">
      <Button
        isIconOnly
        aria-label="GitHub repository"
        variant="light"
        as={Link}
        href={GITHUB_REPO_URL}
        target="_blank"
      >
        <AiFillGithub size={36} color="white" />
      </Button>
    </footer>
  );
}
