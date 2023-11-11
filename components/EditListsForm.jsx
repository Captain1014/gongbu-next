"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditListsorm({ id, korean, meaning }) {
  const [newKorean, setNewKorean] = useState(korean);
  const [newMeaning, setNewMeaning] = useState(meaning);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/lists/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newKorean, newMeaning }),
      });

      if (!res.ok) {
        throw new Error("Failed to update lists");
      }

      router.refresh();
      router.push("/showLists");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewKorean(e.target.value)}
        value={newKorean}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Korean word"
      />

      <input
        onChange={(e) => setNewMeaning(e.target.value)}
        value={newMeaning}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Meaning"
      />

      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update
      </button>
    </form>
  );
}