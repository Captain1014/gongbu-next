// pages/showLists.jsx
"use client";
import React, {useEffect} from 'react';
import Head from "next/head";
import Link from "next/link";

import { HiPencilAlt } from "react-icons/hi";

import RemoveBtn from "@/components/RemoveBtn";
import AddList from "@/components/addList";

import { HiVolumeUp } from "react-icons/hi";

const getLists = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/lists", {
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

export default async function showLists() {
  const { lists } = await getLists();

  


  const scriptContent = `
  
  
      const readButton = document.getElementById('read-button');
      readButton.addEventListener('click', startRecognition);
    
     
  
     
  
`;
  return (
    <>
      <Head>
        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0");
        `}</style>

        <script dangerouslySetInnerHTML={{ __html: scriptContent }} />
      </Head>

      <AddList />
      {lists.map((list) => (
        <div
          key={list._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 id="read-word">{list.korean}</h2>

            <button
              type="button"
              id="read-button"
              className="btn btn-orange mb-2"
              onClick={() => readText(list.korean)}
            >
              <span className="material-symbols-outlined">
                <HiVolumeUp />
              </span>
            </button>

            <h2>{list.meaning}</h2>
          </div>
          <div>
            <Link href={`/editLists/${list._id}`}>
              <HiPencilAlt size={24} />
            </Link>

            <RemoveBtn id={list._id} />
          </div>
        </div>
      ))}
    </>
  );
}
