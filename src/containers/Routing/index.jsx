import React, {useContext} from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import UserContext from 'contexts/UserContext';
import LogIn from 'containers/LogIn';
import Dashboard from 'containers/Dashboard';
import Register from 'containers/Register';

const Routing = () => {
    const {user: {
        authenticationToken
    }} = useContext(UserContext);

    const isAuthenticated = !!authenticationToken;

    return (
        <BrowserRouter>
            <Switch>
                <Route path={'/register'} exact={true} component={Register}/>
                <Route path={'/'} component={isAuthenticated ? Dashboard : LogIn} />
                <Route render={() => <Redirect to={'/'} />} />
            </Switch>
        </BrowserRouter>
    )
};

export default Routing;