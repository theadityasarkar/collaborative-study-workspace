import axios from 'axios';

const API_URL = 'http://localhost:5000/api/rooms';

export const createRoom = async () => {
  const response = await axios.post(`${API_URL}/create`);
  return response.data;
};

export const joinRoom = async (roomCode, user) => {
  const response = await axios.post(`${API_URL}/join`, { roomCode, user });
  return response.data;
};
