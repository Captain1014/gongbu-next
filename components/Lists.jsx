import React from "react";

const GetLists = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/lists`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    return res.json();
  } catch (error) {
    console.log("Error loading lists:", error);
    
  }
};

export default async function Lists (){
  const { lists } = await GetLists();
  
  return (
    <>
      {lists.map((list) => (
        <div
          key={list._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 id="read-word">{list.korean}</h2>
            <h2>{list.meaning}</h2>
          </div>
        </div>
      ))}
    </>
  );
};

