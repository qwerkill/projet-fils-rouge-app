'use client'

import { useEffect, useState } from "react";
import GameService from "../../../../services/game.service";
import { useRouter } from "next/navigation";
import TokenService from "../../../../services/token.service";
import { IGame, IGround } from "@/types";
import GroundService from "../../../../services/ground.service";




const CreateGame = () => {
    const user = TokenService.getUser();
    const router = useRouter();
    const [game, setGame] = useState({} as IGame);
    const [grounds, setGrounds] = useState<IGround[]>([]);
    const [showGroundForm, setShowGroundForm] = useState(false);
    const [newGround, setNewGround] = useState({});

    useEffect(() => {
        const fetchGrounds = async () => {
            try {
                const res = await GroundService.getGrounds();
                setGrounds(res);
            } catch (error) {
                console.error(error);
            }
        }
        fetchGrounds();
    }, []);

    const handleGameChange = (e: any) => {
        setGame({
            ...game,
            [e.target.name]: e.target.value
        });
    }

    const handleGroundChange = (e: any) => {
        setNewGround({
            ...newGround,
            [e.target.name]: e.target.value
        });
    }

    const handleGameSubmit = async (e: any) => {
        e.preventDefault();
        try {
            let groundId = game.ground;

            if (showGroundForm) {
                const createdGround = await GroundService.createGround(newGround);
                groundId = createdGround.uuid;
            }

            const data = await GameService.createGame({ ...game, ground: groundId, organizer: user?.uuid });
            router.push('/games');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1>Create Game</h1>
            <form onSubmit={handleGameSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" onChange={handleGameChange} />
                <label htmlFor="localisation">Localisation</label>
                <input type="text" name="localisation" onChange={handleGameChange} />
                <label htmlFor="nbPlayerLimit">Nombre de joueur</label>
                <input type="number" name="nbPlayerLimit" onChange={handleGameChange} />
                <label htmlFor="level">Niveau Rechercher</label>
                <select name="level" onChange={handleGameChange}>
                    <option value="">sélectionné le niveau Rechercher</option>
                    <option value="tout niveau">Tout niveau</option>
                    <option value="debutant">Debutant</option>
                    <option value="occasionnel">Occasionnel</option>
                    <option value="amateur">Amateur</option>
                    <option value="habituer">Habituer</option>
                </select>
                <label htmlFor="ground">Terrain</label>
                <select name="ground" onChange={handleGameChange} disabled={showGroundForm}>
                    <option value="">Aucun terrain sélectionné</option>
                    {grounds.map((ground) => (
                        <option key={ground.uuid} value={ground.uuid}>{ground.name}</option>
                    ))}
                </select>
                <button type="button" onClick={() => setShowGroundForm(!showGroundForm)}>
                    {showGroundForm ? "Annuler la création de terrain" : "Créer un nouveau terrain"}
                </button>
                <button type="submit">Create Game</button>
            </form>

            {showGroundForm && (
                <div>
                    <h2>Create Ground</h2>
                    <form>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" onChange={handleGroundChange} />
                        <label htmlFor="localisation">Localisation</label>
                        <input type="text" name="localisation" onChange={handleGroundChange} />
                        <label htmlFor="image">Image</label>
                        <input type="text" name="image" onChange={handleGroundChange} />
                    </form>
                </div>
            )}
        </div>
    );
}

export default CreateGame;
