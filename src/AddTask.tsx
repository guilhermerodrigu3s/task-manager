import React, { useState } from "react";

type AddTaskProps = {
  onAdd: (task: string) => void;
};

export default function AddTask({ onAdd }: AddTaskProps) {
  const [task, setTask] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (task.trim() === "") {
      setError("Por favor, insira uma tarefa.");
      return;
    }
    onAdd(task.trim());
    setTask("");
    setError("");
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Digite uma tarefa"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="border p-2 rounded w-full"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      <button
        type="submit"
        className="mt-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Adicionar
      </button>
    </form>
  );
}
