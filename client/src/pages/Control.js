import { useState, useEffect } from 'react';
import { useSockets } from "../libs/socket.context";
import { useLocation, Link } from "react-router-dom";
import { GameMap } from "../components/GameMap";
import { AnswerInput } from "../components/AnswerInput";
import { TeamViewer } from "../components/TeamViewer";
import queryString from 'query-string';

export const Control = () => {
  const {socket, position } = useSockets()
  const search = useLocation().search
  const query = queryString.parse(search)
  socket.on("member:reset", () => window.location.reload())
  const onSubmitAnswer = (answer) => {
    if (!(position.x && position.y && query.team && answer)) return
    const msg = {
      team: query.team,
      position,
      answer,
    }
    console.log(msg)
    socket.emit("game:answer", msg)
  }
  useEffect(() => {
    if (query.team) {
      socket.emit("game:enter", query.team)
    }
  }, [])
  return (
    <div>
      <TeamViewer />
      <Link to={"/"}>Viewer</Link>
      control
      <GameMap mini control />
      <AnswerInput setter={onSubmitAnswer} team={query.team} />
    </div>
  )
}