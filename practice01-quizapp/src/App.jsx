import { useEffect, useState } from 'react';
import './App.css';
import questionData from "./Questions/questions.json"

function App() {
  const [currentQuetion,setCurrentQuetion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore,setShowScore] = useState(false);
  const [timer, setTimer] = useState(15);
  useEffect(()=>{
    let interval;
    if (timer > 0 && !showScore){
      interval = setInterval(()=>{
        setTimer((prevTimer) => prevTimer - 1)
      },1000);
    }
    else{
      clearInterval(interval);
      setShowScore(true);
    }
    return () => clearInterval(interval)

  }, [timer, showScore]);

  const handleAnswerClick = (selectedOption) => {
    if(selectedOption===questionData[currentQuetion].correctOption){
      setScore((prevScore) => prevScore + 1);
    }
    if (currentQuetion < questionData.length - 1) {
      setCurrentQuetion((prevQuestion) => prevQuestion + 1)
      setTimer(15);
    } 
    else {
      setShowScore(true);
    }
  }
  const handleRestartQuiz = () =>{
    setCurrentQuetion(0);
    setScore(0);
    setShowScore(false);
    setTimer(15);

  }

  return (
    <>
      <div className="quiz-app">
        {
          showScore ? (
            <div className="score-section">
              <h1>Your score : {score}/{questionData.length}</h1>
              <button onClick={handleRestartQuiz}>Restart</button>
            </div>
          ) : (
              <div className="question-section">
                <h2>Question {currentQuetion + 1}</h2>
                <p>{questionData[currentQuetion].question}</p>
                <div className="options">                  
                  {
                   questionData[currentQuetion].options.map((res,i)=>{
                      return(
                        <button key={i} onClick={()=>{
                          handleAnswerClick(res)
                        }}>{res}</button>
                      )
                   }) 
                  }
                </div>
                <div className="timer">
                  Time left : <span>{timer}</span>
                </div>
              </div>
          )
        }
      </div>
    </>
  );
}

export default App;
