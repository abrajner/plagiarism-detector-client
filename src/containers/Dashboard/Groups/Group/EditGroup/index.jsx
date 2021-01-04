import React from 'react';
import {
    Flex,
    ProgressCircle
} from '@adobe/react-spectrum';
import {useGet} from 'restful-react';
import {useParams, useHistory} from 'react-router-dom';

import Layout from 'components/Layout';
import GroupForm from 'components/forms/GroupForm';

const EditGroup = () => {
    const {id} = useParams();
    const history = useHistory();

    const {data: group, loading: groupLoading} = useGet({
        path: ({id}) => `/groups/${id}`,
        pathParams: {
            id
        }
    });

    return (
        <Layout
            breadcrumbs={{
                onAction: (key) => {
                    if (key === 'groups') {
                        history.push('/groups')
                    } else if (key === id) {
                        history.push(`/groups/${id}`);
                    }
                },
                items: [
                    {
                        key: 'groups',
                        children: 'Groups',
                    },
                    {
                        key: id,
                        children: id
                    },
                    {
                        key: 'edit',
                        children: 'Edit'
                    }
                ]
            }}
        >
            <Flex direction={'column'} alignItems={'center'}>
                {groupLoading ? (
                    <ProgressCircle />
                ) : (
                    <GroupForm
                        variant={'edit'}
                        initialValues={group}
                        onSuccess={() => {
                            history.push(`/groups/${id}`);
                        }}
                    />
                )}
            </Flex>
        </Layout>
    );
};

export default EditGroup;
