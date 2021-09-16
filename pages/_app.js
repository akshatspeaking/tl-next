import "../styles/keyboard.css";
import "../styles/wordslist.css";
import "../styles/scoreboard.css";
import "../styles/gameboard.css";
import "../styles/instructions.css";
import "../styles/leaderboard.css";

import ScoreContextProvider from "../context/ScoreContextProvider";

function MyApp({ Component, pageProps }) {
  return (
    <ScoreContextProvider>
      <Component {...pageProps} />
    </ScoreContextProvider>
  );
}

export default MyApp;
