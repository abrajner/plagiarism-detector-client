import React, {useContext} from 'react';
import {
    View,
    Flex,
    Heading,
    ActionButton,
    Divider,
    MenuTrigger,
    Menu,
    Item,
    Breadcrumbs
} from '@adobe/react-spectrum';
import AutomatedSegment from '@spectrum-icons/workflow/AutomatedSegment';
import ShowMenu from '@spectrum-icons/workflow/ShowMenu';

import UserContext from 'contexts/UserContext';

const Layout = ({children, breadcrumbs}) => {
    const {user, unsetUser} = useContext(UserContext);

    const renderBreadcrumbs = () => {
        const {items, ...props} = breadcrumbs;
        return (
            <Breadcrumbs {...props} marginTop={'size-150'} marginX={'size-150'}>
                {items.map((item) => (
                    <Item {...item} />
                ))}
            </Breadcrumbs>
        );
    }

    return (
        <View>
            <View>
                <Flex marginX={'size-250'}>
                    <Flex
                        alignItems={'center'}
                        width={'100%'}
                        justifyContent={'space-between'}
                        marginTop={'size-160'}
                    >
                        <Flex
                            alignItems={'center'}
                            justifyContent={'center'}
                            gap={'size-200'}
                        >
                            <AutomatedSegment size={'L'}/>
                            <Heading level={1} margin={0}>
                                Plagiarism Detector
                            </Heading>
                        </Flex>
                        <Flex alignItems={'center'} gap={'size-150'}>
                            {user.login}
                            <MenuTrigger>
                                <ActionButton>
                                    <ShowMenu/>
                                </ActionButton>
                                <Menu
                                    onAction={(key) => {
                                        if (key === 'logOut') {
                                            unsetUser();
                                        }
                                    }}
                                >
                                    <Item key={'logOut'}>Wyloguj</Item>
                                </Menu>
                            </MenuTrigger>
                        </Flex>
                    </Flex>
                </Flex>
                <Divider size={'S'} marginTop={'size-150'}/>
            </View>
            <Flex direction={'column'} alignItems={'stretch'}>
                {breadcrumbs ? renderBreadcrumbs() : null}
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
