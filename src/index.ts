import express, { Request, Response } from "express";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";

const PORT = 4000;

const app = express();

// This server is what Socket.IO will attach to so HTTP and WebSocket traffic share the same port.

const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:5173", // React app URL
		methods: ["GET", "POST"],
	},
});

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

io.on("connection", (socket) => {
	console.log(`User connected: ${socket.id}`);

	// Listen for custom event
	socket.on("sendMessage", (message) => {
		console.log("Received message:", message);

		// Broadcast message to all connected clients
		io.emit("receiveMessage", message);
	});
});

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World");
});

io.on;

app.listen(PORT, () => {
	console.log(`server is running on ${PORT}`);
});
