import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import { joinRoomController } from "./socket-controllers/joinRoomController";
import { sendFriendRequestController } from "./socket-controllers/sendFriendRequestController";
import { acceptFriendRequestController } from "./socket-controllers/acceptFriendRequestController";

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
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// Listen for incoming socket events
io.on("connection", (socket) => {
  socket.on("join", joinRoomController(socket));
  socket.on("send_friend_request", sendFriendRequestController(socket));
  socket.on("accept_friend_request", acceptFriendRequestController(socket));
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
