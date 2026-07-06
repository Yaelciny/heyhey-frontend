import { Search, Bell, ChevronDown } from "lucide-react";

export default function Navbar() {
    return (
        <header className="h-16 flex items-center justify-between px-8 bg-[#0B0F19] border-b border-gray-800/60 sticky top-0 z-10">

            {/* Buscador */}
            <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                    type="text"
                    placeholder="Buscar tareas..."
                    className="w-full bg-[#111827] text-gray-300 text-sm rounded-lg pl-10 pr-12 py-2 border border-gray-800 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all placeholder-gray-600"
                />
            </div>

            {/* Perfil y Notificaciones */}
            <div className="flex items-center gap-6 ml-auto">

                {/* Campanita */}
                <button className="relative text-gray-400 hover:text-white transition-colors">
                    <Bell size={20} />
                    <span className="absolute -top-1.5 -right-1.5 bg-yellow-500 text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        3
                    </span>
                </button>

                {/* Separador vertical */}
                <div className="h-6 w-0.5 bg-gray-800"></div>

                {/* Usuario (Simulado con los datos de tu imagen) */}
                <button className="flex items-center gap-3 hover:bg-gray-800/40 p-1.5 rounded-lg transition-colors text-left">
                    <div className="w-8 h-8 rounded-full bg-yellow-900/30 text-yellow-500 border border-yellow-500/20 flex items-center justify-center font-bold text-xs">
                        YM
                    </div>
                    <div className="hidden md:block">
                        <p className="text-sm font-bold text-white leading-tight">Yael Magdaleno</p>
                        <p className="text-xs text-gray-500 font-medium">Administrador</p>
                    </div>
                    <ChevronDown size={14} className="text-gray-500 ml-1" />
                </button>

            </div>
        </header>
    );
}