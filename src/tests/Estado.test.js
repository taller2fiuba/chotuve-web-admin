import React from 'react';
import { render } from '@testing-library/react';
import { Estado } from '../controllers/Estado';

test('renders learn react link', () => {
  const { getByText } = render(<Estado />);
  const linkElement = getByText("Estado");
  expect(linkElement).toBeInTheDocument();
});
