import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders the reservation book inside the application router', () => {
  global.fetch = jest.fn(() => new Promise(() => {}))

  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  )

  expect(getByText('Table')).toBeInTheDocument()
});
