"use client"

import {useState, useEffect} from "react"
import Link from 'next/link'

type Props = {
    leaderboard: string;
};

type LeaderboardEntry = {
    Username: string;
    Score: number;
};

export default function Leaderboards(leaderboard: Props){
    const [leaderboardData, setLeaderboardData] = useState([]);
   
    useEffect(() => {
        const storedLeaderboard = localStorage.getItem(`${leaderboard}`);
        const data = storedLeaderboard ? JSON.parse(storedLeaderboard) : []

        const sortedData = Array.isArray(data)
            ? data.sort((a, b) => b.Score - a.Score).slice(0, 100)
            : [];

        setLeaderboardData(sortedData);
    }, []);

    return(
        <>
            <div className="page-top">
                <h1 className="title" id="title-main">{title}</h1>

            </div>

            <div className="leaderboard">
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Username</th>
                            <th>Guesses</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboardData.map((key, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{key.Username}</td>
                                <td className="color-blue">{key.Score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="page-bottom">
                <div className="row" >
                    <Link href="/"><button className="button-default">Return</button></Link>
                </div>
            </div>
        </>
    )
}
