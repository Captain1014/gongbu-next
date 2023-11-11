import connectMongoDB from "@/libs/mongodb";
import List from "@/models/list";
import { NextResponse } from "next/server";

await connectMongoDB();

export async function PUT(request, { params }) {
  const { id } = params;
  const { newKorean: korean, newMeaning: meaning } = await request.json();
  // await connectMongoDB();
  await List.findByIdAndUpdate(id, { korean, meaning });
  return NextResponse.json({ message: "List updated" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    // await connectMongoDB();
    const list = await List.findOne({_id: id});
    return NextResponse.json({list}, { status: 200 });
  }
  