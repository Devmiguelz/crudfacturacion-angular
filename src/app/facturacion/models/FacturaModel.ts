import { DetalleFacturaModel } from './DetalleFacturaModel';
import { ClienteModel } from './ClienteModel';

export class FacturaModel {
    public cod: number;
    public fecha: string;
    public subtotal: number;
    public iva: number;
    public total: number;
    public codcliente: number;
    public cliente: ClienteModel;
    public detalle: DetalleFacturaModel[];
}