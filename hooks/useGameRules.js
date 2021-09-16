import { useRouter } from "next/dist/client/router";
import { useContext, useEffect, useRef, useState } from "react";
import { ScoreContext } from "../context/ScoreContextProvider";

const randomWords = require("random-words");

const wordBank = randomWords({ exactly: 200 });

export default function useGameRules() {
  const [score, setScore] = useState(0);
  const stackRef = useRef([]);
  const [stack, setStack] = useState([]);
  const [pressedChar, setPressedChar] = useState("");
  const [multiplier, setMultiplier] = useState(1);
  const timer = useRef(null);
  const delay = useRef(2000);
  const wordBankIndex = useRef(0);
  const currWordIndex = useRef(0);
  const correctlyTyped = useRef("");
  const [wordTime, setWordTime] = useState(0);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [isMistype, setIsMistype] = useState(false);
  const [matchingWords, setMatchingWords] = useState([]);
  const [correctlyTypedState, setCorrectlyTypedState] = useState("");

  const { setScoreStore } = useContext(ScoreContext);

  const router = useRouter();

  useEffect(() => {
    setCorrectlyTypedState(correctlyTyped.current);
  }, [correctlyTyped.current]);

  useEffect(() => {
    setScoreStore(score);
  }, [score]);

  useEffect(() => {
    stackRef.current = [...stack];
  }, [stack]);

  function addWordToStack() {
    setStack((stack) => {
      let newStack = [...stack];
      newStack.push(wordBank[wordBankIndex.current]);
      return newStack;
    });
  }

  function incrementScore() {
    currWordIndex.current = 0;
    correctlyTyped.current = "";
    setWordTime((wordTime) => {
      let timeTaken = (Date.now() - wordTime) / 1000;
      setScore((score) => {
        return Math.ceil((score + 10 / timeTaken) * multiplier);
      });

      return Date.now();
    });
    setMultiplier((multiplier) => multiplier + 1);
  }

  function startTimer() {
    timer.current = setInterval(() => {
      if (stackRef.current.length < 10) {
        addWordToStack();
        wordBankIndex.current += 1;
        if (delay.current > 1100) {
          delay.current -= 50;
          resetTimer();
        }
      } else {
        endGame();
      }
    }, delay.current);
  }

  function resetTimer() {
    clearInterval(timer.current);
    startTimer();
  }

  function startGame() {
    startTimer();
  }

  function endGame() {
    clearInterval(timer.current);
    setIsGameEnded(true);
    router.push("/leaderboard");
  }

  function startWordTimer() {
    setWordTime(Date.now());
  }

  function checkForMatch(char) {
    let matchingWordsArr = stackRef.current.filter(
      (word) =>
        word.slice(0, currWordIndex.current + 1) ===
        correctlyTyped.current + char
    );
    if (matchingWordsArr.length) {
      setIsMistype(false);
      setMatchingWords([...matchingWordsArr]);
      let match = matchingWordsArr.find(
        (word) => word.length === currWordIndex.current + 1
      );
      if (match) {
        incrementScore();
        setStack((stack) => {
          let newStack = [...stack];
          newStack.splice(newStack.indexOf(match), 1);
          return newStack;
        });
      } else {
        if (currWordIndex.current === 0) {
          setWordTime(Date.now());
        }
        currWordIndex.current++;
        correctlyTyped.current += char;
        setCorrectlyTypedState(
          (correctlyTypedState) => correctlyTypedState + char
        );
      }
    } else {
      currWordIndex.current = 0;
      correctlyTyped.current = "";
      setMultiplier(1);
      setIsMistype(true);
      setMatchingWords([]);
    }
  }

  return {
    score: score,
    pressedChar,
    multiplier,
    stack,
    setPressedChar,
    startGame,
    checkForMatch,
    correctlyTyped: correctlyTypedState,
    isGameEnded,
    currentIndex: currWordIndex.current,
    isMistype,
    matchingWords,
  };
}
