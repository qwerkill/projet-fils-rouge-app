'use client'

import { useState } from "react";
import GameService from "../../../../services/game.service";
import { useRouter } from "next/navigation";
import TokenService from "../../../../services/token.service";

const CreateGame = () => {

    const user = TokenService.getUser();


    const router = useRouter();

    const [game, setGame] = useState({level: 'tout niveau'});

    const handlChange = (e:any) => {
        setGame({
            ...game,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            const data = await GameService.createGame({...game,organizer: user?.uuid});
            router.push('/games');
        } catch (error) {
            console.log(error);
        }
    }
    

    return ( 
        <div>
            <h1>Create Game</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="Name">Name</label>
                <input type="text" name="name" onChange={handlChange} />
                <label htmlFor="Localisation">Localisation</label>
                <input type="text" name="localisation" onChange={handlChange} /> 
                <label htmlFor="NbPlayerLimit">Nombre de joueur</label>
                <input type="number" name="nbPlayerLimit" onChange={handlChange} />  
                <label htmlFor="Level">Niveau Rechercher</label>     
                <select name="level" onChange={handlChange}>
                    <option value="tout niveau">Tout niveau</option>
                    <option value="debutant">Debutant</option>
                    <option value="occasionnel">Occasionnel</option>
                    <option value="amateur">Amateur</option>
                    <option value="habituer">Habituer</option>
                </select>        
                <button type="submit">Create Game</button>
            </form>
        </div>
     );
}
 
export default CreateGame;