import Task from "./components/Task.jsx";
import { useTaks } from "./Context/TaskContext.tsx";
import Add from "./components/Add.jsx";

function App() {

  const { taks } = useTaks();

  return (
    <div className="p-10 min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 w-full flex flex-col items-center space-y-10">
      <h1 className="text-5xl font-bold text-center text-blue-400 ">Task List</h1>
      <div className="w-full max-w-[800px] space-y-5">
        <Add />
        <ul className="flex flex-col space-y-4">
          {taks.map((nota, index) => (
              <li key={index}>
                <Task tareaProp={nota}></Task>
              </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

  export default App;