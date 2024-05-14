'use client';


import React, { useState } from 'react';
import AuthService from '../../../../services/auth.service';
import TokenService from '../../../../services/token.service';
import { useRouter } from 'next/navigation';

const SignIn = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async  (event: any) => {
        event.preventDefault();
        const res = await AuthService.signin({ identifier, password })
        TokenService.setUser(res.user);
        TokenService.setToken(res.access_token);
       router.push('/');
    };

    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name or Email" value={identifier} onChange={e => setIdentifier(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}
 
export default SignIn;