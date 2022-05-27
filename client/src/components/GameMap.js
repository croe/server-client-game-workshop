import React from "react";
import './GameMap.css'
import { useSockets } from "../libs/socket.context";
import Swal from 'sweetalert2'

export const GameMap = (props) => {
  const { socket, game, setGame, position, setPosition } = useSockets()
  socket.on("init:game", docs => setGame(docs[0]))
  socket.on("end:game", doc => {
    const { a_team, b_team } = doc
    if (a_team > b_team) {
      Swal.fire({
        title: 'Winner A Team!',
        text: `<p>A Team score: ${a_team}</p><p>B Team score: ${b_team}</p>`,
        icon: 'success',
        confirmButtonText: 'OK'
      })
    } else {
      Swal.fire({
        title: 'Winner B Team!',
        html: `<p>B Team score: ${b_team}</p><p>A Team score: ${a_team}</p>`,
        icon: 'success',
        confirmButtonText: 'OK'
      })
    }
  })
  const op2text = (op) => {
    switch (op) {
      case '*': return '×'
      case '+': return '+'
      case '-': return '-'
      case '/': return '÷'
    }
  }
  const handleClick = (e) => {
    const obj = Object.assign({}, e.target.dataset)
    setPosition(obj)
    console.log(obj)
  }
  console.log(game)
  return (
    <div className="gameMapWrapper">
      {game && (game.status === 'ready' || game.status === 'end') && (
        <div className={`gameReset ${props.mini && 'mini'}`}>
          { game.status === 'ready' && 'Ready...' }
          { game.status === 'end' && 'Finish!!' }
        </div>
      )}
      <div className={`gameMapContainer ${props.mini && 'mini'}`}>
        {game && (
          <>
            <div className="gameHead">{op2text(game?.op_header)}</div>
            {game?.x_header.map((arr, i) => <div key={i} className="gameHead">{game?.x_header[i]}</div>)}
            {game?.map?.map((arr,i) => {
              return arr.map((row, j) => {
                return (
                  <React.Fragment key={j}>
                    {j === 0 && <div className="gameHead">{game?.y_header[i]}</div>}
                    <div
                      className={`gameVal ${(position.x === String(j) && position.y === String(i)) ? 'active' : ''} ${row ? `team-${row.team}`:''}`}
                      data-x={j}
                      data-y={i}
                      onClick={props.control && handleClick}
                    >{row?.val}</div>
                  </React.Fragment>
                )})})}
          </>
        )}
      </div>
    </div>
  )
}
