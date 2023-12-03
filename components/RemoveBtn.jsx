"use client";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://gongbu-next.vercel.app"
    : "http://localhost:3000";

export default function RemoveBtn({ id }) {
  const router = useRouter();

  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?");
    try {
      if (confirmed) {
        console.log(confirmed);
        const res = await fetch(`${API_BASE_URL}/api/lists/?id=${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          throw new Error("Failed to delete a list");
        }

        window.location.reload();
        console.log("did it", res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={removeTopic} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
}
