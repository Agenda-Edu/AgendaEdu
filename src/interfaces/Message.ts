import { Role, Subjects } from "@prisma/client";

export interface Message {
    id: string,
    messageDate: Date,
    title: string,
    role: Role;
    subjects: Subjects[]
    class: string;
    body: string;
}


