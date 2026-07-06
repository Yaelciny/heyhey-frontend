import { CheckSquare } from "lucide-react";

export default function TaskTable() {
    return (
        <div className="bg-[#0f141f] border border-gray-800/60 rounded-xl p-6">

            {/* Encabezado y Pestañas */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-gray-800/60 pb-4">
                <div className="flex items-center gap-3">
                    <div className="text-yellow-500">
                        <CheckSquare size={20} strokeWidth={2} />
                    </div>
                    <h2 className="text-white font-bold text-sm">Registro de Tareas</h2>
                </div>

                <div className="flex space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                    <button className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap">
                        Todas <span className="ml-1 bg-yellow-500 text-black px-1.5 py-0.5 rounded text-[10px]">8</span>
                    </button>
                    <button className="text-gray-400 hover:text-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap">
                        En progreso <span className="ml-1 bg-gray-800 px-1.5 py-0.5 rounded text-[10px]">3</span>
                    </button>
                    <button className="text-gray-400 hover:text-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap">
                        Pendiente <span className="ml-1 bg-gray-800 px-1.5 py-0.5 rounded text-[10px]">3</span>
                    </button>
                    <button className="text-gray-400 hover:text-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap">
                        Completada <span className="ml-1 bg-gray-800 px-1.5 py-0.5 rounded text-[10px]">2</span>
                    </button>
                </div>
            </div>

            {/* Tabla de Registros */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead>
                        <tr className="text-[10px] font-bold text-gray-500 tracking-widest uppercase border-b border-gray-800/60">
                            <th className="pb-3 font-medium">Tarea</th>
                            <th className="pb-3 font-medium">Asignado A</th>
                            <th className="pb-3 font-medium">Prioridad</th>
                            <th className="pb-3 font-medium">Estado</th>
                            <th className="pb-3 font-medium">Fecha Límite</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/60">

                        {/* Fila 1 */}
                        <tr className="hover:bg-gray-800/20 transition-colors">
                            <td className="py-4 text-white font-bold text-sm">Diseñar landing page Q3</td>
                            <td className="py-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-purple-900/40 text-purple-400 flex items-center justify-center text-[10px] font-bold border border-purple-500/20">MO</div>
                                    <span className="text-gray-400 text-xs font-medium">Montserrat</span>
                                </div>
                            </td>
                            <td className="py-4">
                                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span> Alta
                                </span>
                            </td>
                            <td className="py-4">
                                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-purple-500/10 text-purple-400 text-xs font-medium border border-purple-500/20">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span> En progreso
                                </span>
                            </td>
                            <td className="py-4 text-gray-500 text-xs font-medium">15 jul 2026</td>
                        </tr>

                        {/* Fila 2 */}
                        <tr className="hover:bg-gray-800/20 transition-colors">
                            <td className="py-4 text-white font-bold text-sm">Configurar CI/CD pipeline</td>
                            <td className="py-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-blue-900/40 text-blue-400 flex items-center justify-center text-[10px] font-bold border border-blue-500/20">RI</div>
                                    <span className="text-gray-400 text-xs font-medium">Rico</span>
                                </div>
                            </td>
                            <td className="py-4">
                                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span> Alta
                                </span>
                            </td>
                            <td className="py-4">
                                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-gray-800 text-gray-400 text-xs font-medium border border-gray-700">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span> Pendiente
                                </span>
                            </td>
                            <td className="py-4 text-gray-500 text-xs font-medium">10 jul 2026</td>
                        </tr>

                        {/* Fila 3 */}
                        <tr className="hover:bg-gray-800/20 transition-colors">
                            <td className="py-4 text-white font-bold text-sm">Actualizar dependencias</td>
                            <td className="py-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-emerald-900/40 text-emerald-400 flex items-center justify-center text-[10px] font-bold border border-emerald-500/20">BE</div>
                                    <span className="text-gray-400 text-xs font-medium">Benyi</span>
                                </div>
                            </td>
                            <td className="py-4">
                                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-gray-800 text-gray-400 text-xs font-medium border border-gray-700">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span> Baja
                                </span>
                            </td>
                            <td className="py-4">
                                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Completada
                                </span>
                            </td>
                            <td className="py-4 text-gray-500 text-xs font-medium">01 jul 2026</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    );
}