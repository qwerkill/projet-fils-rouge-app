'use client'

import { IGround } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GroundService from "../../../../../services/ground.service";

const EditGround = (
    {
        params,
    }:{
        params: {
            groundUuid: string;
        }
    }
) => {

    const [ground, setGround] = useState({} as IGround);
    const route = useRouter();

    useEffect(()=>{
        const fetchOneGround = async () => {
            try{
                const res = await GroundService.getGround(params.groundUuid);
                setGround(res);
            } catch (error) {
                console.error(error);
            }
        }
        fetchOneGround();
    },[])

    const handlChange = (e:any) => {
        setGround({
            ...ground,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            const data = await GroundService.updateGround(params.groundUuid,ground);
            route.push('/grounds');
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <div>
            <h1>Edit Ground</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="Name">Name</label>
                <input type="text" name="name" value={ground.name} onChange={handlChange} />
                <label htmlFor="Localisation">Localisation</label>
                <input type="text" name="localisation" value={ground.localisation} onChange={handlChange} />
                <button type="submit">Edit Ground</button>
            </form>
        </div>
     );
}
 
export default EditGround;