// // pages/playGame.jsx
// "use client";
// import React, { useState, useEffect } from "react";
// import Lists from "@/components/Lists";

// const PlayGame = () => {
//   const [words, setWords] = useState([]);
//   const [currentWord, setCurrentWord] = useState("");
//   const [input, setInput] = useState("");
//   const [score, setScore] = useState(0);
//   const [timer, setTimer] = useState(60); // in seconds
//   const [gameStarted, setGameStarted] = useState(false);

//   useEffect(() => {
//     fetchWords();
//   }, []);

//   const fetchWords = async () => {
//     try {
//       const res = await fetch("http://localhost:3000/api/lists");
//       if (res.ok) {
//         const data = await res.json();
//         setWords(data.lists);
//       }
//     } catch (error) {
//       console.error("Error fetching words:", error);
//     }
//   };

//   const startGame = () => {
//     setGameStarted(true);
//     setCurrentWord(getRandomWord());
//     setTimer(60);
//     setScore(0);
//   };

//   const getRandomWord = () => {
//     const randomIndex = Math.floor(Math.random() * words.length);
//     return words[randomIndex]?.korean || "";
//   };

//   const handleInputChange = (event) => {
//     const typedWord = event.target.value;
//     setInput(typedWord);

//     if (typedWord === currentWord) {
//       setScore((prevScore) => prevScore + 1);
//       setCurrentWord(getRandomWord());
//       setInput("");
//     }
//   };

//   useEffect(() => {
//     let countdown;
//     if (gameStarted) {
//       countdown = setInterval(() => {
//         setTimer((prevTimer) => {
//           if (prevTimer > 0) {
//             return prevTimer - 1;
//           } else {
//             clearInterval(countdown);
//             setGameStarted(false);
//             // Game over logic goes here
//             alert(`Game Over! Your Score: ${score}`);
//             return 0;
//           }
//         });
//       }, 1000);
//     }

//     return () => clearInterval(countdown);
//   }, [gameStarted, score]);

//   return (
//     <div>
//       <h1>Game</h1>
//       {!gameStarted && <Lists words={[]} />}
//       <button onClick={startGame} disabled={gameStarted}>
//         Start Game
//       </button>
//       {gameStarted && (
//         <>
//           <p>Current Word: {currentWord}</p>
//           <input
//             type="text"
//             value={input}
//             onChange={handleInputChange}
//             placeholder="Type the word to remove"
//           />
//           <p>Score: {score}</p>
//           <p>Time: {timer} seconds</p>
//         </>
//       )}
//     </div>
//   );
// };

// export default PlayGame;


export default async function PlayGame() {
return(
  <h1>play game</h1>
)
}