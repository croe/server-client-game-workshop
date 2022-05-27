import {useSockets} from "../libs/socket.context";

export const Admin = () => {
  const {socket} = useSockets()
  const handleClickOnGameInit = () => socket.emit("game:init")
  const handleClickOnGameStart = () => socket.emit("game:start")
  const handleClickOnGameEnd = () => socket.emit("game:end")
  const handleClickOnResetAll = () => socket.emit("game:reset")
  const handleClickOnResetMember = () => socket.emit("member:reset")
  return (
    <div style={{padding: '20px'}}>
      <p><button onClick={handleClickOnGameInit}>Game Init</button></p>
      <p><button onClick={handleClickOnGameStart}>Game Start</button></p>
      <p><button onClick={handleClickOnGameEnd}>Game End</button></p>
      <p><button onClick={handleClickOnResetAll}>Reset All Game</button></p>
      <p><button onClick={handleClickOnResetMember}>Reset Member</button></p>
    </div>
  )
}
