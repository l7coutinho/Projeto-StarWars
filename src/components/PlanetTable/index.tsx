function PlanetTable({ data }: any) {
  if (!data || data.length === 0) {
    return null;
  }

  const headers = Object.keys(data[0]);

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={ header }>{header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((element: any, key: number) => (
          <tr key={ key }>
            {headers.map((header, index) => {
              if (index === 0) {
                return (
                  <td
                    key={ header }
                    data-testid="planet-name"
                  >
                    {element[header]}
                  </td>
                );
              }
              return (<td key={ header }>{element[header]}</td>);
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PlanetTable;
