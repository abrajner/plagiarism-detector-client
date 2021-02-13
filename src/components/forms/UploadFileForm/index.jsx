import React, {useState, useRef} from 'react';
import {useMutate} from 'restful-react';
import {
    Button,
    Form,
    TextField,
    View,
    Well,
    ActionButton,
    Text,
    ButtonGroup
} from '@adobe/react-spectrum';
import FileTxt from '@spectrum-icons/workflow/FileTxt';

const UploadFileForm = ({groupId, onSuccess, onCancel}) => {
    const fileInputRef = useRef();

    const [file, setFile] = useState('');
    const [author, setAuthor] = useState('');
    const [fileName, setFileName] = useState('');

    const {
        mutate: postFile,
        loading: postFileLoading,
        error: postFileError
    } = useMutate({
        path: ({groupId}) => `/group/${groupId}/files`,
        verb: 'POST',
        pathParams: {
            groupId
        }
    });

    return (
        <>
            {postFileError ? (
                <Well>postFileError</Well>
            ) : null}
            <Form
                maxWidth={'size-3600'}
                onSubmit={async (event) => {
                    event.preventDefault();
                    if (file) {
                        const formData = new FormData();
                        formData.append('file', file, file.name);
                        await postFile(formData, {
                            queryParams: {
                                author,
                                fileName
                            }
                        });
                        onSuccess();
                    }
                }}
            >
                <View>
                    <input
                        type={'file'}
                        hidden={true}
                        onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (file) {
                                setFile(file);
                            }
                        }}
                        ref={fileInputRef}
                    />
                    <TextField
                        name={'author'}
                        value={author}
                        onChange={setAuthor}
                        label={'Author*'}
                        placeholder={'Enter file author'}
                    />
                    <TextField
                        name={'name'}
                        value={fileName}
                        onChange={setFileName}
                        label={'File Name*'}
                        placeholder={'Enter file name'}
                    />
                </View>
                <View marginTop={'size-250'}>
                    <ActionButton
                        onPress={() => {
                            fileInputRef.current?.click();
                        }}
                    >
                        <FileTxt />
                        <Text>
                            {file ? file.name : 'Choose File...'}
                        </Text>
                    </ActionButton>
                </View>
                <ButtonGroup marginTop={'size-250'}>
                    <Button
                        variant={'cta'}
                        type={'submit'}
                        isDisabled={(!file || !author || !fileName) || postFileLoading}
                        >
                        {postFileLoading ? 'Processing...' : 'Upload'}
                    </Button>
                    <Button
                        variant={'secondary'}
                        type={'button'}
                        onPress={() => {
                            onCancel();
                        }}
                    >
                        Cancel
                    </Button>
                </ButtonGroup>
            </Form>
        </>
    );
}

export default UploadFileForm;
