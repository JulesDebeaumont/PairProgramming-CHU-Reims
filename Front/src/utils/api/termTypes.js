import axios from '../axios';

const termTypesUrl = '/termTypes';

/**
 * Get all term types
 */
export async function getTermTypes() {
  try {
    const response = await axios.get(termTypesUrl);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

export default getTermTypes;