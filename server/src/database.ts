import * as mongodb from "mongodb";
import { Task } from "./task";

//--------------------------------------------
// collection for tasks inside mongo database
//--------------------------------------------
export const collections: {
    tasks?: mongodb.Collection<Task>;
} = {};


//----------------------------------------------------
// function to connect client to database
//----------------------------------------------------
export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();
  
    const db = client.db("meanStackExample");
    await applySchemaValidation(db);
  
    const tasksCollection = db.collection<Task>("tasks");
    collections.tasks = tasksCollection;
}


//-------------------------------------------------------
// function to apply schema validaton
//-------------------------------------------------------
async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["title", "department", "description"],
            additionalProperties: false,
            properties: {
                _id: {},
                title: {
                    bsonType: "string",
                    description: "'title' is required and is a string",
                },
                department: {
                    bsonType: "string",
                    description: "'department' is required and is 'dev, hr, gen'",
                    enum: ["dev", "hr", "gen"],
                },
                description: {
                    bsonType: "string",
                    description: "'description' is required and is a string",
                },
            },
        },
    };
  
    // Try applying the modification to the collection, if the collection doesn't exist, create it
   await db.command({
        collMod: "tasks",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("tasks", {validator: jsonSchema});
        }
    });
}