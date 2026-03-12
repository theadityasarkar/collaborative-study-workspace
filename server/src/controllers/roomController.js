const Room = require("../models/Room");
const generateRoomCode = require("../utils/generateRoomCode");

exports.createRoom = async (req, res) => {
  try {
    const host = req.body?.host;

    if (!host) {
      return res.status(400).json({ message: "host required" });
    }

    let roomCode;

    while (true) {
      roomCode = generateRoomCode();
      const exists = await Room.exists({ roomCode });
      if (!exists) break;
    }

    const room = new Room({
      roomCode,
      host,
      members: [host],
    });

    await room.save();

    res.status(201).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create room" });
  }
};

exports.joinRoom = async (req, res) => {
  try {
    const { roomCode, user } = req.body;

    if (!roomCode || !user) {
      return res.status(400).json({ message: "roomCode and user required" });
    }

    const room = await Room.findOne({ roomCode });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (room.members.includes(user)) {
      return res.status(400).json({ message: "User already in room" });
    }

    room.members.push(user);
    await room.save();

    res.json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to join room" });
  }
};
