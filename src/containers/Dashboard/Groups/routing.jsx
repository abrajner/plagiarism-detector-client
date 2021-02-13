import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Group from './Group';
import Groups from './Groups';

export default () => (
    <Switch>
        <Route path={'/groups/:id'} component={Group} />
        <Route path={'/groups'} component={Groups} exact={true} />
        <Route render={() => <Redirect to={'/groups'} /> } />
    </Switch>
);
