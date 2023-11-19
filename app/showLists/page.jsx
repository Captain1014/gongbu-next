"use client";
import React from "react";

import Head from "next/head";
import Link from "next/link";

import { HiPencilAlt } from "react-icons/hi";
import RemoveBtn from "@/components/RemoveBtn";
import AddList from "@/components/addList";
import { HiVolumeUp } from "react-icons/hi";
import { getLists } from "@/components/GetLists";

// Function to start text-to-speech

const speechHandler = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko-KR"; // Set the language to Korean
  speechSynthesis.speak(utterance);
};

export default async function ShowLists() {
  const { lists } = await getLists();

  return (
    <>
      <Head>
        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0");
        `}</style>
      </Head>

      <AddList />
      {lists.map((list, index) => (
        <div
          key={index}
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
