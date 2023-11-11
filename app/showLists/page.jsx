// pages/showLists.jsx
"use client";

import Link from "next/link";

import { HiPencilAlt } from "react-icons/hi";

import RemoveBtn from "@/components/RemoveBtn";
import AddList from "@/components/addList";

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
  return (
    <>
   <AddList/>
      {lists.map((list) => (
        <div
        key={list._id}
        className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2>{list.korean}</h2>
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
