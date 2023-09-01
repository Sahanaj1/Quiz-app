<h1>Quiz-App using React</h1>

<h3>The Project consists of 5 main files:</h3>
<h4>1. App.jsx</h4>

<li>The main compone­nt of a React project is the App.jsx. It handles the state of the­ application, including user email, quiz questions, use­r answers, and various flags for tracking the quiz's progress and comple­tion. Additionally, it interacts with an external API to fe­tch quiz questions, manages user authe­ntication, and ensures smooth navigation through the quiz e­xperience.</li>

<h4>2. Navbar.jsx</h4>

<li>The navigation bar at the­ top of the application is an essential compone­nt. It prominently shows the title of the­ app ("Quiz App"), along with the user's name (if logge­d in). Additionally, there is a logout button available for use­rs to conveniently log out of the application.</li>

<h4>3. Question.jsx</h4>

<li>This component represents a single quiz question. It displays the question text, answer choices, and allows the user to select an answer. It uses radio buttons for answer selection and provides visual feedback for the selected answer. The component communicates with the parent component using callback functions.</li>

<h4>4. QuizPage.jsx</h4>

<li>This component is the main quiz page where users answer questions, navigate between questions, and submit the quiz. It manages the state for the current question index, tracks visited and attempted questions, and handles question navigation and timing. It also displays a countdown timer and the question components.</li>

<h4>5. Report.jsx</h4>

<li>This component displays the user's quiz report after completing the quiz. It calculates and shows the total points earned by comparing user answers to the correct answers. It also lists each question, the user's answer (with color-coded correctness feedback), and the correct answer.</li>

<h3>Challenges faced:</h3>
<h5> I did not want to make use of redux for managing the state as i wanted to keep th project simple and finish the implementation sooner. So I've used useState, useEffect hooks to update the states and localStorage. Once user logs in the name and email will be stored in localStorage and the visitedQuestions and attemptedQuestions arrays are both set empty initially. </h5>
<h5>Problems faced:</h5>
<li> Initially, I had an issue where the visited questions were not updating properly. When user visited a question without selecting an answer, it wasn't getting marked as visited. I resolved this issue by using the useEffect hook to update visited and attempted questions based on the selected answers and current question index. My previous approach was just to chec if user has selected the choice or not and update the visited and answered arrays accordingly but this was a bug which I handled using useEffect.</li>
<li>I faced another issue related to selected answer array. If user would submit the quiz and logout, when next user would submit their quiz, the previous user's answers were being mapped due to no unique identity for users. I fixed this by checking if there's no name stored in localStorage then setSelectedAnswers([]) which will reset everytime user logs out.</li>
<li>Lastly, when user would refresh, the quiz page would go hidden, so I added an event listener 'beforeunload' which will automatically logout the user and takes to start page when reloaded.</li>

<h2>Installation:</h2>
<p>Clone the repo</p>
<p>cd [project_name]</p>
<p>npm install</p>
<p>npm run dev</p>

<h3>Live URL: ✨</h3>
 (https://main--dulcet-mermaid-959f56.netlify.app/)
