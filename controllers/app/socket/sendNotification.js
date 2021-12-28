module.exports = {
  joinSocket(socket, userId, id) {
    socket.join(id);
  },
  joinFriendRoom: async (socket, groupId) => {
    socket.join(groupId);
  },
  sendBackMessageToClient(io, data, socketId, event) {
    return io.to(socketId).emit(event, { data });
  },
  async disconnectServer(socket, userId, reason) {
    console.log(
      `Getting user with id ${userId} offline due to ${reason}`,
    );
  },
  async msg(data, userId, io) {
    return this.sendBackMessageToClient(io, {message:"kjhgfd"}, data.userId, "receive_message");
  },
}