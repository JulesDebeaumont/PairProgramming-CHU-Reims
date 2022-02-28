import { useEffect, useCallback, useState } from 'react';
import getOperators from '../utils/api/operators';

export default function useOperators() {
  const [comparisonOperators, setComparisonOperators] = useState([]);
  const [logicalOperators, setLogicalOperators] = useState([]);
  const getAllOperators = useCallback(async () => {
    const response = await getOperators();
    setComparisonOperators(Object.values(response).filter((operator) => operator.type.name === "Comparison"));
    setLogicalOperators(Object.values(response).filter((operator) => operator.type.name === "Logical"));
  }, [])

  useEffect(() => {
    getAllOperators();
  }, [getAllOperators]);

  return { comparisonOperators, logicalOperators };
}
