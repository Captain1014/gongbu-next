"use client";

import React from "react";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

import { HiPencilAlt } from "react-icons/hi";
import RemoveBtn from "@/components/RemoveBtn";
import AddList from "@/components/addList";
import { HiVolumeUp } from "react-icons/hi";



// Function to start text-to-speech

const speechHandler = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko-KR"; // Set the language to Korean
  speechSynthesis.speak(utterance);
};

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://gongbu-next.vercel.app"
    : "http://localhost:3000";

const ShowLists = ({session}) => {
// check if user is logged in.
// if logged in, allow access to this page.
// if not logged in, redirect to /login page
  

  const [lists, setLists] = useState([]);

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
        setLists(lists);
      } catch (error) {
        console.error("Error loading lists: ", error);
      }
    };

    fetchLists();
  }, []);

  return (
    <>
      <Head>
        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0");
        `}</style>
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
              onClick={() => speechHandler(list.korean)}
            >
              <span className="material-symbols-outlined">
                <HiVolumeUp />
              </span>
            </button>
            <div>{list.meaning}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={list._id} />
            <Link href={`/editLists/${list._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};




export default ShowLists;
