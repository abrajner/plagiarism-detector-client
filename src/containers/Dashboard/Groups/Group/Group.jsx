import React from 'react';
import {useHistory, useParams, useRouteMatch} from 'react-router-dom';
import {useGet} from 'restful-react';
import {Tabs, Item as TabsItem} from '@react-spectrum/tabs';
import {Content, Flex, Text} from '@adobe/react-spectrum';
import Code from '@spectrum-icons/workflow/Code';

import Loader from 'components/Loader';
import Layout from 'components/Layout';

import Files from './Files';
import Reports from './Reports';

const Group = () => {
    const {id} = useParams();
    const history = useHistory();

    const filesMatch = useRouteMatch(`/groups/${id}/files`);
    const reportsMatch = useRouteMatch(`/groups/${id}/reports`);

    const {data: group, loading: groupLoading} = useGet({
        path: ({id}) => `/groups/${id}`,
        pathParams: {
            id
        }
    });

    if (groupLoading) {
        return <Loader size={'L'} />;
    }

    return (
        <Layout
            breadcrumbs={{
                links: [
                    {
                        children: 'Groups',
                        onPress: () => {
                            history.push('/groups');
                        }
                    },
                    {
                        children: group.groupName
                    }
                ]
            }}
            heading={{
                level: 2,
                children: group.groupName
            }}
        >
            <Flex
                alignItems={'center'}
                gap={'size-100'}
                margin={'size-100'}
            >
                <Code size={'S'} />
                <Text>{group.programmingLanguage}</Text>
            </Flex>
            <Tabs
                selectedKey={filesMatch ? 'files' : reportsMatch ? 'reports' : undefined}
                onSelectionChange={(key) => {
                    history.push(`/groups/${id}/${key}`);
                }}
            >
                <TabsItem key={'files'} title={'Files'}>
                    <Content marginTop={'size-300'}>
                        <Files />
                    </Content>
                </TabsItem>
                <TabsItem key={'reports'} title={'Reports'}>
                    <Content marginTop={'size-250'}>
                        <Reports />
                    </Content>
                </TabsItem>
            </Tabs>
        </Layout>
    );
};

export default Group;
