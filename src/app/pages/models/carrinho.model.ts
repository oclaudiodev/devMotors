import { Veiculo } from '../models/veiculo.model';

export class Carrinho {
    itens: Veiculo[];
    total: number;

    constructor() {
        this.itens = [];
        this.total = 0;
    }
}