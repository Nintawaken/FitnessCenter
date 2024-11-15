// useData.js
import { useState, useEffect } from 'react';

const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate fetching data from a local JSON file
    const fetchData = async () => {
      const response = await fetch('/data.json');
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  return data;
};

export default useData;
