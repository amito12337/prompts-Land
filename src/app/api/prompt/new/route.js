import Prompt from "@src/models/prompt";
import { connectToDB } from "@src/utils/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDB();
    Prompt.create({ creator: userId, prompt, tag })
    return NextResponse.json({message:"prompt created"},{status:201})

  } catch (error) {
    return NextResponse.json({message:"Failed to create a new Prompt"},{status:500})
  }
}
