global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;

import { MongoMemoryServer } from "mongodb-memory-server";
import MongoDatabaseConnection from "../MongoDatabaseConnection";
import { waitFor } from "@testing-library/dom";

describe("MongoDatabaseConnection", () => {
  const mockMongoServer = new MongoMemoryServer();
  const mongoConnector = new MongoDatabaseConnection(mockMongoServer.getUri());

  it("connects to mock server", async () => {
    const connection = await mongoConnector.connect();

    await waitFor(() => {
      expect(connection).toBeDefined();
    });
  });
});
