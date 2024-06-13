import { Address, Role, Student } from "@prisma/client";

export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
    student?: Student[] | null;
    cpf: string;
    telefone1: string;
    telefone2?: string | null;
    telefone3?: string | null;
    brithDay: Date;
    address: Address | null;
  }