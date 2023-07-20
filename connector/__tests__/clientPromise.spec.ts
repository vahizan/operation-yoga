import { MongoClient } from "mongodb";
import clientPromise from "../clientPromise";

describe("Your Module", () => {
  beforeEach(() => {
    process.env.MONGODB_URI = "your-mongodb-uri";
    process.env.NODE_ENV = "development";
  });

  afterEach(() => {
    // Clean up environment variables
    delete process.env.MONGODB_URI;
    delete process.env.NODE_ENV;
  });

  it("should throw an error if MONGODB_URI is missing", () => {
    delete process.env.MONGODB_URI;
    expect(() => require("./your-module")).toThrow(
      'Invalid/Missing environment variable: "MONGODB_URI"'
    );
  });

  it("should export a module-scoped MongoClient promise", () => {
    expect(clientPromise).toBeInstanceOf(Promise);
  });

  it("should create a MongoClient instance and connect in development mode", () => {
    const mockConnect = jest.fn(() => Promise.resolve());
    jest
      .spyOn(MongoClient.prototype, "connect")
      .mockImplementationOnce(mockConnect);

    // Force reload of the module
    jest.resetModules();
    const newClientPromise = require("./your-module").default;

    expect(newClientPromise).toBe(clientPromise);
    expect(mockConnect).toHaveBeenCalled();
  });

  it("should create a new MongoClient instance and connect in production mode", () => {
    process.env.NODE_ENV = "production";
    const mockConnect = jest.fn(() => Promise.resolve());
    jest
      .spyOn(MongoClient.prototype, "connect")
      .mockImplementationOnce(mockConnect);

    // Force reload of the module
    jest.resetModules();
    const newClientPromise = require("./your-module").default;

    expect(newClientPromise).not.toBe(clientPromise);
    expect(mockConnect).toHaveBeenCalled();
  });
});
