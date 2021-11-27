const config = require('config');

module.exports = {

  KhmerPdf(url) {
    if (url === undefined || url === null) {
      return `${config.EnglishPdf}/Khmer.pdf`;
    }
    if (url === "Khmer.pdf") {
      return `${config.EnglishPdf}/Khmer.pdf`;
    }
    return `${config.EnglishPdf}/users/${url}`;
  },

  EnglishPdf(url) {
    if (url === undefined || url === null) {
      return `${config.KhmerPdf}/English.pdf`;
    }
    if (url === "English.pdf") {
      return `${config.KhmerPdf}/English.pdf`;
    }
    return `${config.KhmerPdf}/users/${url}`;
  },

  userImage(url) {
    if (url === undefined || url === null) {
      return `${config.imagePath}/user.png`;
    }
    if (url === "user.png") {
      return `${config.imagePath}/user.png`;
    }
    return `${config.imagePath}/users/${url}`;
  },
};