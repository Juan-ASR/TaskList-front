import type { TaksType } from "./types";

const CLAVE_STROGARE = "tasks";

export async function getTaks(): Promise<TaksType[]>{
    try {
        const dates = localStorage.getItem(CLAVE_STROGARE)
        return dates ? JSON.parse(dates) : [];
    } catch (error) {
        console.log(error)
        return [];
    }
}

export async function saveTask(task: TaksType[]): Promise<void> {
    try {
        localStorage.setItem(CLAVE_STROGARE, JSON.stringify(task))
    } catch (error) {
        console.log('Error al guardar tarea: ', error)
    }
}