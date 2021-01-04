import React from 'react';
import {Route, Redirect, Switch, useHistory, useParams} from 'react-router-dom';

import Layout from 'components/Layout';

import EditGroup from './EditGroup';

const Group = () => (
    <Switch>
        <Route
            path={'/groups/:id'}
            exact={true}
            component={() => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const {id} = useParams();
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const history = useHistory();

                return (
                    <Layout
                        breadcrumbs={{
                            onAction: (key) => {
                                if (key === 'groups') {
                                    history.push('/groups');
                                }
                            },
                            items: [
                                {
                                    key: 'groups',
                                    children: 'Groups'
                                },
                                {
                                    key: id,
                                    children: id
                                }
                            ]
                        }}
                    >
                        todo group view
                    </Layout>
                );
            }}
        />
        <Route
            path={'/groups/:id/edit'}
            exact={true}
            component={EditGroup}
        />
        <Route render={() => <Redirect to={'/groups/:id'} />} />
    </Switch>
);

export default Group;
