"use client";
// import React from "react";

// import Head from "next/head";
// import Link from "next/link";

// import { HiPencilAlt } from "react-icons/hi";
// import RemoveBtn from "@/components/RemoveBtn";
// import AddList from "@/components/addList";
// import { HiVolumeUp } from "react-icons/hi";
// import Lists from "@/components/Lists";
// // Function to start text-to-speech

// const speechHandler = (text) => {
//   const utterance = new SpeechSynthesisUtterance(text);
//   utterance.lang = "ko-KR"; // Set the language to Korean
//   speechSynthesis.speak(utterance);
// };

// export default async function ShowLists() {
//   const { lists } = await Lists();

//   return (
//     <>
//       <Head>
//         <style jsx global>{`
//           @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0");
//         `}</style>
//       </Head>

//       <AddList />

//       <Lists />

//       {lists.map((list) => (
//         <div
//           key={list._id}
//           className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
//         >
//           <div>
//             <h2 id="read-word">{list.korean}</h2>

//             <button
//               type="button"
//               id="read-button"
//               className="btn btn-orange mb-2"
//               onClick={() => speechHandler(list.korean)}
//             >
//               <span className="material-symbols-outlined">
//                 <HiVolumeUp />
//               </span>
//             </button>

//             <h2>{list.meaning}</h2>
//           </div>
//           <div>
//             <Link href={`/editLists/${list._id}`}>
//               <HiPencilAlt size={24} />
//             </Link>

//             <RemoveBtn id={list._id} />
//           </div>
//         </div>
//       ))}
//     </>
//   );
// }

// import React, { useEffect } from "react";
// import Head from "next/head";
// import Link from "next/link";
// import { HiPencilAlt, HiVolumeUp } from "react-icons/hi";
// import RemoveBtn from "@/components/RemoveBtn";
// import AddList from "@/components/AddList";
// import Lists from "@/components/Lists";

// const speechHandler = (text) => {
//   const utterance = new SpeechSynthesisUtterance(text);
//   utterance.lang = "ko-KR";
//   speechSynthesis.speak(utterance);
// };

// export default function ShowLists() {
//   let lists;

//   useEffect(() => {
//     const fetchLists = async () => {
//       const { lists: fetchedLists } = await Lists();
//       lists = fetchedLists;
//       // force a re-render without using state
//       forceRender();
//     };

//     fetchLists();
//   }, []);

//   // This function will be used to force a re-render when lists are fetched
//   const forceRender = () => {
//     // Ensure the component re-renders
//     const element = document.getElementById("force-render");
//     if (element) {
//       element.innerHTML = Math.random().toString();
//     }
//   };

//   return (
//     <>
//       <Head>
//         <style jsx global>{`
//           @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0");
//         `}</style>
//       </Head>

//       <AddList />
//       {lists ? (
//         lists.map((list) => (
//           <div
//             key={list._id}
//             className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
//           >
//             <div>
//               <h2 id="read-word">{list.korean}</h2>
//               <button
//                 type="button"
//                 id="read-button"
//                 className="btn btn-orange mb-2"
//                 onClick={() => speechHandler(list.korean)}
//               >
//                 <span className="material-symbols-outlined">
//                   <HiVolumeUp />
//                 </span>
//               </button>
//               <h2>{list.meaning}</h2>
//             </div>
//             <div>
//               <Link href={`/editLists/${list._id}`}>
//                 <HiPencilAlt size={24} />
//               </Link>
//               <RemoveBtn id={list._id} />
//             </div>
//           </div>
//         ))
//       ) : (
//         // Render a placeholder or loading state while lists are being fetched
//         <div>Loading...</div>
//       )}

//       {/* This hidden element is used to force a re-render */}
//       <div id="force-render" style={{ display: "none" }}></div>
//     </>
//   );
// }

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

// const getLists = async () => {
//   try {
//     const res = await fetch("http://localhost:3000/api/lists", {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch topics");
//     }

//     return res.json();
//   } catch (error) {
//     console.log("Error loading topics: ", error);
//   }
// };
const ShowLists = () => {
  // const { lists } = await getLists();
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/lists", {
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
}
export default ShowLists;
