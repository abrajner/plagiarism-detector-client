import React, {useState} from 'react';
import {useMutate} from 'restful-react';
import {
    Button,
    Form,
    TextField,
    View,
    Well,
    Picker,
    Item
} from '@adobe/react-spectrum';

const GroupForm = ({variant, initialValues, onSuccess}) => {
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
        path: '/groups',
        verb: 'POST'
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
                        });
                    }
                    onSuccess();
                }}
            >
                <TextField
                    name={'name'}
                    value={name}
                    onChange={setName}
                    label={'Group name'}
                    placeholder={'Enter new group name'}
                />
                <Picker
                    label={'Programming language'}
                    defaultSelectedKey={initialValues?.programmingLanguage || 'java'}
                    onSelectionChange={(key) => {
                        setProgrammingLanguage(key);
                    }}
                >
                    <Item key={'java'}>Java</Item>
                    <Item key={'python'}>Python</Item>
                    <Item key={'other'}>Other</Item>
                </Picker>
                <View marginTop={'size-200'}>
                    <Button
                        variant={'cta'}
                        type={'submit'}
                        isDisabled={postGroupsLoading}
                    >
                        {loading ? 'Processing' : variant === 'create' ? 'Create group' : 'Edit group'}
                    </Button>
                </View>
            </Form>
        </>
    );
}

export default GroupForm;
