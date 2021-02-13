import React from 'react';
import {View, Flex, Heading} from '@adobe/react-spectrum';

import Breadcrumbs from 'components/Breadcrumbs';

import Header from './Header';

const Layout = ({
    heading,
    breadcrumbs,
    children
}) => {

    return (
        <View>
            <View>
                <Header marginBottom={breadcrumbs ? 'size-250' : 'size-500'} />
            </View>
            <Flex direction={'column'} alignItems={'stretch'}>
                <View marginX={'size-300'}>
                    {breadcrumbs ? (
                        <Breadcrumbs {...breadcrumbs} />
                    ) : null}
                    {heading ? (
                        <Heading {...heading} marginTop={'size-100'} marginBottom={0} />
                    ) : null}
                </View>
                <View padding={'size-250'}>
                    <Flex
                        direction={'column'}
                    >
                        {children}
                    </Flex>
                </View>
            </Flex>
        </View>
    );
};

export default Layout;
