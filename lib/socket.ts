import { Server as HTTPServer } from "http";
import { Server as SocketIOServer } from "socket.io";

let io: SocketIOServer | null = null;

export function initializeSocket(server: HTTPServer) {
  io = new SocketIOServer(server, {
    path: "/api/socket",
    addTrailingSlash: false,
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("join-chat", async ({ chatId }) => {
      socket.join(`chat:${chatId}`);
      console.log(`Client ${socket.id} joined chat ${chatId}`);
    });

    socket.on("leave-chat", ({ chatId }) => {
      socket.leave(`chat:${chatId}`);
      console.log(`Client ${socket.id} left chat ${chatId}`);
    });

    socket.on("send-message", async ({ chatId, content, senderId }) => {
      // Save message to database (using Drizzle)
      // const { db } = await import("./db");

      try {
        // TODO: Implement with Drizzle
        // const message = await db.insert(messagesTable).values({...}).returning();

        const message = {
          id: Date.now().toString(),
          chatId,
          senderId,
          content,
        };

        // Emit to all clients in the chat room
        io?.to(`chat:${chatId}`).emit("new-message", message);
      } catch (error) {
        console.error("Error saving message:", error);
        socket.emit("error", { message: "Failed to send message" });
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
}

export function getIO(): SocketIOServer {
  if (!io) {
    throw new Error("Socket.IO not initialized");
  }
  return io;
}
