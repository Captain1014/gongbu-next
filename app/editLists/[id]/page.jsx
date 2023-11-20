import EditListsForm from "@/components/EditListsForm";

const getListById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/lists/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch list");
    }

    // const data = await res.json();

    // if (!data || !data.list) {
    //   throw new Error("Invalid response format");
    // }
    
    return res.json();
  } catch (error) {
    console.error("Error in getListById:", error);
    throw error; // Rethrow the error for the calling function to handle
};
}


export default async function EditList({ params }) {
  const { id } = params;
  const { list } = await getListById(id);
  console.log("API Response:", list);

  const { korean, meaning } = list;

  return <EditListsForm id={id} korean={korean} meaning={meaning} />;
  // try {
  //   const list = await getListById(id);
  //   console.log("API Response:", list);

  //   const { korean, meaning } = list;

  //   return <EditListsForm id={id} korean={korean} meaning={meaning} />;
  // } catch (error) {
  //   // Handle the error, for example, redirect to an error page or log it
  //   console.error("Error in EditList component:", error);

  //   // You might want to render an error message or redirect to an error page
  //   return <div>Error loading list. Please try again later.</div>;
  // }

}

