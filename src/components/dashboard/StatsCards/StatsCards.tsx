"use client";

import { useState, useEffect } from "react";
import { CheckSquare, TrendingUp, CheckCircle2, Users } from "lucide-react";

export default function StatsCards() {
    // 1. Estado para almacenar los números reales
    const [stats, setStats] = useState({
        total: 0,
        enProgreso: 0,
        completadas: 0,
        miembros: 0
    });

    // 2. Función para cargar datos
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                // Hacemos fetch a tus rutas de Spring Boot
                const resTareas = await fetch("http://localhost:8081/system/api/v1/tareas-enviadas");
                const resEmpleados = await fetch("http://localhost:8081/system/api/v1/empleado");

                const tareas = await resTareas.json();
                const empleados = await resEmpleados.json();

                if (Array.isArray(tareas) && Array.isArray(empleados)) {
                    setStats({
                        total: tareas.length,
                        enProgreso: tareas.filter((t: any) => t.estado === 2).length,
                        completadas: tareas.filter((t: any) => t.estado >= 3).length,
                        miembros: empleados.length
                    });
                }
            } catch (error) {
                console.error("Error al cargar estadísticas:", error);
            }
        };

        cargarDatos();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

            {/* Tarjeta 1: Total Tareas */}
            <div className="bg-[#0f141f] border border-gray-800/60 p-4 rounded-xl shadow-sm">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">Total Tareas</h3>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 p-1.5 rounded-lg text-yellow-500">
                        <CheckSquare size={16} strokeWidth={2} />
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-white">{stats.total}</h2>
                <p className="text-xs text-gray-500 mt-2 font-medium">Registradas en el sistema</p>
            </div>

            {/* Tarjeta 2: En Progreso */}
            <div className="bg-[#0f141f] border border-gray-800/60 p-5 rounded-xl shadow-sm">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">En Progreso</h3>
                    <div className="bg-purple-500/10 border border-purple-500/20 p-1.5 rounded-lg text-purple-400">
                        <TrendingUp size={16} strokeWidth={2} />
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-white">{stats.enProgreso}</h2>
                <p className="text-xs text-gray-500 mt-2 font-medium">Tareas activas</p>
            </div>

            {/* Tarjeta 3: Completadas */}
            <div className="bg-[#0f141f] border border-gray-800/60 p-5 rounded-xl shadow-sm">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">Completadas</h3>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-1.5 rounded-lg text-emerald-400">
                        <CheckCircle2 size={16} strokeWidth={2} />
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-white">{stats.completadas}</h2>
                <p className="text-xs text-gray-500 mt-2 font-medium">Cierre de actividades</p>
            </div>

            {/* Tarjeta 4: Miembros */}
            <div className="bg-[#0f141f] border border-gray-800/60 p-5 rounded-xl shadow-sm">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">Miembros</h3>
                    <div className="bg-blue-500/10 border border-blue-500/20 p-1.5 rounded-lg text-blue-400">
                        <Users size={16} strokeWidth={2} />
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-white">{stats.miembros}</h2>
                <p className="text-xs text-gray-500 mt-2 font-medium">Personal activo</p>
            </div>

        </div>
    );
}