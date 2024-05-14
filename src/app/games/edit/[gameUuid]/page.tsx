'use client';

import { IGame } from "@/types";
import { useEffect, useState } from "react";
import GameService from "../../../../../services/game.service";
import { useRouter } from "next/navigation";

const GamaEdit = (
    {
        params,
        query,
    }:{
        params: {
            gameUuid: string;
        },
        query: {
            [key: string]: string | string[];
        }
    }
) => {
    const [game, setGame] = useState({} as IGame);
    const route = useRouter();

    useEffect(()=>{
        const fetchGame = async () => {
            try{
                const res = await GameService.getGame(params.gameUuid);
                setGame(res);
            } catch (error) {
                console.error(error);
            }
        }
        fetchGame();
    },[])

    const handlChange = (e:any) => {
        setGame({
            ...game,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            const data = await GameService.updateGame(params.gameUuid,game);
            route.push('/games');
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <div>
        <h1>Edit Game</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="Name">Name</label>
            <input type="text" name="name" value={game.name} onChange={handlChange} />
            <label htmlFor="NbPlayerLimit">Nombre de joueur</label>
            <input type="number" name="nbPlayerLimit" value={game.nbPlayerLimit} onChange={handlChange} />
            <label htmlFor="Level">Niveau Rechercher</label>
            <select name="level" value={game.level} onChange={handlChange}>
                <option value="tout niveau">Tout niveau</option>
                <option value="debutant">Debutant</option>
                <option value="occasionnel">Occasionnel</option>
                <option value="amateur">Amateur</option>
                <option value="habituer">Habituer</option>
            </select>
            <button type="submit">Edit Game</button>
        </form>
    </div>
     );
}
 
export default GamaEdit;