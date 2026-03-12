require("dotenv").config();

const { createAdapter } = require("@socket.io/redis-adapter");
const { pubClient, subClient, connectRedis } = require("./src/config/redis");

const express = require("express");
const http = require("http");
const cors = require("cors");

const connectDB = require("./src/config/db");
const roomRoutes = require("./src/routes/roomRoutes");

const { Server } = require("socket.io");
const roomSocket = require("./src/sockets/roomSocket");

const app = express();
const server = http.createServer(app);

connectDB();

// Redis connection is handled before starting the server

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Study workspace API running");
});

/* -------- Socket Test Page -------- */

app.get("/socket-test", (req, res) => {
  res.send(`
  <html>
    <body>
      <h2>Socket Presence Test</h2>

      <script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script>

      <script>

        const socket = io("http://localhost:5000");

        socket.on("connect", () => {
          console.log("Connected:", socket.id);

          socket.emit("join-room", {
            roomCode: "OS1UGN",
            user: "TestUser"
          });
        });

        socket.on("room-members", (members) => {
          console.log("Members:", members);
        });

        socket.on("error-message", (msg) => {
          console.log("Error:", msg);
        });

      </script>

    </body>
  </html>
  `);
});

/* -------- Realtime Editor Test -------- */

app.get("/editor-test", (req, res) => {
  res.send(`
  <html>
  <body>

    <h2>Realtime Notes Editor</h2>

    <textarea id="editor" style="width:600px;height:300px;"></textarea>

    <script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script>

    <script>

      const socket = io("http://localhost:5000");

      const roomCode = "OS1UGN";
      const user = "EditorUser";

      const editor = document.getElementById("editor");

      socket.emit("join-room", { roomCode, user });

      socket.on("load-note", (content) => {
        editor.value = content;
      });

      editor.addEventListener("input", () => {

        socket.emit("note-update", {
          roomCode,
          content: editor.value
        });

        socket.emit("typing-start", { roomCode, user });

        clearTimeout(window.typingTimer);

        window.typingTimer = setTimeout(() => {
          socket.emit("typing-stop", { roomCode, user });
        }, 800);

      });

      editor.addEventListener("keyup", () => {

        const position = editor.selectionStart;

        socket.emit("cursor-move", {
          roomCode,
          user,
          position
        });

      });

      socket.on("note-update", (content) => {
        editor.value = content;
      });

      socket.on("typing-start", (user) => {
        console.log(user + " is typing...");
      });

      socket.on("typing-stop", (user) => {
        console.log(user + " stopped typing");
      });

      socket.on("cursor-update", ({ user, position }) => {
        console.log(user + " cursor at:", position);
      });

    </script>

  </body>
  </html>
  `);
});

/* -------- API Routes -------- */

app.use("/api/rooms", roomRoutes);

/* -------- Socket Server -------- */

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

connectRedis().then(() => {
  io.adapter(createAdapter(pubClient, subClient));
  roomSocket(io);

  /* -------- Start Server -------- */

  const PORT = process.env.PORT || 5000;

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error("Failed to connect to Redis:");
  console.error(err);
});
