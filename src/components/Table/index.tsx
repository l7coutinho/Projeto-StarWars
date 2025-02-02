import { useContext, useEffect, useState } from 'react';
import PlanetTable from '../PlanetTable';
import FilterContext from '../../context/ProviderContext';
import { FilterType, ResultType } from '../../types';

function Table() {
  const { data } = useContext(FilterContext);
  const [inputValue, setInputValue] = useState('');
  const [filteredPlanetArray, setFilteredPlanetArray] = useState<ResultType[]>(data);
  const [selectedColumn, setSelectedColumn] = useState('population');
  const [selectedComparison, setSelectedComparison] = useState('maior que');
  const [selectedValue, setSelectedValue] = useState('0');
  const [availableColumns, setAvailableColumns] = useState<string[]>([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);
  const [filters, setFilters] = useState<FilterType[]>([]);
  const [sortConfig, setSortConfig] = useState({ column: 'population', sort: 'ASC' });

  useEffect(() => {
    setFilteredPlanetArray(data);
  }, [data]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClickButton = () => {
    const newFilter = {
      column: selectedColumn, comparison: selectedComparison, value: selectedValue,
    };
    const newFilters = [...filters, newFilter];
    setFilters(newFilters);

    const updatedAvailableColumns = availableColumns
      .filter((column) => column !== selectedColumn);
    setAvailableColumns(updatedAvailableColumns);

    const filteredPlanets2 = filteredPlanetArray.filter((planet: any) => {
      const planetValue = planet[selectedColumn];
      switch (selectedComparison) {
        case 'maior que':
          return Number(planetValue) > Number(selectedValue);
        case 'menor que':
          return Number(planetValue) < Number(selectedValue);
        case 'igual a':
          return Number(planetValue) === Number(selectedValue);
        default:
          return true;
      }
    });
    setFilteredPlanetArray(filteredPlanets2);
    setSelectedColumn(updatedAvailableColumns[0]);
  };

  const removeFilter = (index: number) => {
    const removedFilter = filters[0];
    const updatedAvailableColumns = [...availableColumns, removedFilter.column];
    setAvailableColumns(updatedAvailableColumns);

    const updatedFilters = filters.filter((e, i) => i !== index);
    setFilters(updatedFilters);

    let filteredPlanets = data;
    updatedFilters.forEach((element) => {
      filteredPlanets = filteredPlanets.filter((planet: any) => {
        const planetValue = planet[element.column];
        switch (element.comparison) {
          case 'maior que':
            return Number(planetValue) > Number(element.value);
          case 'menor que':
            return Number(planetValue) < Number(element.value);
          case 'igual a':
            return Number(planetValue) === Number(element.value);
          default:
            return true;
        }
      });
    });

    setFilteredPlanetArray(filteredPlanets);
  };

  const removeAllFilters = () => {
    setAvailableColumns(
      ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
    );
    setFilters([]);
    setFilteredPlanetArray(data);
  };

  const filteredPlanets = filteredPlanetArray
    .filter((planet: any) => planet.name.toLowerCase().includes(inputValue));

  const handleSort = () => {
    const { column } = sortConfig;

    const planetUnknown = filteredPlanets.filter((element) => {
      return element[column] === 'unknown';
    });

    const planetKnown = filteredPlanets.filter((element) => {
      return element[column] !== 'unknown';
    });

    const sortedPlanets = [...planetKnown];

    sortedPlanets.sort((a, b) => {
      const sortOrder = sortConfig.sort === 'ASC' ? 1 : -1;

      if (Number(a[column]) < Number(b[column])) {
        return -sortOrder;
      }
      if (Number(a[column]) > Number(b[column])) {
        return sortOrder;
      }
      return 0;
    });

    setFilteredPlanetArray([...sortedPlanets, ...planetUnknown]);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          data-testid="name-filter"
          value={ inputValue }
          onChange={ handleChangeInput }
        />
      </div>

      <div>
        <select
          data-testid="column-filter"
          value={ selectedColumn }
          onChange={ (e) => setSelectedColumn(e.target.value) }
        >
          {availableColumns.map((column) => (
            <option key={ column } value={ column }>
              {column}
            </option>
          ))}
        </select>
        <select
          data-testid="comparison-filter"
          value={ selectedComparison }
          onChange={ (e) => setSelectedComparison(e.target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="text"
          data-testid="value-filter"
          value={ selectedValue }
          onChange={ (e) => setSelectedValue(e.target.value) }
        />
        <button data-testid="button-filter" onClick={ handleClickButton }>
          Filter
        </button>
      </div>

      <PlanetTable data={ filteredPlanets } />

      <div>
        <select
          data-testid="column-sort"
          value={ sortConfig.column }
          onChange={ (e) => setSortConfig({ ...sortConfig, column: e.target.value }) }
        >
          {availableColumns.map((column) => (
            <option key={ column } value={ column }>
              {column}
            </option>
          ))}
        </select>

        <label>
          <input
            type="radio"
            data-testid="column-sort-input-asc"
            name="sort-direction"
            value="ASC"
            checked={ sortConfig.sort === 'ASC' }
            onChange={ () => setSortConfig({ ...sortConfig, sort: 'ASC' }) }
          />
          Ascendente
        </label>
        <label>
          <input
            type="radio"
            data-testid="column-sort-input-desc"
            name="sort-direction"
            value="DESC"
            checked={ sortConfig.sort === 'DESC' }
            onChange={ () => setSortConfig({ ...sortConfig, sort: 'DESC' }) }
          />
          Descendente
        </label>

        <button
          data-testid="column-sort-button"
          onClick={ () => handleSort() }
        >
          Ordenar
        </button>

      </div>
      <div>
        {filters.map((filter, index) => (
          <div key={ index } data-testid="filter">
            {`${filter.column} ${filter.comparison} ${filter.value}`}
            <button onClick={ () => removeFilter(index) }>X</button>
          </div>
        ))}

        <button data-testid="button-remove-filters" onClick={ removeAllFilters }>
          Remover todas filtragens
        </button>
      </div>

    </div>
  );
}

export default Table;
