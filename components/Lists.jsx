import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

export default function Lists() {
  return (
    <>
      <div>
        <div>
          <h2>List Title</h2>
          <div>List Description</div>
        </div>
        <div>
          <RemoveBtn />
          <Link href={"/editLists/[id]"} as="/editLists/123">
            
              <HiPencilAlt size={24} />
            
          </Link>
        </div>
      </div>
    </>
  );
}
