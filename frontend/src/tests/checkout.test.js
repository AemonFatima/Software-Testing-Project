import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

describe("Checkout Bar Component", () => {

    // Test to check if the CheckoutSteps component renders
    test('Check if component renders', () => {
        
        render(<CheckoutSteps />);

        // Get the element with the specified data-testid attribute
        const checkmsg = screen.getByTestId('msg-test');
        
        // Check if the element is present in the document
        expect(checkmsg).toBeInTheDocument();
    })

   
    test('Check if "Sign-In" text is displayed', () => {
       
        render(<CheckoutSteps step1 />);

        
        const checkmsg = screen.getByTestId('signin');

        
        expect(checkmsg).toBeInTheDocument();
    })

   
    test('Check if other step texts are also displayed', () => {
       
        render(<CheckoutSteps step1 />);
        
       
        const checksignin = screen.getByText('Shipping');
        const checkpay = screen.getByText('Payment');
        const checkodr = screen.getByText('Place Order');
        
       
        expect(checksignin).toBeVisible();
        expect(checkpay).toBeVisible();
        expect(checkodr).toBeVisible();
    })

})