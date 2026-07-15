"use client";

import { useEffect, useState } from "react";
import { CheckSquare, Calendar, User, AlertCircle, Clock, CheckCircle } from "lucide-react";

export default function TareasPage() {
    const [tareas, setTareas] = useState<any[]>([]);

    useEffect(() => {
        // Jalamos todas las asignaciones de tu controlador
        fetch("http://localhost:8081/system/api/v1/tareas-enviadas")
            .then((response) => response.json())
            .then((data) => setTareas(data))
            .catch((error) => console.error("Error cargando tareas:", error));
    }, []);

    // Función para renderizar el icono y texto del estado del proceso
    const getEstadoBadge = (estado: number) => {
        switch (estado) {
            case 1:
                return (
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 bg-gray-800/60 px-2.5 py-1 rounded-md border border-gray-700">
                        <Clock size={12} /> Pendiente
                    </span>
                );
            case 2:
                return (
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20">
                        <AlertCircle size={12} /> En progreso
                    </span>
                );
            default:
                return (
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                        <CheckCircle size={12} /> Completada
                    </span>
                );
        }
    };

    return (
        <div className="w-full">
            {/* Encabezado */}
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
                    Administración de Tareas
                </h1>
                <p className="text-sm font-medium text-gray-500">
                    Monitorea el progreso, fechas límite y asignaciones operativas en tiempo real.
                </p>
            </div>

            {/* Grid de Tarjetas de Tareas */}
            {tareas.length === 0 ? (
                <div className="bg-[#0f141f] border border-gray-800/60 rounded-xl p-12 text-center text-gray-500">
                    <CheckSquare className="mx-auto mb-4 opacity-20" size={40} />
                    <p className="font-medium">No hay tareas asignadas en este momento.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tareas.map((item, index) => {
                        const titulo = item.tarea?.titulo || "Tarea sin título";
                        const descripcion = item.tarea?.descripcion || "Sin descripción adicional proporcionada.";
                        const empleado = item.empleado?.persona?.nombre || "No asignado";
                        const apellido = item.empleado?.persona?.apellidos || "";
                        const fecha = item.fechaLimite ? new Date(item.fechaLimite).toLocaleDateString("es-MX", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        }) : "Sin fecha";

                        return (
                            <div
                                key={item.idEnvio || index}
                                className="bg-[#0f141f] border border-gray-800/60 rounded-xl p-6 flex flex-col justify-between hover:border-gray-700/80 transition-all shadow-sm"
                            >
                                <div>
                                    {/* Fila superior: Estado */}
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-[10px] font-bold text-gray-600 tracking-wider uppercase">
                                            ID Envío: #{item.idEnvio || index + 1}
                                        </span>
                                        {getEstadoBadge(item.estado)}
                                    </div>

                                    {/* Título de la tarea */}
                                    <h3 className="text-white font-bold text-lg mb-2 tracking-tight">
                                        {titulo}
                                    </h3>

                                    {/* Descripción extendida */}
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                        {descripcion}
                                    </p>
                                </div>

                                {/* Fila inferior: Datos de asignación y fecha */}
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t border-gray-800/60 mt-auto">
                                    {/* Empleado asignado */}
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <User size={14} className="text-yellow-500/70" />
                                        <span className="text-xs font-medium text-gray-300">
                                            Asignado a: <strong className="text-white font-semibold">{empleado} {apellido}</strong>
                                        </span>
                                    </div>

                                    {/* Fecha Límite */}
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <Calendar size={14} />
                                        <span className="text-xs font-medium">
                                            Límite: {fecha}
                                        </span>
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}