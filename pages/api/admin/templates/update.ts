import { NextApiRequest, NextApiResponse } from "next";
import { ILessonTemplateWithId } from "../../../../model/admin/LessonTemplate.model";
import createMongoConnection from "../../../../connector/createMongoConnection";
import { updateTemplate } from "../../../../helpers/admin/templatesHelper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ILessonTemplateWithId | { error: string }>
) {
  let { method, body } = req;

  if (method !== "PUT") {
    res.status(404).json({ error: "Method Invalid" });
    return;
  }
  const { _id, ...reqBody }: ILessonTemplateWithId = body;

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
    const updatedDocument = await updateTemplate(
      connection,
      reqBody.createdBy.id,
      _id,
      reqBody
    );
    res.status(200).json(updatedDocument);
  } catch (err) {
    res.status(500).json({
      error: "Unable to update template. Try again later. Server error",
    });
  } finally {
    await mongoConnector.disconnect();
  }
}
