import { useEffect, useCallback, useState } from 'react';
import getTermTypes from '../utils/api/termTypes';

export default function useTermTypes() {
  const [termTypes, setTermTypes] = useState([]);
  const getAllTermTypes = useCallback(async () => {
    const response = await getTermTypes();
    setTermTypes(response);
  }, []) 

  useEffect(() => {
    getAllTermTypes();
  }, []);

  return { termTypes };
}
