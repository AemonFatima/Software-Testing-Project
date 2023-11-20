import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import Rating from '../components/Rating'; 

test('Rating component displays correct number of stars and caption', () => {
 
  const props = {
    rating: 3.5, 
    numReviews: 10, 
    caption: 'Test Rating', 
  };

 
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
