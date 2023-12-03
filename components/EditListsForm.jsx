"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
const API_BASE_URL = process.env.NODE_ENV === 'production' ? 'https://gongbu-next.vercel.app' : 'http://localhost:3000';

export default function EditListForm({ id, korean, meaning }) {
  const [newKorean, setNewKorean] = useState(korean);
  const [newMeaning, setNewMeaning] = useState(meaning);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/api/lists/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newKorean, newMeaning }),
      });

      if (!res.ok) {
        throw new Error("Failed to update lists");
      }

      
      router.push("/showLists");
      router.refresh();
    } catch (error) {
      console.error("Error updating list:", error);
      
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

      <button className="bg-blue-500 font-bold text-white py-3 px-6 w-fit">
        Update
      </button>
    </form>
  );
}