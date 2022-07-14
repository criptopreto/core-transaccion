import React, { useEffect } from "react";
import { socketEvent } from "./socket";

function useSocket() {
  const [socket, setSocket] = React.useState(null);

  useEffect(() => {
    const socketIo = socketEvent();

    setSocket(socketIo);

    function cleanup() {
      socketIo.disconnect();
    }
    return cleanup;
  }, []);

  return socket;
}

export default useSocket;
