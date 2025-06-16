import React, { useState, useEffect } from "react";

type Task = {
  id: string;
  text: string;
  done: boolean;
};

type Filter = "all" | "pending" | "done";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (newTask.trim() === "") return;
    const task: Task = {
      id: crypto.randomUUID(),
      text: newTask.trim(),
      done: false,
    };
    setTasks([...tasks, task]);
    setNewTask("");
  }

  function toggleDone(id: string) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function removeTask(id: string) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // Aqui filtramos as tasks para exibir de acordo com o filtro ativo
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "pending") return !task.done;
    if (filter === "done") return task.done;
    return true;
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      <div className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nova tarefa"
          className="flex-grow border border-gray-300 rounded px-3 py-2 mr-2"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Adicionar
        </button>
      </div>

      <div className="mb-4 flex space-x-2">
        <button
          className={`px-3 py-1 rounded ${
            filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("all")}
        >
          Todas
        </button>
        <button
          className={`px-3 py-1 rounded ${
            filter === "pending" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("pending")}
        >
          Pendentes
        </button>
        <button
          className={`px-3 py-1 rounded ${
            filter === "done" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("done")}
        >
          Concluídas
        </button>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-center justify-between mb-2 p-2 rounded ${
              task.done
                ? "bg-green-100 line-through text-gray-500"
                : "bg-gray-100"
            }`}
          >
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(task.id)}
                className="form-checkbox"
              />
              <span>{task.text}</span>
            </label>

            <button
              onClick={() => removeTask(task.id)}
              className="text-red-500 hover:text-red-700 font-bold"
              aria-label={`Remover tarefa ${task.text}`}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
