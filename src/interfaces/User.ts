import { Role } from '@prisma/client';
export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  students?: {
    id: string;
    name: string;
    cpf?: string | null;
    class: string;
    turn: string;
    brithDay: Date;
  }[];
  cpf: string;
  telefone1: string;
  telefone2?: string | null;
  telefone3?: string | null;
  brithDay: Date;
  address?: {
    address: string;
    complement: string;
    number: number;
    cep: string;
  };
}