import { createContext, useContext, useReducer } from 'react';

type FilterAction = string;
type FilterState = string | undefined;

const FilterContext = createContext<{
  filter: FilterState;
  dispatch: React.Dispatch<FilterAction>;
} | any>(undefined);

export function useFilter() {
  const context = useContext(FilterContext);
  return context;
}

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filter, dispatch] = useReducer((s: FilterState, act: FilterAction) => act, '');

  return (
    <FilterContext.Provider value={ { filter, dispatch } }>
      {children}
    </FilterContext.Provider>
  );
}
