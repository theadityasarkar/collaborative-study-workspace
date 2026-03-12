import axios from "axios";

const API_URL = "http://localhost:5000/api/rooms";

export const createRoom = async (name) => {
  const res = await fetch("http://localhost:5000/api/rooms/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      host: name,
    }),
  });

  return res.json();
};

export const joinRoom = async (roomCode, user) => {
  const response = await axios.post(`${API_URL}/join`, { roomCode, user });
  return response.data;
};
