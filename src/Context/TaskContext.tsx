import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
// import {  saveTask } from "../taksManager.ts"
import type { TaksType } from '../types.ts';

interface TaksContextType{
    taks: TaksType[]
    addTaks: (task: Omit<TaksType, 'id' | 'completada' | 'borrada'>) => Promise<void>
    checkTaks: (id: number) => Promise<void>
    deteleTaks: (id: number) => Promise<void>
}

const TaksContext = createContext<TaksContextType | undefined>(undefined);

function TaksContextProvider({ children }: {children: ReactNode}) {

    const [taks, setTaks] = useState<TaksType[]>([]); // Inicializar el estado con las tareas 

    useEffect(() => {
        async function fetchTaks() {
            // const loadedTasks = json as TaksType[]
            const response = await fetch('http://localhost:3000/task'); 
            const loadedTasks = await response.json() as TaksType[]
            setTaks(loadedTasks); 
        }
        fetchTaks(); // Llamar a la función para obtener las tareas al montar el componente
    }, [])

    const addTaks: TaksContextType['addTaks'] = async (task) => {
        
        try {
            const response = await fetch('http://localhost:3000/task', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(task)
            })
            const newTask = await response.json() as TaksType
            const updatedTasks = [...taks, newTask]
            setTaks(updatedTasks)
        } catch (error) {
            console.error(error)
            alert('Error al agregar la tarea')
        }
    }

    const checkTaks: TaksContextType['checkTaks'] = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/task/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const checkedTaks = await response.json() as TaksType;
            const updatedTaks = taks.map((t: TaksType) => t.id === checkedTaks.id ? checkedTaks : t);
            setTaks(updatedTaks);
        } catch (error) {
            console.error(error);
            alert('Error al checkear la tarea');
        }

        
        // const existTaks = taks.findIndex((taks) => taks.id === id); // Buscar el índice de la tarea por su ID
        // if (existTaks === -1) return alert('Error: error al marcar la tarea como completada');
        // const newTaks = [...taks]; // Crear una copia del estado actual
        // newTaks[existTaks].completada = !newTaks[existTaks].completada; // Cambiar el estado de completada
        // setTaks(newTaks); // Actualizar el estado con la nueva lista de tareas
        // await saveTask(newTaks); // Actualizar el estado con la nueva lista de tareas

    }

    const deteleTaks: TaksContextType['deteleTaks'] = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/task/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error("No se pudo eliminar la tarea");

            // Filtrar tarea eliminada del estado
            const updated = taks.filter((task: TaksType) => task.id !== id);
            setTaks(updated);
        } catch (error) {
            console.error("Error al eliminar tarea:", error);
            alert("Error al eliminar tarea");
        }

    }

    return (
        <TaksContext.Provider value={{ taks, addTaks, checkTaks, deteleTaks}}>
            {children}
        </TaksContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTaks() {
    const contexto = useContext(TaksContext);
    if (!contexto) {
        // Si el contexto no está definido, significa que useTaks se está utilizando fuera del
        throw new Error('no puedes usar useTaks fuera de TaksContext');
    }
    return contexto;
}

export default TaksContextProvider