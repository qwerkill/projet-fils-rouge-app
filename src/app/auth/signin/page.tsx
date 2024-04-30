'use client';


import React, { useState } from 'react';
import AuthService from '../../../../services/auth.service';
import TokenService from '../../../../services/token.service';

const SignIn = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: any) => {
        event.preventDefault();
        AuthService.signin({ identifier, password })
           .then(data => {
                console.log(data);
            window.location.href = '/home';
            })
            .catch(error => {
                console.error(error);
            });
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