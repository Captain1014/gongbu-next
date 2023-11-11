import EditListsForm from "@/components/EditListsForm";

const getListById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/lists/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch list");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditList({ params }) {
  const { id } = params;
  const { list } = await getListById(id);
  const { korean, meaning } = list;

  return <EditListsForm id={id} korean={korean} meaning={meaning} />;
}