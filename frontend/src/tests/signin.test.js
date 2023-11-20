import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import SigninScreen from '../screens/SigninScreen';
import * as userActions from '../actions/userActions'; 
import { useDispatch } from 'react-redux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));


const mockStore = configureMockStore();
const store = mockStore({
  userSignin: {
    userInfo: null,
    loading: false,
    error: null,
  },
});

test('renders SigninScreen', () => {
 
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);
  
  const mockSigninAction = jest.spyOn(userActions, 'signin');

  render(
    <Provider store={store}>
      <MemoryRouter>
        <SigninScreen />
      </MemoryRouter>
    </Provider>
  );

  
  const emailInput = screen.getByLabelText(/Email address/i);
  const passwordInput = screen.getByLabelText(/Password/i);

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  // Check if the input values are updated
  expect(emailInput.value).toBe('test@example.com');
  expect(passwordInput.value).toBe('password123');

  fireEvent.submit(screen.getByRole('button', { name: /Sign In/i }));

  //dispatch was called with the correct action
  expect(mockSigninAction).toHaveBeenCalledWith('test@example.com', 'password123');
});
