import React from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {
    View,
    Flex,
    StatusLight,
    Divider,
    Heading,
    Text
} from '@adobe/react-spectrum';
import FileCode from '@spectrum-icons/workflow/FileCode';
import dayjs from 'dayjs';

import { FORMAT } from 'constants/date';
import Layout from 'components/Layout';

const Report = () => {
    const {reportId} = useParams();

    const history = useHistory();

    const report = history.location.state;

    return (
        <Layout
            heading={{
                level: 2,
                children: dayjs(parseInt(reportId)).format(FORMAT)
            }}
        >
            <View>
                {report.reportsForFiles.map((reportForFile, index) => (
                    <Flex direction={'column'} key={index}>
                        <Flex alignItems={'center'} marginY={'size-250'}>
                            <Flex alignItems={'center'} marginStart={'size-250'}>
                                <FileCode />
                                <Flex direction={'column'} marginStart={'size-250'}>
                                    <Heading level={4} margin={0}>
                                        {reportForFile.firstFileName}
                                    </Heading>
                                    <Text>
                                        {reportForFile.firstFileAuthor}
                                    </Text>
                                </Flex>
                            </Flex>
                            <Flex alignItems={'center'} marginStart={'size-350'}>
                                <FileCode />
                                <Flex direction={'column'} marginStart={'size-250'}>
                                    <Heading level={4} margin={0}>
                                        {reportForFile.secondFileName}
                                    </Heading>
                                    <Text>
                                        {reportForFile.secondFileAuthor}
                                    </Text>
                                </Flex>
                            </Flex>
                            <Flex direction={'column'} marginStart={'size-350'}>
                                <StatusLight variant={reportForFile.plagiarism ? 'negative' : 'positive'}>
                                    Similarity: {reportForFile.codeSimilarityPercentage}%
                                </StatusLight>
                                {reportForFile.substitutionIncluded ? (
                                    <StatusLight variant={reportForFile.plagiarism ? 'negative' : 'positive'}>
                                        Similarity (with substitution): {reportForFile.codeSimilarityPercentageWithSubstitution}%
                                    </StatusLight>
                                ) : null}
                            </Flex>
                        </Flex>
                        <Divider size={'S'} />
                    </Flex>
                ))}
            </View>
        </Layout>
    )
};

export default Report;
