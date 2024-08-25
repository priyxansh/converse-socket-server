import { Socket } from "socket.io";

/**
 * Controller function to leave a room.
 * @param socket - The socket object.
 * @returns A function that takes a room name and removes the socket from that room.
 */
export const leaveRoom = (socket: Socket) => {
  return (room: string) => {
    socket.leave(room);
  };
};
