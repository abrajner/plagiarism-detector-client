import React, {useState} from 'react';
import {useMutate} from 'restful-react';
import {
    Button,
    Form,
    TextField,
    View,
    Well,
} from '@adobe/react-spectrum';

const LogInForm = ({onSuccess}) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const {
        mutate: postAuthenticationToken,
        loading: postAuthenticationTokenLoading,
        error: postAuthenticationTokenError
    } = useMutate({
        path: '/authentication-token',
        verb: 'POST'
    });

    return (
        <>
            {postAuthenticationTokenError ? <Well>{postAuthenticationTokenError.data.message}</Well> : null}
            <Form
                maxWidth={'size-3600'}
                onSubmit={async (event) => {
                    event.preventDefault();
                    const { authenticationToken } = await postAuthenticationToken({
                        login, password
                    });
                    onSuccess(authenticationToken);
                }}
            >
                <TextField
                    name={'login'}
                    value={login}
                    onChange={setLogin}
                    label={'Login'}
                    placeholder={'Enter your login'}
                />
                <TextField
                    name={'password'}
                    type={'password'}
                    value={password}
                    onChange={setPassword}
                    label={'Password'}
                    placeholder={'Enter your password'}
                />
                <View marginTop={'size-200'}>
                    <Button
                        variant={'cta'}
                        type={'submit'}
                        isDisabled={postAuthenticationTokenLoading}
                    >
                        {postAuthenticationTokenLoading ? 'Processing...' : 'Log In'}
                    </Button>
                </View>
            </Form>
        </>
    );
}

export default LogInForm;
