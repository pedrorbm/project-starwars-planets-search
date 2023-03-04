const planetsAPI = async () => {
  const URL = 'https://swapi.dev/api/planets';
  const api = await fetch(URL);
  const result = await api.json();
  return result;
};

export default planetsAPI;
