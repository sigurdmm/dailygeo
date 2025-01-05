'use client'

import { Database } from "@/types/supabase";
import { Button } from "@nextui-org/react";

interface Props {
    challenges: Database["public"]["Tables"]["challenges"]["Row"][]
}

export default function HomeClient({challenges}: Props) {

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <h1>Daily geo challenges</h1>
            { challenges?.map(item => <h2 key={item.id}>{Object.values(item).join(" - ")}</h2>) }
        </div>
    )
}