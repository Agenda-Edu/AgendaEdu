import { Role, Subjects } from "@prisma/client";

export interface IMessage {
    id: string,
    messageDate: Date,
    title: string,
    role: Role;
    subjects: Subjects[]
    class: string;
    body: string;
}


