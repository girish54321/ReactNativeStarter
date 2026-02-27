import React from 'react';
import { describe, expect } from '@jest/globals';
import { WelcomeScreen } from './WelcomeScreen';
import { it } from '@jest/globals';
import { render } from '@testing-library/react-native';
import { useTranslation } from 'react-i18next';

jest.mock('react-i18next', () => ({
    useTranslation: jest.fn(),
}));

describe('test welcome Screen', () => {
    beforeEach(() => {
        const useTranslationSpy = useTranslation;
        const tSpy = jest.fn((str) => str);
        //@ts-ignore
        useTranslationSpy.mockReturnValue({
            t: tSpy,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Render screen', () => {
        const { getByText } = render(<WelcomeScreen />);
        const welcomeText = getByText('React Native Starter');
        expect(welcomeText).toBeTruthy();
    });
});
