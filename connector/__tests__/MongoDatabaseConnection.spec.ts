import { MongoMemoryServer } from "mongodb-memory-server";
import MongoDatabaseConnection from "../MongoDatabaseConnection";
import { waitFor } from "@testing-library/dom";

describe("MongoDatabaseConnection", () => {
  it("connects to mock server", async () => {
    const mongo = await MongoMemoryServer.create();

    await waitFor(() => {
      expect(mongo).toBeDefined();
      mongo.stop();
    });
  });
});
