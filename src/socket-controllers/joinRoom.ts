import { Socket } from "socket.io";

/**
 * Controller function to join a room.
 * @param socket - The socket object.
 * @returns A function that takes a room name and joins the socket to that room.
 */
export const joinRoom = (socket: Socket) => {
  return (room: string) => {
    socket.join(room);
  };
};
