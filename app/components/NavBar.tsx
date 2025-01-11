"use client";

import {
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

import dynamic from "next/dynamic";
const Navbar = dynamic(
  () => import("@nextui-org/react").then((mod) => mod.Navbar),
  { ssr: false }
);

export default function NavBar() {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <Navbar maxWidth="full">
      <NavbarBrand>
        <h1 className="flex justify-center items-center text-4xl font-thin font-bold h-full">
          DailyGeo
        </h1>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem
          isActive={pathname === "" || pathname === "/"}
          className="data-[active=true]:font-bold"
        >
          <Link href="/" color="foreground">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive={pathname === "/leaderboard"}
          className="data-[active=true]:font-bold"
        >
          <Link href="/leaderboard" color="foreground">
            Leaderboard
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
