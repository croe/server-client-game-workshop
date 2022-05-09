import React from "react";
import { Link } from 'react-router-dom';
import { TeamViewer } from "../components/TeamViewer";
import { GameMap } from "../components/GameMap";
import './Viewer.css';

export const Viewer = () => {
  return (
    <div>
      <div><Link to={"/admin"}>Admin</Link></div>
      <div><Link to={"/control?team=a"}>Control Team A</Link></div>
      <div><Link to={"/control?team=b"}>Control Team B</Link></div>
      <TeamViewer />
      <GameMap />
    </div>
  )
}