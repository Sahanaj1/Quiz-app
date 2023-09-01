import React from 'react';

const Page = ({ questions, userAnswers }) => {
  const calculatePoints = () => {
    let points = 0;
    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === questions[i].correctAnswer) {
        points++;
      }
    }
    return points;
  };
  const totalPoints = calculatePoints();
  const name = localStorage.getItem("name");
  
  return (
    <div className="bg-gray-100 min-h-screen w-full py-8">
      <div className="max-w-3xl mx-auto bg-white p-4 shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">Hello {name}! Your quiz report:</h1>
        <p className="text-xl font-semibold mt-4">Total Points: {totalPoints}</p>
        {questions.map((question, index) => (
          <div key={index} className="mb-4 border border-gray-300 p-4 rounded-lg">
            <p className="text-sm lg:text-lg font-semibold">{question.question}</p>
            <p className={`text-xs  lg:text-sm text-${userAnswers[index] === question.correctAnswer ? 'green' : 'red'}-600 mt-2`}>
              Your Answer: {userAnswers[index]}
            </p>
            <p className="text-xs  lg:text-sm text-green-600 mt-2">Correct Answer: {question.correctAnswer}</p>
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default Page;
