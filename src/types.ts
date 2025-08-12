export interface TaksType {
    id: number;
    titulo: string;
    descripcion: string;
    completada: boolean;
    borrada: boolean;
}

// interface TaskTypeFiltrado extends Omit<TaksType, 'id' | 'completada' | 'borrada'>{
//     titulo: string
//     descripcion: string
// }

