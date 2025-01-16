"use client";

import React, { useState, useEffect } from "react";
import Link from 'next/link'
import PokemonSquare from "./PokemonOptionProps";

export type Pokemon = {
    id: number;
    name: string;
};

export default function Pokedex(){

    const [allPokemon, setAllPokemon] = useState<Pokemon[]>([])

    const [gen1, setGen1] = useState<Option[]>([])
    const [gen2, setGen2] = useState<Option[]>([])
    const [gen3, setGen3] = useState<Option[]>([])
    const [gen4, setGen4] = useState<Option[]>([])
    const [gen5, setGen5] = useState<Option[]>([])
    const [gen6, setGen6] = useState<Option[]>([])
    const [gen7, setGen7] = useState<Option[]>([])
    const [gen8, setGen8] = useState<Option[]>([])
    const [gen9, setGen9] = useState<Option[]>([])
    const [selectedGen, setSelectedGen] = useState<Option[]>([])
    
    const [isLoading, setIsLoading] = useState<boolean>(true)

    type Option = {
        pokemon: Pokemon,
        cry: string
    }

    useEffect(()=> {
        async function getAllPokemon(dexLimit: number){
            setIsLoading(true)
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${dexLimit}`)
                const pokemonData = await res.json()
                setAllPokemon(
                    pokemonData.results.map((pokemon: {name: string}, index: number) => ({id: index + 1, name: pokemon.name}))
                )  
            }
            catch(error) {
                console.log(error)
            } 
            finally {
                setIsLoading(false); 
            }
        } getAllPokemon(1025)
    },[])


    function generateGenerationsPokemonLists(){
        let pokemonArray: Pokemon[] = allPokemon.map(mon => mon) 

        //gen1
        let gen1: Option[] = []
        for(let i = 1; i<151 + 1; i++){
            let pokemonOption: Pokemon = pokemonArray[i - 1]
            let audioFile: string = `/cries/${pokemonOption.id}.ogg`
            gen1.push({pokemon: pokemonOption, cry: audioFile});
        }
        setGen1(gen1)
        //gen2
        let gen2: Option[] = []
        for(let i = 152; i<251 + 1; i++){
            let pokemonOption: Pokemon = pokemonArray[i - 1]
            let audioFile: string = `/cries/${pokemonOption.id}.ogg`
            gen2.push({pokemon: pokemonOption, cry: audioFile});
        }
        setGen2(gen2)
        //gen3
        let gen3: Option[] = []
        for(let i = 252; i<386 + 1; i++){
            let pokemonOption: Pokemon = pokemonArray[i - 1]
            let audioFile: string = `/cries/${pokemonOption.id}.ogg`
            gen3.push({pokemon: pokemonOption, cry: audioFile});
        }
        setGen3(gen3)
        //gen4
        let gen4: Option[] = []
        for(let i = 387; i<493 + 1; i++){
            let pokemonOption: Pokemon = pokemonArray[i - 1]
            let audioFile: string = `/cries/${pokemonOption.id}.ogg`
            gen4.push({pokemon: pokemonOption, cry: audioFile});
        }
        setGen4(gen4)
        //gen5
        let gen5: Option[] = []
        for(let i = 494; i<649 + 1; i++){
            let pokemonOption: Pokemon = pokemonArray[i - 1]
            let audioFile: string = `/cries/${pokemonOption.id}.ogg`
            gen5.push({pokemon: pokemonOption, cry: audioFile});
        }
        setGen5(gen5)
        //gen6
        let gen6: Option[] = []
        for(let i = 650; i<721 + 1; i++){
            let pokemonOption: Pokemon = pokemonArray[i - 1]
            let audioFile: string = `/cries/${pokemonOption.id}.ogg`
            gen6.push({pokemon: pokemonOption, cry: audioFile});
        }
        setGen6(gen6)
        //gen7
        let gen7: Option[] = []
        for(let i = 722; i<809 + 1; i++){
            let pokemonOption: Pokemon = pokemonArray[i - 1]
            let audioFile: string = `/cries/${pokemonOption.id}.ogg`
            gen7.push({pokemon: pokemonOption, cry: audioFile});
        }
        setGen7(gen7)
        //gen8
        let gen8: Option[] = []
        for(let i = 810; i<905 + 1; i++){
            let pokemonOption: Pokemon = pokemonArray[i - 1]
            let audioFile: string = `/cries/${pokemonOption.id}.ogg`
            gen8.push({pokemon: pokemonOption, cry: audioFile});
        }
        setGen8(gen8)
        //gen9
        let gen9: Option[] = []
        for(let i = 906; i<1025 + 1; i++){
            let pokemonOption: Pokemon = pokemonArray[i - 1]
            let audioFile: string = `/cries/${pokemonOption.id}.ogg`
            gen9.push({pokemon: pokemonOption, cry: audioFile});
        }
        setGen9(gen9)
    }

    function playSound(file: string){
        let audio = new Audio(file)
        audio.volume = 0.1
        audio.play()
    }

    function renderPokedex(generation: Option[]){
        return <div className="grid grid-cols-8">{generation.map(option => <PokemonSquare key={option.pokemon.id} id={option.pokemon.id} playSound={() => playSound(option.cry)} />)}</div>
    }

    useEffect(() => {
        if (!isLoading) {
            generateGenerationsPokemonLists();
        }
    }, [isLoading, allPokemon]);
   
    return(
        <>
            <div className="flex justify-center">  
                <div className="flex-col"> 
                    <div className="flex-row">
                        <div className="flex flex-col items-center justify-center">
                            <h1 id="m-0 mt-mid">Pokedex</h1>
                            <h4 id="mt-mid mb-mid">Choose the Generation</h4>

                        </div>
                    </div>
                    <div className="flex-row top-0">
                        <button className="button-default !h-[48px] !w-[128px]" onClick={()=>{setSelectedGen(gen1)}}>Gen1</button>
                        <button className="button-default !h-[48px] !w-[128px]" onClick={()=>{setSelectedGen(gen2)}}>Gen2</button>
                        <button className="button-default !h-[48px] !w-[128px]" onClick={()=>{setSelectedGen(gen3)}}>Gen3</button>
                        <button className="button-default !h-[48px] !w-[128px]" onClick={()=>{setSelectedGen(gen4)}}>Gen4</button>
                        <button className="button-default !h-[48px] !w-[128px]" onClick={()=>{setSelectedGen(gen5)}}>Gen5</button>
                        <button className="button-default !h-[48px] !w-[128px]" onClick={()=>{setSelectedGen(gen6)}}>Gen6</button>
                        <button className="button-default !h-[48px] !w-[128px]" onClick={()=>{setSelectedGen(gen7)}}>Gen7</button>
                        <button className="button-default !h-[48px] !w-[128px]" onClick={()=>{setSelectedGen(gen8)}}>Gen8</button>
                        <button className="button-default !h-[48px] !w-[128px]" onClick={()=>{setSelectedGen(gen9)}}>Gen9</button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center">
                {renderPokedex(selectedGen)}
            </div>
        </>
    )
}
