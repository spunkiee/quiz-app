import "./App.css";
import { BsAwardFill, BsFillQuestionCircleFill } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";
import { VscDebugReverseContinue, VscDebugContinue } from "react-icons/vsc";
import { questions } from "./questions-answers";
import { useState } from "react";
import uuid from "react-uuid";

function App() {
  const [currQuestion, setCurrQuestion] = useState(0);
  const [keyValue, setKeyValue] = useState(uuid());
  const [answers, setAnswers] = useState([
    { ans: "" },
    { ans: "" },
    { ans: "" },
  ]);
  const [resultScreen, showResultScreen] = useState(false);
  const [result, setResult] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const renderAnswerComponent = () => {
    return (
      <>
        <div className="answer-wrapper">
          <div className="answer-image">
            <BsAwardFill />
          </div>
          <div className="answer-text">
            <b>Review Answers Here</b>
          </div>
          <div className="answers">
            {answers.map((answer, index) => {
              if (answer.ans) {
                return (
                  <div className="answer" key={uuid()}>
                    <b>{`#${index + 1}: `}</b> {`${answer.ans}`}
                  </div>
                );
              }
            })}
          </div>
        </div>
      </>
    );
  };

  const nextQuestion = () => {
    if (currQuestion < questions.length - 1) {
      setCurrQuestion((pre) => pre + 1);
      setKeyValue(uuid());
    }
  };

  const previousQuestion = () => {
    if (currQuestion > 0) {
      setCurrQuestion((pre) => pre - 1);
      setKeyValue(uuid());
    }
  };

  const renderQuestionComponent = () => {
    return (
      <>
        <div className="question-wrapper">
          <div className="question-icon">
            <BsFillQuestionCircleFill />
          </div>
          <div className="question-header">
            <button onClick={previousQuestion}>
              <VscDebugReverseContinue />
            </button>
            <div>Attempt Questions Here</div>
            <button onClick={nextQuestion}>
              <VscDebugContinue />
            </button>
          </div>
          <div className="ask-question-wrapper">
            <div className="question">
              <b>
                {`Question# ${currQuestion + 1} `}
                {questions[currQuestion].question}
              </b>
            </div>
            <div className="options-wrapper">
              <div onChange={onChangeValue} key={keyValue}>
                <div className="option">
                  <input type="radio" value="optionA" name="option" />{" "}
                  {questions[currQuestion].optionA}
                </div>
                <div className="option">
                  <input type="radio" value="optionB" name="option" />{" "}
                  {questions[currQuestion].optionB}
                </div>
                <div className="option">
                  <input type="radio" value="optionC" name="option" />{" "}
                  {questions[currQuestion].optionC}
                </div>
                <div className="option">
                  <input type="radio" value="optionD" name="option" />{" "}
                  {questions[currQuestion].optionD}
                </div>
              </div>
            </div>
          </div>
          {currQuestion === questions.length - 1 &&
          answers[currQuestion].ans ? (
            <div className="submit-button">
              <button onClick={calculateResult}>Submit</button>
            </div>
          ) : (
            ""
          )}
        </div>
      </>
    );
  };

  const calculateResult = () => {
    let result = 0;
    for (let i = 0; i < questions.length; i++) {
      if (answers[i].ans === questions[i].rightAnswer) {
        result++;
      }
    }
    showResultScreen(true);
    setResult(result);
    setPercentage((result / questions.length) * 100);
  };

  const onChangeValue = (event) => {
    const targetValue = event.target.value;
    setAnswers([
      ...answers,
      (answers[currQuestion].ans = questions[currQuestion][targetValue]),
    ]);
  };

  const renderResultComponent = () => {
    return (
      <>
        <div className="result-wrapper">
          <div className="result-icon">
            <FiCheckCircle />
          </div>
          <div className="result-heading">
            You have successfully submitted the Assessment
          </div>
          <div className="result-container">
            <div>
              <b>- Question Asked: </b> {questions.length}
            </div>
            <div>
              <b>- Question Correct:</b>
              {result}
            </div>
            <div>
              <b>- Your Score:</b>
              {Math.round(percentage * 100) / 100 + "%"}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="app-wrapper">
      {!resultScreen && renderAnswerComponent()}
      {!resultScreen && renderQuestionComponent()}
      {resultScreen && renderResultComponent()}
    </div>
  );
}

export default App;
