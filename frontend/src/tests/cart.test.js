import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CartScreen from '../screens/CartScreen';
import { addToCart, removeFromCart } from '../actions/cartActions';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('CartScreen', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = {
      cart: {
        cartItems: [
          {
            product: '1',
            name: 'Product 1',
            image: 'product1.jpg',
            qty: 2,
            price: 19.99,
            countInStock: 5,
          },
        ],
        error: null,
      },
    };
    store = mockStore(initialState);
  });

  it('calls checkoutHandler when "Proceed to Checkout" button is clicked', async () => {
    const navigateMock = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(navigateMock);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/cart/1?qty=2']}>
          <Routes>
            <Route path="/cart/:id" element={<CartScreen />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const checkoutButton = screen.getByRole('button', { name: /Proceed to Checkout/i });

    // Click the "Proceed to Checkout" button
    fireEvent.click(checkoutButton);

    // Check if navigate was called with the correct argument
    expect(navigateMock).toHaveBeenCalledWith('/signin?redirect=/shipping');
  });

  it('calls removeFromCartHandler when "Delete" button is clicked', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/cart/1?qty=2']}>
          <Routes>
            <Route path="/cart/:id" element={<CartScreen />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  
    const deleteButton = screen.getByRole('button', { name: /Delete/i });
  
    // Click the "Delete" button
    fireEvent.click(deleteButton);
  
    // Check if removeFromCartHandler was called with the correct argument
    const actions = store.getActions();
    expect(actions).toEqual([{
      type: 'CART_REMOVE_ITEM',
      payload: '1',
    }]);
  });
  
  });

