import { Generated } from "kysely";

export interface Transaction {
  id: Generated<number>;
  cliente_id: number;
  valor: number;
  tipo: "d" | "c";
  descricao: string;
  data: string | number;
}