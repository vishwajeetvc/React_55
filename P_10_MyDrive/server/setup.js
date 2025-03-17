import { connectDB, client } from "./dbConnection.js";

try {
  const db = await connectDB();
  await db.command({
    create: "users",
    validator: {
      $jsonSchema: {
        required: ["_id", "name", "password", "email", "rootDirId"],
        properties: {
          _id: {
            bsonType: "objectId",
          },
          name: {
            bsonType: "string",
            minLength : 3,
          },
          password: {
            bsonType: "string",
          },
          email: {
            bsonType: "string",
          },
          rootDirId: {
            bsonType: "objectId",
          },
        },
        additionalProperties: false,
      },
    },
  });

  await db.command({
    create: "files",
    validator: {
      $jsonSchema: {
        required: ["_id", "name", "extension", "parentDirId", "userId"],
        properties: {
          _id: {
            bsonType: "objectId",
          },
          name: {
            bsonType: "string",
          },
          extension: {
            bsonType: "string",
          },
          parentDirId: {
            bsonType: "objectId",
          },
          userId: {
            bsonType: "objectId",
          },
        },
        additionalProperties: false,
      },
    },
  });

  await db.command({
    create: "directories",
    validator: {
      $jsonSchema: {
        required: ["_id", "name", "parentDirId", "userId"],
        properties: {
          _id: {
            bsonType: "objectId",
          },
          name: {
            description: "Name of the user",
            bsonType: "string",
          },
          parentDirId: {
            bsonType: ["objectId", "null"],
          },
          userId: {
            bsonType: "objectId",
          },
        },
        additionalProperties: false,
      },
    },
  });
} catch (error) {
  console.log("Error in setup");
} finally {
  client.close();
}
