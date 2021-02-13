import React, {useContext} from 'react';
import {
    Header as SpectrumHeader,
    Flex,
    View,
    Heading,
    MenuTrigger,
    ActionButton,
    Menu,
    Item
} from '@adobe/react-spectrum';
import AutomatedSegment from '@spectrum-icons/workflow/AutomatedSegment';
import ShowMenu from '@spectrum-icons/workflow/ShowMenu';
import Moon from '@spectrum-icons/workflow/Moon';
import Light from '@spectrum-icons/workflow/Light';

import UserContext from 'contexts/UserContext';

const Header = ({children, ...rest}) => {
    const {
        user: {
            login,
            firstName,
            lastName,
            colorScheme
        },
        unsetUser,
        setUser
    } = useContext(UserContext);

    return (
        <SpectrumHeader {...rest}>
            <View paddingTop={'size-50'}>
                <Flex
                    marginX={'size-250'}
                    justifyContent={'space-between'}
                >
                    <Flex
                        alignItems={'center'}
                        justifyContent={'center'}
                        gap={'size-200'}
                    >
                        <AutomatedSegment size={'L'}/>
                        <Heading level={1}>Plagiarism Detector</Heading>
                    </Flex>
                    <Flex alignItems={'center'} gap={'size-150'}>
                        {children}
                        {firstName && lastName ? `${firstName} ${lastName} (${login})` : login}
                        <ActionButton
                            onPress={() => {
                                setUser({
                                    colorScheme: colorScheme === 'light' ? 'dark' : 'light'
                                })
                            }}
                        >
                            {colorScheme === 'light' ? <Moon /> : <Light />}
                        </ActionButton>
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
                                <Item key={'logOut'}>Log Out</Item>
                            </Menu>
                        </MenuTrigger>
                    </Flex>
                </Flex>
            </View>
        </SpectrumHeader>
    );
};

export default Header;
