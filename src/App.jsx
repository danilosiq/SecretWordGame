import { useState, useCallback, useEffect } from "react";
import "./App.css";
import StartWindow from "./components/StartWindow";
import { wordsList } from "./data/word";
import Game from "./components/Game";
import EndGame from "./components/EndGame";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [guessedL, setGuessedL] = useState([]);
  const [wrongL, setwrongL] = useState([]);
  const [guesses, setguesses] = useState(5);
  const [letters, setLetters] = useState([]);
  const [CountPoints, setCount] = useState(0);

  const [WordSelect, setWordSelect] = useState("");
  const [CategorySelect, setCategorySelect] = useState("");

  const ChooseSecret = () => {
    const categorias = Object.keys(words);
    const categoriaE =
      categorias[Math.floor(Math.random() * Object.keys(categorias).length)];

    const WordSe = words[categoriaE];
    const WordC =
      WordSe[Math.floor(Math.random() * Object.keys(WordSe).length)];

    return { WordC, categoriaE };
  };

  const startGame = () => {
    const { WordC, categoriaE } = ChooseSecret();
    console.log(WordC);
    console.log(categoriaE);
    setCategorySelect(categoriaE);
    setWordSelect(WordC);

    let SplitWord = WordC.split("");
    SplitWord = SplitWord.map((s) => s.toLowerCase());

    setLetters(SplitWord);
    setGameStage(stages[1].name);
  };

  const verifiLetter = (letra) => {
    const normalizer = letra.toLowerCase().replace(/[\u0300-\u036f]/g, "");

    if (guessedL.includes(normalizer) || wrongL.includes(normalizer)) {
      return;
    }

    if (letters.includes(normalizer)) {
      setGuessedL((actualGuessedL) => [...actualGuessedL, normalizer]);
      adi();
    } else {
      setwrongL((actualwrongL) => [...actualwrongL, normalizer]);
      setguesses((actualguesses) => actualguesses - 1);
    }
  };

  const [count, setCounts] = useState(0);
  const adi = (actualSet) => {
    setCounts((actualSet) => actualSet + 1);
  };

  useEffect(() => {
    if (guesses <= 0) {
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  useEffect(() => {
    const unique = [...new Set(letters)];
    console.log(unique.length);
    console.log(count);
    if (unique != 0) {
      if (unique.length == count) {
        setGameStage(stages[2].name);
      }
    }
  }, [guessedL]);

  const restartGame = () => {
    setGameStage(stages[0].name);
    clear();
    console.log("==============");
    console.log(count);
    console.log(guessedL);
  };

  const clear = () => {
    setguesses(5);
    setwrongL([]);
    setCounts(0);
    setLetters([]);
    setGuessedL([]);
  };

  return (
    <>
      <div className="app">
        {gameStage === "start" && <StartWindow startGame={startGame} />}
        {gameStage === "game" && (
          <Game
            verifiLetter={verifiLetter}
            CategorySelect={CategorySelect}
            WordSelect={WordSelect}
            guessedL={guessedL}
            wrongL={wrongL}
            guesses={guesses}
            letters={letters}
          />
        )}

        {gameStage === "end" && (
          <EndGame restartGame={restartGame} WordSelect={WordSelect} />
        )}
      </div>
    </>
  );
}

export default App;
