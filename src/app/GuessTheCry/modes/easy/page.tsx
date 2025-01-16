import GuessTheCry from "../../page";

export default function Easy(){
    return(
        <GuessTheCry
            numPokemon={721}
            numOptions={4}
            numLives={3}
            gameMode="easy"
            leaderboard={"leaderboard_easy"}
        />
    )
}
