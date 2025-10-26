import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // React app URL
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// 🧠 Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Socket.IO Server is running 🚀");
});

// ⚡ When a new client connects
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Listen for custom event
  socket.on("sendMessage", (message) => {
    console.log("Received message:", message);

    // Broadcast message to all connected clients
    io.emit("receiveMessage", message);
  });

  // On disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
