/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
import {
  it, describe, expect,
} from 'vitest';
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import LoginInput from './LoginInput';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import jest from 'jest-mock';

describe('LoginInput component', () => {
  it('should handle username typing correctly', async () => {
    // arrange
    await act(async () => render(<LoginInput login={() => {}} />));
    const usernameInput = await screen.getByPlaceholderText('Username');

    // action
    await act(async () => userEvent.type(usernameInput, 'usernametest'));

    // assert
    expect(usernameInput).toHaveValue('usernametest');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    await act(async () => render(<LoginInput login={() => {}} />));
    const passwordInput = await screen.getByPlaceholderText('Password');

    // action
    await act(async () => userEvent.type(passwordInput, 'passwordtest'));

    // assert
    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call login function when login button is clicked', async () => {
    // arrange
    const mockLogin = jest.fn();
    await act(async () => render(<LoginInput login={mockLogin} />));
    const usernameInput = await screen.getByPlaceholderText('Username');
    await act(async () => userEvent.type(usernameInput, 'usernametest'));
    const passwordInput = await screen.getByPlaceholderText('Password');
    await act(async () => userEvent.type(passwordInput, 'passwordtest'));
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    // action
    await act(async () => userEvent.click(loginButton));

    // assert
    expect(mockLogin).toBeCalledWith({
      id: 'usernametest',
      password: 'passwordtest',
    });
  });
});
