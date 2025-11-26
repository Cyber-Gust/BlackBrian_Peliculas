"use client";

import { useState } from "react";
import Viewer3D from "@/components/Viewer3D";

const films = {
  g70: { name: "G70", tint: 0.0 },  // bem claro
  g50: { name: "G50", tint: -0.8 },  // moderado
  g20: { name: "G20", tint: -1.50 },  // escuro
  g5:  { name: "G5", tint: -2.5 },   // quase blackout
  carbon: { name: "Carbono", tint: 0.65 },
};

export default function SimuladorPage() {
  const [model, setModel] = useState("sedan");
  const [film, setFilm] = useState("g70");
  const [night, setNight] = useState(false);
  const [internalView, setInternalView] = useState(false);

  return (
    <main className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Configurador <span className="text-cyan-400">High Performance</span>
      </h1>

      <div className="grid md:grid-cols-[320px_1fr] gap-10">

        {/* Painel */}
        <aside className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-xl space-y-6">
          <div>
            <label className="text-cyan-400 text-sm">Modelo</label>
            <select
              value={model}
              onChange={e => setModel(e.target.value)}
              className="w-full mt-2 p-3 bg-black/30 rounded-md border border-white/20"
            >
              <option value="sedan">Sedan Executivo</option>
              <option value="suv">SUV Premium</option>
              <option value="hatch">Hatch Sport</option>
            </select>
          </div>

          <div>
            <label className="text-cyan-400 text-sm">Película</label>
            <select
              value={film}
              onChange={e => setFilm(e.target.value)}
              className="w-full mt-2 p-3 bg-black/30 rounded-md border border-white/20"
            >
              {Object.entries(films).map(([key, f]) => (
                <option key={key} value={key}>{f.name}</option>
              ))}
            </select>
          </div>

          <hr className="border-white/10" />

          <button
            onClick={() => setNight(v => !v)}
            className={`w-full p-3 rounded-md border ${
              night ? "bg-cyan-400 text-black" : "text-white border-white/30"
            }`}
          >
            {night ? "Modo Noite" : "Modo Dia"}
          </button>

          <button
            onClick={() => setInternalView(v => !v)}
            className={`w-full p-3 rounded-md border ${
              internalView ? "bg-cyan-400 text-black" : "text-white border-white/30"
            }`}
          >
            {internalView ? "Visão Interna" : "Visão Externa"}
          </button>
        </aside>

        {/* Visualizador */}
        <div className="space-y-6">
          <Viewer3D
            model={model}
            filmTint={films[film].tint}
            night={night}
            internalView={internalView}
          />

          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <p className="text-cyan-400 font-bold">{films[film].name}</p>
            <p className="text-white/60 text-sm mt-2">
              Transparência simulada via filtro digital. Experiência próxima ao real.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
