import React, { useState } from 'react';

const StartPage = ({ onStart }) => {
  const [email, setEmail] = useState('');
  const [name, SetName] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    onStart(email, name); // Pass both email and name to the onStart function

  // Store email and name in localStorage
  localStorage.setItem('email', email);
  localStorage.setItem('name', name);
  };

  return (
    <div className="min-h-screen w-full  flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-center text-gray-900">Quiz App</h1>
        <form onSubmit={handleSubmit}  className="space-y-4">
        <div>
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
          <label htmlFor="password" className="block text-gray-700">Name:</label>
          
          <input
            type="name"
            placeholder="Enter your name"
            value={name}
            className="mt-1 p-2 w-full border-gray-100 rounded-md"
            onChange={(e) => SetName(e.target.value)}
          />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Start Quiz
          </button>

        </form>
      </div>
    </div>
  );
};

export default StartPage;
