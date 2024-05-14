'use client';

import { useEffect, useState } from 'react';
import TokenService from '../../services/token.service';
import UserService from '../../services/users.service';
import { useRouter } from 'next/navigation';
import { IUser } from '@/types';
export default function Home() {

      const [user, setUser] = useState({} as IUser);
      const router = useRouter();

  
      useEffect(() => {
          const fetchUser = async () => {
              try {
                  const tokenUser = TokenService.getUser();
                  if (!tokenUser) return;
                  const res = await UserService.getUser(tokenUser.uuid);
                  setUser(res);
              } catch (error) {
                  console.error(error);
              }
          };
  
          fetchUser();
      }, []);

      const goToGame = () => {
        router.push('/games');
    };

    const goToGround = () => {
        router.push('/grounds');
    }
      
    if (!user) return null;
  
  
      return (
          <div>
            <h1>Home Page</h1>
            <p>{user.name}</p>
            <button onClick={goToGame}>Go to Game</button>
            <button onClick={goToGround}>Go to Ground</button>
          </div>
      );
  };
  

