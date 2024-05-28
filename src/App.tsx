import { useEffect, useState } from "react";
import "./App.scss";

const App = () => {
  const [color, setColor] = useState<string>("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [wrong, setWrong] = useState<boolean>(false);
  const [correct, setCorrect] = useState<boolean>(false);

  const getRandomColor = () => {
    const digits = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
    ];

    const color = new Array(6)
      .fill("")
      .map(() => digits[Math.floor(Math.random() * digits.length)])
      .join("");

    return `#${color}`;
  };

  const generateColors = () => {
    const correctAnswer = getRandomColor();

    setColor(correctAnswer);
    setAnswers(
      [correctAnswer, getRandomColor(), getRandomColor()].sort(
        () => 0.5 - Math.random()
      )
    );
  };

  const handleAnswerClicked = (answer: string) => {
    if (answer === color) {
      // correct
      setWrong(false);
      setCorrect(true);
      generateColors();
    } else {
      // wrong
      setWrong(true);
      setCorrect(false);
    }
  };

  useEffect(() => {
    generateColors();
  }, []);

  return (
    <>
      {wrong ? (
        <h2>❌ Wrong!</h2>
      ) : correct ? (
        <h2>✅ Correct!</h2>
      ) : (
        <h2>⁉️ Color Quiz</h2>
      )}
      <div className="square" style={{ background: color }}>
        <p>Guess me.</p>
      </div>
      <div className="answers">
        {answers.map((answer) => (
          <button key={answer} onClick={() => handleAnswerClicked(answer)}>
            {answer}
          </button>
        ))}
      </div>
    </>
  );
};

export default App;
