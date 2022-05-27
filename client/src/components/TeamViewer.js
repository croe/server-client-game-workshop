import { useSockets } from "../libs/socket.context";
import './TeamViewer.css'
import { useState } from "react";
import { flattenDeep } from "lodash";

export const TeamViewer = () => {
  const { socket } = useSockets()
  const [games, setGames] = useState([])
  const [members, setMembers] = useState([])
  socket.on("init:game", docs => setGames(docs))
  socket.on("update:member", docs => setMembers(docs))
  return (
    <div className="teamViewerContainer">
      <div className="team teamA">
        <span>Team A</span>
        <span className="teamMem">{members.filter(o => o.team === 'a').length}</span>
      </div>
      <div>
        <p>Game <span className="teamMem">{games?.length}</span></p>
        <div className="leftCount">Left <span>{games[0] && flattenDeep(games[0].map).filter((o) => o === null).length}</span></div>
      </div>
      <div className="team teamB">
        <span>Team B</span>
        <span className="teamMem">{members.filter(o => o.team === 'b').length}</span>
      </div>
    </div>
  )
}
