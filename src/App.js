import React, {useContext} from 'react';
import {Provider as SpectrumProvider, defaultTheme, useDateFormatter} from '@adobe/react-spectrum';
import {RestfulProvider} from 'restful-react';

import Routing from 'containers/Routing';
import UserContext from 'contexts/UserContext';

const { REACT_APP_API_URL } = process.env;

const App = () => {
    const {user: {
        authenticationToken,
        colorScheme
    }} = useContext(UserContext);

    return (
        <SpectrumProvider
            locale={'en'}
            theme={defaultTheme}
            colorScheme={colorScheme}
            height={'100%'}
            position={'relative'}
        >
            <RestfulProvider
                base={REACT_APP_API_URL}
                requestOptions={{
                    headers: {
                        Accept: 'application/json',
                        ...(authenticationToken && {
                            Authorization: `${authenticationToken}`
                        })
                    }
                }}
            >
              <Routing />
            </RestfulProvider>
        </SpectrumProvider>
    );
}

export default App;
