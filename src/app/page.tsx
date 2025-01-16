import Link from 'next/link'
import Navbar from './navbar';

export default function Dashboard(){
    return (
        <>
            <section>
                    <h1 className="m-0 mt-mid">Pokémon Cries</h1>
                    <p className="mt-mid mb-mid">Guess the pokémon by its cry</p>
                    
                    <Link href="/ChooseDifficulty"><button className="button-default">Play</button></Link>
                    <Link href="/LeaderboardOptions"><button className="button-default">Leaderboards</button></Link>
                    <Link href="/Pokedex"><button className="button-default">Pokedex</button></Link>
            </section>
            
        </>
    )
}
