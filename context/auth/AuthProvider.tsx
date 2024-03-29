import { FC, ReactNode, useReducer, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import axios from 'axios';

import { AuthContext, authReducer } from './';

import { IUser } from '../../interfaces';
import { tesloApi } from '../../config';

export interface AuthState {
  isLoggedIn: boolean;
  user: IUser | undefined;
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined
};

interface Props {
    children: ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {

  const { data, status } = useSession();
  const router = useRouter();

  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  useEffect(() => {
    if (status === 'authenticated') {
      dispatch({
        type: 'Auth - Login',
        payload: data?.user as IUser
      })
    }
  }, [data, status]);

  // Autenticación personalizada
  // useEffect(() => {
  //   checkToken();
  // }, []);

  const checkToken = async () => {

    if (!Cookies.get('token')) return;

    try {
      const { data } = await tesloApi.get('/user/validate-token');
      const{ token, user } = data;
      Cookies.set('token', token);
      dispatch({ type: 'Auth - Login', payload: user});
    } catch (error) {
      Cookies.remove('token');
    }
  }

  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post('/user/login', {
        email, password
      });
      
      const{ token, user } = data;
      Cookies.set('token', token);
      dispatch({ type: 'Auth - Login', payload: user})
      return true;
    } catch (error) {
      return false;
    }
  }

  const registerUser = async (name: string, email: string, password: string): Promise<{hasError: boolean; message?: string}> => {
    try {
      const { data } = await tesloApi.post('/user/register', {
        name, email, password
      });
      
      const { token, user } = data;

      Cookies.set('token', token);
      dispatch({ type: 'Auth - Login', payload: user})
      return {
        hasError: false,
      }
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { message } = error.response?.data as { message: string}
        return {
          hasError: true,
          message
        }
      }
      return {
        hasError: true,
        message: 'No se puedo crear el usuario - intente de nuevo'
      }
    }
  }

  // const logout = () => {
  //   Cookies.remove('token');
  //   Cookies.remove('cart');
  //   router.reload();
  // }

  const logout = () => {
    // Cookies.remove('token');
    Cookies.remove('cart');
    Cookies.remove('firstName');
    Cookies.remove('lastName');
    Cookies.remove('address');
    Cookies.remove('address2');
    Cookies.remove('zip');
    Cookies.remove('city');
    Cookies.remove('country');
    Cookies.remove('phone');

    signOut()
    router.reload();
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,

        // Methods
        loginUser,
        registerUser,
        logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};