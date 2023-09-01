import React, { useState, useEffect } from 'react';
import Question from './Question';


const QuizPage = ({ questions, onSubmit }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [visitedQuestions, setVisitedQuestions] = useState([]);
    const [attemptedQuestions, setAttemptedQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length - 1).fill('').concat(['']));

    // const [quizCompleted, setQuizCompleted] = useState(false);
    // console.log(onSubmit, "onsubmit")

    // useEffect(() => {
    //     console.log(selectedAnswers, "selectedAnswers")
    //     console.log(visitedQuestions, "visitedQuestions")
    //     console.log(attemptedQuestions, "attemptedQuestions")


    // }, [selectedAnswers, currentQuestionIndex])

    useEffect(() => {
        if (selectedAnswers[currentQuestionIndex].length > 0) {
            if (visitedQuestions.includes(currentQuestionIndex)) {
                setVisitedQuestions(visitedQuestions.filter(index => index !== currentQuestionIndex));
            }
            setAttemptedQuestions((prevAttemptedQuestions) => [
                ...prevAttemptedQuestions,
                currentQuestionIndex
            ]);
        } else {
            setVisitedQuestions([...visitedQuestions, currentQuestionIndex]);
        }
    }, [selectedAnswers, currentQuestionIndex]);


    const handleQuestionSelect = (choice) => {
        const updatedSelectedAnswers = [...selectedAnswers];
        updatedSelectedAnswers[currentQuestionIndex] = choice;
        setSelectedAnswers(updatedSelectedAnswers);

        localStorage.setItem('selectedAnswers', JSON.stringify(updatedSelectedAnswers));
    };


    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };
    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleQuestionNavigation = (questionIndex) => {
        setCurrentQuestionIndex(questionIndex);
    };

    const [timeRemaining, setTimeRemaining] = useState(30 * 60);
    const timerWidth = `${(timeRemaining / (30 * 60)) * 100}%`;
    useEffect(() => {
        const timer = setInterval(() => {
            if (timeRemaining > 0) {
                setTimeRemaining(timeRemaining - 1);
            } else {
                clearInterval(timer);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [timeRemaining]);

    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    const isFirstQuestion = currentQuestionIndex === 0;
    return (
        <div className='w-full flex justify-center h-auto lg:h-[100vh]'>
            <div className='flex-col items-center flex w-full '>
                <div className="h-2 bg-gray-100 relative w-full">
                    <div className="h-full bg-green-400 absolute" style={{ width: timerWidth }}></div>
                </div>

                <div className='flex flex-col-reverse lg:flex lg:flex-row w-full justify-between h-auto lg:h-[60vh] gap-10'>
                    <div className='w-full lg:w-2/3 p-4'>
                        <Question
                            question={questions[currentQuestionIndex].question}
                            choices={questions[currentQuestionIndex].choices}
                            selectedAnswer={selectedAnswers[currentQuestionIndex]}
                            onSelect={handleQuestionSelect}
                            questionNumber={currentQuestionIndex}
                        />
                        <div className='flex items-start w-full p-4 justify-between'>
                            {!isFirstQuestion && (
                                <button
                                    onClick={handlePreviousQuestion}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md mr-2 focus:outline-none focus:ring focus:border-blue-300"
                                >
                                    Previous
                                </button>
                            )}
                            {!isLastQuestion && (
                                <button
                                    onClick={handleNextQuestion}
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2 focus:outline-none focus:ring focus:border-blue-300"
                                >
                                    Next
                                </button>
                            )}
                            {isLastQuestion && (
                                <button
                                    onClick={onSubmit}
                                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                >
                                    Submit Quiz
                                </button>
                            )}
                        </div>
                    </div>
                    <div className='w-full lg:w-1/3 h-full gap-6 flex flex-col p-0 lg:p-2'>
                        <div className='w-full flex items-end justify-end'>
                            <div className='w-full lg:w-[90%] flex justify-center items-end bg-pink-600 cursor-pointer hover:bg-pink-400 text-white py-2 px-4  focus:outline-none focus:ring focus:border-pink-300'>
                                <p className='text-xl font-semibold text-white'>{Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-5 lg:grid-cols-3 gap-2 lg:gap-6 ml-8 lg:ml-10">
                            {questions.map((_, index) => (

                                <span
                                    key={index}
                                    className={`h-6 w-6  lg:h-10 lg:w-10 text-xs font-semibold lg:text-sm rounded-full flex items-center justify-center cursor-pointer ${visitedQuestions.includes(index) ? 'bg-yellow-100' : ''} ${attemptedQuestions.includes(index) ? 'bg-green-300' : 'bg-gray-100'}`}
                                    onClick={() => handleQuestionNavigation(index)}
                                >
                                    {/* {console.log(attemptedQuestions?.includes(index))} */}
                                    {index + 1}
                                </span>
                            ))}
                        </div>
                        <div className='flex flex-col gap-2 ml-8 lg:ml-10'>
                            <div className='flex items-center'>
                                <div className="h-6 w-6  rounded-full flex items-center justify-center cursor-pointer bg-yellow-100"></div>
                                <div className=' ml-2 text-sm font-semibold'>Visited & Unanswered</div>
                            </div>
                            <div className='flex items-center'>
                                <div className="h-6 w-6  rounded-full flex items-center justify-center cursor-pointer bg-green-300"></div>
                                <div className=' ml-2 text-sm font-semibold'>Answered</div>
                            </div>
                            <div className='flex items-center'>
                                <div className="h-6 w-6  rounded-full flex items-center justify-center cursor-pointer bg-gray-100"></div>
                                <div className=' ml-2 text-sm font-semibold'>Unvisited & Unanswered</div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default QuizPage;
