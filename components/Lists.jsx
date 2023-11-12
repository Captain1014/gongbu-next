

import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";


const getLists = async() => {
  try {
    const res = await fetch('http://localhost:3000/api/lists', {
      cache: 'no-store',
    });

    if(!res.ok) {
      throw new Error('Failed to fetch');
    }
    return res.json();
  } catch (error) {
console.log("Error loading lists:", error);
  }
}


export default async function Lists() {

  const {lists} = await getLists();
  return (
    <>
    
    {lists.map(list=> (
      <div
      key={list._id}>
        <div>
          <h2>{list.korean}</h2>
          <div>{list.meaning}</div>
        </div>
        <div>
          <RemoveBtn />
          <Link href={`/editLists/${list._id}`}>
            
              <HiPencilAlt size={24} />
            
          </Link>
        </div>
      </div>
    ))}
    </>
  );
}
