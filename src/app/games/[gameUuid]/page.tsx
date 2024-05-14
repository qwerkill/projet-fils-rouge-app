'use client'

import { IGame } from "@/types";
import { useEffect, useState } from "react";
import GameService from "../../../../services/game.service";
import TokenService from "../../../../services/token.service";
import { useRouter } from "next/navigation";

const GameSinglePage = ({
    params,
}:{
    params: {
        gameUuid: string;
    },
}) => {

 const [game, setGame] = useState({} as IGame);
 const user = TokenService.getUser();
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




    
    if(!user) return null;

    const handlJoinGame = async () => {
        try {
            const res = await GameService.joinGame(params.gameUuid,user.uuid);
            setGame(res);
        } catch (error) {
            console.error(error);
        }
    }   

    const handleDelete = async () => {
        try {
            await GameService.deleteGame(params.gameUuid);
            route.push('/games');
        } catch (error) {
            console.error(error);
        }
    }
    
    
    return (  
        <div>
            <h1>Game Single Page</h1>
            <p>{game.name}</p>
            <p>{game.localisation}</p>
            <p>{game.organizer?.name}</p>
            <p>{game.level}</p>
            <p>{game?.users?.length} / {game.nbPlayerLimit}</p>
             <button onClick={handlJoinGame} >Join Game</button>
            {user.uuid === game.organizer?.uuid && <button onClick={handleDelete}>Delete Game</button>}
        </div>
    );
}
 
export default GameSinglePage;