"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth"; // Import getSession

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://gongbu-next.vercel.app"
    : "http://localhost:3000";

export default function AddList() {
  const [korean, setKorean] = useState("");
  const [meaning, setMeaning] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
   

    if (!korean || !meaning) {
      alert("Enter Korean word and its meaning");
      return;
    }

    try {
      // const session = await getSession();

      // if (!session) {
      //   // Handle the case where the user is not authenticated
      //   alert("You need to log in to create a list");
      //   return;
      // }

      const res = await fetch(`${API_BASE_URL}/api/lists`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ korean, meaning }), // Include the user ID in the request payload
      });

      if (res.ok) {
        router.refresh();
     
        setKorean("");
        setMeaning("");
      } else {
        throw new Error("Failed to create a list");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setKorean(e.target.value)}
        value={korean}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Enter a word"
      />

      <input
        onChange={(e) => setMeaning(e.target.value)}
        value={meaning}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Its meaning "
      />

      <button
        type="submit"
        className="bg-blue-400 font-bold text-white py-3 px-6 w-fit"
      >
        Add
      </button>
    </form>
  );
}
