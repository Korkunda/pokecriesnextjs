import GuessTheCry from "../../page";

export default function Hard(){
    return(
        <GuessTheCry
            numPokemon={721}
            numOptions={16}
            numLives={1}
            gameMode="hard"
            leaderboard={"leaderboard_hard"}
        />
    )
}