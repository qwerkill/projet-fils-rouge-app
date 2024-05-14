'use client';

import { useEffect, useState } from "react";
import GameService from "../../../services/game.service";
import { IGame, IUser } from "@/types";
import { useRouter } from "next/navigation";
import TokenService from "../../../services/token.service";



const Games = () => {

    const [game, setGame] = useState<IGame[]>([]);
    const route = useRouter ();

    const user = TokenService.getUser();
    
    useEffect(() => {
        const fetchGame = async () => {
            try {
                const res = await GameService.getGames();
                setGame(res);
            } catch (error) {
                console.error(error);
            }
        }
        fetchGame();
    }, []);

    

    return (
        <div>
            <h1>Game Page</h1>
            <ul>
                {game && game.map((game: IGame) => (
                    <div key={game.uuid}>
                    <li>{game.name}</li>
                    {game.organizer && <p>{game.organizer.name}</p>}
                    <button onClick={()=>{route.push(`/games/${game.uuid}`)}}>View Game</button>
                    {game.organizer && user?.uuid === game.organizer.uuid && <button onClick={()=>{route.push(`/games/edit/${game.uuid}`)}}>Edit Game</button>}
                </div>
                ))}
            </ul>
            <button onClick={()=>{route.push('/games/create')}}>Create Game</button>
        </div>
    );
};

export default Games;