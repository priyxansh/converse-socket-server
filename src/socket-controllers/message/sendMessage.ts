import { Socket } from "socket.io";
import { Message } from "../../types/Message";

/**
 * Sends a message to a specific chat.
 *
 * @param socket - The socket object.
 * @returns A function that takes a chatId and a message object and emits a "message:receive" event to the specified chat.
 */
export const sendMessage = (socket: Socket) => {
  return ({ chatId, message }: { chatId: string; message: Message }) => {
    socket.to(chatId).emit("message:receive", {
      chatId,
      message,
    });
  };
};
