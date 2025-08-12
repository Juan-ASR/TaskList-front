import { createContext, useContext, useState, type ReactNode } from "react"

interface TaksFormType {
    viewForm: boolean;
    turnViewForm: () => void;
}

const TaksFormContext = createContext<TaksFormType | null>(null);

function FormContext({children}: {children : ReactNode}) {

    const [viewForm, setViewForm] = useState(false)

    const turnViewForm = () => {
        setViewForm(!viewForm)
    };
  return (
    <TaksFormContext.Provider value={{viewForm, turnViewForm}}>
        {children}
    </TaksFormContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFormContext() {
  const contexto = useContext(TaksFormContext);
  if (!contexto) {
    throw new Error("useFormContext must be used within a FormContext");
  }
  return contexto;
}

export default FormContext