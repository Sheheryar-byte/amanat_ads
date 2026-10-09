import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("amanat_ads");
    
    const appointments = await db
      .collection("appointments")
      .find({})
      .sort({ submittedAt: -1 })
      .toArray();

    return NextResponse.json({ appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("amanat_ads");
    
    const data = await req.json();
    
    // Insert into DB
    const result = await db.collection("appointments").insertOne(data);
    
    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error("Error saving appointment:", error);
    return NextResponse.json({ error: "Failed to save appointment" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("amanat_ads");
    
    // Clear all
    await db.collection("appointments").deleteMany({});
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error clearing appointments:", error);
    return NextResponse.json({ error: "Failed to clear appointments" }, { status: 500 });
  }
}
