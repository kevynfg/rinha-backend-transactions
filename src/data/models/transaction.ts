export interface Transaction {
  id: string;
  cliente_id: string;
  valor: number;
  tipo: "d" | "c";
  descricao: string;
  data: string;
}