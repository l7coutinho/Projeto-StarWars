import './App.css';
import Table from './components/Table';
import { FilterProvider } from './context/FilterProvider';
// import PlanetTable from './services/API';

function App() {
  return (
    <FilterProvider>
      <Table />
    </FilterProvider>
  );
}

export default App;
