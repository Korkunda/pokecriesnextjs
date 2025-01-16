"use client";

import {useState} from "react"
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link'

export default function GameOver(){
    
    const router = useRouter();
    const searchParams = useSearchParams();

    const correctAnswer = searchParams.get("correctAnswer");
    const score = searchParams.get("score") || "0";
    const gameMode = searchParams.get("gameMode") || "easy"; 
    const leaderboard = searchParams.get("leaderboard") || "";
    
    const [username, setUsername] = useState<string>("");

    function recordScore(username: string, score: number, leaderboard: string) {
        const existingLeaderboard = JSON.parse(localStorage.getItem(leaderboard) ?? "[]");
        
        const newEntry = { Username: username, Score: score };
        const updatedLeaderboard = [...existingLeaderboard, newEntry];
        
        localStorage.setItem(leaderboard, JSON.stringify(updatedLeaderboard));
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        recordScore(username, Number(score), leaderboard); 

        let leaderboardToNavigateTo = "";

        switch(leaderboard){
            case "leaderboard_easy":
                leaderboardToNavigateTo = "LeaderboardEasy"
                break;
            case "leaderboard_hard":
                leaderboardToNavigateTo = "LeaderboardHard"
                break;
            case "leaderboard_insane":
                leaderboardToNavigateTo = "LeaderboardInsane"
                break;
            default:
                console.log(`No Leaderboard found named: ${leaderboard}`)
        }
        router.push(`/${leaderboardToNavigateTo}`);
    }

    function handleTryAgain() {
        const state = {
            easy: "/GuessTheCry/easy",
            hard: "/GuessTheCry/hard",
            insane: "/GuessTheCry/insane",
            insaneAll: "/GuessTheCry/insaneall"
        }[gameMode] || "/";

        router.push(state);
    }
    
    return(
        <>
            <div className="flex flex-col items-center">
                <h1 className="text-gameOver">GAME OVER</h1>
                <div className="flex flex-row">
                    <p>The correct answer was&#160;</p>
                    <p className="text-titleRound">{correctAnswer}</p>
                </div>
                <p>You had a total of {score} guesses</p>
                <div className="mt-max text-background">
                    <form onSubmit={handleSubmit}>
                        <input
                            className="insert-name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your name"
                        />
                        <button type="submit" className="button-default">Record Score</button>
                    </form>
                </div>

                <div className="flex flex-row mt-max">
                    <Link href="/ChooseDifficulty"><button className="button-default">Back</button></Link>
                    <button className="button-default" onClick={()=> handleTryAgain()}>Try Again</button>
                    <Link href="/"><button className="button-default">Return</button></Link>
                </div>

            </div>
        </>
    )
}
