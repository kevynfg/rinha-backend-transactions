import { Generated } from "kysely";

export interface Customer {
  id: Generated<number>;
  nome: string;
  limite: number;
}