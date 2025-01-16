import GuessTheCry from "../../page";

export default function Insane(){
    return(
        <GuessTheCry
            numPokemon={721}
            numOptions={32}
            numLives={0}
            gameMode="insane"
            leaderboard={"leaderboard_insane"}
        />
    )
}
