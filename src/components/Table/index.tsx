import { useContext, useEffect, useState } from 'react';
import PlanetTable from '../PlanetTable';
import FilterContext from '../../context/ProviderContext';
import { ResultType } from '../../types';

function Table() {
  const { data } = useContext(FilterContext);
  const [inputValue, setInputValue] = useState('');
  const [filteredPlanetArray, setFilteredPlanetArray] = useState<ResultType[]>([]);
  const [selectedColumn, setSelectedColumn] = useState('population');
  const [selectedComparison, setSelectedComparison] = useState('maior que');
  const [selectedValue, setSelectedValue] = useState('0');

  useEffect(() => {
    setFilteredPlanetArray(data);
  }, [data]);

  const handleChangeInput = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleClickButton = () => {
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
  };

  const filteredPlanets = filteredPlanetArray
    .filter((planet: any) => planet.name.toLowerCase().includes(inputValue));

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
      <select
        data-testid="column-filter"
        value={ selectedColumn }
        onChange={ (e) => setSelectedColumn(e.target.value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
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

      <PlanetTable data={ filteredPlanets } />
    </div>
  );
}

export default Table;
