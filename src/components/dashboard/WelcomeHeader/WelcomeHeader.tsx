export default function WelcomeHeader() {
    return (
        <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
                Buenas tardes, <span className="text-yellow-500">Yael Magdaleno</span>
            </h1>
            <div className="flex items-center text-sm font-medium text-gray-500">
                <span>3 tareas pendientes</span>
                <span className="mx-2">•</span>
                <span>3 en progreso</span>
                <span className="mx-2">•</span>
                <span>Lunes, 6 de julio de 2026</span>
            </div>
        </div>
    );
}