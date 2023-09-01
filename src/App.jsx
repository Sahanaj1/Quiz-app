import React, { useState, useEffect } from 'react';
import StartPage from './components/StartPage';
import QuizPage from './components/QuizPage';
import Report from './components/Report';
import { AiFillLinkedin } from "react-icons/ai"
import { AiFillGithub } from "react-icons/ai"
import Navbar from './components/Navbar';
const App = () => {
  const [email, setEmail] = useState('');
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=15')
      .then((response) => response.json())
      .then((data) => {
        const formattedQuestions = data.results.map((question) => ({
          question: question.question,
          choices: [question.correct_answer, ...question.incorrect_answers],
          correctAnswer: question.correct_answer,
        }));
        setQuestions(formattedQuestions);


      });
  }, []);

  const handleStart = (userEmail) => {
    setEmail(userEmail);
    setQuizStarted(true);
  };

  const handleQuestionAnswer = (index, answer) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[index] = answer;
    setUserAnswers(updatedUserAnswers);
  };

  const name = localStorage.getItem("name");
  const emailstored = localStorage.getItem('email');
  
  function handleLogout() {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("selectedAnswers")
    setQuizStarted(false);
    setQuizCompleted(false);
  }
  const [timeRemaining, setTimeRemaining] = useState(30 * 60);
  useEffect(() => {
    const timer = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
      } else {
        clearInterval(timer);
        handleQuizSubmit()
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [timeRemaining]);


  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
      handleLogout();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleQuizSubmit = () => {
    const confirmSubmit = window.confirm('Are you sure you want to submit the quiz?');
    if (confirmSubmit) {
    setQuizCompleted(true);
    const storedSelectedAnswers = localStorage.getItem('selectedAnswers');
    setUserAnswers(storedSelectedAnswers ? JSON.parse(storedSelectedAnswers) : new Array(questions?.length).fill(''));
    }else{
    return '';
    }
  };

  

  return (
    <div className='flex flex-col items-center h-full w-full'>
      <Navbar name={name} onLogout={handleLogout} />
      {!name || !emailstored ? (
        <StartPage onStart={handleStart} />
      ) : (
        <>
          {quizStarted && !quizCompleted && (
            <QuizPage
              questions={questions}
              onQuestionAnswer={handleQuestionAnswer}
              onSubmit={handleQuizSubmit}
            />
          )}
          {quizCompleted && (
            <Report questions={questions} userAnswers={userAnswers} />
          )}
        </>
      )}
      <div className='bg-gray-50 py-2 border-t w-full flex flex-col bottom-0 items-center justify-center'>
        <div className='flex w-[30%] items-center justify-evenly'>
          <a href='https://www.linkedin.com/in/sahana-joshii/'>
            <AiFillLinkedin className='h-6 w-6' />
          </a>
          <a href='https://github.com/Sahanaj1'>
            <AiFillGithub className='h-6 w-6' />
          </a>
        </div>
        <div className='text-sm font-semibold'>Copyrights 2023</div>
      </div>
    </div>
  );
};

export default App;
