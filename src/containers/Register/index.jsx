import React from 'react';
import RegisterForm from 'components/forms/RegisterForm';
import {useHistory} from 'react-router-dom';

import {
    Flex, Heading,
    View
} from '@adobe/react-spectrum'

const Register = () => {
    const history = useHistory();

    return (<Flex alignItems={'center'} justifyContent={'center'} height={'100%'}>
        <View>
            <Heading level={1}>Create your own account</Heading>
            <RegisterForm onSuccess={() => {
                history.push('/');
            }} />
        </View>
    </Flex>);
};

export default Register;