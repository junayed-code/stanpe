import connectDB from "@/mongoose/connect";
import Tasks from "@/models/tasks";

/**
 *
 * @param {import("next").NextApiRequest} request
 * @param {{ params: string | undefined}} param1
 * @returns
 */
export async function PATCH(request, { params }) {
  try {
    const id = params?.id;
    const { title, description } = (await request.json()) || {};
    if (!title || !description) {
      throw new Error("Title and description is required");
    }
    // Connect to mongoDB server
    await connectDB();
    // Update task
    await Tasks.updateOne({ _id: request.query.id }, { title, description });
    return Response.json({ message: "Task is updated.", id }, { status: 200 });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

/**
 *
 * @param {import("next").NextApiRequest} request
 * @param {{ params: string | undefined}} param1
 * @returns
 */
export async function DELETE(request, { params }) {
  try {
    const id = params?.id;
    await connectDB();
    await Tasks.deleteOne({ _id: id });
    return Response.json({ message: "Task is deleted." });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
