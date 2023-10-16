const fetchApi = async () => {
  const fetchResponse = await fetch('https://swapi.dev/api/planets');
  const fetchData = await fetchResponse.json();

  if (fetchData.results) {
    const filteredData = fetchData.results.map((planet: any) => {
      const { residents, ...restOfData } = planet;
      return restOfData;
    });
    return filteredData;
  }
};

export default fetchApi;
