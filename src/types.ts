export interface TaksType {
    _id: string;
    titulo: string;
    descripcion: string;
    completada: boolean;
}

// interface TaskTypeFiltrado extends Omit<TaksType, 'id' | 'completada' | 'borrada'>{
//     titulo: string
//     descripcion: string
// }

