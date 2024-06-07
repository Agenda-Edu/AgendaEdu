// src/interfaces/User.ts

import { Role } from '@prisma/client';

export interface User {
  id?: string;
  nome: string;
  email: string;
  tipo: Role;
  idEstudante?: string;
  cpf: string;
  telefone1: string;
  telefone2?: string;
  telefone3?: string;
  dataNascimento: Date;
  endereco?: Endereco;
}

export interface Endereco {
  id?: string;
  logradouro: string;
  complemento: string;
  numero: number;
  cep: string;
  userId: string;
}
