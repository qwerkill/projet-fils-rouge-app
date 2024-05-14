'use client';

import { useState } from 'react';
import AuthService from '../../../../services/auth.service';
import { useRouter } from 'next/navigation';

export default function SignUp() {

    const [credaentials, setCredentials] = useState({});
    const route = useRouter();


    const handlChange = (e: any) => {
        setCredentials({
            ...credaentials,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const data = await AuthService.signup(credaentials);
            route.push('/auth/signin');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="Email">Email</label>
                <input type="text" name="email" onChange={handlChange} />
                <label htmlFor="Name">Name</label>
                <input type="text" name="name" onChange={handlChange} />
                <label htmlFor="Password">Password</label>
                <input type="password" name="password" onChange={handlChange} />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}