import React from 'react';
import {useGet} from 'restful-react';
import {useParams, useHistory} from 'react-router-dom';
import {
    View,
    Content,
    Heading,
    IllustratedMessage
} from '@adobe/react-spectrum';
import NotFound from '@spectrum-icons/illustrations/NotFound';
import ArrowRight from '@spectrum-icons/workflow/ArrowRight';

import ActionsList from 'components/ActionsList';
import Loader from 'components/Loader';

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

    console.log('a', reports);

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
                                icon: ArrowRight,
                                onPress: (row) => {
                                    history.push({
                                        pathname: `/groups/${groupId}/reports/${row.reportName}`,
                                        state: row
                                    });
                                }
                            }
                        ]}
                        resolvers={{
                            finished: () => 'chuj'
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
