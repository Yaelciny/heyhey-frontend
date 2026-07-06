import { Plus } from "lucide-react";

export default function TaskForm() {
    return (
        <div className="bg-[#0f141f] border border-gray-800/60 rounded-xl p-6 mb-8">

            {/* Encabezado del Formulario */}
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-yellow-500/10 text-yellow-500 p-1.5 rounded-lg border border-yellow-500/20">
                    <Plus size={16} strokeWidth={2.5} />
                </div>
                <h2 className="text-white font-bold text-sm">Asignar Nueva Tarea</h2>
            </div>

            {/* Formulario */}
            <form className="space-y-5">

                {/* Primera Fila de Campos */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

                    <div className="md:col-span-2">
                        <label className="block text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">
                            Nombre de la Tarea *
                        </label>
                        <input
                            type="text"
                            placeholder="Ej. Rediseñar flujo de onboarding"
                            className="w-full bg-[#111827] border border-gray-800 text-gray-300 text-sm rounded-lg p-2.5 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all placeholder-gray-600"
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">
                            Asignar a *
                        </label>
                        <select className="w-full bg-[#111827] border border-gray-800 text-gray-300 text-sm rounded-lg p-2.5 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all appearance-none cursor-pointer">
                            <option>Yael</option>
                            <option>Benyi</option>
                            <option>Montserrat</option>
                            <option>Ana García</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">
                            Fecha Límite *
                        </label>
                        <input
                            type="date"
                            className="w-full bg-[#111827] border border-gray-800 text-gray-300 text-sm rounded-lg p-2.5 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all "
                        />
                    </div>
                </div>

                {/* Segunda Fila de Campos */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">
                            Prioridad
                        </label>
                        <select className="w-full bg-[#111827] border border-gray-800 text-gray-300 text-sm rounded-lg p-2.5 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all appearance-none cursor-pointer">
                            <option>Media</option>
                            <option>Alta</option>
                            <option>Baja</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">
                            Estado Inicial
                        </label>
                        <select className="w-full bg-[#111827] border border-gray-800 text-gray-300 text-sm rounded-lg p-2.5 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all appearance-none cursor-pointer">
                            <option>Pendiente</option>
                            <option>En progreso</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">
                            Descripción (Opcional)
                        </label>
                        <input
                            type="text"
                            placeholder="Breve descripción de la tarea..."
                            className="w-full bg-[#111827] border border-gray-800 text-gray-300 text-sm rounded-lg p-2.5 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all placeholder-gray-600"
                        />
                    </div>
                </div>

                {/* Botón de Submit */}
                <div className="flex justify-end pt-2">
                    <button
                        type="button"
                        className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-sm px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Plus size={16} strokeWidth={2.5} />
                        Asignar Tarea
                    </button>
                </div>

            </form>
        </div>
    );
}