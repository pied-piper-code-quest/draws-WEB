import { Manager } from "socket.io-client";

export const connectToWebsocket = (token: string, namespace: string = "/") => {
  const manager = new Manager("ws://localhost:5000", {
    extraHeaders: {
      ["auth-token"]: token,
    },
  });

  const socket = manager.socket(namespace);
  return socket;
};
