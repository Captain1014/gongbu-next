// api/lists/route.js

import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import List from "@/models/list";

await connectMongoDB();
export async function POST(request) {
  const { korean, meaning } = await request.json();
  // await connectMongoDB();
  await List.create({ korean, meaning });
  return NextResponse.json({ message: "list created" }, { status: 201 });
}
export async function GET() {
  // await connectMongoDB();
  const lists = await List.find();
  return NextResponse.json({ lists });
}
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  // await connectMongoDB();
  await List.findByIdAndDelete(id);
  return NextResponse.json({ message: "A list deleted" }, { status: 200 });
}
