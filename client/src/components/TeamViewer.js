import { useSockets } from "../libs/socket.context";
import './TeamViewer.css'
import {useState} from "react";

export const TeamViewer = () => {
  const { socket } = useSockets()
  const [games, setGames] = useState([])
  const [members, setMembers] = useState([])
  socket.on("init:game", docs => setGames(docs))
  socket.on("update:member", docs => {
    console.log(docs)
    setMembers(docs)
  })
  return (
    <div className="teamViewerContainer">
      <div className="team teamA">
        <span>Team A</span>
        <span className="teamMem">{members.filter(o => o.team === 'a').length}</span>
      </div>
      <div>Game <span className="teamMem">{games?.length}</span></div>
      <div className="team teamB">
        <span>Team B</span>
        <span className="teamMem">{members.filter(o => o.team === 'b').length}</span>
      </div>
    </div>
  )
}