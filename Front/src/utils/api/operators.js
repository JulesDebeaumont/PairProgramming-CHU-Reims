import axios from '../axios';

const operatorsUrl = '/operators';

/**
 * Get all operators
 */
export async function getOperators() {
  try {
    const response = await axios.get(operatorsUrl);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}

export default getOperators;