import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
        <ul className="flex">
            <li><Link href="/"><button className="text-[1.5rem]">Play</button></Link></li>
            <li><Link href="/LeaderboardOptions"><button className='text-[1.5rem]'>Leaderboards</button></Link></li>
            <li><Link href="/Pokedex"><button className='text-[1.5rem]'>Pokedex</button></Link></li>
        </ul>
    </nav>
  );
}
