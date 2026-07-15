"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CheckSquare, Users, Settings } from "lucide-react";

export default function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { href: "/", icon: LayoutDashboard, label: "Tablero" },
        { href: "/tareas", icon: CheckSquare, label: "Tareas" },
        { href: "/equipo", icon: Users, label: "Equipo" },
    ];

    const systemItems = [
        { href: "/configuracion", icon: Settings, label: "Configuración" },
    ];

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
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive
                                        ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 justify-between"
                                        : "hover:bg-gray-800/40 hover:text-gray-200"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                                    <span className={`text-sm ${isActive ? "font-semibold" : "font-medium"}`}>{item.label}</span>
                                </div>
                                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Navegación de Sistema */}
                <p className="text-[10px] font-bold text-gray-500 mb-4 px-2 tracking-widest uppercase">
                    Sistema
                </p>
                <nav className="space-y-1">
                    {systemItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive
                                        ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 justify-between"
                                        : "hover:bg-gray-800/40 hover:text-gray-200"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                                    <span className={`text-sm ${isActive ? "font-semibold" : "font-medium"}`}>{item.label}</span>
                                </div>
                                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>}
                            </Link>
                        );
                    })}
                </nav>
            </div>

        </aside>
    );
}