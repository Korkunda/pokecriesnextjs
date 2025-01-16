import Link from 'next/link'

export default function ChooseDifficulty(){

    return(
        <>
            <h1 className="text-center m-0 mt-big">Choose Difficulty</h1>

            <div className="flex flex-col items-center justify-center">
                <Link href="/GuessTheCry/modes/easy"><button className="button-default">Classic: Easy</button></Link>
                <Link href="/GuessTheCry/modes/hard"><button className="button-default">Classic: Hard</button></Link>
                <Link href="/GuessTheCry/modes/insane"><button className="button-default">Classic: Insane</button></Link>
                <Link href="/GuessTheCry//modes/insaneall"><button className="button-default">Insane</button></Link>

                <Link href="/"><button className="button-default">Back</button></Link>

            </div>
        </>
    )
}
