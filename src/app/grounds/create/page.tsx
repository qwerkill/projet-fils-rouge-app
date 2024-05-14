'use client'

import { useState } from "react";
import GroundService from "../../../../services/ground.service";
import { useRouter } from "next/navigation";

const CreateGround = () => {

    const route = useRouter();
    
    const [creadential, setCreadential] = useState({});

    const handleChange = (e:any) => {
        setCreadential({
            ...creadential,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try{
            const res = await GroundService.createGround(creadential);
            route.push('/grounds');
        } catch (error) {
            console.error(error);
        }
    }

    return ( 
        <div>
            <h1>Create Ground</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="Name">Name</label>
                <input type="text" name="name" onChange={handleChange} />
                <label htmlFor="Localisation">Localisation</label>
                <input type="text" name="localisation" onChange={handleChange} />
                <button type="submit">Create Ground</button>
            </form>
        </div>
     );
}
 
export default CreateGround;