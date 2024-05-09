import axios from 'axios';
import { createContext, useState, useEffect, useDeferredValue, useReducer } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {

    const [user, setUser] = useState(null);
    const [valuechangeuser, forceupdateuser] = useReducer(prevState => !prevState, false);
   

    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({ data }) => {
                setUser(data);
            });
        }
        if (user) {
            axios.get('/profile').then(({ data }) => {
                setUser(data);
            });
        }
    }, [valuechangeuser]);



    return (
        <UserContext.Provider value={{ user, setUser, forceupdateuser }}>
            {children}
        </UserContext.Provider>
    );

}