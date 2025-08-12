// import {getTasks, saveTasks} from "../data/dataManager.js"
import { useFormContext } from "../Context/FormContext.tsx"
import Formu from "./Formulario.jsx"

function Add() {
    const { viewForm, turnViewForm } = useFormContext();

    return (
        <div>
            <button type="button" className="bg-blue-600 text-blue-100 w-25 p-2 rounded font-bold hover:bg-blue-700 cursor-pointer" onClick={turnViewForm}>Add Task</button>
            {viewForm && <Formu/>}
        </div>
    )
}

export default Add