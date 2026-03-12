const Room = require("../models/Room");
const Note = require("../models/Note");
const saveTimers = {};
const noteState = {};

const roomSocket = (io) => {
  const socketUserMap = {};
  const roomMembers = {};

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // JOIN ROOM
    socket.on("join-room", async ({ roomCode, user }) => {
      const room = await Room.findOne({ roomCode });

      if (!room) {
        socket.emit("error-message", "Room not found");
        return;
      }

      socket.join(roomCode);

      socketUserMap[socket.id] = { user, roomCode };

      // LOAD NOTE FROM DATABASE
      let note = await Note.findOne({ roomCode });

      if (!note) {
        note = await Note.create({
          roomCode,
          content: "",
        });
      }

      noteState[roomCode] = note.content;

      socket.emit("load-note", noteState[roomCode]);

      if (!roomMembers[roomCode]) {
        roomMembers[roomCode] = [];
      }

      if (!roomMembers[roomCode].includes(user)) {
        roomMembers[roomCode].push(user);
      }

      io.to(roomCode).emit("room-members", roomMembers[roomCode]);

      console.log("Room state:", roomMembers);
    });

    // REALTIME NOTE SYNC
    socket.on("note-update", ({ roomCode, content }) => {
      if (!roomCode || content === undefined) return;

      noteState[roomCode] = content;

      io.to(roomCode).emit("note-update", noteState[roomCode]);

      clearTimeout(saveTimers[roomCode]);

      saveTimers[roomCode] = setTimeout(async () => {
        await Note.findOneAndUpdate(
          { roomCode },
          { content: noteState[roomCode], updatedAt: new Date() },
          { upsert: true },
        );

        console.log("Note saved:", roomCode);
      }, 1000);
    });

    // CURSOR TRACKING
    socket.on("cursor-move", ({ roomCode, user, position }) => {
      if (!roomCode || position === undefined) return;

      socket.to(roomCode).emit("cursor-update", {
        user,
        position,
      });
    });
    // TYPING INDICATOR
    socket.on("typing-start", ({ roomCode, user }) => {
      socket.to(roomCode).emit("typing-start", user);
    });

    socket.on("typing-stop", ({ roomCode, user }) => {
      socket.to(roomCode).emit("typing-stop", user);
    });

    // DISCONNECT CLEANUP
    socket.on("disconnect", () => {
      const userData = socketUserMap[socket.id];

      if (!userData) return;

      const { user, roomCode } = userData;

      if (roomMembers[roomCode]) {
        roomMembers[roomCode] = roomMembers[roomCode].filter((u) => u !== user);

        if (roomMembers[roomCode].length === 0) {
          delete roomMembers[roomCode];
        }
      }

      delete socketUserMap[socket.id];

      io.to(roomCode).emit("room-members", roomMembers[roomCode] || []);

      console.log("User disconnected:", user);
      console.log("Room state:", roomMembers);
    });
  });
};

module.exports = roomSocket;
