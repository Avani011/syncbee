import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v2/focus';

export const startFocusSession = async ({ duration }: { duration: number }) => {

  const response = await axios.put(
    `${BASE_URL}/start-focus`,
    { duration },
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data;
};


export const fetchFocusHistory = async () => {
  const response = await axios.get(`${BASE_URL}/fetch-focusHistory`, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteFocusSession = async (focusId: string) => {
  const response = await axios.delete(`${BASE_URL}/delete-focus/${focusId}`, {
    withCredentials: true,
  });
  return response.data;
}; 
