// ===============================
// 1. DADOS DAS PELÍCULAS
// ===============================
const filmData = {
    g70: {
        name: "G70 • Alta Visibilidade",
        desc: "Máxima visibilidade com proteção UV. Ideal para quem não quer escurecer tanto.",
        specs: "Transparência 70% | Proteção UV 99% | Redução de Calor: Média",
        tint: 0.15
    },
    g50: {
        name: "G50 • Intermediário",
        desc: "Redução moderada de luminosidade, equilíbrio perfeito.",
        specs: "Transparência 50% | Proteção UV 99% | Redução de Calor: Alta",
        tint: 0.28
    },
    g20: {
        name: "G20 • Dark Comfort",
        desc: "Privacidade forte e visual esportivo.",
        specs: "Transparência 20% | Proteção UV 99% | Redução de Calor: Alta",
        tint: 0.55
    },
    g5: {
        name: "G5 • Blackout",
        desc: "Máxima privacidade. Quem olha de fora não vê nada.",
        specs: "Transparência 5% | Proteção UV 99% | Redução de Calor: Muito Alta",
        tint: 0.85
    },
    carbon: {
        name: "Nano Carbono • Elite",
        desc: "Película premium com nanotecnologia real anti calor.",
        specs: "Transparência variável | Proteção UV 100% | Rejeição IR: 80%",
        tint: 0.65
    }
};

// ===============================
// 2. ELEMENTOS UI
// ===============================
const ui = {
    carModel: document.getElementById("car-model"),
    filmLevel: document.getElementById("film-level"),
    btnDayNight: document.getElementById("toggle-day-night"),
    btnView: document.getElementById("toggle-view"),
    viewer: document.getElementById("car-viewer-3d"),

    statusModel: document.getElementById("status-model"),
    statusFilm: document.getElementById("status-film"),
    statusMode: document.getElementById("status-mode"),
    filmDesc: document.getElementById("film-description"),

    whatsappBtn: document.querySelector(".whatsapp-btn")
};

// ===============================
// 3. ESTADO
// ===============================
let state = {
    nightMode: false,
    internalView: false
};

// ===============================
// 4. FUNÇÕES PRINCIPAIS
// ===============================

// Troca o arquivo 3D (modelos genéricos)
function updateCarModel() {
    const model = ui.carModel.value;

    const paths = {
        sedan: "models/sedan.glb",
        suv: "models/suv.glb",
        hatch: "models/hatch.glb",
    };

    ui.viewer.src = paths[model];
}

// Aplica a "cor" nos vidros do 3D via CSS Filter (rápido e eficiente)
function updateGlassTint(tint) {
    // Deixa o vidro mais escuro usando brightness
    const brightness = 1 - tint;
    ui.viewer.style.filter = `brightness(${brightness})`;
}

// Alterna o HDRI do Model Viewer
function updateEnvironment() {
    if (state.nightMode) {
        ui.viewer.setAttribute("environment-image", "env/night.hdr");
        ui.viewer.setAttribute("exposure", "0.4");
    } else {
        ui.viewer.setAttribute("environment-image", "env/day.hdr");
        ui.viewer.setAttribute("exposure", "1");
    }
}

// Alterna visão interna → externa
function updateViewMode() {
    if (state.internalView) {
        // Câmera 1ª pessoa
        ui.viewer.setAttribute("camera-orbit", "0deg 90deg 0.05m");
        ui.viewer.setAttribute("camera-target", "0m 1m 0.4m");
    } else {
        // Visão normal externa
        ui.viewer.setAttribute("camera-orbit", "0deg 75deg 3m");
        ui.viewer.setAttribute("camera-target", "0m 1m 0m");
    }
}

// Atualiza textos da UI
function updateText() {
    const filmKey = ui.filmLevel.value;
    const filmInfo = filmData[filmKey];
    const modelName = ui.carModel.options[ui.carModel.selectedIndex].text;

    ui.statusModel.innerText = modelName;
    ui.statusFilm.innerText = filmInfo.name.split("•")[0].trim();
    ui.statusMode.innerText = state.nightMode ? "NOITE" : "DIA";

    ui.filmDesc.innerHTML = `
        <strong style="color: var(--primary-neon); font-size: 1.1em;">${filmInfo.name}</strong><br>
        <span style="display:block; margin: 8px 0; color: #ccc;">${filmInfo.desc}</span>
        <span style="font-size: 0.85em; color: var(--text-muted);">${filmInfo.specs}</span>
    `;
}

// Gera link do WhatsApp
function updateWhatsAppLink() {
    const film = filmData[ui.filmLevel.value];
    const model = ui.carModel.options[ui.carModel.selectedIndex].text;
    const mode = state.nightMode ? "Noite" : "Dia";

    const phone = "5532999734079";

    const text =
        `Olá! Vim pelo *Configurador Premium*.\n\n` +
        `🚘 *Carro:* ${model}\n` +
        `🕶 *Película:* ${film.name}\n` +
        `🌗 *Cenário:* ${mode}\n\n` +
        `Pode me informar valores e disponibilidade?`;

    ui.whatsappBtn.href = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

// Função geral
function updateInterface() {
    const filmKey = ui.filmLevel.value;
    const filmInfo = filmData[filmKey];

    updateCarModel();
    updateViewMode();
    updateEnvironment();
    updateGlassTint(filmInfo.tint);
    updateText();
    updateWhatsAppLink();
}

// ===============================
// 5. EVENTOS
// ===============================
ui.carModel.addEventListener("change", updateInterface);
ui.filmLevel.addEventListener("change", updateInterface);

ui.btnDayNight.addEventListener("click", () => {
    state.nightMode = !state.nightMode;
    ui.btnDayNight.classList.toggle("active-mode");
    ui.btnDayNight.querySelector(".text").innerText =
        state.nightMode ? "Modo Noite" : "Modo Dia";
    updateInterface();
});

ui.btnView.addEventListener("click", () => {
    state.internalView = !state.internalView;
    ui.btnView.classList.toggle("active-mode");
    ui.btnView.querySelector(".text").innerText =
        state.internalView ? "Interna" : "Externa";
    updateInterface();
});

// Inicialização
document.addEventListener("DOMContentLoaded", updateInterface);
