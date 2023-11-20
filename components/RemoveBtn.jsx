"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Link from "next/link";
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://gongbu-next.vercel.app"
    : "http://localhost:3000";

export default function RemoveBtn({ id }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`${API_BASE_URL}/api/lists/?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
        

      }
    }
  };

  return (
    
  


    <button onClick={removeTopic} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>


  );
}
