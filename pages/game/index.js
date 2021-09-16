import { useContext, useEffect } from "react";
import Keyboard from "../../components/Keyboard";
import Scoreboard from "../../components/Scoreboard";
import WordStack from "../../components/WordStack";
import ScoreContextProvider, {
  ScoreContext,
} from "../../context/ScoreContextProvider";
import useGameRules from "../../hooks/useGameRules";

export default function Game() {
  const {
    score,
    setScore,
    pressedChar,
    multiplier,
    stack,
    setPressedChar,
    startGame,
    checkForMatch,
    correctlyTyped,
    currentIndex,
    isMistype,
    matchingWords,
  } = useGameRules();

  useEffect(() => {
    function handleKeyUp(e) {
      if (e.key !== " ") {
        setPressedChar(e.key);
        checkForMatch(e.key);
      }
    }

    function handleKeyDown(e) {
      setPressedChar("");
    }

    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("keydown", handleKeyDown);
    startGame();
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <Scoreboard score={score} multiplier={multiplier} />
      <WordStack
        matchingWords={matchingWords}
        stack={stack}
        correctlyTyped={correctlyTyped}
        currentIndex={currentIndex}
      />
      <Keyboard isMistype={isMistype} pressedChar={pressedChar} />
    </div>
  );
}
