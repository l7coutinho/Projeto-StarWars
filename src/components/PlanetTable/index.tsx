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
        {data.map((element: any, index: number) => (
          <tr key={ index }>
            {headers.map((header) => (
              <td key={ header }>{element[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PlanetTable;
