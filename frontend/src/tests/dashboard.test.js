import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import DashboardScreen from '../screens/DashboardScreen';
import { summaryOrder } from '../actions/orderActions';
import '@testing-library/jest-dom/extend-expect';

// Mock the order summary data for testing
const mockSummary = {
  loading: false,
  summary: {
    users: [{ numUsers: 5 }],
    orders: [{ numOrders: 10, totalSales: 150 }],
    dailyOrders: [{ _id: '2023-01-01', sales: 50 }],
    productCategories: [{ _id: 'Category1', count: 3 }],
  },
  error: null,
};

// Mock the user authentication data
const mockUserInfo = {
  userInfo: {
    // Add necessary user information here
  },
};

// Create a mock Redux store with thunk middleware
const mockStore = configureStore([thunk]);

describe('DashboardScreen', () => {
  it('renders loading state correctly', () => {
    const initialState = { orderSummary: { loading: true, summary: {}, error: null }, userSignin: mockUserInfo };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <DashboardScreen />
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    const initialState = { orderSummary: { loading: false, summary: {}, error: 'Test error message' }, userSignin: mockUserInfo };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <DashboardScreen />
      </Provider>
    );

    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('renders success state correctly', async () => {
    const initialState = { orderSummary: mockSummary, userSignin: mockUserInfo };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <DashboardScreen />
      </Provider>
    );

    // Wait for the loading boxes to disappear
    await waitFor(() => {
      expect(screen.getByText('Users')).toBeInTheDocument();
      expect(screen.getByText('Orders')).toBeInTheDocument();
      expect(screen.getAllByText('Sales')).toHaveLength(2); // Check for multiple elements with text 'Sales'
      expect(screen.getByText('Categories')).toBeInTheDocument();
    });
  });

  // Add more test cases as needed for different scenarios, such as handling different chart data, etc.
});
