// Updating the list
import connectMongoDB from "@/libs/mongodb";
import List from "@/models/list";
import { NextResponse } from "next/server";

await connectMongoDB();

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { newKorean: korean, newMeaning: meaning } = await request.json();
    await connectMongoDB();
    await List.findByIdAndUpdate(id, { korean, meaning });
    return NextResponse.json(
      { message: "List updated" },
      { status: 200 },

      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error) {
    console.error("Error updating list:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// export async function GET(request, { params }) {
//   const { id } = params;
//   await connectMongoDB();

//   const list = await List.findOne({ _id: id });
//   return NextResponse.json(
//     { list },
//     { status: 200 },

//     {
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
//         "Access-Control-Allow-Headers": "Content-Type",
//       },
//     }
//   );
// }


export async function GET(request, { params }) {
  const { id } = params;
  console.log("Fetching list for ID:", id);

  try {
    const list = await List.findOne({ _id: id });

    if (!list) {
      console.error("List not found for ID:", id);
      return NextResponse.json({ error: "List not found" }, { status: 404 });
    }

    console.log("List found:", list);
    return NextResponse.json(
      { list },
      { status: 200 },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching list:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


// OPTIONS handler
export async function OPTIONS(request) {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}
