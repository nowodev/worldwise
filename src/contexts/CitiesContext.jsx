import { createContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        alert("There was an error fetching data....");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  const values = {
    cities,
    isLoading,
  };

  return (
    <CitiesContext.Provider value={values}>{children}</CitiesContext.Provider>
  );
}

export { CitiesProvider };
