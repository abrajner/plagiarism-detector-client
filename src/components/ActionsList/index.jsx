import React, {useMemo} from 'react';
import {
    Flex,
    ActionButton,
    View,
    Divider,
    Text
} from '@adobe/react-spectrum';
import compact from 'lodash/compact';

const resolveRows = (rows, displayedColumns) =>
    compact(
        Object.keys(rows[0]).map(
            (key) =>
                displayedColumns.includes(key)
                    ? rows.map((row) => row[key])
                    : undefined
        )
    );

const ActionsList = ({rows, actions, displayedColumns}) => {
    const columns = resolveRows(rows, displayedColumns);
    const rowsCount = rows.length;

    return (
        <Flex direction={'row'}>
            {columns.map((column, index) => (
                <Flex direction={'column'} key={index}>
                    {column.map((value, index) => (
                        <View key={index}>
                            <Flex height={'size-700'} alignItems={'center'} marginStart={'size-300'}>
                                {value}
                            </Flex>
                            {index !== rows.length - 1 ? (
                                <Divider size={'S'} />
                            ) : null}
                        </View>
                    ))}
                </Flex>
            ))}
            {actions ? (
                <Flex direction={'column'}>
                    {Array.from({length: rowsCount}).map((_, rowIndex) => (
                        <View key={rowIndex}>
                            <Flex height={'size-700'} alignItems={'center'} marginStart={'size-300'} gap={'size-150'}>
                                {actions.map((action, index) => {
                                    const {icon, text, onPress} = action;
                                    const Icon = icon;
                                    return (
                                        <ActionButton
                                            onPress={() => {
                                                onPress(rows[rowIndex]);
                                            }}
                                            key={index}
                                        >
                                            <Icon />
                                            <Text>
                                                {text}
                                            </Text>
                                        </ActionButton>
                                    );
                                })}
                            </Flex>
                            {rowIndex !== rows.length - 1 ? (
                                <Divider size={'S'} />
                            ) : null}
                        </View>
                    ))}
                </Flex>
            ) : null}
        </Flex>
    )
}

export default ActionsList;
