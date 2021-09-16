export default function WordStack({
  stack,
  currentIndex,
  correctlyTyped,
  matchingWords,
}) {
  return (
    <div className="WordsList">
      {stack.map((word, i) => (
        <span
          key={word + i}
          className={
            matchingWords.includes(word) ? "Word MatchingWord" : "Word"
          }
        >
          {word.split("").map((char, j) => (
            <span
              className={
                matchingWords.includes(word) && j < currentIndex
                  ? "MatchingChar"
                  : ""
              }
              key={j + char}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}
