import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchBox from '../components/SearchBox';


describe('Search Box', () => {
    // Check if search box renders
    test('Check if search box renders', () => { // Render the SearchBox component within a Router
        render(
            <Router>
                <SearchBox />,
            </Router>,
        );

        // Get the search box element by its data-testid
        const searchbox = screen.getByTestId('searchbox-test');

        
        expect(searchbox).toBeInTheDocument();
    });

   
    test('Check if search box value changes', () => {
       
        render(
            <Router>
                <SearchBox />,
            </Router>,
        );

        const searchfield = screen.getByTestId('search-test');

        userEvent.type(searchfield, 'test');

        // Check if the value in the search field matches the typed text
        expect(searchfield.value).toMatch('test');
    });

   
    test('Check if search button is clickable', () => {
       
        render(
            <Router>
                <SearchBox />,
            </Router>,
        );

       
        const searchbutton = screen.getByTestId('bttn-test');

        // Check if clicking the search button returns a truthy value
        expect(fireEvent.click(searchbutton)).toBeTruthy();
    });
});
