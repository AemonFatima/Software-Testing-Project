import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import RegisterScreen from '../screens/RegisterScreen';
import * as userActions from '../actions/userActions'; 


import { useDispatch } from 'react-redux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));


const mockStore = configureMockStore();
const store = mockStore({
  userRegister: {
    userInfo: null,
    loading: false,
    error: null,
  },
});

test('renders RegisterScreen', () => {
  
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);

  
  const mockRegisterAction = jest.spyOn(userActions, 'register');

  render(
    <Provider store={store}>
      <MemoryRouter>
        <RegisterScreen />
      </MemoryRouter>
    </Provider>
  );

 
  const nameInput = screen.getByLabelText(/Name/i);
  const emailInput = screen.getByLabelText(/Email address/i);
  const [passwordInput, confirmPasswordInput] = screen.getAllByLabelText(/Password/i);

  // Check if the input values are updated
  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

  expect(nameInput.value).toBe('John Doe');
  expect(emailInput.value).toBe('john@example.com');
  expect(passwordInput.value).toBe('password123');
  expect(confirmPasswordInput.value).toBe('password123');

 
  fireEvent.submit(screen.getByRole('button', { name: /Register/i }));

  //  dispatch was called with the correct action
  expect(mockRegisterAction).toHaveBeenCalledWith('John Doe', 'john@example.com', 'password123');
});
