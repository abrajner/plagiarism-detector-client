import React from 'react';
import {useGet} from 'restful-react';
import {useParams, useHistory} from 'react-router-dom';
import {
    View,
    Content,
    Heading,
    IllustratedMessage,
    StatusLight,
    Flex,
} from '@adobe/react-spectrum';
import NotFound from '@spectrum-icons/illustrations/NotFound';
import OpenIn from '@spectrum-icons/workflow/OpenIn';
import dayjs from 'dayjs';

import ActionsList from 'components/ActionsList';
import Loader from 'components/Loader';
import { FORMAT } from 'constants/date';

const Reports = () => {
    const {id: groupId} = useParams();
    const history = useHistory();

    const {
        data: reports,
        loading: getReportsLoading
    } = useGet({
        path: ({groupId}) => `/group/${groupId}/reports`,
        pathParams: {
            groupId
        }
    });

    return (
        <View>
            {getReportsLoading ? (
                <Loader />
            ) : reports.length ? (
                <View>
                    <ActionsList
                        rows={reports}
                        displayedColumns={[
                            'reportName', 'finished'
                        ]}
                        actions={[
                            {
                                text: 'Open',
                                icon: OpenIn,
                                onPress: (row) => {
                                    history.push({
                                        pathname: `/groups/${groupId}/reports/${row.reportName}`,
                                        state: row
                                    });
                                }
                            }
                        ]}
                        resolvers={{
                            reportName: (reportName) => dayjs(parseInt(reportName)).format(FORMAT),
                            finished: (finished) => (
                                <Flex
                                    alignItems={'center'}
                                >
                                    <StatusLight variant={finished ? 'positive' : 'negative'} />
                                    {finished ? 'Finished' : 'In progress'}
                                </Flex>
                            )
                        }}
                    />
                </View>
            ) : (
                <IllustratedMessage marginTop={'size-250'}>
                    <NotFound />
                    <Heading>No reports</Heading>
                    <Content>Analyze some files to see your first report</Content>
                </IllustratedMessage>
            )}
        </View>
    )
};

export default Reports;
