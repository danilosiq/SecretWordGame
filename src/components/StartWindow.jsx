import React from "react";
import "./StartWindowStyle.css";

const StartWindow = ({ startGame }) => {
  return (
    <div className="startContainer">
      <h1>Bem vindo ao Palavra Secreta</h1>
      <p>Aperte no botao para começar!</p>
      <button onClick={startGame}>Começar!</button>
    </div>
  );
};

export default StartWindow;
