export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center text-center px-6 py-32">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Studio <span className="text-cyan-400">Insulfilm</span>
      </h1>

      <p className="text-white/70 max-w-xl mb-10">
        Experimente nosso simulador premium e visualize as películas em modelos
        3D com alta fidelidade. Interativo, leve e realista.
      </p>

      <a
        href="/simulador"
        className="px-8 py-4 rounded-xl text-lg font-semibold border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all"
      >
        Abrir Simulador
      </a>
    </main>
  );
}
