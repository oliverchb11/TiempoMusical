import { TipoInstrumento } from "./TipoInstrumento.model";

export interface Instrumento{
idDoc?: string;
nombre: string;
tipoID: TipoInstrumento;
}