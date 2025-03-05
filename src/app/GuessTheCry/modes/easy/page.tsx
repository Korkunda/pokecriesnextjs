"use client";
import { useRouter } from "next/navigation";

export default function Easy() {
  const router = useRouter();

  const handleStart = () => {
    router.push(
      `/GuessTheCry?numPokemon=721&numOptions=4&numLives=3&gameMode=easy&leaderboard=leaderboard_easy`
    );
  };

                
  return (
    handleStart()
  )
}
