import React, { useState, useRef } from "react";
import "./Game.css";

const Game = ({
  verifiLetter,
  CategorySelect,
  WordSelect,
  guessedL,
  wrongL,
  guesses,
  letters,
}) => {
  const [letra, setletra] = useState("");
  const LetterInput = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    verifiLetter(letra);
    setletra("");
    LetterInput.current.focus();
  };

  return (
    <div className="gameContainer">
      <h1>Adivinhe a palavra</h1>
      <h3 className="tip">
        Dica da palavra: <span>{CategorySelect}</span>
      </h3>

      <div className="WordContainer">
        {letters.map((letters, i) =>
          guessedL.includes(letters) ? (
            <span className="letter" key={i}>
              {letters}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
        {guessedL.includes(letters) && console.log("oi")}
      </div>
      <p>Voce tem {guesses} tentativas</p>
      <div className="LetterContainer">
        <p>Tente advinhar a letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            onChange={(e) => setletra(e.target.value)}
            value={letra}
            ref={LetterInput}
          />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrong">
        Letras ja utilizadas:
        {wrongL.map((letters, i) => (
          <span key={i} className="WrongLs">
            {letters}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Game;
