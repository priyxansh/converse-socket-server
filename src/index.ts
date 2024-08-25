import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import { joinRoom } from "./socket-controllers/joinRoom";
import { sendFriendRequest } from "./socket-controllers/sendFriendRequest";
import { acceptFriendRequest } from "./socket-controllers/acceptFriendRequest";
import { rejectFriendRequest } from "./socket-controllers/rejectFriendRequest";
import { removeFriend } from "./socket-controllers/removeFriend";
import { leaveRoom } from "./socket-controllers/leaveRoom";
import { sendMessage } from "./socket-controllers/message/sendMessage";

// Load environment variables
dotenv.config();
const { NODE_ENV, PORT, PROD_DOMAIN, DEV_DOMAIN } = process.env;

// Initialize the server with socket.io
const app = express();

app.use(
  cors({
    origin: NODE_ENV === "production" ? PROD_DOMAIN : DEV_DOMAIN,
  })
);

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: NODE_ENV === "production" ? PROD_DOMAIN : DEV_DOMAIN,
  },
});

// Define basic test route
app.get("/", (_, res) => {
  res.json({ message: "Hello World!" });
});

// Listen for incoming socket events
io.on("connection", (socket) => {
  socket.on("join", joinRoom(socket));
  socket.on("leave", leaveRoom(socket));

  socket.on("send_friend_request", sendFriendRequest(socket));
  socket.on("accept_friend_request", acceptFriendRequest(socket));
  socket.on("reject_friend_request", rejectFriendRequest(socket));
  socket.on("remove_friend", removeFriend(socket));

  socket.on("message:send", sendMessage(socket));
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
