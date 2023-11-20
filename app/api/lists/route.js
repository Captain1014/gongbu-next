// // api/lists/route.js
// // creating a list
// import { NextResponse } from "next/server";
// import connectMongoDB from "@/libs/mongodb";
// import List from "@/models/list";
// import { redirect } from "next/navigation";
// import { getSession } from "next-auth/react";

// await connectMongoDB();
// export async function POST(request) {
//   try {
//     const session = await getSession({ req: request.req });

//     if (!session) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const { korean, meaning } = await request.json();

//     await List.create({ korean, meaning, user: session.user.id });
//     return NextResponse.json({ message: "List created" }, { status: 201 });
//   } catch (error) {
//     console.error("Error creating a list:", error);
//     return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }
// export async function GET() {
//   const session = await getSession({ req: request.req });
//   if (!session) {
//     redirect("/login");
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   const lists = await List.find({user: session.id});
//   return NextResponse.json({ lists });
// }
// export async function DELETE(request) {
//   const id = request.nextUrl.searchParams.get("id");

//   await List.findByIdAndDelete(id);
//   return NextResponse.json({ message: "A list deleted" }, { status: 200 });
// }

import connectMongoDB from "@/libs/mongodb";
import List from "@/models/list";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { korean, meaning } = await request.json();
  await connectMongoDB();
  await List.create({ korean, meaning });

  return NextResponse.json(
    { message: "List Created" },
    {
      status: 201,
      headers: {
        "Access-Control-Allow-Origin": "https://gongbu-next-4dfv6dh6b-captain1014s-projects.vercel.app/showLists",

        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}

export async function GET() {
  await connectMongoDB();
  const lists = await List.find();

  return NextResponse.json(
    { lists },
    {
      headers: {
        "Access-Control-Allow-Origin": "https://gongbu-next-4dfv6dh6b-captain1014s-projects.vercel.app/showLists",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await List.findByIdAndDelete(id);

  return NextResponse.json(
    { message: "List deleted" },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "https://gongbu-next-4dfv6dh6b-captain1014s-projects.vercel.app/showLists",
        "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}

// OPTIONS handler
export async function OPTIONS(request) {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
      
        "Access-Control-Allow-Origin": "https://gongbu-next-4dfv6dh6b-captain1014s-projects.vercel.app/showLists",
        "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}
