import Link from "next/link";
import { LayoutDashboard, CheckSquare, Users, Settings } from "lucide-react";

export default function Sidebar() {
    return (
        <aside className="w-64 bg-[#0a0a0b] text-gray-400 h-screen border-r border-gray-800/60 flex flex-col">

            {/* Logotipo de la Agencia */}
            <div className="p-6 border-b border-gray-800/60 flex items-center gap-3">
                <div className="bg-yellow-500 text-black font-extrabold p-2 rounded-lg text-xs">
                    HH
                </div>
                <div>
                    <h2 className="text-white font-bold text-lg leading-tight tracking-tight">Hey Hey</h2>
                    <p className="text-[11px] text-gray-500 font-medium">Agencia Digital</p>
                </div>
            </div>

            {/* Navegación Principal */}
            <div className="flex-1 overflow-y-auto py-6 px-4">

                <p className="text-[10px] font-bold text-gray-500 mb-4 px-2 tracking-widest uppercase">
                    Principal
                </p>
                <nav className="space-y-1 mb-8">
                    {/* Opción Activa (Tablero) */}
                    <Link href="/" className="flex items-center justify-between px-3 py-2.5 bg-yellow-500/10 text-yellow-500 rounded-lg border border-yellow-500/20">
                        <div className="flex items-center gap-3">
                            <LayoutDashboard size={18} />
                            <span className="font-semibold text-sm">Tablero</span>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                    </Link>

                    <Link href="/tareas" className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-800/40 hover:text-gray-200 rounded-lg transition-colors">
                        <CheckSquare size={18} strokeWidth={1.5} />
                        <span className="font-medium text-sm">Tareas</span>
                    </Link>

                    <Link href="/equipo" className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-800/40 hover:text-gray-200 rounded-lg transition-colors">
                        <Users size={18} strokeWidth={1.5} />
                        <span className="font-medium text-sm">Equipo</span>
                    </Link>
                </nav>

                {/* Navegación de Sistema */}
                <p className="text-[10px] font-bold text-gray-500 mb-4 px-2 tracking-widest uppercase">
                    Sistema
                </p>
                <nav className="space-y-1">
                    <Link href="/configuracion" className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-800/40 hover:text-gray-200 rounded-lg transition-colors">
                        <Settings size={18} strokeWidth={1.5} />
                        <span className="font-medium text-sm">Configuración</span>
                    </Link>
                </nav>
            </div>

        </aside>
    );
}