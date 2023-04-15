import type { NextApiRequest, NextApiResponse } from "next";
import type { IArticlePost } from "../interfaces";
import MongooseDatabaseConnection from "../../../connector/MongoDatabaseConnection";
import { Connection } from "mongoose";
import Blog from "../../model/Blog.model";

// placeholder handler replace with required logic
export default async function articlePostHandler(
  req: NextApiRequest,
  res: NextApiResponse<IArticlePost>
) {
  const { query, method } = req;
  const id = parseInt(query.id as string, 10);
  const name = query.name as string;

  switch (method) {
    case "GET":
      // Get data from your database
      res.status(200).json({ id, name: `User ${id}`, description: "" });
      break;
    case "PUT":
      // Update or create data in your database
      const dbUrl: string = process.env["MONGO_DB_URI"] || "";
      const connector: MongooseDatabaseConnection =
        new MongooseDatabaseConnection(dbUrl);
      await connector.connect();
      // Create a new blog post object
      const article = new Blog({
        title: "Awesome Post!",
        slug: "awesome-post",
        published: true,
        content: "This is the best post ever",
        tags: ["featured", "announcement"],
      });

      article.save();

      // Insert the article in our MongoDB database
      await article.save();
      res.status(200).json({ id, name: name || `User ${id}`, description: "" });
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
