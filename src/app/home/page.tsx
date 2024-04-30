'use client';

import { useEffect, useState } from 'react';
import TokenService from '../../../services/token.service';

const Home = () => {
    
    const user = TokenService.getUser();    

    console.log(user);
    

    return ( 
        <div>
            <h1>Home Page</h1>
            {user && <div>Welcome, {user.name} </div>}
        </div>
     );
}
 
export default Home;