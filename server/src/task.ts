import * as mongodb from "mongodb";

export interface Task{
    _id?: mongodb.ObjectId;           //object ID is mongo document ID
    title: string;
    department: "dev" | "hr" | "gen";
    description: string;
    created: Date;
    techAssigned: string;
    completedOn: Date;
    techNotes: string;
}