"use client";
import { useRouter } from "next/navigation";

export default function Hard() {
  const router = useRouter();

  const handleStart = () => {
    router.push(
      `/GuessTheCry?numPokemon=1025&numOptions=32&numLives=0&gameMode=insane_all&leaderboard=leaderboard_all_insane`
    );
  };

                
  return (
    handleStart()
  )
}
