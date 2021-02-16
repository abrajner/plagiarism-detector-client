import React, {useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {useGet, useMutate} from 'restful-react';
import {
    Button,
    Content,
    Dialog,
    DialogTrigger,
    Divider,
    Heading,
    Text,
    View,
    IllustratedMessage,
    ButtonGroup
} from '@adobe/react-spectrum';
import FileAdd from '@spectrum-icons/workflow/FileAdd';
import AutomatedSegment from '@spectrum-icons/workflow/AutomatedSegment';
import NotFound from '@spectrum-icons/illustrations/NotFound';

import UploadFileForm from 'components/forms/UploadFileForm';
import ActionsList from 'components/ActionsList';
import Loader from 'components/Loader';

const Files = () => {
    const {id: groupId} = useParams();
    const history = useHistory();

    const [selectedFiles, setSelectedFiles] = useState([]);

    const {
        data: files,
        loading: getFilesLoading,
        refetch: getFiles
    } = useGet({
        path: ({groupId}) => `/group/${groupId}/files`,
        pathParams: {
            groupId
        }
    });

    const {
        mutate: postAnalyse,
        loading: postAnalyseLoading
    } = useMutate({
        path: ({groupId}) => `/group/${groupId}/analyse`,
        pathParams: {
            groupId
        },
        verb: 'POST'
    })

    const handleSelectFile = (attachmentId) => {
        setSelectedFiles((previousState) => [...previousState, attachmentId]);
    };

    const handleUnselectFile = (attachmentId) => {
        setSelectedFiles(
            (previousState) => previousState.filter(
                (value) => value !== attachmentId
            )
        );
    };

    const handlePostAnalyze = async () => {
        await postAnalyse({
            reportName: new Date().getTime(),
            fileIds: selectedFiles
        });
        history.push(`/groups/${groupId}/reports`);
    };

    return (
        <>
            <ButtonGroup>
                <Button
                    variant={'primary'}
                    isDisabled={postAnalyseLoading || !(selectedFiles.length > 1)}
                    onPress={() => {
                        handlePostAnalyze();
                    }}
                >
                    <AutomatedSegment />
                    <Text>{postAnalyseLoading ? 'Processing...' : 'Analyse'}</Text>
                </Button>
                <DialogTrigger>
                    <Button variant={'secondary'}>
                        <FileAdd />
                        <Text>Add File</Text>
                    </Button>
                    {(closeModal) => (
                        <Dialog>
                            <Heading>Add New File</Heading>
                            <Divider />
                            <Content>
                                <UploadFileForm
                                    groupId={groupId}
                                    onSuccess={async () => {
                                        closeModal();
                                        await getFiles();
                                    }}
                                    onCancel={() => {
                                        closeModal();
                                    }}
                                />
                            </Content>
                        </Dialog>
                    )}
                </DialogTrigger>
            </ButtonGroup>
            <View>
                {getFilesLoading ? (
                    <Loader />
                ) : files.length ? (
                    <View marginTop={'size-200'}>
                        <ActionsList
                            rows={files}
                            displayedColumns={
                                ['fileName', 'fileAuthor']
                            }
                            hasCheckboxes={true}
                            onCheckboxChange={(value, row) => {
                                if (value) {
                                    handleSelectFile(row.attachmentId);
                                } else {
                                    handleUnselectFile(row.attachmentId);
                                }
                            }}
                        />
                    </View>
                ) : (
                    <IllustratedMessage marginTop={'size-250'}>
                        <NotFound />
                        <Heading>No files</Heading>
                        <Content>Add a few files to start analyzing</Content>
                    </IllustratedMessage>
                )}
            </View>
        </>
    )
};

export default Files;
