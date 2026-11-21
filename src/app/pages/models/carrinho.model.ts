import { Veiculo } from '../models/veiculo.model';

export interface ItemCarrinho {
    veiculo: Veiculo;
    quantidade: number;
}