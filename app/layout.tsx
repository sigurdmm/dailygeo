"use client";

import Link from "next/link";
import "./globals.css";
import { Providers } from "./providers";
import { AiFillGithub } from "react-icons/ai"; // Import GitHub icon from React Icons
import { Button } from "@nextui-org/react";

const GITHUB_REPO_URL = "https://github.com/sigurdmm/dailygeo";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body className="antialiased">
        <div className="min-h-screen flex flex-col">
          <header className="h-36">
            <h1 className="flex justify-center items-center text-4xl font-bold h-full">
              Daily geo challenge
            </h1>
          </header>
          <main className="flex flex-grow flex-col items-center justify-center">
            <Providers>{children}</Providers>
          </main>
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
        </div>
      </body>
    </html>
  );
}
