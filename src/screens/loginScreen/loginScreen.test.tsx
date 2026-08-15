import React from 'react';
import { describe, expect } from '@jest/globals';
import { it } from '@jest/globals';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { useMutation } from '@tanstack/react-query';
import LoginScreen from './loginScreen';
import { Alert } from 'react-native';
import getTestId from '../../Config/helper';
import * as reactRedux from 'react-redux';

jest.mock("../../../specs/NativeBuildEnv", () => ({
    getBuildType: jest.fn(() => "DEV"),
    getBaseUrl: jest.fn(() => "www.dev.com"),
}));

describe('UsersScreen', () => {
    beforeEach(() => {
        (useMutation as jest.Mock).mockReturnValue({
            mutate: jest.fn(),
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('render view with testIds', () => {
        const { getByTestId, getByText } = render(<LoginScreen />);

        expect(getByText('Running DEV')).toBeTruthy();
        expect(getByText('Your Base URL is www.dev.com')).toBeTruthy();

        expect(getByTestId(getTestId('login-email'))).toBeTruthy();
        expect(getByTestId(getTestId('login-password'))).toBeTruthy();
        expect(getByTestId(getTestId('login-button'))).toBeTruthy();
    });

    it('Show error text when user tab on login buttoon without valuse', async () => {
        const { getByText } = render(
            <LoginScreen />
        );

        fireEvent.press(getByText('Login'));

        await waitFor(() => {
            expect(getByText('Invalid email')).toBeOnTheScreen();
            expect(getByText('Password must be at least 6 characters')).toBeOnTheScreen();
        })
    })

    it('fill email & password and login', async () => {
        const apiResponse = { token: 'fake-token' };

        const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
        const mockDispatchFn = jest.fn();
        useDispatchMock.mockReturnValue(mockDispatchFn);

        const mutate = jest.fn((vars, { onSuccess }) => {
            onSuccess(apiResponse, vars, undefined);
        });

        (useMutation as jest.Mock).mockReturnValue({
            mutate,
            onSuccess: jest.fn(),
            onError: jest.fn(),
            onSettled: jest.fn(),
        });

        const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(jest.fn());
        const { getByText, getByPlaceholderText } = render(
            <LoginScreen />
        );

        const emailText = getByPlaceholderText('Email')
        const passWordText = getByPlaceholderText('Password')
        fireEvent.changeText(emailText, "eve.holt@reqres.in")
        fireEvent.changeText(passWordText, "g123456")

        fireEvent.press(getByText('Login'));

        await waitFor(() => {
            expect(mutate).toHaveBeenCalled();

            expect(mockDispatchFn).toHaveBeenCalledTimes(1);
            expect(mockDispatchFn).toHaveBeenCalledWith(
                expect.objectContaining({
                    payload: {
                        userLoggedIn: true,
                        isLoading: false,
                        userName: 'eve.holt@reqres.in',
                        email: 'eve.holt@reqres.in',
                        token: 'fake-token',
                    },
                    type: 'authSlice/userLoginAction',
                })
            );

            expect(alertSpy).not.toHaveBeenCalled();
        });
    })


    it('Login with invalid credentials error', async () => {
        const apiError = {
            error: "Missing email or username"
        };

        const mutate = jest.fn((_vars, { onError }) => {
            onError(apiError, _vars, undefined);
        });

        (useMutation as jest.Mock).mockReturnValue({
            mutate,
            onSuccess: jest.fn(),
            onError: jest.fn(),
            onSettled: jest.fn(),
        });

        const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(jest.fn());

        const { getByText, getByPlaceholderText } = render(<LoginScreen />);
        const emailText = getByPlaceholderText('Email')
        const passWordText = getByPlaceholderText('Password')
        fireEvent.changeText(emailText, "eve.holt@reqres.in")
        fireEvent.changeText(passWordText, "g123456")

        fireEvent.press(getByText('Login'));

        await waitFor(() => {
            expect(mutate).toHaveBeenCalled();
            const [vars] = mutate.mock.calls[0];
            expect(vars).toEqual({
                postData: { email: 'eve.holt@reqres.in', password: 'cityslicka' },
            });
            expect(alertSpy).toHaveBeenCalledWith('Login Failed', apiError.error);
        });
    });
});
