const { createClient } = require("redis");

const pubClient = createClient({
  url: "redis://localhost:6379",
});

const subClient = pubClient.duplicate();

const connectRedis = async () => {
  await pubClient.connect();
  await subClient.connect();
  console.log("Redis connected");
};

module.exports = {
  pubClient,
  subClient,
  connectRedis,
};
