import {useSockets} from "../libs/socket.context";

export const Admin = () => {
  const {socket} = useSockets()
  const handleClickOnGameInit = () => socket.emit("game:init")
  const handleClickOnResetAll = () => socket.emit("game:reset")
  const handleClickOnResetMember = () => socket.emit("member:reset")
  return (
    <div>
      <button onClick={handleClickOnGameInit}>Game Init</button>
      <button onClick={handleClickOnResetAll}>Reset All Game</button>
      <button onClick={handleClickOnResetMember}>Reset Member</button>
    </div>
  )
}