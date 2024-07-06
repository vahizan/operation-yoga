import MongooseDatabaseConnection from "./MongoDatabaseConnection";

export const createMongoConnection = () =>
  new MongooseDatabaseConnection(process.env.MONGODB_URI || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.MONGO_DB_NAME,
  });

export default createMongoConnection;
