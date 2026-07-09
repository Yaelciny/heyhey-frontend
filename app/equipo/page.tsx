"use client";

import { useEffect, useState } from "react";
import { Users, Mail, Phone } from "lucide-react";

export default function EquipoPage() {
    const [equipo, setEquipo] = useState<any[]>([]);

    useEffect(() => {
        fetch("http://localhost:8081/system/api/v1/persona")
            .then((response) => response.json())
            .then((data) => setEquipo(data))
            .catch((error) => console.error("Error cargando equipo:", error));
    }, []);

    return (
        <div className="w-full">
            {/* Encabezado de la sección */}
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
                    Directorio del Equipo
                </h1>
                <p className="text-sm font-medium text-gray-500">
                    Gestiona los accesos y datos de los colaboradores de la agencia.
                </p>
            </div>

            {/* Grid de Tarjetas de Perfil */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {equipo.map((persona, index) => {
                    const iniciales = persona.nombre.substring(0, 2).toUpperCase();

                    return (
                        <div key={persona.idPersona || index} className="bg-[#0f141f] border border-gray-800/60 rounded-xl p-6 shadow-sm hover:border-gray-700 transition-colors">
                            <div className="flex items-center gap-4 mb-4">
                                {/* Avatar */}
                                <div className="w-12 h-12 rounded-full bg-blue-900/40 text-blue-400 flex items-center justify-center font-bold text-lg border border-blue-500/20">
                                    {iniciales}
                                </div>
                                <div>
                                    <h3 className="text-white font-bold">{persona.nombre} {persona.apellidos}</h3>
                                    <p className="text-xs text-yellow-500 font-medium">Miembro Activo</p>
                                </div>
                            </div>

                            {/* Datos de Contacto */}
                            <div className="space-y-3 mt-6 border-t border-gray-800/60 pt-4">
                                <div className="flex items-center gap-3 text-gray-400">
                                    <Mail size={14} />
                                    <span className="text-xs font-medium">{persona.correo}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400">
                                    <Phone size={14} />
                                    <span className="text-xs font-medium">{persona.telefono || "Sin teléfono registrado"}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}