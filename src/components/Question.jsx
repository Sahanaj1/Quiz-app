import React, { useEffect } from 'react';

const Question = ({ question, choices, onSelect, selectedAnswer, questionNumber }) => {
  // useEffect(() => {
  //   console.log(questionNumber - 1, 'questionNumber');
  // }, [questionNumber]);

  return (
    <div className="w-full min-h-[50vh] lg:min-h-0">
      
      <h2 className="text-sm lg:text-[18px] font-semibold text-blue-600 py-0 lg:py-4">Question {questionNumber + 1}</h2>
      <p className="text-[18px] lg:text-xl font-semibold">{question}</p>
      <div className="mt-4">
        {choices.map((choice, index) => (
          <div
            key={index}
            onClick={() => onSelect(choice)}
            className={`mb-2 p-2 border rounded-lg cursor-pointer ${
              selectedAnswer === choice ? 'bg-blue-50' : ''
            }`}
          >
            <label className="text-sm font-semibold">
              <input
                type="radio"
                name={`question-${questionNumber}-answer`}
                value={choice}
                checked={selectedAnswer === choice}
                onChange={() => onSelect(choice)} 
                className="hidden"
              />
              {choice}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
