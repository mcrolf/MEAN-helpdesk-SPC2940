export interface Task {
    _id?: string;
    title?: string;
    department?: "dev" | "hr" | "gen";
    description?: string;
    created?: Date;
    completed?: string;
    techNotes?: string;
}
