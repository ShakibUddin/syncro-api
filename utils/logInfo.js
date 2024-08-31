module.exports = {
  logInfo: ({ req, successMessage, errorMessage, statusCode }) => {
    return `${req.method} ${req.protocol}://${req.hostname}:${
      req.socket.localPort
    }${req.url} ${req.get("User-Agent")} ${req.ip} ${successMessage || ""} ${
      errorMessage ? `Error: ${errorMessage}, Status Code: ${statusCode}` : ""
    }`;
  },
};
