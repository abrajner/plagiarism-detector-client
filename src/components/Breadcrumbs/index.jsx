import React, {Fragment} from 'react';
import {Flex, Link} from '@adobe/react-spectrum';
import ChevronRight from '@spectrum-icons/workflow/ChevronRight';

const Breadcrumbs = ({links}) => {
    return (
        <Flex alignItems={'center'} gap={'size-50'}>
            {links.map((link, index, array) => (
                <Fragment key={index}>
                    <Link
                        variant={'secondary'}
                        isQuiet={true}
                        {...link}
                    />
                    {index !== array.length - 1 ? (
                        <ChevronRight size={'XS'} />
                    ) : null}
                </Fragment>
            ))}
        </Flex>
    )
};

export default Breadcrumbs;
