module.exports = {
 preset: '@react-native/jest-preset',
  setupFiles: [
    './__mocks__/@react-native-async-storage/async-storage.js',
    './__mocks__/react-native-localize.ts',
    "./node_modules/react-native-gesture-handler/jestSetup.js"
  ],
  'transformIgnorePatterns': [
    // TODO: react-native-reanimated
    // 'node_modules/(?!(@react-native|react-native|react-native-reanimated)/)',
  ],
  // setupFilesAfterEnv: ['./setupTests.js'],
  setupFilesAfterEnv: ['./jest-setup.js'],
};
