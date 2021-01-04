import React from 'react';
import {useGet} from 'restful-react';
import {Route, Switch, Redirect, useHistory} from 'react-router-dom';
import {
    Flex,
    Button,
    View,
    Text,
    DialogTrigger,
    Dialog,
    Heading,
    Content,
    Divider,
    ProgressCircle
} from '@adobe/react-spectrum';
import Edit from '@spectrum-icons/workflow/Edit';
import ArrowRight from '@spectrum-icons/workflow/ArrowRight';
import AddCircle from '@spectrum-icons/workflow/AddCircle';

import Layout from 'components/Layout';
import ActionsList from 'components/ActionsList';
import GroupForm from 'components/forms/GroupForm';

import Group from './Group';

const Groups = () => (
    <Switch>
        <Route path={'/groups/:id'} component={Group} />
        <Route
            path={'/groups'}
            exact={true}
            component={() => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const history = useHistory();

                const {
                    data: groups,
                    refetch: getGroups,
                    loading: groupsLoading,
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                } = useGet({
                    path: '/groups'
                });

                return (
                    <Layout
                        breadcrumbs={{
                            items: [
                                {
                                    key: 'groups',
                                    children: 'Groups'
                                }
                            ]
                        }}
                    >
                        <View>
                            <DialogTrigger>
                                <Button variant={'cta'}>
                                    <AddCircle />
                                    <Text>Add group</Text>
                                </Button>
                                {(closeModal) => (
                                    <Dialog>
                                        <Heading>Add new group</Heading>
                                        <Divider />
                                        <Content>
                                            <GroupForm
                                                variant={'create'}
                                                onSuccess={async () => {
                                                    closeModal();
                                                    await getGroups();
                                                }}
                                            />
                                        </Content>
                                    </Dialog>
                                )}
                            </DialogTrigger>
                        </View>
                        <Flex justifyContent={'center'}>
                            {groupsLoading ? (
                                <ProgressCircle isIndeterminate />
                            ) : (
                                <ActionsList
                                    rows={groups}
                                    actions={[
                                        {
                                            text: 'Edit',
                                            icon: Edit,
                                            onPress: (row) => {
                                                history.push(`/groups/${row.groupId}/edit`);
                                            }
                                        },
                                        {
                                            text: 'Open',
                                            icon: ArrowRight,
                                            onPress: (row) => {
                                                history.push(`/groups/${row.groupId}`);
                                            }
                                        }
                                    ]}
                                    displayedColumns={[
                                        'groupName', 'programmingLanguage'
                                    ]}
                                />
                            )}
                        </Flex>
                    </Layout>
                )
            }}
        />
        <Route render={() => <Redirect to={'/groups'} /> } />
    </Switch>
);

export default Groups;
