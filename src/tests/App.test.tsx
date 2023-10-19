import { render, screen, waitFor } from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';
import App from '../App';
import { FilterProvider } from '../context/FilterProvider';

describe('<Table />', () => {
  it('Button Filter', () => {
    render(
      <FilterProvider>
        <App />
      </FilterProvider>
    );

    const linkElement = screen.getByText('Filter');
    expect(linkElement).toBeInTheDocument();
  })
  
  it('Table titles', () => {
    render(
      <FilterProvider>
        <App />
      </FilterProvider>
    );
    const columnFilter = screen.getByTestId('column-filter');
    expect(columnFilter).toBeInTheDocument();
    const comparison = screen.getByTestId('comparison-filter');
    expect(comparison).toBeInTheDocument();
    const value = screen.getByTestId('value-filter');
    expect(value).toBeInTheDocument();
    const btnFilter = screen.getByRole('button', { name: /filter/i });
    expect(btnFilter).toBeInTheDocument();
  })

  it('deve filtrar os planetas corretamente', async () => {
    const { getByTestId } = render(
      <FilterProvider>
        <App />
      </FilterProvider>
    );

    const columnSelect = getByTestId('column-filter');
    await userEvent.selectOptions(columnSelect, 'population');
    expect(columnSelect).toHaveValue('population');
    
    const comparisonSelect = getByTestId('comparison-filter');
    await userEvent.selectOptions(comparisonSelect, 'maior que');
    expect(comparisonSelect).toHaveValue('maior que')
    
    const valueInput = getByTestId('value-filter');
    await userEvent.type(valueInput, '100000');
    
    const filterButton = getByTestId('button-filter');
    await userEvent.click(filterButton);
    expect(screen.getByRole('button', {name: /x/i})).toBeInTheDocument;
  });

  it('Deve remover os filtros corretamente', async () => {
    const { getByTestId } = render(
      <FilterProvider>
        <App />
      </FilterProvider>
    );

    const columnSelect = getByTestId('column-filter');
    await userEvent.selectOptions(columnSelect, 'diameter');
    expect(columnSelect).toHaveValue('diameter');
    
    const comparisonSelect = getByTestId('comparison-filter');
    await userEvent.selectOptions(comparisonSelect, 'menor que');
    expect(comparisonSelect).toHaveValue('menor que')
    
    const valueInput = getByTestId('value-filter');
    await userEvent.type(valueInput, '155000');

    const filterButton = getByTestId('button-filter');
    await userEvent.click(filterButton);

    const removeFilterButton = screen.getByRole('button', { name: /x/i });
    userEvent.click(removeFilterButton);

    await waitFor(() => {
      const removedFilter = screen.queryByRole('button', { name: /x/i });
      expect(removedFilter).toBeNull();
    });
  });
});
