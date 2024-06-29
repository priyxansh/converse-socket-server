import { Socket } from "socket.io";

export const rejectFriendRequest = (socket: Socket) => {
  return (data: { senderUsername: string; requestId: string }) => {
    socket.to(data.senderUsername).emit("reject_friend_request", {
      requestId: data.requestId,
    });
  };
};
