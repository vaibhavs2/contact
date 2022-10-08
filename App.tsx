import React from 'react';
import {Text, View} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';

import {AppNavigationContainer} from './src/navigation/AppNavigationContaner';
import {getReduxStore, getReduxStorePersister} from './src/redux-store/store';
import {ErrorBoundary} from './src/screens/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={getReduxStore()}>
        <PersistGate
          loading={
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>Loading ...</Text>
            </View>
          }
          persistor={getReduxStorePersister()}>
          <AppNavigationContainer />
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
