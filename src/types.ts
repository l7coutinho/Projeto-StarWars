export type ResultType = {
  [key: string]: string,
  name: string,
  rotation_period: string,
  orbital_period: string,
  diameter: string,
  climate: string,
  gravity: string,
  terrain: string,
  surface_water: string,
  population: string,
  films: string,
  created: string,
  edited: string,
  url: string,
};

export type FilterType = {
  column: string,
  comparison: string,
  value: string,
};
