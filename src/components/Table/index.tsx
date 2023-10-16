import { useEffect, useState } from 'react';
import fetchApi from '../../services/API';
import PlanetTable from '../PlanetTable';

function Table() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchApi().then((filteredData: any) => {
      setData(filteredData);
    });
  }, []);

  return <PlanetTable data={ data } />;
}

export default Table;
