export interface Cliente {
  id?: string;
  cpf: string;
  nome: string;
  sobrenome: string;
  dataNascimento: string;
  email: string;
  senha?: string;
}