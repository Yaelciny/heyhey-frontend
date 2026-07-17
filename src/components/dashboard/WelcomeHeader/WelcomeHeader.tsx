"use client";

import { useState, useEffect } from "react";
import { Bell, Search, User } from "lucide-react";

export default function WelcomeHeader() {
    const [fechaActual, setFechaActual] = useState("");
    const [nombreUsuario, setNombreUsuario] = useState("Cargando...");

    useEffect(() => {
        // 1. Calculamos la fecha real al instante
        const opciones: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        const fechaFormateada = new Date().toLocaleDateString('es-ES', opciones);
        setFechaActual(fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1));

        // 2. Traemos al Administrador ID 1 desde Spring Boot
        fetch("http://localhost:8081/system/api/v1/administrador")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    // Buscamos al administrador que tenga el ID 1
                    const adminUno = data.find((admin) => admin.idAdministrador === 1);

                    if (adminUno && adminUno.persona) {
                        setNombreUsuario(adminUno.persona.nombre); // Extraemos "Carlos"
                    } else {
                        setNombreUsuario("Administrador");
                    }
                }
            })
            .catch((err) => {
                console.error("Error cargando administrador:", err);
                setNombreUsuario("Administrador"); // Fallback por si el servidor está apagado
            });
    }, []);

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-[#0f141f] border border-gray-800/60 p-6 rounded-xl">
            <div>
                <h1 className="text-2xl font-extrabold text-white mb-1">
                    ¡Hola, <span className="text-yellow-500">{nombreUsuario}</span>!
                </h1>
                <p className="text-gray-400 text-sm font-medium">{fechaActual}</p>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
                {/* Buscador estético */}
                <div className="relative w-full md:w-64">
                    <input
                        type="text"
                        placeholder="Buscar tareas..."
                        className="w-full bg-[#111827] border border-gray-800 text-gray-300 text-sm rounded-lg p-2.5 pl-10 focus:outline-none focus:border-yellow-500/50"
                    />
                    <Search size={16} className="absolute left-3 top-3 text-gray-500" />
                </div>

                {/* Botón de Notificaciones */}
                <button className="relative bg-gray-800 hover:bg-gray-700 p-2.5 rounded-lg text-gray-400 hover:text-white transition-colors border border-gray-700 shrink-0">
                    <Bell size={18} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-gray-800"></span>
                </button>

                {/* Avatar del Usuario */}
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 flex items-center justify-center shrink-0 font-bold">
                    {/* Si ya cargó el nombre, mostramos su inicial, si no, el ícono */}
                    {nombreUsuario !== "Cargando..." && nombreUsuario !== "Administrador"
                        ? nombreUsuario.charAt(0).toUpperCase()
                        : <User size={20} />}
                </div>
            </div>
        </div>
    );
}