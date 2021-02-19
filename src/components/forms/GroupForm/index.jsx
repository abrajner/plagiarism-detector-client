import React, {useState} from 'react';
import {useMutate} from 'restful-react';
import {
    Button,
    Form,
    TextField,
    View,
    Well,
    Picker,
    Item,
    ButtonGroup
} from '@adobe/react-spectrum';

const GroupForm = ({variant, initialValues, onSuccess, onCancel}) => {
    const [name, setName] = useState(initialValues?.groupName || '');
    const [
        programmingLanguage,
        setProgrammingLanguage
    ] = useState(initialValues?.programmingLanguage || '');

    const {
        mutate: postGroups,
        loading: postGroupsLoading,
        error: postGroupsError
    } = useMutate({
        path: '/groups',
        verb: 'POST'
    });

    const {
        mutate: putGroups,
        loading: putGroupsLoading,
        error: putGroupsError
    } = useMutate({
        path: ({groupId}) => `/group/${groupId}`,
        verb: 'PUT'
    });

    const error = variant === 'create' ?
        postGroupsError && postGroupsError.data.message :
        putGroupsError && putGroups.data.message;
    const loading = variant === 'create' ?
        postGroupsLoading : putGroupsLoading;

    return (
        <>
            {error ? <Well>{error}</Well> : null}
            <Form
                maxWidth={'size-3600'}
                onSubmit={async (event) => {
                    event.preventDefault();
                    if (variant === 'create') {
                        await postGroups({
                            groupName: name, programmingLanguage
                        });
                    } else if (variant === 'edit') {
                        await putGroups({
                            groupName: name, programmingLanguage
                        }, {
                            pathParams: {
                                groupId: initialValues.groupId
                            }
                        });
                    }
                    onSuccess();
                }}
            >
                <TextField
                    name={'name'}
                    value={name}
                    onChange={setName}
                    label={'Group Name*'}
                    placeholder={'Enter new group name'}
                />
                <Picker
                    label={'Programming Language*'}
                    defaultSelectedKey={initialValues?.programmingLanguage || 'java'}
                    onSelectionChange={(key) => {
                        setProgrammingLanguage(key);
                    }}
                >
                    <Item key={'JAVA'}>Java</Item>
                    <Item key={'PYTHON'}>Python</Item>
                    <Item key={'CPP'}>C++</Item>
                    <Item key={'C'}>C</Item>
                    <Item key={'JAVASCRIPT'}>JavaScript</Item>
                    <Item key={'OTHER'}>Other</Item>
                </Picker>
                <ButtonGroup marginTop={'size-250'}>
                    <Button
                        variant={'cta'}
                        type={'submit'}
                        isDisabled={(!name || !programmingLanguage) || postGroupsLoading}
                    >
                        {loading ? 'Processing...' : 'Save'}
                    </Button>
                    <Button
                        variant={'secondary'}
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

export default GroupForm;
