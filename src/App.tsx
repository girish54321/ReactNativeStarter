import React, { FC } from 'react';
import { Navigation } from './navigation/mainNavigation';
import { Provider } from 'react-redux';
import { store } from './redux/rootReducer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createMMKV } from 'react-native-mmkv'
import './localization';

const queryClient = new QueryClient();

export const appStorageMMKV = createMMKV({
    id: `react-native-start`,
    encryptionKey: 'react-native-start',
    encryptionType: 'AES-256',
    mode: 'multi-process',
})

export const App: FC = () => {
    return (
        <GestureHandlerRootView>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <Navigation />
                </QueryClientProvider>
            </Provider>
        </GestureHandlerRootView>
    );
};

