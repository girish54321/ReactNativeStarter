import React from 'react';
import { describe, expect } from '@jest/globals';
import { it } from '@jest/globals';
import { UsersScreen } from './UsersScreen'; 
import { fireEvent, render } from '@testing-library/react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import getTestId from '../../Config/helper';
import * as NavService from '../../navigation/NavigationService';

jest.mock("../../../specs/NativeBuildEnv", () => ({
  getBuildType: jest.fn(() => "DEV"),
  getBaseUrl: jest.fn(() => "www.dev.com"),
})); 


const mockData = {
    pages: [
        {
            data: {
                data: [
                    { first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com' },
                    { first_name: 'Jane', last_name: 'Smith', email: 'jane.smith@example.com' },
                ],
            },
        },
    ],
};

describe('UsersScreen', () => {
    afterEach(() => {
        jest.clearAllMocks(); 
    });
    it('renders correctly', () => {
        //@ts-ignore
        useInfiniteQuery.mockReturnValue({
            data: mockData,
        });
        const { getByText } = render(<UsersScreen />);
        expect(getByText('john.doe@example.com')).toBeTruthy();
        expect(getByText('jane.smith@example.com')).toBeTruthy();
    }); 

    it('api with error', () => {
        //@ts-ignore
        useInfiniteQuery.mockReturnValue({
            data: undefined, 
            isError: true,
            error: { message: 'Error message form Backend' },
        });
        const { getByText } = render(<UsersScreen />);
        expect(getByText('Error')).toBeTruthy();
        expect(getByText('Error message form Backend')).toBeTruthy();
    });

    it('api with Loading', () => {
        //@ts-ignore
        useInfiniteQuery.mockReturnValue({
            data: undefined,
            isLoading: true,
        });
        const { getByTestId } = render(<UsersScreen />);
        expect(getByTestId(getTestId('user-list-loading'))).toBeTruthy();
    });

    it('navigates to FirstScreen with isFirstScreen parameter on buttonOne press', () => {
        //@ts-ignore
        useInfiniteQuery.mockReturnValue({
            data: mockData,
        });

        const { getByText } = render(<UsersScreen />);
        const buttonOne = getByText('john.doe@example.com');

        fireEvent.press(buttonOne);
        expect(NavService.navigate).toHaveBeenCalledTimes(1);
        expect(NavService.navigate).toHaveBeenCalledWith('SELECTEDUSERSCREEN', {
            data: {
                'email': 'john.doe@example.com',
                'first_name': 'John',
                'last_name': 'Doe',
            },
        });
    });
});
