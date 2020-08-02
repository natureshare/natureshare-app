/* global process URL Headers */

import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext([null, () => null]);

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const src = process.env.apiHost ? new URL('/user', process.env.apiHost).href : null;

    useEffect(() => {
        if (user === null) {
            if (src && window && typeof window === 'object') {
                const headers = new Headers();

                if (window.localStorage) {
                    const token = window.localStorage.getItem('userToken');
                    if (token) {
                        headers.set('Authorization', `Bearer ${token}`);
                    }
                }

                window
                    .fetch(src, { credentials: 'include', headers })
                    .then((response) => {
                        if (response.ok) {
                            response.json().then((obj) => {
                                if (obj && typeof obj === 'object') {
                                    setUser(obj);
                                } else {
                                    setUser(false);
                                }
                            });
                        } else if (response.status === 403) {
                            // not logged in
                            setUser({});
                        } else {
                            setUser(false);
                        }
                    })
                    .catch(() => setUser(false));
            } else {
                setUser({});
            }
        }
    }, [user]);

    return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
};
