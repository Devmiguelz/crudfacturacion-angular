export class CrearFacturaRequest {
    public fecha: string;
    public subtotal: number;
    public iva: number;
    public total: number;
    public codcliente: number;
    public detalle: CrearDetalleRequest[];
}

export class CrearDetalleRequest {
    public subtotal: number;
    public cantidad: number;
    public codproducto: number;
}

export class ActualizarFacturaRequest {
    public cod: number;
    public fecha: string;
    public subtotal: number;
    public iva: number;
    public total: number;
    public codcliente: number;
    public detalle: ActualizarDetalleRequest[];
}

export class ActualizarDetalleRequest {
    public cod?: number;
    public subtotal: number;
    public cantidad: number;
    public codfactura: number;
    public codproducto: number;
}

export class ListaProductoDetalle {
    public coddetalle?: number;
    public codproducto: number;
    public producto: string;
    public subtotal: number;
    public precio: number;
    public cantidad: number;
}