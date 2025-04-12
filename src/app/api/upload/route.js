import { collectionNames, connectDB } from "@/app/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body=await req.json()
  const songCollection = connectDB(collectionNames.SONGS);
  const result = await songCollection.insertOne(body);
  return NextResponse.json(result);
 }
