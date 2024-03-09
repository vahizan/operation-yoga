import { NextApiRequest, NextApiResponse } from "next";
import createMongoConnection from "../../../../connector/createMongoConnection";
import { deleteTemplate } from "../../../../helpers/admin/templatesHelper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void | { error: string }>
) {
  let { method, body } = req;

  if (method !== "DELETE") {
    res.status(404).json({ error: "Method Invalid" });
    return;
  }
  const { userId, templateId }: { templateId: string; userId: string } = body;

  const mongoConnector = createMongoConnection();

  let connection = undefined;

  try {
    connection = await mongoConnector.connect();
  } catch (error) {
    res.status(500).json({ error: "DB connection error" });
    await mongoConnector.disconnect();
    return;
  }

  if (!connection) {
    console.warn("Unauthorized");
    res.status(403).json({ error: "Unauthorized" });
    return;
  }

  //update template
  try {
    await deleteTemplate(connection, userId, templateId);
    res.status(200);
  } catch (err) {
    res.status(403).json({
      error:
        "Unable to delete template. Cannot delete templates created by others",
    });
  } finally {
    await mongoConnector.disconnect();
  }
}
