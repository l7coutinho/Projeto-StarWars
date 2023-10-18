import { useEffect, useState } from 'react';
import FilterContext from './ProviderContext';
import fetchApi from '../services/API';

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchApi().then((filteredData: any) => {
      setData(filteredData);
    });
  }, []);

  return (
    <FilterContext.Provider value={ { data, setData } }>
      {children}
    </FilterContext.Provider>
  );
}
