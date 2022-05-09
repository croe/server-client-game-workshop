import React, {useState} from "react";
import './GameMap.css'
import { useSockets } from "../libs/socket.context";

export const GameMap = (props) => {
  const { socket, game, setGame, position, setPosition } = useSockets()
  socket.on("init:game", docs => setGame(docs[0]))
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
                    className={`gameVal ${(position.x === String(j) && position.y === String(i)) ? 'active' : ''} ${row ? `team-${row}`:''}`}
                    data-x={j}
                    data-y={i}
                    onClick={props.control && handleClick}
                  />
                </React.Fragment>
              )})})}
        </>
      )}
    </div>
  )
}