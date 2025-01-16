import GuessTheCry from "../../page";

export default function InsaneAll(){
    return(
        <GuessTheCry
            numPokemon={1025}
            numOptions={32}
            numLives={0}
            gameMode="insane_all"
            leaderboard={"leaderboard_all_insane"}
        />
    )
}
