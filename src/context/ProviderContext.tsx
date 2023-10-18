import { createContext } from 'react';
import { ResultType } from '../types';

type ProviderContextType = {
  data: ResultType[];
  setData: any;
};

const FilterContext = createContext({} as ProviderContextType);

export default FilterContext;
