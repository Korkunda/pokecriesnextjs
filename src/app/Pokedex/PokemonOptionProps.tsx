import React from "react"

export type PlaySound = () => void;

type PokemonOptionProps = {
    id: number;
    playSound: PlaySound;
};

export default function PokemonSquare({ id, playSound }: PokemonOptionProps){
    let sprite: string = `/spritesOld/${id}.png`
    return(
        <button className="choice-btn" onClick={() => playSound()}>
            <img src={sprite} alt={`pokemon ${id}`} />
        </button>

    )
}
