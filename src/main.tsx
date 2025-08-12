import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import FormContext  from './Context/FormContext.tsx'
import TaksContextProvider from './Context/TaskContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TaksContextProvider>
      <FormContext>
        <App />
      </FormContext>
    </TaksContextProvider>
  </StrictMode>,
)
