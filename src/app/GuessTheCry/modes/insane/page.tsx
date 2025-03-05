"use client";
import { useRouter } from "next/navigation";

export default function Hard() {
  const router = useRouter();

  const handleStart = () => {
    router.push(
      `/GuessTheCry?numPokemon=721&numOptions=32&numLives=0&gameMode=insane&leaderboard=leaderboard_insane`
    );
  };

                
  return (
    handleStart()
  )
}
