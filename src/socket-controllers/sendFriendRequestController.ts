import { Socket } from "socket.io";

/**
 * Controller function to send a friend request.
 * @param socket - The socket object.
 * @param data - The data object containing sender and receiver information.
 * @returns A function that emits a "receive_friend_request" event to the receiver.
 */
export const sendFriendRequestController = (socket: Socket) => {
  return (data: {
    senderUsername: string;
    senderName: string;
    receiverUsername: string;
    receiverName: string;
  }) => {
    socket.to(data.receiverUsername).emit("receive_friend_request", {
      senderUsername: data.senderUsername,
      senderName: data.senderName,
    });
  };
};
