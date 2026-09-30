export class Usuario {
    nome: string;
    email: string;
    senha: string;
    cpf: string;

    constructor(nome: string, email: string, senha: string, cpf: string) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.cpf = cpf;
    }
}