"use client";

import { Navbar, NavbarBrand, Tab, Tabs } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { Key } from "react";

export default function NavBar() {
  const pathname = usePathname(); // Get the current route
  const router = useRouter();

  const handleTabChange = (value: Key) => {
    router.push(value.toString()); // Navigate to the selected tab
  };

  return (
    <Navbar maxWidth="full">
      <NavbarBrand>
        <h1 className="flex justify-center items-center text-4xl font-thin font-bold h-full">
          DailyGeo
        </h1>
      </NavbarBrand>
      <Tabs
        aria-label="Site Navigation"
        selectedKey={pathname}
        onSelectionChange={handleTabChange}
        variant="underlined"
        size="lg"
      >
        <Tab key="/" title="Home" />
        <Tab key="/leaderboard" title="Leaderboard" />
      </Tabs>
    </Navbar>
  );
}
