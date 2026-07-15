"use client";

import { useState, useEffect } from "react";
import { Send, Calendar, Plus, X, Tag } from "lucide-react";

export default function TaskForm() {
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [idEmpleado, setIdEmpleado] = useState("");
    const [fechaLimite, setFechaLimite] = useState("");

    // Estados para Categorías
    const [categorias, setCategorias] = useState<any[]>([]);
    const [idCategoria, setIdCategoria] = useState("");
    const [modoNuevaCategoria, setModoNuevaCategoria] = useState(false);
    const [nombreNuevaCategoria, setNombreNuevaCategoria] = useState("");

    const [empleados, setEmpleados] = useState<any[]>([]);

    // Cargar Empleados y Categorías al inicio
    const cargarDatosPrevios = () => {
        fetch("http://localhost:8081/system/api/v1/empleado")
            .then((res) => res.json())
            .then((data) => { if (Array.isArray(data)) setEmpleados(data); })
            .catch((err) => console.error("Error empleados:", err));

        fetch("http://localhost:8081/system/api/v1/categoria-tarea") // Ajusta la URL si es distinta
            .then((res) => res.json())
            .then((data) => { if (Array.isArray(data)) setCategorias(data); })
            .catch((err) => console.error("Error categorías:", err));
    };

    useEffect(() => {
        cargarDatosPrevios();
    }, []);

    // Función para guardar solo la categoría nueva
    const handleGuardarCategoriaRapida = () => {
        if (!nombreNuevaCategoria.trim()) return;

        fetch("http://localhost:8081/system/api/v1/categoria-tarea", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombreCategoria: nombreNuevaCategoria }),
        })
            .then((res) => res.json())
            .then((data) => {
                // La categoría se creó, recargamos la lista
                cargarDatosPrevios();
                setIdCategoria(data.idCategoria.toString()); // Seleccionamos la nueva automáticamente
                setModoNuevaCategoria(false); // Cerramos el input
                setNombreNuevaCategoria("");
            })
            .catch((err) => console.error("Error creando categoría:", err));
    };

    // Función original para guardar la tarea completa
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!titulo || !idEmpleado || !fechaLimite || !idCategoria) {
            alert("Por favor llena los campos obligatorios (*).");
            return;
        }

        const nuevaTarea = {
            tarea: {
                titulo: titulo,
                descripcion: descripcion,
                // CAMBIO AQUÍ: Cambia 'categoriaTarea' por 'categoria'
                categoria: {
                    idCategoria: parseInt(idCategoria)
                }
            },
            empleado: { idEmpleado: parseInt(idEmpleado) },
            administrador: { idAdministrador: 1 },
            estado: 1,
            fechaLimite: `${fechaLimite}T23:59:59`
        };

        fetch("http://localhost:8081/system/api/v1/tareas-enviadas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaTarea),
        })
            .then((res) => {
                if (res.ok) {
                    window.location.reload();
                } else {
                    alert("Hubo un error al crear la tarea.");
                }
            })
            .catch((err) => console.error("Error en POST:", err));
    };

    return (
        <div className="bg-[#0f141f] border border-gray-800/60 rounded-xl p-6 mb-8">
            <div className="mb-6">
                <h2 className="text-white font-bold text-sm flex items-center gap-2">
                    <Send size={16} className="text-yellow-500" />
                    Asignar Nueva Tarea
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Fila 1: Título y Categoría */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">Título *</label>
                        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="w-full bg-[#111827] border border-gray-800 text-gray-300 text-sm rounded-lg p-2.5 focus:outline-none focus:border-yellow-500/50" />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">Categoría *</label>

                        {/* Si NO estamos creando una categoría, mostramos el Select */}
                        {!modoNuevaCategoria ? (
                            <div className="flex gap-2">
                                <select value={idCategoria} onChange={(e) => setIdCategoria(e.target.value)} className="w-full bg-[#111827] border border-gray-800 text-gray-300 text-sm rounded-lg p-2.5 focus:outline-none focus:border-yellow-500/50">
                                    <option value="">Selecciona...</option>
                                    {categorias.map((cat) => (
                                        <option key={cat.idCategoria} value={cat.idCategoria}>{cat.nombreCategoria}</option>
                                    ))}
                                </select>
                                <button type="button" onClick={() => setModoNuevaCategoria(true)} className="bg-gray-800 hover:bg-gray-700 text-white px-3 rounded-lg border border-gray-700 transition-colors" title="Crear nueva categoría">
                                    <Plus size={16} />
                                </button>
                            </div>
                        ) : (
                            /* Si SÍ estamos creando, mostramos el Input de texto */
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={nombreNuevaCategoria}
                                    onChange={(e) => setNombreNuevaCategoria(e.target.value)}
                                    placeholder="Nombre de la nueva categoría..."
                                    className="w-full bg-[#111827] border border-yellow-500 text-gray-300 text-sm rounded-lg p-2.5 focus:outline-none"
                                    autoFocus
                                />
                                <button type="button" onClick={handleGuardarCategoriaRapida} className="bg-yellow-500 hover:bg-yellow-400 text-black px-3 rounded-lg transition-colors font-bold text-xs">
                                    Guardar
                                </button>
                                <button type="button" onClick={() => setModoNuevaCategoria(false)} className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-3 rounded-lg transition-colors">
                                    <X size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Fila 2: Empleado y Fecha */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">Empleado *</label>
                        <select value={idEmpleado} onChange={(e) => setIdEmpleado(e.target.value)} className="w-full bg-[#111827] border border-gray-800 text-gray-300 text-sm rounded-lg p-2.5 focus:outline-none focus:border-yellow-500/50">
                            <option value="">Selecciona...</option>
                            {empleados.map((emp) => (
                                <option key={emp.idEmpleado} value={emp.idEmpleado}>{emp.persona?.nombre} {emp.persona?.apellidos}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">Fecha Límite *</label>
                        <div className="relative">
                            <input type="date" value={fechaLimite} onChange={(e) => setFechaLimite(e.target.value)} className="w-full bg-[#111827] border border-gray-800 text-gray-300 text-sm rounded-lg p-2.5 focus:outline-none focus:border-yellow-500/50 pl-10" />
                            <Calendar size={16} className="absolute left-3 top-3 text-gray-500" />
                        </div>
                    </div>
                </div>

                {/* Fila 3: Descripción */}
                <div>
                    <label className="block text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">Descripción</label>
                    <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="w-full bg-[#111827] border border-gray-800 text-gray-300 text-sm rounded-lg p-2.5 focus:outline-none focus:border-yellow-500/50 min-h-[42px]" rows={1} />
                </div>

                <div className="flex justify-end pt-2">
                    <button type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-sm px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2">
                        <Send size={16} />
                        Asignar Tarea
                    </button>
                </div>
            </form>
        </div>
    );
}