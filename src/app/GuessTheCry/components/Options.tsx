import React from "react"
import type { Option, Pokemon } from "../page.tsx"

type OptionProps = {
    checkAnswer: (pokemon: Pokemon) => void;
    option: Option;
}

export default function Options(props: OptionProps){
    let sprite = `/spritesOld/${props.option.pokemon!.id}.png`
    return(
        <button className="choice-btn bg-white" onClick={()=> props.checkAnswer(props.option.pokemon!)}>
            <img src={sprite} alt="pokemon"/>
        </button>
    )
}
