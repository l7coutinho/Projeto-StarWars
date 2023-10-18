import { render, screen } from '@testing-library/react';
import App from '../App';
import { FilterProvider } from '../context/FilterProvider';

test('I am your test', () => {
  render(
    <FilterProvider>
      <App />
    </FilterProvider>
    );
  const linkElement = screen.getByRole('button');
  expect(linkElement).toBeInTheDocument();
});
