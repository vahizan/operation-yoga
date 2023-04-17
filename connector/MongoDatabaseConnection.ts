import mongoose from "mongoose";

export class MongooseDatabaseConnection {
  private readonly dbUrl: string;
  private connection: mongoose.Connection | undefined;
  private readonly options: Record<string, any> | undefined;

  constructor(dbUrl: string, options?: Record<string, any>) {
    this.dbUrl = dbUrl;
    if (options) {
      this.options = options;
    }
  }

  public async connect() {
    if (this.connection) {
      return this.connection;
    }

    if (this.options) {
      await mongoose.connect(this.dbUrl, this.options);
    } else {
      await mongoose.connect(this.dbUrl);
    }

    this.connection = mongoose.connection;

    return this.connection;
  }

  public async disconnect() {
    if (this.connection) {
      await mongoose.disconnect();
      this.connection = undefined;
    }
  }
}

export default MongooseDatabaseConnection;
