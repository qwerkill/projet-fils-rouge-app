'use client';

import { IGround } from "@/types";
import { useEffect, useState } from "react";
import GroundService from "../../../../services/ground.service";
import { useRouter } from "next/navigation";

const GroundSinglePage = (
    {
        params,
        query,
    }:{
        params: {
            groundUuid: string;
        },
        query: {
            [key: string]: string | string[];
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
    },[]);

    
    return ( 
        <div>
            <h1>Ground Single Page</h1>
            <p>{ground.name}</p>
            <p>{ground.localisation}</p>
            <button onClick={() => route.push(`/grounds/edit/${ground.uuid}`)}>Edit Ground</button>
            <button onClick={() => route.push('/grounds')}>Go to Grounds</button>
        </div>
     );
}
 
export default GroundSinglePage;