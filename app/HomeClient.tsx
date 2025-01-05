'use client'

import { Database } from "@/types/supabase";
import { Button } from "@nextui-org/react";

interface Props {
    challenge: Database["public"]["Tables"]["challenges"]["Row"]
}

export default function HomeClient({challenge}: Props) {

    const getChallengeUrl = (challenge_token: string) => challenge_token ? `https://www.geoguessr.com/challenge/${challenge_token}` : undefined
    
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <h1>Daily geo challenges</h1>
            <h2>{ getChallengeUrl(challenge.challenge_token) ?? "No available challenge"}</h2>
        </div>
    )
}