"use client";
import React, { useState, useEffect } from "react";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://gongbu-next.vercel.app"
    : "http://localhost:3000";

const PlayGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
 

  const startGame = () => {
    setGameStarted(true);
  };

  const GameScreen = () => {
    const [timer, setTimer] = useState(600);
    const [input, setInput] = useState("");
    const [lists, setLists] = useState([]);
    const [showForm, setShowForm] = useState(true);


    useEffect(() => {
      const fetchLists = async () => {
        try {
          const res = await fetch(`${API_BASE_URL}/api/lists`, {
            cache: "no-store",
          });

          if (!res.ok) {
            throw new Error("Failed to fetch lists");
          }

          const { lists } = await res.json();
          setLists(lists.map((list) => ({ ...list, hidden: false })));
        } catch (error) {
          console.error("Error loading lists: ", error);
        }
      };

      fetchLists();
    }, []);

    useEffect(() => {
      let countdown;
      if (gameStarted) {
        countdown = setInterval(() => {
          setTimer((prevTimer) => {
            if (prevTimer > 0) {
              return prevTimer - 1;
            } else {
              clearInterval(countdown);
              setGameStarted(false);
              if (lists.length !== 0) {
                alert("Game Over!");
              } 
              return 0;
            }
          });
        }, 1000);
      }

      return () => clearInterval(countdown);
    }, [gameStarted, lists]);

    const handleSubmit = (e) => {
      e.preventDefault();
      const meaning = input.trim().toLowerCase();

      
      // Update the 'hidden' property based on input
      const updatedLists = lists.filter((list) => {
        return meaning === "" || list.meaning.toLowerCase() !== meaning;
      });

      setLists(updatedLists);

      // Clear the input after submission
      setInput("");

      // Display results
     
        // Check if there are no items left in lists
        if (updatedLists.length === 0) {
          alert("You got them all correct!");
          setShowForm(false);

        
        }
     

    };

    return (
      <div className="flex flex-col">
       {showForm && <p>Timer: {timer} seconds</p>}

        <div className="w-full h-full">
          {lists.map((list) => (
            <div
              key={list._id}
              className={`p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start ${list.hidden && 'hidden'
                }`}
            >
              <h2 id="read-word">{list.korean}</h2>
            </div>
          ))}
        </div>
        <div id="form" className="mt-auto">
        {showForm && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              className="p-4 w-full border border-gray-300"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter the word's meaning..."
            />
            <button
              type="submit"
              className="bg-blue-400 font-bold text-white py-3 px-6 w-fit"
            >
              Submit
            </button>
          </form>
        )}
         {!showForm && (
          <div>
           
            <h1 className="p-4 bg-blue-200 font-bold text-white ">Wanna play again? Refresh the page.</h1>
          </div>
        )}


        </div>
      </div>
    );
  };

  return (
    <div>
      <h1 className="p-4">Welcome to the Game!</h1>
     <p className="p-4">Enter the meaning of the word in English before the timer is over.</p>
     <p className="p-4">Hint for the graders: the answers are *hello* and *good bye* (the order does not matter)</p>

      {!gameStarted && (
        <button
          className="p-4 border border-blue-300 my-3 flex justify-between gap-5 items-start"
          onClick={startGame}
        >
          Start
        </button>
      )}
      {gameStarted && <GameScreen />}
    </div>
  );
};

export default PlayGame;
