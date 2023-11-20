import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PaymentMethodScreen from '../screens/PaymentMethodScreen';
import { savePaymentMethod } from '../actions/cartActions';


const mockStore = configureStore([thunk]);

describe('PaymentMethodScreen', () => {
  test('handles form submission correctly', async () => {
   
    const initialState = {
      cart: {
        shippingAddress: { address: 'Mocked Address' },
      },
    };

    
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PaymentMethodScreen />
        </MemoryRouter>
      </Provider>
    );

    //  selecting Stripe as the payment method
    fireEvent.click(screen.getByLabelText(/Stripe/i));

   
    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));


    
    store.clearActions();

    
    fireEvent.click(screen.getByLabelText(/PayPal/i));

   
    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

const dispatchedActions = store.getActions();


console.log('Dispatched Actions:', dispatchedActions);


expect(dispatchedActions[0]).toEqual({
  type: 'CART_SAVE_PAYMENT_METHOD',
  payload: 'Stripe',
});


if (dispatchedActions.length > 1) {
  expect(dispatchedActions[1]).toEqual({
    type: 'CART_SAVE_PAYMENT_METHOD',
    payload: 'PayPal',
  });
} 
    
  });
});
