import { useForm } from "react-hook-form";
import { useFormContext } from "../Context/FormContext";
import { useTaks } from "../Context/TaskContext";

interface DatosFrom {
    titulo: string;
    descripcion: string;
}

function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm<DatosFrom>();
  const { turnViewForm } = useFormContext();
  const { addTaks } = useTaks();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    addTaks(data);
    alert("Tarea agregada con éxito");
    turnViewForm();
  });

  return (
    <div className="z-10 flex items-center justify-center w-screen h-screen fixed left-0 top-0">
      {/* Fondo oscuro desenfocado */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={turnViewForm}
      />

      {/* Formulario */}
      <form
        onSubmit={onSubmit}
        className="relative bg-white w-full max-w-[340px] sm:max-w-[400px] mx-6 p-6 rounded-2xl shadow-2xl border border-blue-300 flex flex-col space-y-4 animate-fadeIn"
      >
        <h3 className="text-blue-600 font-extrabold text-center text-2xl drop-shadow-sm">
          Nueva tarea
        </h3>

        {/* Input título */}
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Título de la tarea"
            className={`px-4 py-2 rounded-lg bg-gray-100 border-2 placeholder:text-sm outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ${
              errors.titulo ? 'border-red-400' : 'border-blue-200'
            }`}
            {...register("titulo", {
              required: "Debes llenar este campo",
              minLength: {
                value: 5,
                message: "El título debe tener mínimo 5 caracteres"
              },
              maxLength: {
                value: 20,
                message: "El título debe tener máximo 20 caracteres"
              }
            })}
          />
          {errors.titulo && (
            <span className="text-sm text-red-500 pt-1">{errors.titulo.message}</span>
          )}
        </div>

        {/* Textarea descripción */}
        <div className="flex flex-col">
          <textarea
            placeholder="Descripción de la tarea"
            rows={4}
            className={`px-4 py-2 rounded-lg bg-gray-100 border-2 resize-none placeholder:text-sm outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ${
              errors.descripcion ? 'border-red-400' : 'border-blue-200'
            }`}
            {...register("descripcion", {
              required: "Debes llenar este campo",
              minLength: {
                value: 5,
                message: "La descripción debe tener mínimo 5 caracteres"
              },
              maxLength: {
                value: 200,
                message: "La descripción debe tener máximo 200 caracteres"
              }
            })}
          />
          {errors.descripcion && (
            <span className="text-sm text-red-500 pt-1">{errors.descripcion.message}</span>
          )}
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all duration-200 text-white font-bold py-2 rounded-lg shadow-lg hover:shadow-xl"
        >
          Agregar
        </button>
      </form>
    </div>
  );
}

export default Form;
