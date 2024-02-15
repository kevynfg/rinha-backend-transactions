export interface Transaction {
  id?: string;
  cliente_id: number;
  valor: number;
  tipo: "d" | "c";
  descricao: string;
  data: string | number;
}