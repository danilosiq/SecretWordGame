import React from "react";
import "./EndGame.css";

const EndGame = ({ restartGame, WordSelect }) => {
  return (
    <div className="EndContainer">
      <h1>Fim de Jogo!</h1>
      <p>A palavra era </p>
      <h3>{WordSelect}</h3>
      <button onClick={restartGame}>Iniciar um Novo jogo!</button>
    </div>
  );
};

export default EndGame;
