"use client";

import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";

export default function AddLists() {
  const [koreanWord, setKoreanWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [lists, setLists] = useState([]);

  const addBtnHandler = () => {
    if (koreanWord.trim() !== "" && meaning.trim() !== "") {
      const newItem = {
        korean: koreanWord,
        meaning: meaning,
      };

      setLists((prevLists) => [...prevLists, newItem]);
      setKoreanWord("");
      setMeaning("");
    }
  };

  const removeBtnHandler = (index) => {
    // Create a copy of the current list
    const updatedLists = [...lists];
    
    // Remove the item at the specified index
    updatedLists.splice(index, 1);

    // Update the lists state with the modified list
    setLists(updatedLists);
  };

  return (
    <div>
      <form className="flex flex-col gap-3">
        <input
          value={koreanWord}
          onChange={(e) => setKoreanWord(e.target.value)}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Korean word"
        />

        <input
          value={meaning}
          onChange={(e) => setMeaning(e.target.value)}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Meaning"
        />

        <button
          onClick={addBtnHandler}
          type="button"
          className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
        >
          Add List
        </button>
      </form>

      <ul>
        {lists.map((item, index) => (
          <li key={index}>
            {item.korean} - {item.meaning}
            <button
              onClick={() => removeBtnHandler(index)}
              className="text-red-400"
            >
              <HiOutlineTrash size={24} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
