import { useContext, createContext, useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client'
const SOCKET_URL = `${window.location.protocol}//${window.location.hostname}:3001`

const socket = io(SOCKET_URL)
const SocketContext = createContext({
  socket,
  setPosition: () => false,
  setGame: () => false,
});

const SocketsProvider = (props) => {
  const [position, setPosition] = useState({});
  const [game, setGame] = useState(null)
  return (
    <SocketContext.Provider
      value={{ socket, position, setPosition, game, setGame }}
      {...props}
    />
  )
}

export const useSockets = () => useContext(SocketContext);

export default  SocketsProvider;
