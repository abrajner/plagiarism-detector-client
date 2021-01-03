import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useGet} from 'restful-react';
import {Flex, View, Heading, Text, Link} from '@adobe/react-spectrum';

import LogInForm from 'components/forms/LogInForm';
import UserContext from 'contexts/UserContext';

const LogIn = () => {
    const [authenticationToken, setAuthenticationToken] = useState('');

    const { setUser } = useContext(UserContext);

    const {
        data: me,
        refetch: getMe,
        loading: getMeLoading
    } = useGet({
        path: '/me',
        lazy: true
    })

    useEffect(() => {
        if (authenticationToken && me) {
            setUser({
                ...me,
                authenticationToken
            });
        }
    }, [authenticationToken, me]);

    const history = useHistory();

    return (
        <Flex alignItems={'center'} justifyContent={'center'} height={'100%'}>
            <View height={'100%'}>
                <Heading level={1}>Log in to your account</Heading>
                    <LogInForm
                        onSuccess={async (authenticationToken) => {
                            setAuthenticationToken(authenticationToken);
                            const me = await getMe({
                                requestOptions: {
                                    headers: {
                                        Authorization: `${authenticationToken}`
                                    }
                                }
                            });
                        }}
                    />
                <View marginTop={'size-150'}>
                    <Text>Do not have an account?</Text>
                    {' '}
                    <Link onPress={() => {
                        history.push('/register');
                    }}>Register</Link>
                </View>
            </View>
        </Flex>
    );
};

export default LogIn;
