"use client";
import { useRouter } from "next/navigation";

export default function Hard() {
  const router = useRouter();

  const handleStart = () => {
    router.push(
      `/GuessTheCry?numPokemon=721&numOptions=16&numLives=1&gameMode=hard&leaderboard=leaderboard_hard`
    );
  };

                
  return (
    handleStart()
  )
}
