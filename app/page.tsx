"use client";

import { useEffect, useState } from "react";

export default function Home() {
  // guardamos la lista de personas
  const [personas, setPersonas] = useState<any[]>([]);

  useEffect(() => {
    //abrimos el servidor
    fetch("http://localhost:8081/system/api/v1/persona")
      .then(response => response.json())
      .then(data => { setPersonas(data); console.log("Datos de persona: ", data) })
      .catch(error => console.log(error));
  }, []);
  return (
    <main className="min-h-screen p-10 bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center">

      {/* Contenedor principal con efecto Glassmorphism */}
      <div className="w-full max-w-4xl p-8 backdrop-blur-md bg-white/50 border border-white/60 shadow-2xl rounded-2xl">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 tracking-tight">
          Panel de Control HeyHey
        </h1>

        {/* Tabla Minimalista */}
        <div className="overflow-hidden rounded-xl border border-gray-200/60 bg-white/80 shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-700">ID</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Nombre</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Correo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {personas.map((persona) => (
                <tr key={persona.idPersona} className="hover:bg-white/90 transition-colors">
                  <td className="px-6 py-4 text-gray-500 font-medium">{persona.idPersona}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{persona.nombre} {persona.apellidos}</td>
                  <td className="px-6 py-4 text-gray-500">{persona.correo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mensaje por si la base de datos está vacía */}
        {personas.length === 0 && (
          <p className="text-center text-gray-500 mt-8 font-medium">
            Cargando datos o no hay personas registradas...
          </p>
        )}
      </div>
    </main>
  );
}