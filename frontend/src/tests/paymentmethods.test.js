import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PaymentMethodScreen from '../screens/PaymentMethodScreen';
import { savePaymentMethod } from '../actions/cartActions';

// Create a mock Redux store with thunk middleware
const mockStore = configureStore([thunk]);

describe('PaymentMethodScreen', () => {
  test('handles form submission correctly', async () => {
    // Initial state of the Redux store
    const initialState = {
      cart: {
        shippingAddress: { address: 'Mocked Address' },
      },
    };

    // Create the store with the initial state
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PaymentMethodScreen />
        </MemoryRouter>
      </Provider>
    );

    // Simulate selecting Stripe as the payment method
    fireEvent.click(screen.getByLabelText(/Stripe/i));

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));


    // Reset the store actions
    store.clearActions();

    // Simulate selecting PayPal as the payment method
    fireEvent.click(screen.getByLabelText(/PayPal/i));

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));
 // Check if the savePaymentMethod action is dispatched with the correct payloads
const dispatchedActions = store.getActions();

// Log the dispatched actions for debugging
console.log('Dispatched Actions:', dispatchedActions);

// Check the first dispatch
expect(dispatchedActions[0]).toEqual({
  type: 'CART_SAVE_PAYMENT_METHOD',
  payload: 'Stripe',
});

// Check the second dispatch
if (dispatchedActions.length > 1) {
  expect(dispatchedActions[1]).toEqual({
    type: 'CART_SAVE_PAYMENT_METHOD',
    payload: 'PayPal',
  });
} 
    
  });
});
