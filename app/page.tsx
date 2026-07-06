"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [personas, setPersonas] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8081/system/api/v1/persona")
      .then(response => response.json())
      .then(data => { setPersonas(data); console.log("Datos de persona: ", data) })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6 text-black tracking-tight">
        Buenas tardes
      </h1>

      {/* Contenedor temporal para que veas tus datos de la base */}
      <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 shadow-lg">
        <pre className="text-sm text-gray-400">
          {personas}
        </pre>
      </div>
    </div>
  );
}