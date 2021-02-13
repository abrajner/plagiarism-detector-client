import React from 'react';
import {
    Flex,
    ActionButton,
    View,
    Divider,
    Text,
    Checkbox
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

const ActionsList = ({
    rows,
    actions,
    displayedColumns,
    resolvers,
    hasCheckboxes,
    onCheckboxChange
}) => {
    const columns = resolveRows(rows, displayedColumns);
    const columnsCount = actions ? columns.length + 1 : columns.length;
    const rowsCount = rows.length;

    return (
        <Flex direction={'row'}>
            {hasCheckboxes ? (
                <Flex direction={'column'}>
                    {Array.from({length: rowsCount}).map((_, index) => (
                        <View key={index}>
                            <Flex height={'size-700'} alignItems={'center'} marginStart={'size-300'}>
                                <Checkbox
                                    onChange={(value) => {
                                        onCheckboxChange(value, rows[index]);
                                    }}
                                />
                            </Flex>
                            {index !== rows.length - 1 ? (
                                <Divider size={'S'} />
                            ) : null}
                        </View>
                    ))}
                </Flex>
            ) : null}
            {columns.map((column, outerIndex) => (
                <Flex direction={'column'} key={outerIndex}>
                    {column.map((value, innerIndex) => {
                        return (
                            <View key={innerIndex}>
                                <Flex
                                    height={'size-700'}
                                    alignItems={'center'}
                                    marginStart={'size-300'}
                                    marginEnd={
                                        outerIndex === columnsCount - 1 ?
                                            'size-300' : undefined
                                    }
                                >
                                    {resolvers?.[column] ? resolvers[column](value) : value}
                                </Flex>
                                {innerIndex !== rows.length - 1 ? (
                                    <Divider size={'S'}/>
                                ) : null}
                            </View>
                        );
                    })}
                </Flex>
            ))}
            {actions ? (
                <Flex direction={'column'}>
                    {Array.from({length: rowsCount}).map((_, rowIndex) => (
                        <View key={rowIndex}>
                            <Flex
                                height={'size-700'}
                                alignItems={'center'}
                                marginStart={'size-300'}
                                marginEnd={'size-300'}
                                gap={'size-150'}
                            >
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
