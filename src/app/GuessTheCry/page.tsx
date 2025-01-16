"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import Options from "./components/Options"

type GuessTheCryProps = {
    numPokemon: number;
    numOptions: number;
    numLives: number;
    gameMode: string;
    leaderboard: string;
};

type Game = {
    status: string;
    lives: number;
    guesses: number;
    options: {
        currentOptions: Option[];
        correctAnswer: Option;
    };
    audio: HTMLAudioElement | null;
}

export type Option = {
    pokemon: Pokemon | null;
    audio: string | null;
    checkAnswer: ((pokemon: Pokemon) => void) | null;
}

export type Pokemon = {
    id: number;
    name: string;
};


export default function GuessTheCry({numPokemon, numOptions, numLives, gameMode, leaderboard}: GuessTheCryProps){
    //NAVIGATION
    const router = useRouter();

    //SET GAME
    let [game, setGame] = useState<Game>({
        status: "notstarted", lives: numLives, guesses: 0, options: {
            currentOptions: [], 
            correctAnswer: {pokemon: null, audio: null, checkAnswer: null}}, 
            audio: null
    })

    let audioBtn = `/icons/audioBtn.png`

    //-----------------GET ALL POKEMON------------------//
    const [allPokemon, setAllPokemon] = useState<Pokemon[]>([])

    useEffect(()=> {
        async function getAllPokemon(numPokemon: number){
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${numPokemon}`)
            const pokemonData = await res.json()
            setAllPokemon(
                pokemonData.results.map((pokemon: {name: string}, index: number) => ({id: index + 1, name: pokemon.name}))
            )  
        } getAllPokemon(numPokemon)
    },[])
    
    //----------------GENERATE GAME-------------------//
    function generateOptions(totalOptions: number){
        let pokemonArray: Pokemon[] = allPokemon.map(mon => mon) 
        let optionsArray: Option[] = []

        let randomOption: number = Math.floor(Math.random() * pokemonArray.length) 
        let foundOption: Option = {pokemon: pokemonArray[randomOption], audio: `/cries/${pokemonArray[randomOption].id}`, checkAnswer: () => checkAnswer(foundOption)}
        
        //generate all options
        while(optionsArray.length<totalOptions){
            let randomOption: number = Math.floor(Math.random() * pokemonArray.length) 
            let foundOption: Option = {pokemon: pokemonArray[randomOption], audio: `/cries/${pokemonArray[randomOption].id}`, checkAnswer: () => checkAnswer(foundOption)}
            
            optionsArray.push(foundOption) 
            pokemonArray = pokemonArray.filter(mon => mon !== foundOption.pokemon)
        }  

        let answerNumber: number = Math.floor(Math.random() * totalOptions)
        let correctAnswer: Option = optionsArray[answerNumber]
        //console.log(correctAnswer)

        let audioFile: HTMLAudioElement = new Audio(`/cries/${correctAnswer.pokemon!.id}.ogg`)
        audioFile.volume = 0.1
        
        setGame(prevGame => ({...prevGame, 
            options: {
                currentOptions: optionsArray,
                correctAnswer: correctAnswer
            },
            audio: audioFile
        }))
    }

    function renderOptions(options: Option[]){
        return <div className="flex flex-col items-center">
            {gameMode === "easy" ? 
                <div className="grid grid-cols-4 mb-big">
                    {options.map(option => <Options key={option.pokemon!.id} checkAnswer={() => checkAnswer(option)} option={option}/>)}
                </div> 
                :
                <div className="grid grid-cols-8 mb-big">
                    {options.map(option => <Options key={option.pokemon!.id} checkAnswer={() => checkAnswer(option)} option={option}/>)}
                </div> 
            }
            <Link href="/ChooseDifficulty"><button className="button-default">Back</button></Link>
        </div>
    }

    function startGame(){
        setGame(prevGame => ({...prevGame, guesses: 0, status: "ongoing", lives: numLives}))
        generateOptions(numOptions)
    }

    //-------------------GAMEPLAY-------------------//
    function checkAnswer(option: Option){
        if (option === game.options.correctAnswer){
            console.log("Correct") 
            setGame(prevGame => ({...prevGame, guesses: prevGame.guesses + 1}))
            generateOptions(numOptions)
            
        } else {
            console.log("Wrong")
            setGame(prevGame => ({...prevGame, lives: prevGame.lives - 1, guesses: prevGame.guesses + 0}))
            if(game.lives === 0){setGame(prevGame => ({...prevGame, status: "lost"})); }
        }
    }

    //GAME OVER
    useEffect(() => {
        if (game.status === "lost") {
            const url = `/GuessTheCry/gameover?correctAnswer=${game.options.correctAnswer.pokemon!.name}&score=${game.guesses}&gameMode=${gameMode}&leaderboard=${leaderboard}`;
            router.push(url);
        }
    }, [game]);

    return(
        <>
            <div className="flex flex-col items-center">
                <div className="flex flex-row">
                    {game.status === "ongoing" ? <h1 className="m-0 mr-min text-titleRound">Guesses: {game.guesses}</h1> : null}
                    {game.status === "ongoing" ? <h1 className="m-0 text-titleRound">Lives: {game.lives}</h1> : null}
                </div>

                {game.status === "ongoing" ? <button className="m-0 left-min titleRound audio-btn hover:bg-black mb-max" onClick={()=> game.audio!.play()}>
                    {<img className="h-[48px] w-[48px]" src={audioBtn} alt="audioBtn"/>}
                </button> : null}
                
                {game.status === "notstarted" ? 
                <div className="flex flex-col items-center justify-center h-[100vh]">
                    <button className="button-default" onClick={()=> startGame()}>START</button>
                    <Link href="/ChooseDifficulty"><button className="button-default">Back</button></Link>
                </div>
                : renderOptions(game.options.currentOptions)}
                
            </div>
        </>
    )
}