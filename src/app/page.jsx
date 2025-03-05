"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-6">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl"
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Bienvenido a <span className="text-blue-600">i-Love-DataScience</span>
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Explora proyectos de ciencia de datos y crea los tuyos de forma fácil
          e interactiva.
        </p>

        {/* Botones de acción */}
        <div className="flex space-x-4">
          <Link href="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md transition-all"
            >
              Ver proyectos actuales
            </motion.button>
          </Link>

          <Link href="/projects/upload">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow-md transition-all"
            >
              Crear y Subir Proyecto
            </motion.button>
          </Link>
        </div>
      </motion.section>

      {/* Sección de características */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-12 grid grid-cols-1 md-grid-cols-3 gap-6 text-center"
      >
        <FeatureCard
          title="Explora Proyectos"
          description="Descubre análisis de datos impactantes creados por otros usuarios."
        />
        <FeatureCard
          title="Visualización Interactiva"
          description="Gráficos dinámicos y visualizaciones impulsadas por Plotly."
        />
        <FeatureCard
          title="Comparte tu Trabajo"
          description="Publica y colabora con la comunidad en proyectos innovadores."
        />
      </motion.section>
    </main>
  );
}

// Componente de Tarjeta de Característica
function FeatureCard({ title, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-6 bg-white rounded-xl shadow-lg"
    >
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </motion.div>
  );
}
