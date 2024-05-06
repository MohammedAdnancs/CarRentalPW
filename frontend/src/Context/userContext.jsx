import axios from 'axios';
import { createContext, useState, useEffect, useDeferredValue, useReducer } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {

    const [user, setUser] = useState(null);
    const [valuechange, forceupdate] = useReducer(prevState => !prevState, false);

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
    }, [valuechange]);

    return (
        <UserContext.Provider value={{ user, setUser, forceupdate }}>
            {children}
        </UserContext.Provider>
    );

}