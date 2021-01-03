import React, {createContext, useState} from 'react';

import {initialUser} from 'mocks/user';
import webStorage from 'services/webStorage';

const UserContext = createContext({
   user: initialUser,
   setUser: () => undefined,
   unsetUser: () => undefined
});

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(webStorage.getItem('user') || initialUser);

    const handleSetUser = (newUserPartial) => {
        const newUser = {...user, ...newUserPartial};
        setUser(newUser);
        webStorage.setItem('user', newUser);
    };

    const handleUnsetUser = () => {
        setUser(initialUser);
        webStorage.deleteItem('user');
    };

    return (
        <UserContext.Provider
            value={{
                user,
                setUser: handleSetUser,
                unsetUser: handleUnsetUser
            }}
        >
            {children}
        </UserContext.Provider>
    )
};

export default UserContext;