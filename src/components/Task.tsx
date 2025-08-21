import { useState } from 'react';
import { useTaks } from "../Context/TaskContext.tsx";
import type { TaksType } from '../types.ts';

import trash from '../../public/icons/trash.svg';
import clipboard from '../../public/icons/clipboard.svg';
import check from '../../public/icons/check.svg';



interface CheckBoxProps {
    completeHook: {
        completada: boolean;
        turnComplete: () => void;
    }
}


const CheckBox = ({ completeHook: { completada, turnComplete } }: CheckBoxProps) => {
    return (
        <div
            className="w-10 aspect-square bg-blue-100 flex border-2 border-blue-500 rounded-md items-center justify-center cursor-pointer overflow-hidden select-none"
            onClick={turnComplete}
        >
            {completada ? (
                <img src={check} alt="completada" className="w-full bg-blue-300" />
            ) : null}
        </div>
    );
}

interface TaskProps {
    tareaProp: TaksType
}

function Task({ tareaProp: { titulo, descripcion, completada, _id: id } }: TaskProps) {

    const [more, setMore] = useState(false);
    // const [completed, setCompleted] = useState(completada);
    const { checkTaks, deteleTaks } = useTaks();

    const turnComplete = () => {
        // setCompleted(!completed);
        checkTaks(id);
    }

    const copyTaks = async () => {
        const copiable = `${ titulo }: \n ${ descripcion }`;
        try {
            await navigator.clipboard.writeText(copiable);
            alert("Tarea copiada al portapapeles");
        } catch (error) {
            console.error("Error al copiar la tarea:", error);
        }
    };

    return (
        <div className="bg-white shadow-md p-4 flex space-x-4 items-center rounded-xl">
            <CheckBox completeHook={{ completada, turnComplete }} />

            <div className={`${completada ? "text-gray-200" : "text-black"} flex flex-col w-full h-full select-none cursor-pointer`} onClick={() => setMore(!more)}>
                <span className="font-bold text-xl">{titulo}</span>
                <p className={`text-sm ${more ? "line-clamp-none" : "line-clamp-2"} `}>
                    {descripcion}
                </p>
            </div>

            <button type="button" className="flex p-2 items-center justify-center w-10 h-10 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer select-none aspect-square" onClick={() => deteleTaks(id)}>
                <img src={trash} alt="borrar" className='w-full' />
            </button>
            <button type="button" className="flex p-2 items-center justify-center w-10 h-10 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer select-none aspect-square" onClick={copyTaks}>
                <img src={clipboard} alt="copiar" className='w-full' />
            </button>
        </div>
    )
}

export default Task