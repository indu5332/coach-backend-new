/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */

const ioOperation = require("./io");

module.exports = {
  joinSocket(socket, userId, id) {
    socket.join(id);
    ioOperation.onlineStatus(userId, socket);
  },
  sendBackMessageToClient(io, data, socketId, event) {
    return io.to(socketId).emit(event, { data });
  },
  async disconnectServer(socket, userId, reason) {
    console.log(
      `Getting user with id ${userId} offline due to ${reason}`,
    );
    ioOperation.offlineStatus(userId, socket);
    console.log(`User with id ${userId} is offline now`);
  },

  async sendMsg(data, userId, io) {
    data.userId = userId;
    data.key = null;
    lastMessage.id = data.id;
    lastMessage.user = data.user;
    return this.sendBackMessageToClient(io, data, "receive_message");
  },
};
