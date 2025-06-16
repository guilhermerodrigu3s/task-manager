import React from "react";

export default function About() {
  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Sobre este projeto</h1>
      <p>
        Este é um aplicativo simples de gerenciamento de tarefas desenvolvido
        com React, TypeScript e Tailwind CSS.
      </p>
      <p className="mt-2">
        Permite adicionar, editar, filtrar e excluir tarefas, com persistência
        usando localStorage.
      </p>
    </div>
  );
}
