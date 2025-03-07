"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import Options from "./components/Options"
import { useSearchParams } from "next/navigation";


const GuessTheCry = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GuessTheCryContent />
        </Suspense>
    );
};

interface Game {
    status: string;
    lives: number;
    guesses: number;
    options: {
        currentOptions: Option[];
        correctAnswer: Option | null;
    };
    audio: HTMLAudioElement | null;
}

export interface Option {
    pokemon: Pokemon | null;
    audio: string;
}

export interface Pokemon {
    id: number;
    name: string;
}

const GuessTheCryContent = () => {
    const searchParams = useSearchParams();

    const numPokemon = Number(searchParams.get("numPokemon")) || 0;
    const numOptions = Number(searchParams.get("numOptions")) || 0;
    const numLives = Number(searchParams.get("numLives")) || 0;
    const gameMode = searchParams.get("gameMode") || "";
    const leaderboard = searchParams.get("leaderboard") || "";

    //NAVIGATION
    const router = useRouter();

    //SET GAME
    const [game, setGame] = useState<Game>({
        status: "notstarted",
        lives: numLives,
        guesses: 0,
        options: { currentOptions: [], correctAnswer: null },
        audio: null,
    });

    const audioBtn = `/icons/audioBtn.png`

    //-----------------GET ALL POKEMON------------------//
    const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);

    useEffect(() => {
        async function fetchPokemon() {
            try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${numPokemon}`);
            const data = await res.json();
            setAllPokemon(
                data.results.map((pokemon: { name: string }, index: number) => ({
                id: index + 1,
                name: pokemon.name,
                }))
            );
            } catch (error) {
            console.error("Failed to fetch Pokémon", error);
            }
        }
        fetchPokemon();
    }, [numPokemon]);
    
    //----------------GENERATE GAME-------------------//
    function generateOptions(){
        if (allPokemon.length === 0) return;

        const availablePokemon = [...allPokemon]
        const optionsArray: Option[] = []

        while(optionsArray.length < numOptions){
            const randomIndex: number = Math.floor(Math.random() * availablePokemon.length) 
            const selectedPokemon = availablePokemon[randomIndex];
            availablePokemon.splice(randomIndex, 1);
            optionsArray.push({
                pokemon: selectedPokemon,
                audio: `/cries/${selectedPokemon.id}.ogg`,
            });
        }  
        
        const correctAnswer = optionsArray[Math.floor(Math.random() * numOptions)];
        const audioFile: HTMLAudioElement = new Audio(`/cries/${correctAnswer.pokemon!.id}.ogg`)
        audioFile.volume = 0.1;
        
        setGame(prevGame => ({...prevGame, 
            options: {
                currentOptions: optionsArray,
                correctAnswer: correctAnswer
            },
            audio: audioFile
        }))
    }
    

    //-------------------GAMEPLAY-------------------//
    function checkAnswer(selected: Option){
        if (selected.pokemon?.id === game.options.correctAnswer?.pokemon?.id) {
            //Correct
            setGame((prevGame) => ({...prevGame, guesses: prevGame.guesses + 1}))
            generateOptions()
            
        } else {
            //Wrong
            setGame((prevGame) => {
                const newLives = prevGame.lives - 1;
                if (newLives <= 0) {
                    router.push(
                      `/GuessTheCry/gameover?correctAnswer=${prevGame.options.correctAnswer?.pokemon?.name}&score=${prevGame.guesses}&gameMode=${gameMode}&leaderboard=${leaderboard}`
                    );
                    return { ...prevGame, status: "lost", lives: 0 };
                  }
                  return { ...prevGame, lives: newLives };
                });
        }
    }

    function startGame() {
        setGame(prevGame => ({...prevGame, guesses: 0, status: "ongoing", lives: numLives}))
        generateOptions()
    }

    //GAME OVER
    useEffect(() => {
        if (game.status === "lost") {
            const url = `/GuessTheCry/gameover?correctAnswer=${game.options.correctAnswer!.pokemon!.name}&score=${game.guesses}&gameMode=${gameMode}&leaderboard=${leaderboard}`;
            router.push(url);
        }
    }, [game]);

    return (
        <div className="flex flex-col items-center">
            {game.status === "ongoing" && (
                <>
                    <div className="flex flex-row">
                        <h1 className="m-0 mr-4 text-titleRound">Guesses: {game.guesses}</h1>
                        <h1 className="m-0 text-titleRound">Lives: {game.lives}</h1>
                    </div>
                    <button className="audio-btn" onClick={() => game.audio?.play()}>
                        <img className="h-[48px] w-[48px]" src={audioBtn} alt="audioBtn" />
                    </button>
                </>
            )}

            {game.status === "notstarted" ? (
                <div className="flex flex-col items-center justify-center h-screen">
                    <button className="button-default" onClick={startGame}>START</button>
                    <Link href="/ChooseDifficulty">
                        <button className="button-default">Back</button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                    {game.options.currentOptions.map((option) => (
                        <Options key={option.pokemon!.id} option={option} checkAnswer={() => checkAnswer(option)} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default GuessTheCry;
