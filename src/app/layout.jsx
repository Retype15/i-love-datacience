export const metadata = {
  title: "i-Love-DataScience",
  description: "Plataforma para compartir proyectos de ciencia de datos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <nav>
          <h1>📊 i-Love-DataScience</h1>
          <a href="/projects">Proyectos</a>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
