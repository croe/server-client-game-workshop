import React, {useRef} from "react";
import './AnswerInput.css'

export const AnswerInput = ({setter, team}) => {
  const inputRef = useRef(null)
  const handleSubmit = () => {
    setter(inputRef.current.value)
    inputRef.current.value = ''
  }
  return (
    <div className="answerInputContainer">
      {team && <div className={`answerLabel team-${team}`}><span>{team}</span> Team</div>}
      <input type="number" className="answerInput" ref={inputRef} />
      <button className="answerButton" onClick={handleSubmit}>Send</button>
    </div>
  )
}