import { connectDB } from '@/models/connectDB';
import ID from '@/models/db';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  try {
    // Establish the database connection only once
    await connectDB();
    console.log("Database connected successfully.");

    // Parse the request body
    const body = await request.json();
    const { companyType } = body;

    // Retrieve the current document (ID)
    const id = await ID.findOne({});
    console.log("Fetched ID document:", id);

    if (!id) {
      // Handle case where no document is found in the database
      return NextResponse.json({ message: 'No ID document found' }, { status: 404 });
    }

    // Update the appropriate field based on company type
    let updateField;
    if (companyType === "aimcab") {
      console.log("Updating aimcabId...");
      updateField = { $set: { aimcabId: id.aimcabId + 1 } };
    } else if (companyType === "wtl") {
      console.log("Updating wtlId...");
      updateField = { $set: { wtlId: id.wtlId + 1 } };
    } else {
      // Handle invalid companyType
      return NextResponse.json({ message: 'Invalid company type' }, { status: 400 });
    }

    // Perform the update operation
    await ID.updateOne({}, updateField);

    // Fetch the updated document to return in the response
    const updatedId = await ID.findOne({});
    console.log("Updated ID document:", updatedId);

    // Return the updated ID document as the response
    return NextResponse.json({ updatedId });

  } catch (error: any) {
    // Error handling for database or other issues
    console.error("Error occurred:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}



export async function GET(request: Request){
  try {
    await connectDB();

    const id= await ID.findOne({});

    return NextResponse.json({id})
  } catch (error:any) {
    console.error("Error occurred:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request:Request){
  try {
    await connectDB();
    const body = await request.json();
    const {companyType, count} = body;
    const id = await ID.findOne({});
    console.log("Fetched ID document:", id);

    if (!id) {
      // Handle case where no document is found in the database
      return NextResponse.json({ message: 'No ID document found' }, { status: 404 });
    }

    // Update the appropriate field based on company type
    let updateField;
    if (companyType === "aimcab") {
      console.log("Updating aimcabId...");
      updateField = { $set: { aimcabId: count } };
    } else if (companyType === "wtl") {
      console.log("Updating wtlId...");
      updateField = { $set: { wtlId: count } };
    } else {
      // Handle invalid companyType
      return NextResponse.json({ message: 'Invalid company type' }, { status: 400 });
    }

    // Perform the update operation
    await ID.updateOne({}, updateField);
    return NextResponse.json({ updateField });
  } catch (error:any) {
    console.error("Error occurred:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// export async function POST(request: Request) {
//   try {
//     await connectDB();
//     await ID.create({});
//     return NextResponse.json({ message: "Database created successfully" });
//   } catch (error: any) {
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }