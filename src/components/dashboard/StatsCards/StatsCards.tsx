import { CheckSquare, TrendingUp, CheckCircle2, Users } from "lucide-react";

export default function StatsCards() {
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
                <div className="flex items-baseline gap-2">
                    <h2 className="text-3xl font-bold text-white">8</h2>
                </div>
                <p className="text-xs text-gray-500 mt-2 font-medium">+2 desde la semana pasada</p>
            </div>

            {/* Tarjeta 2: En Progreso */}
            <div className="bg-[#0f141f] border border-gray-800/60 p-5 rounded-xl shadow-sm">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">En Progreso</h3>
                    <div className="bg-purple-500/10 border border-purple-500/20 p-1.5 rounded-lg text-purple-400">
                        <TrendingUp size={16} strokeWidth={2} />
                    </div>
                </div>
                <div className="flex items-baseline gap-2">
                    <h2 className="text-3xl font-bold text-white">3</h2>
                </div>
                <p className="text-xs text-gray-500 mt-2 font-medium">2 vencen esta semana</p>
            </div>

            {/* Tarjeta 3: Completadas */}
            <div className="bg-[#0f141f] border border-gray-800/60 p-5 rounded-xl shadow-sm">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">Completadas</h3>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-1.5 rounded-lg text-emerald-400">
                        <CheckCircle2 size={16} strokeWidth={2} />
                    </div>
                </div>
                <div className="flex items-baseline gap-2">
                    <h2 className="text-3xl font-bold text-white">2</h2>
                </div>
                <p className="text-xs text-gray-500 mt-2 font-medium">25% tasa de cierre</p>
            </div>

            {/* Tarjeta 4: Miembros */}
            <div className="bg-[#0f141f] border border-gray-800/60 p-5 rounded-xl shadow-sm">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">Miembros</h3>
                    <div className="bg-blue-500/10 border border-blue-500/20 p-1.5 rounded-lg text-blue-400">
                        <Users size={16} strokeWidth={2} />
                    </div>
                </div>
                <div className="flex items-baseline gap-2">
                    <h2 className="text-3xl font-bold text-white">5</h2>
                </div>
                <p className="text-xs text-gray-500 mt-2 font-medium">Todos activos hoy</p>
            </div>

        </div>
    );
}