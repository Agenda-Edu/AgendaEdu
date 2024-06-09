import { Role } from '@prisma/client';
export interface User {
  id?: string;
  nome: string;
  email: string;
  tipo: Role;
  students?: {
    id: string;
    name: string;
    class: string;
    guardianIds: string[];
  }[];
  cpf: string;
  telefone1: string;
  telefone2?: string;
  telefone3?: string;
  dataNascimento: Date;
  adress?: {
    logradouro: string;
    complemento: string;
    numero: number;
    cep: string;
  };
}
