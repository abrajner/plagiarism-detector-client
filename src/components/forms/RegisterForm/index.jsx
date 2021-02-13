import React, {useState} from 'react';
import {useMutate} from 'restful-react';
import {
    Form,
    TextField,
    Button,
    View,
    Well
} from '@adobe/react-spectrum'

const RegisterForm = ({onSuccess}) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const {
        mutate: postUsers,
        loading: postUsersLoading,
        error: postUsersError
    } = useMutate({
        path: '/users',
        verb: 'POST'
    });

    return (
        <>
            {postUsersError ? <Well>{postUsersError.data.message}</Well> : null}
            <Form
                maxWidth={'size-6000'}
                onSubmit={async (event) => {
                    event.preventDefault();
                    await postUsers({
                        login, email, password, repeatedPassword, firstName, lastName
                    });
                    onSuccess();
                }}
            >
                <TextField
                    name={'login'}
                    value={login}
                    onChange={setLogin}
                    label={'Login*'}
                    placeHolder={'Enter your login'}
                />
                <TextField
                    name={'email'}
                    value={email}
                    onChange={setEmail}
                    label={'Email*'}
                    placeHolder={'Enter your email'}
                />
                <TextField
                    name={'password'}
                    value={password}
                    onChange={setPassword}
                    label={'Password*'}
                    placeHolder={'Enter your password'}
                    type={'password'}
                />
                <TextField
                    name={'repeatedPassword'}
                    value={repeatedPassword}
                    onChange={setRepeatedPassword}
                    label={'Confirm Password*'}
                    placeHolder={'Confirm your password'}
                    type={'password'}
                />
                <TextField
                    name={'firstName'}
                    value={firstName}
                    onChange={setFirstName}
                    label={'First Name'}
                    placeHolder={'Enter your first name'}
                />
                <TextField
                    name={'lastName'}
                    value={lastName}
                    onChange={setLastName}
                    label={'Last Name'}
                    placeHolder={'Enter your last name'}
                />
                <View marginTop={'size-200'}>
                    <Button
                        variant={'cta'}
                        type={'submit'}
                        isDisabled={postUsersLoading}
                    >
                        {postUsersLoading ? 'Processing...' : 'Register'}
                    </Button>
                </View>
            </Form>
        </>
    );
};

export default RegisterForm;
