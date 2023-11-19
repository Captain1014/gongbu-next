// api/lists/route.js
// creating a list
import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import List from "@/models/list";
import { redirect } from "next/navigation";
import { getSession } from "next-auth/react";

await connectMongoDB();
export async function POST(request) {
  try {
    const session = await getSession({ req: request.req });

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { korean, meaning } = await request.json();

    await List.create({ korean, meaning, user: session.user.id });
    return NextResponse.json({ message: "List created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating a list:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
export async function GET() {
  const session = await getSession({ req: request.req });
  if (!session) {
    redirect("/login");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const lists = await List.find({user: session.id});
  return NextResponse.json({ lists });
}
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");

  await List.findByIdAndDelete(id);
  return NextResponse.json({ message: "A list deleted" }, { status: 200 });
}
