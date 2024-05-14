'use client';

import { IGround } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GroundService from "../../../services/ground.service";

const Grounds = () => {

    const [grounds, setGrounds] = useState<IGround[]>([]);
    const route = useRouter();

    useEffect(()=>{
        const fetchGrounds = async () => {
            try {
                const res = await GroundService.getGrounds();
                setGrounds(res);
            } catch (error) {
                console.error(error);
            }
        }
        fetchGrounds();
    },[]);

    return ( 
        <div>
            <h1>Grounds</h1>
            <ul>
                {grounds && grounds.map((ground: IGround) => (
                    <div key={ground.uuid}>
                        <li>{ground.name}</li>
                        <button onClick={()=>{route.push(`/grounds/${ground.uuid}`)}}>View Ground</button>
                    </div>
                ))}
            </ul>
            <button onClick={()=>{route.push('/grounds/create')}}>Create Ground</button>
        </div>
     );
}
 
export default Grounds;