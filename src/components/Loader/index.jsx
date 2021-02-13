import React from 'react';
import {Flex, ProgressCircle} from '@adobe/react-spectrum';

const Loader = (props) => (
    <Flex
        width={'100%'}
        height={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
    >
        <ProgressCircle isIndeterminate={true} {...props} />
    </Flex>
);

export default Loader;
