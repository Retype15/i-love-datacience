import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  useEffect(() => {
    gsap.from(".fade-in", { opacity: 0, y: 50, duration: 1, stagger: 0.3 });
    gsap.from(".feature", {
      scrollTrigger: { trigger: ".feature", start: "top 80%" },
      opacity: 0,
      x: -50,
      duration: 1,
      stagger: 0.3,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <header className="h-screen flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-5xl font-bold fade-in">Bienvenido a I-Love-DataScience</h1>
        <p className="text-xl mt-4 fade-in">
          La plataforma definitiva para análisis de datos y visualización avanzada.
        </p>
        <Button className="mt-6 fade-in bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 text-lg rounded-lg">
          Empezar Ahora
        </Button>
      </header>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-20 bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12">Características Clave</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="feature p-6 bg-gray-700 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-semibold">Análisis Avanzado</h3>
            <p className="mt-2 text-gray-300">Procesa datos de manera eficiente con herramientas de IA.</p>
          </div>
          <div className="feature p-6 bg-gray-700 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-semibold">Visualización Interactiva</h3>
            <p className="mt-2 text-gray-300">Gráficos dinámicos para una mejor comprensión de datos.</p>
          </div>
          <div className="feature p-6 bg-gray-700 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-semibold">Colaboración en Tiempo Real</h3>
            <p className="mt-2 text-gray-300">Comparte y edita proyectos con tu equipo sin esfuerzo.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-center">
        <h2 className="text-3xl font-bold">Únete Ahora</h2>
        <p className="text-lg mt-4">Empieza a analizar datos como un profesional.</p>
        <Button className="mt-6 bg-white text-blue-600 px-6 py-3 text-lg rounded-lg hover:bg-gray-200">
          Regístrate Gratis
        </Button>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center bg-gray-900 border-t border-gray-700">
        <p className="text-gray-400">&copy; 2025 I-Love-DataScience. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
