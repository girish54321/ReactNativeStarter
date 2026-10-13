import { jest } from '@jest/globals';

require('react-native-reanimated').setUpTests();
jest.mock('react-native-worklets', () =>
    require('react-native-worklets/src/mock')
);
jest.mock("@react-native-async-storage/async-storage", () =>
    require("@react-native-async-storage/async-storage/jest")
);

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
    useInfiniteQuery: jest.fn(),
    useMutation: jest.fn(),
    QueryClient: jest.fn().mockImplementation(() => ({
        queryCache: {
            clear: jest.fn(),
        },
    })),
}));

jest.mock('react-redux', () => {
    const actual = jest.requireActual('react-redux');
    return {
        ...actual,
        useDispatch: Object.assign(jest.fn(), {
            withTypes: () => jest.fn(),
        }),
        useSelector: Object.assign(jest.fn(), {
            withTypes: () => jest.fn(),
        }),
    };
});


jest.mock('react-native-nitro-modules', () => ({}));

jest.mock('react-native-mmkv', () => {
    const storage = new Map();

    const mockMMKVInstance = {
        set: jest.fn((key, value) => {
            storage.set(key, value);
        }),
        getString: jest.fn((key) => storage.get(key)),
        getNumber: jest.fn((key) => storage.get(key)),
        getBoolean: jest.fn((key) => storage.get(key)),
        delete: jest.fn((key) => storage.delete(key)),
        clearAll: jest.fn(() => storage.clear()),
        getAllKeys: jest.fn(() => Array.from(storage.keys())),
    };

    return {
        MMKV: jest.fn(() => mockMMKVInstance),
        createMMKV: jest.fn(() => mockMMKVInstance),

        useMMKVString: jest.fn((key) => [storage.get(key), (val) => storage.set(key, val)]),
        useMMKVNumber: jest.fn((key) => [storage.get(key), (val) => storage.set(key, val)]),
        useMMKVBoolean: jest.fn((key) => [storage.get(key), (val) => storage.set(key, val)]),
        useMMKVObject: jest.fn((key) => [storage.get(key), (val) => storage.set(key, val)]),
    };
});


jest.mock('./src/navigation/NavigationService', () => ({
    navigate: jest.fn(),
    navigateResetStack: jest.fn(),
    goBack: jest.fn(),
    openDrawer: jest.fn(),
    setTopLevelNavigator: jest.fn(),
}));
