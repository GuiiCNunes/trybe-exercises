const Language = require("../models/Language");

module.exports = (io) =>
  io.on("connection", (socket) => {
    socket.on("increaseVotes", async ({ id }) => {
      console.log(`Cliente votou na linguagem de id ${id}`);
      await Language.increaseVotes(id);
      const data = await Language.getById(id);
      io.emit("refreshVotes", data);
    });
  });
