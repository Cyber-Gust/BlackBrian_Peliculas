import "./globals.css";

export const metadata = {
  title: "Configurador de Insulfilm",
  description: "Simulador premium de películas automotivas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#0a0b10] text-white">
        {children}
      </body>
    </html>
  );
}
