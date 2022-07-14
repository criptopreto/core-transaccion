module.exports = async function (fastify) {
  let io = fastify.io;
  require("./auth")(fastify);
  io.on("connection", (socket) => {
    //console.log("##### Emiting socket:session", socket.session_id);
    socket.emit("socket:session", {
      session_id: socket.session_id,
    });
    socket.join(socket.session_id);

    socket.on("user:action:pay", (data) => {
      console.log("#### User Action", data);
    });
    //console.log(`############## User ${socket.session_id} connected`);

    /* socket.on("disconnect", (socket) => {
      console.log("a user disconnected", socket.session_id);
    }); */
  });
};
