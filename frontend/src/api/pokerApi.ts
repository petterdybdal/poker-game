const BASE_URL = 'http://localhost:5000/api';

export const createHand = async () => {
  const response = await fetch(`${BASE_URL}/poker/create`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
