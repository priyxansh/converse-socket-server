import { Socket } from "socket.io";

/**
 * Controller function to handle accepting a friend request.
 * @param socket - The socket object for the client connection.
 * @returns A function that accepts the data object containing the sender's username, receiver's username, and receiver's name.
 */
export const acceptFriendRequestController = (socket: Socket) => {
  return (data: {
    senderUsername: string;
    receiverUsername: string;
    receiverName: string;
  }) => {
    socket.to(data.senderUsername).emit("accept_friend_request", {
      receiverUsername: data.receiverUsername,
      receiverName: data.receiverName,
    });
  };
};
