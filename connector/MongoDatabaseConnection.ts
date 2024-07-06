import mongoose from "mongoose";

let cached = global.mongo;

export class MongooseDatabaseConnection {
  private readonly dbUrl: string;
  private readonly options: Record<string, any> | undefined;

  constructor(dbUrl: string, options?: Record<string, any>) {
    this.dbUrl = dbUrl;
    if (options) {
      this.options = options;
    }
  }

  public async connect() {
    if (cached) {
      return cached;
    }

    try {
      if (this.options) {
        await mongoose.connect(this.dbUrl, this.options);
      } else {
        await mongoose.connect(this.dbUrl);
      }

      cached = mongoose.connection;
    } catch (err) {
      console.error("Error connecting to server: ", err);
    }
    return cached;
  }

  public async disconnect() {
    if (cached) {
      await mongoose.disconnect();
      cached = undefined;
    }
  }
}

export default MongooseDatabaseConnection;
