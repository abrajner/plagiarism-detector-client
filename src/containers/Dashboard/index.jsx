import React, {useContext} from 'react';
import {Link} from '@adobe/react-spectrum';

import UserContext from 'contexts/UserContext';

const Dashboard = () => {
    const {user, unsetUser} = useContext(UserContext);

    return (
        <>
            {user.login}:
            <Link onPress={() => {
                unsetUser();
            }}>Log out</Link>
        </>
    )
};

export default Dashboard;
