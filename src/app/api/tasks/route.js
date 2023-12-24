import Tasks from "@/models/tasks";
import connectDB from "@/mongoose/connect";
import { headers } from "next/headers";

/**
 *
 * @param {import("next").NextApiRequest} req
 * @param {{ params: string | undefined}} context
 * @returns {Promise<any>}
 */
export async function GET(request, context) {
  try {
    const email = headers().get("email");
    if (!email) throw new Error("Unathorized User");

    await connectDB();
    const tasks = await Tasks.find({ email });
    return Response.json({ tasks }, { status: 200 });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

/**
 *
 * @param {import("next").NextApiRequest} req
 * @returns {Promise<any>}
 */
export async function POST(request) {
  try {
    const { title, description, email } = (await request.json()) || {};

    if (!email) throw new Error("User email is required");
    if (!title || !description) {
      throw new Error("Title and description is required");
    }
    // Connect to mongoDB server
    await connectDB();
    // Create new task
    await Tasks.create({ email, title, description });
    return Response.json({ message: "New task is created." }, { status: 200 });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
