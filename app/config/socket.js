import io from "socket.io-client";
import config from "../config";

export const socketEvent = () => {
  let socket = io(config.baseUrl, { autoConnect: false });

  const socket_token = localStorage.getItem("socket");
  const session_id = localStorage.getItem("session_id");
  if (session_id) {
    socket.auth = { session_id: session_id, user_id: socket_token };
    socket.connect();
  } else {
    socket.auth = { user_id: socket_token };
  }
  return socket;
};
