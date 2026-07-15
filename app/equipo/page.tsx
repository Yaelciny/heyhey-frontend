"use client";

import { useEffect, useState } from "react";
import { Users, Mail, Phone, UserPlus, Trash2, Edit3, X, Save } from "lucide-react";

export default function EquipoPage() {
    const [equipo, setEquipo] = useState<any[]>([]);

    // Estados para controlar el formulario
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    // Estados para los campos del EmpleadoDTO
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasenia, setContrasenia] = useState("");

    // 1. LEER: Cargar empleados activos
    const cargarEquipo = () => {
        fetch("http://localhost:8081/system/api/v1/empleado")
            .then((response) => response.json())
            .then((data) => setEquipo(data))
            .catch((error) => console.error("Error cargando equipo:", error));
    };

    useEffect(() => {
        cargarEquipo();
    }, []);

    // 2. CREAR o ACTUALIZAR (POST / PUT)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!nombre || !apellidos || !correo) {
            alert("Por favor, llena los campos obligatorios (*)");
            return;
        }

        const empleadoData = {
            nombre,
            apellidos,
            telefono,
            correo,
            // Si estamos editando, la contraseña puede ir vacía si el backend lo permite
            contrasenia: contrasenia || "123456"
        };

        const url = editingId
            ? `http://localhost:8081/system/api/v1/empleado/${editingId}`
            : "http://localhost:8081/system/api/v1/empleado";

        const metodo = editingId ? "PUT" : "POST";

        fetch(url, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(empleadoData)
        })
            .then((res) => {
                if (res.ok) {
                    alert(editingId ? "¡Empleado actualizado!" : "¡Empleado creado con éxito!");
                    limpiarFormulario();
                    cargarEquipo(); // Recargamos la lista en tiempo real
                } else {
                    alert("Hubo un problema al procesar la solicitud.");
                }
            })
            .catch((err) => console.error("Error en la operación:", err));
    };

    // 3. BORRADO LÓGICO (DELETE)
    const handleEliminar = (idEmpleado: number, nombreCompleto: string) => {
        if (confirm(`¿Estás seguro de que deseas dar de baja a ${nombreCompleto}?`)) {
            fetch(`http://localhost:8081/system/api/v1/empleado/${idEmpleado}`, {
                method: "DELETE"
            })
                .then((res) => {
                    if (res.ok) {
                        alert("Empleado dado de baja (Inactivo).");
                        cargarEquipo(); // Se borra de la vista automáticamente
                    } else {
                        alert("Error al intentar dar de baja.");
                    }
                })
                .catch((err) => console.error("Error en el borrado lógico:", err));
        }
    };

    // Activar modo edición cargando los datos en los inputs
    const prepararEdicion = (emp: any) => {
        setEditingId(emp.idEmpleado);
        setNombre(emp.persona?.nombre || "");
        setApellidos(emp.persona?.apellidos || "");
        setTelefono(emp.persona?.telefono || "");
        setCorreo(emp.persona?.correo || "");
        setContrasenia(""); // No cargamos la contraseña por seguridad
        setShowForm(true);
    };

    const limpiarFormulario = () => {
        setEditingId(null);
        setNombre("");
        setApellidos("");
        setTelefono("");
        setCorreo("");
        setContrasenia("");
        setShowForm(false);
    };

    return (
        <div className="w-full">
            {/* Encabezado Principal */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
                        Directorio del Equipo
                    </h1>
                    <p className="text-sm font-medium text-gray-500">
                        Administra los accesos, perfiles y estados de los colaboradores de la agencia.
                    </p>
                </div>

                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-sm px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2 shadow-sm shadow-yellow-500/10"
                    >
                        <UserPlus size={16} strokeWidth={2.5} />
                        Nuevo Empleado
                    </button>
                )}
            </div>

            {/* Formulario Desplegable (Crear / Editar) */}
            {showForm && (
                <div className="bg-[#0f141f] border border-gray-800/60 rounded-xl p-6 mb-8 transition-all">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-white font-bold text-sm flex items-center gap-2">
                            {editingId ? <Edit3 size={16} className="text-yellow-500" /> : <UserPlus size={16} className="text-yellow-500" />}
                            {editingId ? "Editar Datos del Empleado" : "Registrar Nuevo Empleado"}
                        </h2>
                        <button onClick={limpiarFormulario} className="text-gray-500 hover:text-gray-300 transition-colors">
                            <X size={18} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Nombre *</label>
                                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full bg-[#111827] border border-gray-800 text-gray-300 text-sm rounded-lg p-2.5 focus:outline-none focus:border-yellow-500/40" placeholder="Ej. Rico" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Apellidos *</label>
                                <input type="text" value={apellidos} onChange={(e) => setApellidos(e.target.value)} className="w-full bg-[#111827] border border-gray-800 text-gray-300 text-sm rounded-lg p-2.5 focus:outline-none focus:border-yellow-500/40" placeholder="Ej. Martínez" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Correo Electrónico *</label>
                                <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} className="w-full bg-[#111827] border border-gray-800 text-gray-300 text-sm rounded-lg p-2.5 focus:outline-none focus:border-yellow-500/40" placeholder="correo@agencia.com" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Teléfono</label>
                                <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="w-full bg-[#111827] border border-gray-800 text-gray-300 text-sm rounded-lg p-2.5 focus:outline-none focus:border-yellow-500/40" placeholder="4771234567" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">{editingId ? "Nueva Contraseña (Opcional)" : "Contraseña *"}</label>
                                <input type="password" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} className="w-full bg-[#111827] border border-gray-800 text-gray-300 text-sm rounded-lg p-2.5 focus:outline-none focus:border-yellow-500/40" placeholder="••••••••" />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <button type="button" onClick={limpiarFormulario} className="text-gray-400 hover:text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                                Cancelar
                            </button>
                            <button type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-sm px-5 py-2 rounded-lg transition-colors flex items-center gap-2">
                                <Save size={16} />
                                {editingId ? "Guardar Cambios" : "Registrar"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Grid de Tarjetas de Perfil */}
            {equipo.length === 0 ? (
                <div className="bg-[#0f141f] border border-gray-800/60 rounded-xl p-12 text-center text-gray-500">
                    <Users className="mx-auto mb-4 opacity-20" size={40} />
                    <p className="font-medium">No hay empleados activos en el sistema.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {equipo.map((emp, index) => {
                        const persona = emp.persona || {};
                        const nombreCompleto = `${persona.nombre || "Usuario"} ${persona.apellidos || ""}`;
                        const iniciales = (persona.nombre || "US").substring(0, 2).toUpperCase();

                        return (
                            <div key={emp.idEmpleado || index} className="bg-[#0f141f] border border-gray-800/60 rounded-xl p-6 flex flex-col justify-between shadow-sm hover:border-gray-700 transition-all group">
                                <div>
                                    {/* Fila Superior con Acciones de Admin */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 rounded-full bg-blue-900/40 text-blue-400 flex items-center justify-center font-bold text-lg border border-blue-500/20">
                                            {iniciales}
                                        </div>

                                        {/* Botones de gestión rápidos */}
                                        <div className="flex gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => prepararEdicion(emp)}
                                                className="p-1.5 hover:bg-gray-800 rounded-md text-gray-400 hover:text-yellow-500 transition-colors"
                                                title="Editar Empleado"
                                            >
                                                <Edit3 size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleEliminar(emp.idEmpleado, nombreCompleto)}
                                                className="p-1.5 hover:bg-gray-800 rounded-md text-gray-400 hover:text-red-400 transition-colors"
                                                title="Dar de baja"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-white font-bold tracking-tight text-base">{nombreCompleto}</h3>
                                        <span className="inline-block text-[10px] font-bold text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded mt-1 uppercase tracking-wider">
                                            Empleado Activo
                                        </span>
                                    </div>
                                </div>

                                {/* Datos de Contacto */}
                                <div className="space-y-2 mt-6 border-t border-gray-800/60 pt-4">
                                    <div className="flex items-center gap-3 text-gray-400">
                                        <Mail size={13} className="text-gray-600" />
                                        <span className="text-xs font-medium truncate">{persona.correo}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-400">
                                        <Phone size={13} className="text-gray-600" />
                                        <span className="text-xs font-medium">{persona.telefono || "Sin teléfono"}</span>
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