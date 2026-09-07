import mongoose from "mongoose";

export async function resetE2EDatabase() {
  if (process.env.NODE_ENV !== "e2e") {
    throw new Error("Database reset is allowed only in e2e environment");
  }

  const dbName = mongoose.connection.db?.databaseName;

  if (dbName !== "careerflowdb_e2e") {
    throw new Error(
      `Refusing to reset database "${dbName}". Expected "careerflowdb_e2e".`,
    );
  }

  await mongoose.connection.db.dropDatabase();
}
