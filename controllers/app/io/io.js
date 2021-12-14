/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable consistent-return */


module.exports = {
  onlineStatus: async (userId, socket) => {
    await chatMiddleware.onlineStatus(userId, socket);
  },
  offlineStatus: async (userId, socket) => {
    await chatMiddleware.offlineStatus(userId, socket);
  },

};
