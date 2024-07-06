import { NextApiRequest, NextApiResponse } from "next";
import { User, USER_MODEL_NAME } from "../../../model/User.model";
import MongooseDatabaseConnection from "../../../connector/MongoDatabaseConnection";
import { hashPassword } from "../../../helpers/loginHelper";
import createMongoConnection from "../../../connector/createMongoConnection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      res.status(400).json({ message: "Please fill in all required fields." });
      return;
    }

    const mongoConnector = createMongoConnection();

    const connection = await mongoConnector.connect();

    if (!connection) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const users = connection.model(USER_MODEL_NAME);
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "A user with this email already exists." });
    }
    const hashedPass = await hashPassword(password, 12);
    if (!hashedPass) {
      res.status(500).json({ message: "An error occurred. Please try again." });
    }

    const userProps = { name, email, password: hashedPass };
    const newUser = req.body?.phone
      ? new User({ ...userProps, phone: req.body.phone })
      : new User(userProps);

    await users.create(newUser);
    await mongoConnector.disconnect();

    return res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    res.status(500).json({ message: "An error occurred. Please try again." });
  }
}
