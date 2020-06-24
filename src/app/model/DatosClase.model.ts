import { Instrumento } from "./Instrumento.model";
import { TipoInstrumento } from "./TipoInstrumento.model";
import { Record } from './Record.model';

export interface DatosClases{
idDoc?: string;
tipoID: any;
tipo?: TipoInstrumento;
instrumentoID: any;
instrumento?: Instrumento;
duracion: string;
segundos: number;
descripcion: string;
fecha: Date;
estudiar: string;
record: Record;
iduser:string;
}