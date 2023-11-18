import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import Jest DOM matchers
import Rating from '../components/Rating'; // Adjust the import path based on your project structure

test('Rating component displays correct number of stars and caption', () => {
  // Define the props for your Rating component
  const props = {
    rating: 3.5, // Set the rating value for testing
    numReviews: 10, // Set the number of reviews (optional)
    caption: 'Test Rating', // Set a caption (optional)
  };

  // Render the Rating component with the defined props
  const { container, getByText } = render(<Rating {...props} />);

  // Verify that the correct number of stars is displayed
  const fullStars = container.querySelectorAll('.fa-star').length;
  const halfStars = container.querySelectorAll('.fa-star-half-o').length;
  const emptyStars = container.querySelectorAll('.fa-star-o').length;

  // The rating of 3.5 should result in 3 full stars, 1 half star, and 1 empty star
  expect(fullStars).toBe(3);
  expect(halfStars).toBe(1);
  expect(emptyStars).toBe(1);

  // Verify that the caption is displayed if provided
  if (props.caption) {
    const captionElement = getByText(props.caption);
    expect(captionElement).toBeInTheDocument();
  } else {
    const reviewsElement = getByText(`${props.numReviews} reviews`);
    expect(reviewsElement).toBeInTheDocument();
  }
});
