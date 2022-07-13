module.exports = async function (fastify) {
  fastify.io.use(async (socket, next) => {
    const token = socket?.handshake?.auth?.user_id;
    if (!token) {
      return next(new Error("No user_id"));
    }

    const sessionID = socket?.handshake?.auth?.session_id;
    try {
      let decoded_token = await fastify.jwt.decode(token);
      const session = decoded_token?.user?.id || null;
      if (sessionID) {
        if (!session) {
          socket.socket_id = session;
        }
      }
      socket.session_id = session;
      socket.user_id = token;
      return next();
    } catch (error) {
      return next(error);
    }
  });
};
