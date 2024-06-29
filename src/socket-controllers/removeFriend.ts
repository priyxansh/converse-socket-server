import { Socket } from "socket.io";

export const removeFriend = (socket: Socket) => {
  return (data: { username: string }) => {
    socket.to(data.username).emit("remove_friend");
  };
};
