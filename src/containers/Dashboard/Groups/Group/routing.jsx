import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';

import Group from './Group';
import Report from './Report';

export default () => (
    <Switch>
        <Route path={'/groups/:groupId/reports/:reportId'} component={Report}/>
        <Route path={'/groups/:id'} component={Group}/>
        <Route render={() => <Redirect to={'/groups/:id'}/>} />
    </Switch>
);
