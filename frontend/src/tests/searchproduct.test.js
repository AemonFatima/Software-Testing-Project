
// Import necessary libraries and components for testing
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchBox from '../components/SearchBox';

// Describe the test suite for the SearchBox component
describe('Search Box', () => {
    // Test case: Check if search box renders
    test('Check if search box renders', () => {
        // Render the SearchBox component within a Router
        render(
            <Router>
                <SearchBox />,
            </Router>,
        );

        // Get the search box element by its data-testid
        const searchbox = screen.getByTestId('searchbox-test');

        // Check if the search box is in the document
        expect(searchbox).toBeInTheDocument();
    });

    // Test case: Check if search box value changes
    test('Check if search box value changes', () => {
        // Render the SearchBox component within a Router
        render(
            <Router>
                <SearchBox />,
            </Router>,
        );

        // Get the search field element by its data-testid
        const searchfield = screen.getByTestId('search-test');

        // Simulate typing in the search field
        userEvent.type(searchfield, 'test');

        // Check if the value in the search field matches the typed text
        expect(searchfield.value).toMatch('test');
    });

    // Test case: Check if search button is clickable
    test('Check if search button is clickable', () => {
        // Render the SearchBox component within a Router
        render(
            <Router>
                <SearchBox />,
            </Router>,
        );

        // Get the search button element by its data-testid
        const searchbutton = screen.getByTestId('bttn-test');

        // Check if clicking the search button returns a truthy value
        expect(fireEvent.click(searchbutton)).toBeTruthy();
    });
});
