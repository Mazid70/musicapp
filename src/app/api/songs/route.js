import { collectionNames, connectDB } from "@/app/lib/connectDB";
import { NextResponse } from "next/server";
export const GET = async () => {
  const result = await connectDB(collectionNames.SONGS).find({}).toArray();
  return NextResponse.json(result);
 }