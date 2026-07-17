"use client";

import { useState, useEffect } from "react";
import { CheckSquare, Play, CheckCircle2, RefreshCw } from "lucide-react";

export default function TaskTable() {
    const [tareas, setTareas] = useState<any[]>([]);

    // 1. LEER: Función para cargar las tareas desde el backend
    const cargarTareas = () => {
        fetch("http://localhost:8081/system/api/v1/tareas-enviadas")
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setTareas(data);
                } else {
                    setTareas([]);
                }
            })
            .catch((error) => console.error("Error cargando la tabla:", error));
    };

    useEffect(() => {
        cargarTareas();
    }, []);

    // 2. ACTUALIZAR: Función para tocar la nueva puerta PUT de Spring Boot
    const handleCambiarEstado = (idEnvio: number, nuevoEstado: number) => {
        fetch(`http://localhost:8081/system/api/v1/tareas-enviadas/${idEnvio}/estado`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevoEstado), // Mandamos el número entero limpio
        })
            .then((response) => {
                if (response.ok) {
                    // Si el backend responde bien, recargamos la lista al instante
                    cargarTareas();
                } else {
                    alert("No se pudo actualizar el estado de la tarea.");
                }
            })
            .catch((error) => console.error("Error actualizando estado:", error));
    };

    // Función auxiliar para pintar el diseño del estado (Se mantiene igual)
    const renderEstado = (estadoInt: number) => {
        if (estadoInt === 1) {
            return (
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-gray-800 text-gray-400 text-xs font-medium border border-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span> Pendiente
                </span>
            );
        }
        if (estadoInt === 2) {
            return (
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-purple-500/10 text-purple-400 text-xs font-medium border border-purple-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span> En progreso
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Completada
            </span>
        );
    };

    return (
        <div className="bg-[#0f141f] border border-gray-800/60 rounded-xl p-6">

            {/* Encabezado */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-gray-800/60 pb-4">
                <div className="flex items-center gap-3">
                    <div className="text-yellow-500">
                        <CheckSquare size={20} strokeWidth={2} />
                    </div>
                    <h2 className="text-white font-bold text-sm">Registro de Tareas</h2>
                </div>

                <div className="flex space-x-2">
                    <button
                        onClick={cargarTareas}
                        className="bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white p-1.5 rounded-lg border border-gray-700 transition-colors"
                        title="Refrescar tabla"
                    >
                        <RefreshCw size={14} />
                    </button>
                    <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap">
                        Todas <span className="ml-1 bg-yellow-500 text-black px-1.5 py-0.5 rounded text-[10px]">{tareas.length}</span>
                    </span>
                </div>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead>
                        <tr className="text-[10px] font-bold text-gray-500 tracking-widest uppercase border-b border-gray-800/60">
                            <th className="pb-3 font-medium">Tarea</th>
                            <th className="pb-3 font-medium">Asignado A</th>
                            <th className="pb-3 font-medium">Estado</th>
                            <th className="pb-3 font-medium">Fecha Límite</th>
                            <th className="pb-3 font-medium text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/60">

                        {tareas.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-8 text-center text-gray-500">
                                    No hay tareas registradas aún.
                                </td>
                            </tr>
                        ) : (
                            tareas.map((item, index) => {
                                const tituloTarea = item.tarea?.titulo || "Sin título";
                                const nombreEmpleado = item.empleado?.persona?.nombre || "Usuario";
                                const iniciales = nombreEmpleado.substring(0, 2).toUpperCase();
                                const fecha = item.fechaLimite ? new Date(item.fechaLimite).toLocaleDateString() : "Sin fecha";

                                return (
                                    <tr key={item.idEnvio || index} className="hover:bg-gray-800/20 transition-colors">
                                        <td className="py-4 text-white font-bold text-sm">{tituloTarea}</td>

                                        <td className="py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-blue-900/40 text-blue-400 flex items-center justify-center text-[10px] font-bold border border-blue-500/20">
                                                    {iniciales}
                                                </div>
                                                <span className="text-gray-400 text-xs font-medium">{nombreEmpleado}</span>
                                            </div>
                                        </td>

                                        <td className="py-4">
                                            {renderEstado(item.estado)}
                                        </td>

                                        <td className="py-4 text-gray-500 text-xs font-medium">{fecha}</td>

                                        {/* BOTONES DE ACCIÓN INTERACTIVOS */}
                                        <td className="py-4 text-center">
                                            <div className="flex justify-center gap-2">
                                                {item.estado === 1 && (
                                                    <button
                                                        onClick={() => handleCambiarEstado(item.idEnvio, 2)}
                                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 text-xs font-bold border border-purple-500/20 transition-colors"
                                                    >
                                                        <Play size={12} fill="currentColor" />
                                                        Iniciar
                                                    </button>
                                                )}
                                                {item.estado === 2 && (
                                                    <button
                                                        onClick={() => handleCambiarEstado(item.idEnvio, 3)}
                                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/20 transition-colors"
                                                    >
                                                        <CheckCircle2 size={12} />
                                                        Completar
                                                    </button>
                                                )}
                                                {item.estado >= 3 && (
                                                    <span className="text-gray-600 text-xs italic font-medium">
                                                        Sin acciones
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
}