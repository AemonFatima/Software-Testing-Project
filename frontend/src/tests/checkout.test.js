import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

describe("Checkout Bar Component", () => {

    // Test to check if the CheckoutSteps component renders
    test('Check if component renders', () => {
        // Render the CheckoutSteps component
        render(<CheckoutSteps />);

        // Get the element with the specified data-testid attribute
        const checkmsg = screen.getByTestId('msg-test');
        
        // Check if the element is present in the document
        expect(checkmsg).toBeInTheDocument();
    })

    // Test to check if the "Sign-In" step is displayed
    test('Check if "Sign-In" text is displayed', () => {
        // Render the CheckoutSteps component with step1 prop
        render(<CheckoutSteps step1 />);

        // Get the element with the specified data-testid attribute
        const checkmsg = screen.getByTestId('signin');

        // Check if the element is present in the document
        expect(checkmsg).toBeInTheDocument();
    })

    // Test to check if other step texts are also displayed
    test('Check if other step texts are also displayed', () => {
        // Render the CheckoutSteps component with step1 prop
        render(<CheckoutSteps step1 />);
        
        // Get elements by their displayed text content
        const checksignin = screen.getByText('Shipping');
        const checkpay = screen.getByText('Payment');
        const checkodr = screen.getByText('Place Order');
        
        // Check if each element is visible in the document
        expect(checksignin).toBeVisible();
        expect(checkpay).toBeVisible();
        expect(checkodr).toBeVisible();
    })

})