import { useEffect, useState } from 'react';
import fetchApi from '../../services/API';
import PlanetTable from '../PlanetTable';
import { useFilter } from '../../context/FilterProvider';

function Table() {
  const [data, setData] = useState([]);
  const { filter, dispatch } = useFilter();

  useEffect(() => {
    fetchApi().then((filteredData: any) => {
      setData(filteredData);
    });
  }, []);

  const filteredPlanets = data
    .filter((planet: any) => planet.name.toLowerCase().includes(filter!.toLowerCase()));

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        value={ filter }
        onChange={ (e) => dispatch(e.target.value) }
      />
      <PlanetTable data={ filteredPlanets } />
    </div>
  );
}

export default Table;
