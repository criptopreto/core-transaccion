import React, { useEffect } from "react";
import { socketEvent } from "./socket";

function useSocket() {
  const [socket, setSocket] = React.useState(null);

  useEffect(() => {
    const socketIo = socketEvent();

    console.log("Set socket", socketIo);
    setSocket(socketIo);

    function cleanup() {
      console.log("Cleanup socket");
      socketIo.disconnect();
    }
    return cleanup;
  }, []);

  return socket;
}

export default useSocket;
