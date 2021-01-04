import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Groups from './Groups';

const Dashboard = () => {
    return (
        <Switch>
            <Route path={'/groups'} component={Groups} />
            <Route render={() => <Redirect to={'/groups'} />} />
        </Switch>
    )
};

export default Dashboard;
