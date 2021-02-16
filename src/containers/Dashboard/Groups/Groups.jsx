import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useGet} from 'restful-react';

import {
    Button,
    ButtonGroup,
    Content,
    Dialog,
    DialogContainer,
    Divider,
    Heading,
    IllustratedMessage,
    Text,
    View
} from '@adobe/react-spectrum';
import FolderAdd from '@spectrum-icons/workflow/FolderAdd';
import Edit from '@spectrum-icons/workflow/Edit';
import OpenIn from '@spectrum-icons/workflow/OpenIn';
import NotFound from '@spectrum-icons/illustrations/NotFound';

import GroupForm from 'components/forms/GroupForm';
import Loader from 'components/Loader';
import ActionsList from 'components/ActionsList';
import Layout from 'components/Layout';

const Groups = () => {
    const history = useHistory();

    const [
        isCreateDialogOpened,
        setIsCreateDialogOpened
    ] = useState(false);
    const [editGroupId, setEditGroupId] = useState(null);

    const {
        data: groups,
        refetch: getGroups,
        loading: groupsLoading,
    } = useGet({
        path: '/groups'
    });

    return (
        <>
            <DialogContainer
                onDismiss={() => {
                    setIsCreateDialogOpened(false);
                }}
            >
                {isCreateDialogOpened ? (
                    <Dialog>
                        <Heading>Add New Group</Heading>
                        <Divider />
                        <Content>
                            <GroupForm
                                variant={'create'}
                                onSuccess={async () => {
                                    setIsCreateDialogOpened(false);
                                    await getGroups();
                                }}
                                onCancel={() => {
                                    setIsCreateDialogOpened(false);
                                }}
                            />
                        </Content>
                    </Dialog>
                ) : null}
            </DialogContainer>
            <DialogContainer
                onDismiss={() => {
                    setEditGroupId(null);
                }}
            >
                {editGroupId ? (
                    <Dialog>
                        <Heading>Edit Group</Heading>
                        <Divider />
                        <Content>
                            <GroupForm
                                variant={'edit'}
                                initialValues={groups.find(
                                    ({groupId}) => groupId === editGroupId
                                )}
                                onSuccess={async () => {
                                    setEditGroupId(null);
                                    await getGroups();
                                }}
                                onCancel={() => {
                                    setEditGroupId(null);
                                }}
                            />
                        </Content>
                    </Dialog>
                ) : null}
            </DialogContainer>
            <Layout
                heading={{
                    level: 2,
                    children: 'Groups'
                }}
            >
                <ButtonGroup marginTop={'size-200'}>
                    <Button
                        variant={'primary'}
                        onPress={() => {
                            setIsCreateDialogOpened(true);
                        }}
                    >
                        <FolderAdd />
                        <Text>Add Group</Text>
                    </Button>
                </ButtonGroup>
                <View marginTop={'size-200'}>
                    {groupsLoading ? (
                        <Loader />
                    ) : groups.length ? (
                        <ActionsList
                            rows={groups}
                            actions={[
                                {
                                    text: 'Open',
                                    icon: OpenIn,
                                    onPress: (row) => {
                                        history.push(`/groups/${row.groupId}/files`);
                                    }
                                },
                                {
                                    text: 'Edit',
                                    icon: Edit,
                                    onPress: ({groupId}) => {
                                        setEditGroupId(groupId);
                                    }
                                }
                            ]}
                            displayedColumns={[
                                'groupName', 'programmingLanguage'
                            ]}
                        />
                    ) : (
                        <IllustratedMessage marginTop={'size-250'}>
                            <NotFound />
                            <Heading>No groups</Heading>
                            <Content>Add new group to upload your files</Content>
                        </IllustratedMessage>
                    )}
                </View>
            </Layout>
        </>
    )
};

export default Groups;

