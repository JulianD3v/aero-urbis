/* AeroUrbis — prototipo conceptual interactivo
   Flujo del documento: acceso, panel, comparador, alerta, ladera, reporte, sincronización y confirmación. */

const APP_VERSION = 1;
const SCENARIO_TODAY = "2026-10-25";
const REPORT_DATE_LABEL = "25 de octubre de 2026";

const USERS = {
    "juan.talero@medellin.gov.co": {
        password: "AeroUrbis2026",
        name: "Juan Carlos Talero",
        shortName: "Juan Carlos",
        role: "Inspector de campo",
        org: "DAGRD · Alcaldía de Medellín",
        sector: "publico",
        initials: "JT"
    },
    "laura.gomez@bancolombia.com.co": {
        password: "AeroUrbis2026",
        name: "Laura Gómez",
        shortName: "Laura",
        role: "Analista de riesgo hipotecario",
        org: "Bancolombia",
        sector: "privado",
        initials: "LG"
    }
};

const CREWS = [
    { id: "nororiente", name: "Zona Nororiente", communes: [1, 2, 3, 4] },
    { id: "noroccidental", name: "Zona Noroccidental", communes: [5, 6, 7] },
    { id: "centro-oriental", name: "Zona Centro-Oriental", communes: [8, 9, 10] },
    { id: "centro-occidental", name: "Zona Centro-Occidental", communes: [11, 12, 13] },
    { id: "suroriental", name: "Zona Suroriental", communes: [14] },
    { id: "suroccidental", name: "Zona Suroccidental", communes: [15, 16] }
];

const BANK_UNITS = [
    { id: "garantias", name: "Mesa de garantías hipotecarias" },
    { id: "credito", name: "Core de crédito hipotecario" },
    { id: "avaluos", name: "Unidad de avalúos" }
];

const COMMUNES = [
    [1, "Popular"], [2, "Santa Cruz"], [3, "Manrique"], [4, "Aranjuez"],
    [5, "Castilla"], [6, "Doce de Octubre"], [7, "Robledo"], [8, "Villa Hermosa"],
    [9, "Buenos Aires"], [10, "La Candelaria"], [11, "Laureles"], [12, "La América"],
    [13, "San Javier"], [14, "El Poblado"], [15, "Guayabal"], [16, "Belén"]
];

const SEED = [
    { id: "AU-2412", commune: 3, communeName: "Manrique", neighborhood: "La Cruz", types: ["construccion"], lat: 6.2704, lng: -75.5492, areaM2: 45, risk: "alto", slope: 42, stability: "Comprometida", stabilityDetail: "Alerta de Deslizamiento", mitigable: false, confidence: 96, source: "Ortofoto DAGRD + dron", detected: "2026-10-24", firstSeen: "2026-10-18", status: "nueva", rain30: 186, vegetation: 22, roadM: 40, x: 68, y: 30, summary: "Nueva estructura detectada sobre ladera de alta pendiente, sin correspondencia en la capa catastral." },
    { id: "AU-2411", commune: 3, communeName: "Manrique", neighborhood: "Versalles", types: ["movimiento"], lat: 6.2751, lng: -75.5438, areaM2: 120, risk: "alto", slope: 33, stability: "Inestable", stabilityDetail: "Requiere monitoreo semanal", mitigable: true, confidence: 91, source: "Sentinel-2", detected: "2026-10-22", firstSeen: "2026-09-30", status: "nueva", rain30: 174, vegetation: 46, roadM: 110, x: 74, y: 24, summary: "Descapote y terraza reciente en la corona de la ladera." },
    { id: "AU-2410", commune: 8, communeName: "Villa Hermosa", neighborhood: "Enciso", types: ["construccion", "movimiento"], lat: 6.2442, lng: -75.5411, areaM2: 78, risk: "alto", slope: 38, stability: "Comprometida", stabilityDetail: "Alerta de Deslizamiento", mitigable: false, confidence: 93, source: "Captura dron", detected: "2026-10-23", firstSeen: "2026-10-02", status: "nueva", rain30: 162, vegetation: 28, roadM: 25, x: 73, y: 52, summary: "Ampliación de vivienda y movimiento de tierra en borde de quebrada." },
    { id: "AU-2409", commune: 8, communeName: "Villa Hermosa", neighborhood: "Villatina", types: ["movimiento"], lat: 6.2518, lng: -75.5384, areaM2: 210, risk: "alto", slope: 29, stability: "Inestable", stabilityDetail: "Requiere monitoreo", mitigable: true, confidence: 88, source: "Sentinel-2", detected: "2026-10-20", firstSeen: "2026-08-14", status: "nueva", rain30: 151, vegetation: 40, roadM: 80, x: 80, y: 46, summary: "Cicatriz de deslizamiento superficial ampliada respecto a enero." },
    { id: "AU-2408", commune: 1, communeName: "Popular", neighborhood: "Santo Domingo Savio", types: ["construccion"], lat: 6.2914, lng: -75.5456, areaM2: 62, risk: "alto", slope: 36, stability: "Comprometida", stabilityDetail: "Alerta de Deslizamiento", mitigable: false, confidence: 90, source: "Ortofoto DAGRD", detected: "2026-10-21", firstSeen: "2026-10-11", status: "nueva", rain30: 143, vegetation: 24, roadM: 15, x: 58, y: 16, summary: "Nuevo módulo habitacional en zona de alto riesgo no mitigable." },
    { id: "AU-2407", commune: 13, communeName: "San Javier", neighborhood: "El Salado", types: ["construccion"], lat: 6.2559, lng: -75.6124, areaM2: 54, risk: "alto", slope: 31, stability: "Inestable", stabilityDetail: "Requiere visita", mitigable: true, confidence: 87, source: "Captura dron", detected: "2026-10-19", firstSeen: "2026-09-12", status: "nueva", rain30: 138, vegetation: 44, roadM: 60, x: 28, y: 62, summary: "Cubierta nueva y cerramiento en un lote que en enero estaba vacío." },
    { id: "AU-2406", commune: 7, communeName: "Robledo", neighborhood: "Bello Horizonte", types: ["movimiento"], lat: 6.2728, lng: -75.6051, areaM2: 96, risk: "medio", slope: 22, stability: "Vigilancia", stabilityDetail: "Sin alerta de deslizamiento inminente", mitigable: true, confidence: 84, source: "Sentinel-2", detected: "2026-10-15", firstSeen: "2026-07-03", status: "nueva", rain30: 120, vegetation: 52, roadM: 140, x: 26, y: 38, summary: "Movimiento de tierra asociado a la adecuación de un sendero." },
    { id: "AU-2405", commune: 6, communeName: "Doce de Octubre", neighborhood: "Picacho", types: ["construccion"], lat: 6.2896, lng: -75.5812, areaM2: 38, risk: "alto", slope: 27, stability: "Inestable", stabilityDetail: "Requiere monitoreo", mitigable: true, confidence: 89, source: "Ortofoto DAGRD", detected: "2026-10-17", firstSeen: "2026-10-01", status: "nueva", rain30: 131, vegetation: 30, roadM: 50, x: 34, y: 22, summary: "Anexos sobre el borde de un talud, visibles solo en la imagen reciente." },
    { id: "AU-2404", commune: 4, communeName: "Aranjuez", neighborhood: "Moravia", types: ["construccion"], lat: 6.2769, lng: -75.5648, areaM2: 28, risk: "medio", slope: 12, stability: "Estable", stabilityDetail: "Sin alerta geotécnica", mitigable: true, confidence: 92, source: "Ortofoto DAGRD", detected: "2026-10-12", firstSeen: "2026-09-20", status: "nueva", rain30: 110, vegetation: 70, roadM: 8, x: 54, y: 34, summary: "Cambio de cubierta y ampliación menor en entorno consolidado." },
    { id: "AU-2403", commune: 2, communeName: "Santa Cruz", neighborhood: "La Francia", types: ["movimiento"], lat: 6.2864, lng: -75.5522, areaM2: 140, risk: "medio", slope: 24, stability: "Vigilancia", stabilityDetail: "Monitoreo quincenal", mitigable: true, confidence: 86, source: "Sentinel-2", detected: "2026-10-09", firstSeen: "2026-06-18", status: "nueva", rain30: 128, vegetation: 48, roadM: 90, x: 50, y: 20, summary: "Exposición de suelo en la corona, sin estructura nueva asociada." },
    { id: "AU-2402", commune: 5, communeName: "Castilla", neighborhood: "Tricentenario", types: ["construccion"], lat: 6.2933, lng: -75.5729, areaM2: 33, risk: "bajo", slope: 8, stability: "Estable", stabilityDetail: "Sin alerta geotécnica", mitigable: true, confidence: 95, source: "Ortofoto DAGRD", detected: "2026-10-08", firstSeen: "2026-10-04", status: "nueva", rain30: 98, vegetation: 74, roadM: 12, x: 40, y: 28, summary: "Construcción menor en zona de baja pendiente." },
    { id: "AU-2401", commune: 9, communeName: "Buenos Aires", neighborhood: "Caicedo", types: ["movimiento", "construccion"], lat: 6.2398, lng: -75.5527, areaM2: 67, risk: "alto", slope: 30, stability: "Inestable", stabilityDetail: "Requiere visita", mitigable: true, confidence: 90, source: "Captura dron", detected: "2026-10-24", firstSeen: "2026-09-01", status: "nueva", rain30: 158, vegetation: 33, roadM: 35, x: 62, y: 56, summary: "Terraza nueva y base de placa en la ladera oriental." }
];

const VIEWS = {
    dashboard: "Panel de Control",
    map: "Mapa general",
    compare: "Comparador Multitemporal",
    alert: "Detalle de Alerta",
    vulnerability: "Análisis de Ladera",
    report: "Resumen de Inspección",
    success: "Confirmación",
    alerts: "Cola de alertas",
    history: "Historial operativo",
    integrations: "Integraciones"
};

const ICONS = {
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.8 2.5 15.2 0 18M12 3c-2.5 2.8-2.5 15.2 0 18"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 9a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="5" rx="1.5"/><rect x="13" y="10" width="8" height="11" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/></svg>',
    map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 4l-5 2v14l5-2 6 2 5-2V4l-5 2-6-2z"/><path d="M9 4v14M15 6v14"/></svg>',
    layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5"/><path d="M3 16l9 5 9-5"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 4l9 16H3L12 4z"/><path d="M12 10v4M12 17h.01"/></svg>',
    history: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 12a8 8 0 1 0 2.3-5.6"/><path d="M4 4v5h5"/><path d="M12 8v5l3 2"/></svg>',
    plug: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 7v5a3 3 0 0 0 6 0V7"/><path d="M8 7h8M12 15v5"/><path d="M9 3v4M15 3v4"/></svg>',
    file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5M8 13h8M8 17h5"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9.5"/></svg>',
    logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 7V5H5v14h5v-2"/><path d="M10 12h10M16 8l4 4-4 4"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M4 16V4h12"/></svg>',
    mountain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 19l6-10 3 4 2-3 7 9H3z"/></svg>',
    guide: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 8h.01"/></svg>'
};

let state = defaultState();
let pendingAction = null;
let syncing = false;
let resetCodeSentTo = "";

function icon(name) {
    return `<span class="icon">${ICONS[name] || ""}</span>`;
}

function defaultAlerts() {
    return SEED.map((item) => ({
        ...item,
        notes: "",
        visitDate: "2026-10-27",
        visitWindow: "07:00 - 10:00",
        opPriority: "",
        closeReason: "",
        assignedTo: "",
        assignedSystem: "",
        assignedAt: ""
    }));
}

function defaultState() {
    return {
        user: null,
        remember: false,
        view: "dashboard",
        selectedId: "AU-2412",
        alerts: defaultAlerts(),
        history: [],
        compare: {
            base: "2026-01-15",
            current: "2026-10-24",
            layers: { construccion: true, movimiento: true },
            source: "ortofoto",
            pos: 58,
            commune: "todas"
        },
        map: { commune: "todas", risk: "todos", zoom: 1 },
        alertsFilter: "todas",
        alertsQuery: "",
        alertSort: { key: "index", dir: "desc" },
        ui: { search: "" },
        reportOptions: { coords: true, slope: true, notes: true, evidence: true },
        sync: { system: "arcgis", dest: "nororiente" },
        integrations: {
            arcgis: { status: "conectado", latency: null, checkedAt: null },
            crm: { status: "disponible", latency: null, checkedAt: null }
        },
        lastAssignment: null,
        auth: { screen: "login", email: "", error: "" }
    };
}

function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, (ch) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[ch]));
}

function selected() {
    return state.alerts.find((item) => item.id === state.selectedId) || state.alerts[0];
}

function priorityIndex(alert) {
    const risk = { alto: 34, medio: 20, bajo: 10 }[alert.risk] || 0;
    const slopePts = Math.round(alert.slope * 0.95);
    const mit = alert.mitigable ? 0 : 18;
    const area = Math.round(alert.areaM2 / 20);
    return Math.min(99, risk + slopePts + mit + area);
}

function suggestedPriority(alert) {
    const index = priorityIndex(alert);
    if (index >= 80 || !alert.mitigable) return "inmediata";
    if (index >= 55) return "48h";
    return "programada";
}

function priorityLabel(key) {
    return { inmediata: "Inmediata (24 h)", "48h": "En 48 horas", programada: "Programada" }[key] || key;
}

function statusLabel(status) {
    return { nueva: "Nueva", analisis: "En análisis", asignada: "Asignada", cerrada: "Cerrada" }[status] || status;
}

function typeLabel(type) {
    return type === "construccion" ? "Nueva construcción" : "Movimiento de tierra";
}

function riskLabel(risk) {
    return { alto: "ALTO", medio: "MEDIO", bajo: "BAJO" }[risk] || risk.toUpperCase();
}

function bannerFor(alert) {
    if (!alert.mitigable) return { tone: "critica", text: `¡Alerta Crítica - Comuna ${alert.commune}!` };
    if (alert.risk === "alto") return { tone: "alto", text: `Alerta alta - Comuna ${alert.commune}` };
    if (alert.risk === "medio") return { tone: "medio", text: `Alerta media - Comuna ${alert.commune}` };
    return { tone: "bajo", text: `Cambio detectado - Comuna ${alert.commune}` };
}

function headlineFor(alert) {
    const hasBuild = alert.types.includes("construccion");
    const hasEarth = alert.types.includes("movimiento");
    if (hasBuild && hasEarth) return "Nueva estructura y movimiento de tierra detectados.";
    if (hasBuild) return "Nueva estructura detectada.";
    return "Movimiento de tierra detectado.";
}

function boxLabel(alert) {
    return alert.types.includes("construccion") ? "Nueva estructura" : "Movimiento de tierra";
}

function suggestedCrew(alert) {
    return CREWS.find((crew) => crew.communes.includes(alert.commune)) || CREWS[0];
}

function formatDate(iso) {
    if (!iso) return "—";
    const [year, month, day] = iso.split("-").map(Number);
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    return `${day} ${months[month - 1]} ${year}`;
}

function formatDateLong(iso) {
    if (!iso) return "—";
    const [year, month, day] = iso.split("-").map(Number);
    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    return `${day} de ${months[month - 1]} de ${year}`;
}

function formatStamp(iso) {
    if (!iso) return "—";
    const date = new Date(iso);
    return date.toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" });
}

function daysAgo(iso) {
    const from = new Date(`${iso}T00:00:00`);
    const to = new Date(`${SCENARIO_TODAY}T00:00:00`);
    const days = Math.round((to - from) / 86400000);
    if (days <= 0) return "hoy";
    if (days === 1) return "hace 1 día";
    return `hace ${days} días`;
}

function countNew() {
    return state.alerts.filter((alert) => alert.status === "nueva").length;
}

function criticalZones() {
    const zones = new Set(
        state.alerts
            .filter((alert) => !alert.mitigable && alert.status !== "cerrada")
            .map((alert) => alert.commune)
    );
    return zones.size;
}

function isCritical(alert) {
    return !alert.mitigable && alert.status !== "cerrada";
}

function navKey(view) {
    if (["alert", "vulnerability", "report", "success"].includes(view)) return "alerts";
    return view;
}

function addHistory(text) {
    state.history.unshift({ id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, text, at: new Date().toISOString() });
    state.history = state.history.slice(0, 40);
}

function persist() {
    const data = {
        version: APP_VERSION,
        alerts: state.alerts,
        history: state.history,
        compare: state.compare,
        integrations: state.integrations,
        selectedId: state.selectedId,
        reportOptions: state.reportOptions,
        lastAssignment: state.lastAssignment
    };
    try {
        localStorage.setItem("aerourbis-data", JSON.stringify(data));
        if (state.user && state.remember) {
            localStorage.setItem("aerourbis-user", JSON.stringify(state.user));
        } else {
            localStorage.removeItem("aerourbis-user");
        }
        if (state.user) sessionStorage.setItem("aerourbis-session", JSON.stringify(state.user));
        else sessionStorage.removeItem("aerourbis-session");
    } catch (error) {
        /* El prototipo sigue en memoria si el navegador bloquea el almacenamiento. */
    }
}

function load() {
    state = defaultState();
    try {
        const raw = localStorage.getItem("aerourbis-data");
        if (raw) {
            const data = JSON.parse(raw);
            if (data.version === APP_VERSION && Array.isArray(data.alerts) && data.alerts.length === SEED.length) {
                state.alerts = data.alerts;
                state.history = data.history || [];
                state.compare = { ...state.compare, ...data.compare, layers: { ...state.compare.layers, ...(data.compare && data.compare.layers) } };
                state.integrations = { ...state.integrations, ...data.integrations };
                state.selectedId = data.selectedId || state.selectedId;
                state.reportOptions = { ...state.reportOptions, ...data.reportOptions };
                state.lastAssignment = data.lastAssignment || null;
            }
        }
        const sessionUser = sessionStorage.getItem("aerourbis-session");
        const remembered = localStorage.getItem("aerourbis-user");
        if (sessionUser) state.user = JSON.parse(sessionUser);
        else if (remembered) {
            state.user = JSON.parse(remembered);
            state.remember = true;
        }
    } catch (error) {
        state = defaultState();
    }
}

function toast(message, type) {
    const root = document.getElementById("toast-root");
    const item = document.createElement("div");
    item.className = `toast ${type || ""}`;
    item.textContent = message;
    root.appendChild(item);
    requestAnimationFrame(() => item.classList.add("show"));
    setTimeout(() => {
        item.classList.remove("show");
        setTimeout(() => item.remove(), 250);
    }, 3200);
}

function downloadBlob(filename, content, type) {
    const blob = new Blob([content], { type });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 1500);
}

function sessionFrom(email) {
    const user = USERS[email];
    return {
        name: user.name,
        shortName: user.shortName,
        email,
        role: user.role,
        org: user.org,
        sector: user.sector,
        initials: user.initials
    };
}

function guestFrom(email) {
    const local = email.split("@")[0].replace(/[._]/g, " ");
    const name = local.replace(/\b\w/g, (letter) => letter.toUpperCase());
    const privateSector = /banco|bank|davivienda|bancolombia|finan/.test(email);
    return {
        name,
        shortName: name.split(" ")[0] || name,
        email,
        role: privateSector ? "Analista del sector privado" : "Usuario institucional",
        org: privateSector ? "Sector privado" : "Entidad territorial",
        sector: privateSector ? "privado" : "publico",
        initials: name.slice(0, 2).toUpperCase()
    };
}

function startSession(user, remember) {
    state.user = user;
    state.remember = remember;
    state.view = "dashboard";
    state.auth = { screen: "login", email: user.email, error: "" };
    addHistory(`Sesión iniciada · ${user.name} · ${user.org}`);
    persist();
    renderShell();
    toast(`Bienvenido, ${user.shortName}`, "ok");
}

function renderLogin() {
    document.title = "Ingreso · AeroUrbis";
    const auth = state.auth;
    const error = auth.error ? `<div class="form-error">${esc(auth.error)}</div>` : "";
    let panel = "";
    if (auth.screen === "forgot") {
        panel = `
            <h2>Recuperar acceso</h2>
            <p class="subtitle">Te enviaremos un código al correo institucional. En esta demostración el código aparece en pantalla.</p>
            ${error}
            <form data-action="send-code">
                <div class="field">
                    <label for="forgot-email">Correo institucional</label>
                    <input id="forgot-email" name="email" type="email" required placeholder="juan.talero@medellin.gov.co" value="${esc(auth.email)}">
                </div>
                <button class="btn btn-primary" type="submit">Enviar código</button>
            </form>
            <button class="linkish" type="button" data-action="auth-screen" data-screen="login">Volver al ingreso</button>`;
    } else if (auth.screen === "reset") {
        panel = `
            <h2>Nueva contraseña</h2>
            <p class="subtitle">Código de demostración enviado a ${esc(resetCodeSentTo)}.</p>
            <p class="code-pill">482913</p>
            ${error}
            <form data-action="reset-password">
                <div class="field"><label for="code">Código</label><input id="code" name="code" inputmode="numeric" required placeholder="6 dígitos"></div>
                <div class="field"><label for="new-pass">Nueva contraseña</label><input id="new-pass" name="password" type="password" required minlength="6"></div>
                <div class="field"><label for="new-pass-2">Confirmar contraseña</label><input id="new-pass-2" name="confirm" type="password" required minlength="6"></div>
                <button class="btn btn-primary" type="submit">Guardar y volver</button>
            </form>
            <p class="hint mt">En la demostración la clave de acceso sigue siendo AeroUrbis2026.</p>`;
    } else {
        panel = `
            <h2>¡Bienvenido a AeroUrbis!</h2>
            <p class="subtitle">Acceso seguro para el DAGRD, la Secretaría de Control Territorial y el sector privado.</p>
            <div class="demo-card">
                <p>Accesos de demostración · contraseña AeroUrbis2026</p>
                <div class="demo-actions">
                    <button class="btn btn-soft btn-sm" type="button" data-action="fill-demo" data-email="juan.talero@medellin.gov.co">Entrar como entidades del estado</button>
                    <button class="btn btn-soft btn-sm" type="button" data-action="fill-demo" data-email="laura.gomez@bancolombia.com.co">Entrar como banco</button>
                </div>
            </div>
            ${error}
            <form data-action="login" novalidate>
                <div class="field">
                    <label for="email">Correo institucional</label>
                    <input id="email" name="email" type="email" autocomplete="username" placeholder="juan.talero@medellin.gov.co" value="${esc(auth.email)}" required>
                </div>
                <div class="field">
                    <label for="password">Contraseña</label>
                    <div class="field-control">
                        <input id="password" name="password" type="password" autocomplete="current-password" placeholder="••••••••" required>
                        <button class="ghost-in" type="button" data-action="toggle-password">Mostrar</button>
                    </div>
                </div>
                <label class="checkline"><input type="checkbox" name="remember"> Recordarme en este equipo</label>
                <button class="btn btn-primary" type="submit">Ingresar a la plataforma</button>
            </form>
            <button class="linkish" type="button" data-action="auth-screen" data-screen="forgot">¿Olvidaste tu contraseña?</button>`;
    }
    document.getElementById("app").innerHTML = `
        <section class="login">
            <div class="login-visual">
                <div class="river"></div>
                <div class="brand">
                    <div class="brand-mark">${icon("globe")}</div>
                    <div><h1>AeroUrbis</h1><p>Monitoreo territorial de Medellín</p></div>
                </div>
                <div class="visual-copy">
                    <h2>Menos visitas a ciegas. Más evidencia antes de salir a campo.</h2>
                    <p class="lead">Compara el territorio en el tiempo, mide la ladera y entrega la alerta lista para ArcGIS o para el core bancario.</p>
                    <ul class="points">
                        <li>${icon("layers")}<div><strong>Comparador multitemporal</strong><span>Antes y después con capas de construcciones y movimientos de tierra.</span></div></li>
                        <li>${icon("mountain")}<div><strong>Vulnerabilidad de la ladera</strong><span>Pendiente, estabilidad y prioridad para el ODS 11.</span></div></li>
                        <li>${icon("plug")}<div><strong>Integración plug and play</strong><span>ArcGIS institucional del DAGRD y CRM / core bancario.</span></div></li>
                    </ul>
                </div>
                <p class="fineprint">Prototipo conceptual académico. Los polígonos, coordenadas y cuadrillas son datos de demostración.</p>
            </div>
            <div class="login-panel"><div class="login-card">${panel}</div></div>
        </section>`;
}

function renderShell() {
    const user = state.user;
    document.getElementById("app").innerHTML = `
        <div class="shell">
            <aside class="sidebar" id="sidebar">
                <button class="side-brand" type="button" data-action="show" data-view="dashboard">
                    <span class="brand-mark">${icon("globe")}</span>
                    <span><strong>AeroUrbis</strong><span>Medellín</span></span>
                </button>
                <nav class="nav" aria-label="Principal">
                    ${navButton("dashboard", "dashboard", "Panel de Control")}
                    ${navButton("map", "map", "Mapa general")}
                    ${navButton("compare", "layers", "Comparador")}
                    ${navButton("alerts", "alert", `Alertas <span class="count" id="nav-alert-count">${countNew()}</span>`)}
                    ${navButton("history", "history", "Historial")}
                    ${navButton("integrations", "plug", "Integraciones")}
                </nav>
                <div class="side-spacer"></div>
                <div class="side-actions">
                    <button class="btn btn-ghost btn-sm" type="button" data-action="open-moments">${icon("guide")} Guía</button>
                    <button class="btn btn-ghost btn-sm" type="button" data-action="ask-reset">Restablecer</button>
                </div>
                <div class="side-user">
                    <div class="avatar">${esc(user.initials)}</div>
                    <div><strong>${esc(user.name)}</strong><span>${esc(user.role)}</span></div>
                </div>
                <button class="btn btn-ghost btn-sm btn-block" type="button" data-action="logout">${icon("logout")} Cerrar sesión</button>
            </aside>
            <button class="scrim" type="button" data-action="toggle-sidebar" hidden></button>
            <div class="main">
                <header class="topbar">
                    <button class="icon-btn menu-btn" type="button" data-action="toggle-sidebar" aria-label="Abrir menú">${icon("menu")}</button>
                    <div>
                        <h2 id="view-title">Panel de Control</h2>
                        <div class="top-meta">Corte satelital 24 oct 2026 · 06:40</div>
                    </div>
                    <div class="search-wrap">
                        <span class="icon">${ICONS.search}</span>
                        <input class="inline-input" id="global-search" type="search" placeholder="Buscar comuna, barrio o ID" data-model="ui.search" data-refresh="search" aria-label="Buscar alertas">
                        <div class="search-results" id="search-results" hidden></div>
                    </div>
                    <div class="top-tools">
                        <span class="role-chip">${esc(user.sector === "privado" ? "Sector privado" : "DAGRD")}</span>
                        <div class="notif-wrap">
                            <button class="icon-btn" type="button" data-action="toggle-notif" aria-label="Notificaciones">
                                ${icon("bell")}
                                <span class="dot-count" id="bell-count">${notificationList().length}</span>
                            </button>
                            <div class="notif-panel" id="notif-panel" hidden></div>
                        </div>
                    </div>
                </header>
                <main class="view" id="view"></main>
            </div>
        </div>`;
    showView(state.view || "dashboard");
}

function navButton(view, iconName, label) {
    return `<button class="nav-btn" type="button" data-action="show" data-view="${view}" data-nav="${view}">${icon(iconName)}<span class="nav-label">${label}</span></button>`;
}

function closeSidebar() {
    const sidebar = document.getElementById("sidebar");
    const scrim = document.querySelector(".scrim");
    if (sidebar) sidebar.classList.remove("open");
    if (scrim) scrim.hidden = true;
}

function showView(view) {
    closeSidebar();
    state.view = view;
    const title = VIEWS[view] || "AeroUrbis";
    document.title = `${title} · AeroUrbis`;
    const viewEl = document.getElementById("view");
    if (!viewEl) {
        renderShell();
        return;
    }
    viewEl.innerHTML = viewHTML(view);
    viewEl.scrollTop = 0;
    viewEl.classList.remove("view-enter");
    void viewEl.offsetWidth;
    viewEl.classList.add("view-enter");
    const heading = document.getElementById("view-title");
    if (heading) heading.textContent = title;
    updateNav();
    bindSpecial(view);
    persist();
    if (view === "dashboard") animateNumbers();
}

function updateNav() {
    const key = navKey(state.view);
    document.querySelectorAll("[data-nav]").forEach((button) => {
        button.classList.toggle("active", button.dataset.nav === key);
    });
    const badge = document.getElementById("nav-alert-count");
    if (badge) badge.textContent = String(countNew());
    const bell = document.getElementById("bell-count");
    const notes = notificationList();
    if (bell) {
        bell.textContent = String(notes.length);
        bell.hidden = notes.length === 0;
    }
}

function viewHTML(view) {
    const screens = {
        dashboard: dashboardHTML,
        map: mapHTML,
        compare: compareHTML,
        alert: alertHTML,
        vulnerability: vulnerabilityHTML,
        report: reportHTML,
        success: successHTML,
        alerts: alertsHTML,
        history: historyHTML,
        integrations: integrationsHTML
    };
    return (screens[view] || dashboardHTML)();
}

function dashboardHTML() {
    const alerts = [...state.alerts].sort((a, b) => priorityIndex(b) - priorityIndex(a));
    return `
        <div class="page-intro">
            <div>
                <h3>Buen día, ${esc(state.user.shortName)}</h3>
                <p class="muted" style="margin:0">${countNew()} ${countNew() === 1 ? "alerta sigue" : "alertas siguen"} en la cola de hoy. ${criticalZones()} ${criticalZones() === 1 ? "comuna sigue" : "comunas siguen"} en zona no mitigable.</p>
            </div>
            <button class="btn btn-primary" style="width:auto" type="button" data-action="open-compare" data-id="AU-2412">Ver mapa detallado</button>
        </div>
        <div class="grid-kpis">
            <button class="kpi warning" type="button" data-action="drill" data-filter="nueva">
                <span class="kpi-value" data-count="${countNew()}">${countNew()}</span>
                <span class="kpi-label">Nuevas alertas hoy</span>
                <small>Cola de priorización del 25 de octubre</small>
            </button>
            <button class="kpi info" type="button" data-action="show" data-view="map">
                <span class="kpi-value" data-count="3450" data-format="ha">3.450</span>
                <span class="kpi-label">Hectáreas procesadas</span>
                <small>Cobertura acumulada del valle</small>
            </button>
            <button class="kpi danger" type="button" data-action="drill" data-filter="criticas">
                <span class="kpi-value" data-count="${criticalZones()}">${criticalZones()}</span>
                <span class="kpi-label">Zonas críticas activas</span>
                <small>Comunas con ladera no mitigable</small>
            </button>
        </div>
        <div class="grid-2">
            <section class="card map-card">
                <div class="map-toolbar">
                    <strong>Mapa general de Medellín</strong>
                    <span class="muted">Toca una alerta para abrir el comparador</span>
                </div>
                ${heatMapHTML("open-compare", false)}
                <div class="legend">
                    <span><i class="sw-alto"></i>Riesgo alto</span>
                    <span><i class="sw-medio"></i>Riesgo medio</span>
                    <span><i class="sw-bajo"></i>Riesgo bajo</span>
                    <span><i class="sw-crit"></i>Zona no mitigable</span>
                </div>
            </section>
            <section class="card" style="padding:0">
                <div class="panel-head"><strong>Prioridad del día</strong><button class="btn btn-ghost btn-sm" type="button" data-action="show" data-view="alerts">Ver cola</button></div>
                ${alerts.slice(0, 6).map((alert) => alertRow(alert, "open-compare")).join("")}
            </section>
        </div>
        <div class="grid-3 mt">
            <section class="card">
                <h4>Alertas por comuna</h4>
                ${barsByCommune()}
            </section>
            <section class="card">
                <h4>Mezcla de riesgo</h4>
                ${donutHTML()}
            </section>
            <section class="card">
                <h4>Para evitar el desplazamiento ciego</h4>
                <p class="muted">El índice combina riesgo, pendiente, área cambiada y si la ladera es mitigable. La visita se reserva para lo que el remoto no puede cerrar.</p>
                <ol class="data-list">
                    ${alerts.slice(0, 3).map((alert) => `<li><span>${esc(alert.id)} · ${esc(alert.neighborhood)}</span><strong class="score">${priorityIndex(alert)}</strong></li>`).join("")}
                </ol>
            </section>
        </div>`;
}

function alertRow(alert, action) {
    return `
        <button class="list-btn" type="button" data-action="${action}" data-id="${alert.id}">
            <span class="grow">
                <strong>${esc(alert.neighborhood)}</strong>
                <span class="who muted">Comuna ${alert.commune} ${esc(alert.communeName)} · ${esc(alert.id)} · ${esc(daysAgo(alert.detected))}</span>
            </span>
            <span class="score">${priorityIndex(alert)}</span>
            <span class="badge ${alert.risk}">${riskLabel(alert.risk)}</span>
        </button>`;
}

function barsByCommune() {
    const counts = {};
    state.alerts.forEach((alert) => {
        const key = `${alert.commune}. ${alert.communeName}`;
        counts[key] = (counts[key] || 0) + 1;
    });
    const max = Math.max(...Object.values(counts));
    return `<div class="bars">${Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([name, count]) => `
        <div class="bar-row"><span>${esc(name)}</span><div class="bar-track"><span style="width:${(count / max) * 100}%"></span></div><b>${count}</b></div>
    `).join("")}</div>`;
}

function donutHTML() {
    const groups = [
        { key: "alto", label: "Alto", color: "#f05252" },
        { key: "medio", label: "Medio", color: "#f5a524" },
        { key: "bajo", label: "Bajo", color: "#22c55e" }
    ].map((group) => ({ ...group, value: state.alerts.filter((alert) => alert.risk === group.key).length }));
    const total = groups.reduce((sum, group) => sum + group.value, 0) || 1;
    let cursor = 0;
    const stops = groups.map((group) => {
        const start = (cursor / total) * 100;
        cursor += group.value;
        return `${group.color} ${start}% ${(cursor / total) * 100}%`;
    }).join(", ");
    return `
        <div class="donut-wrap">
            <div class="donut" style="background:conic-gradient(${stops})"><b>${state.alerts.length}</b></div>
            <div class="legend-col">
                ${groups.map((group) => `<span><i class="sw-${group.key}"></i>${group.label}: ${group.value}</span>`).join("")}
            </div>
        </div>`;
}

function heatMapHTML(action, tall) {
    const pins = state.alerts.filter(passMapFilter).map((alert) => {
        const halo = alert.risk === "alto" ? "rgba(240,82,82,.35)" : alert.risk === "medio" ? "rgba(245,165,36,.35)" : "rgba(34,197,94,.28)";
        return `<button class="pin ${alert.risk} ${isCritical(alert) ? "critical" : ""} ${alert.id === state.selectedId ? "active" : ""}" style="left:${alert.x}%;top:${alert.y}%;--halo:${halo}" type="button" data-action="${action}" data-id="${alert.id}" title="${esc(alert.neighborhood)}">
            <span class="dot ${alert.id === "AU-2412" ? "pulse-ring" : ""}"></span>
            <span class="pin-label">${esc(alert.neighborhood)}</span>
        </button>`;
    }).join("");
    return `
        <div class="map-viewport ${tall ? "tall" : ""}" id="map-viewport">
            <div class="north">N</div>
            <div class="map-canvas" id="map-canvas" style="transform:scale(${state.map.zoom})">
                ${pins || `<div class="empty">No hay alertas con ese filtro.</div>`}
            </div>
        </div>`;
}

function passMapFilter(alert) {
    if (state.map.commune !== "todas" && String(alert.commune) !== String(state.map.commune)) return false;
    if (state.map.risk !== "todos" && alert.risk !== state.map.risk) return false;
    return true;
}

function mapHTML() {
    const current = selected();
    return `
        <div class="page-intro">
            <div>
                <h3>Mapa general</h3>
                <p class="muted" style="margin:0">Heat map de cambios detectados. Elige una comuna o un nivel de riesgo.</p>
            </div>
            <div class="btn-row">
                <button class="btn btn-ghost btn-sm" type="button" data-action="zoom" data-dir="out">−</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="zoom" data-dir="in">+</button>
                <button class="btn btn-primary btn-sm" type="button" data-action="open-compare" data-id="${current.id}">Abrir en el comparador</button>
            </div>
        </div>
        <div class="grid-2">
            <section class="card map-card">
                <div class="map-toolbar">
                    <select class="inline-input" style="max-width:220px" data-model="map.commune" data-refresh="view" aria-label="Filtrar por comuna">
                        <option value="todas" ${state.map.commune === "todas" ? "selected" : ""}>Todas las comunas</option>
                        ${COMMUNES.map(([id, name]) => `<option value="${id}" ${String(state.map.commune) === String(id) ? "selected" : ""}>Comuna ${id} · ${esc(name)}</option>`).join("")}
                    </select>
                    <select class="inline-input" style="max-width:180px" data-model="map.risk" data-refresh="view" aria-label="Filtrar por riesgo">
                        ${["todos", "alto", "medio", "bajo"].map((risk) => `<option value="${risk}" ${state.map.risk === risk ? "selected" : ""}>${risk === "todos" ? "Todo riesgo" : riskLabel(risk)}</option>`).join("")}
                    </select>
                </div>
                ${heatMapHTML("select-pin", true)}
                <div class="legend"><span>${state.alerts.filter(passMapFilter).length} puntos visibles · zoom ${state.map.zoom.toFixed(1)}×</span></div>
            </section>
            <section class="card">
                <h4>${esc(current.neighborhood)}</h4>
                <p>${esc(current.summary)}</p>
                <ul class="data-list">
                    <li><span>Comuna</span><strong>${current.commune} · ${esc(current.communeName)}</strong></li>
                    <li><span>Coordenadas</span><strong>${current.lat.toFixed(4)}, ${current.lng.toFixed(4)}</strong></li>
                    <li><span>Variación de área</span><strong>+${current.areaM2}m²</strong></li>
                    <li><span>Riesgo</span><strong class="badge ${current.risk}">${riskLabel(current.risk)}</strong></li>
                    <li><span>Índice</span><strong class="score">${priorityIndex(current)}</strong></li>
                </ul>
                <div class="btn-row mt">
                    <button class="btn btn-ghost" type="button" data-action="open-alert" data-id="${current.id}">Ver ficha</button>
                    <button class="btn btn-primary" type="button" data-action="open-compare" data-id="${current.id}">Analizar cambio</button>
                </div>
            </section>
        </div>`;
}

function visibleInCompare(alert) {
    const layers = state.compare.layers;
    const typeOk = alert.types.some((type) => layers[type]);
    const dateOk = alert.detected >= state.compare.base && alert.detected <= state.compare.current;
    const communeOk = state.compare.commune === "todas" || String(alert.commune) === String(state.compare.commune);
    return typeOk && dateOk && communeOk;
}

function compareHTML() {
    const datesOk = state.compare.base <= state.compare.current;
    const visible = state.alerts.filter(visibleInCompare);
    const builds = visible.filter((alert) => alert.types.includes("construccion")).length;
    const earth = visible.filter((alert) => alert.types.includes("movimiento")).length;
    const oldBlocks = blocksHTML(false);
    const newBlocks = blocksHTML(true);
    const scars = visible.filter((alert) => alert.types.includes("movimiento")).map((alert) => (
        `<span class="scar" style="left:${alert.x}%;top:${alert.y}%;width:78px;height:48px"></span>`
    )).join("");
    const polys = visible.map((alert) => `
        <button class="poly ${alert.types.includes("movimiento") && !alert.types.includes("construccion") ? "movimiento" : ""} ${alert.id === state.selectedId ? "active" : ""}" style="left:${alert.x}%;top:${alert.y}%" type="button" data-action="open-alert" data-id="${alert.id}">
            ${esc(boxLabel(alert))}
            <small>${esc(alert.id)}</small>
        </button>`).join("");
    return `
        <div class="crumbs">
            <button type="button" data-action="show" data-view="dashboard">Panel</button>
            <span>/</span><span>Comparador</span>
        </div>
        ${datesOk ? "" : `<div class="banner info">La fecha base es posterior a la fecha actual. Invierte el rango para ver los cambios. <button class="btn btn-sm btn-ghost" type="button" data-action="swap-dates">Invertir fechas</button></div>`}
        <div class="compare-layout">
            <div>
                <div class="compare-stage source-${esc(state.compare.source)}" id="compare-stage" style="--pos:${state.compare.pos}%">
                    <div class="date-pill">${formatDate(state.compare.base)} vs ${formatDate(state.compare.current)}</div>
                    <div class="layer before"><div class="sat"></div>${oldBlocks}</div>
                    <div class="layer after"><div class="sat"></div>${newBlocks}${scars}</div>
                    <div class="poly-layer">${polys}</div>
                    <div class="handle" tabindex="0" role="slider" aria-valuemin="2" aria-valuemax="98" aria-valuenow="${Math.round(state.compare.pos)}" aria-label="Separador antes y después"></div>
                </div>
                <p class="hint mt">Arrastra el separador. El lado izquierdo es la fecha base y el derecho, la imagen actual. Toca un polígono para abrir la ficha.</p>
            </div>
            <aside class="card">
                <h4>Capas IA</h4>
                <div class="field">
                    <label for="base-date">Fecha base</label>
                    <input id="base-date" type="date" value="${state.compare.base}" data-model="compare.base" data-refresh="view">
                </div>
                <div class="field">
                    <label for="current-date">Fecha actual</label>
                    <input id="current-date" type="date" value="${state.compare.current}" data-model="compare.current" data-refresh="view">
                </div>
                <div class="checks">
                    <label><input type="checkbox" data-model="compare.layers.construccion" data-refresh="view" ${state.compare.layers.construccion ? "checked" : ""}> Nuevas construcciones</label>
                    <label><input type="checkbox" data-model="compare.layers.movimiento" data-refresh="view" ${state.compare.layers.movimiento ? "checked" : ""}> Movimientos de tierra</label>
                </div>
                <div class="field mt">
                    <label for="source">Fuente de imagen</label>
                    <select id="source" data-model="compare.source" data-refresh="view">
                        <option value="ortofoto" ${state.compare.source === "ortofoto" ? "selected" : ""}>Ortofoto institucional</option>
                        <option value="dron" ${state.compare.source === "dron" ? "selected" : ""}>Captura dron</option>
                        <option value="sentinel" ${state.compare.source === "sentinel" ? "selected" : ""}>Sentinel-2</option>
                    </select>
                </div>
                <div class="field">
                    <label for="cmp-commune">Comuna</label>
                    <select id="cmp-commune" data-model="compare.commune" data-refresh="view">
                        <option value="todas">Todas</option>
                        ${COMMUNES.map(([id, name]) => `<option value="${id}" ${String(state.compare.commune) === String(id) ? "selected" : ""}>${id} · ${esc(name)}</option>`).join("")}
                    </select>
                </div>
                <div class="banner info">${visible.length} cambios en el rango · ${builds} construcciones · ${earth} movimientos de tierra</div>
                ${visible.length ? "" : `<div class="empty">Ningún polígono coincide con las capas, las fechas o la comuna.</div>`}
            </aside>
        </div>`;
}

function blocksHTML(recent) {
    const fabric = [
        [22, 62, 16, 10], [30, 58, 12, 8], [40, 70, 18, 9], [48, 40, 10, 14],
        [18, 30, 14, 8], [36, 24, 11, 11], [60, 68, 15, 8], [84, 72, 12, 10]
    ];
    const extras = recent ? [[68, 30, 18, 12], [73, 52, 16, 11], [58, 16, 14, 10], [28, 62, 12, 12], [62, 56, 13, 9]] : [];
    return [...fabric, ...extras].map(([x, y, w, h], index) => (
        `<span class="bld" style="left:${x}%;top:${y}%;width:${w}px;height:${h}px;opacity:${recent && index >= fabric.length ? 0.95 : 0.45}"></span>`
    )).join("");
}

function alertHTML() {
    const alert = selected();
    const banner = bannerFor(alert);
    const crew = suggestedCrew(alert);
    return `
        ${crumbs("Ficha")}
        <div class="banner ${banner.tone}">${icon("alert")}<span>${esc(banner.text)}</span></div>
        <div class="grid-2">
            <div class="stack">
                <div class="aerial" aria-label="Acercamiento de la ortofoto">
                    <div class="bbox">${esc(boxLabel(alert))}</div>
                </div>
                <section class="card">
                    <h4>Datos de la anomalía</h4>
                    <p><strong>${esc(headlineFor(alert))}</strong></p>
                    <ul class="data-list">
                        <li><span>Identificador</span><strong>${esc(alert.id)}</strong></li>
                        <li><span>Ubicación</span><strong>Comuna ${alert.commune} · ${esc(alert.neighborhood)}</strong></li>
                        <li><span>Coordenadas</span><strong>${alert.lat.toFixed(4)}, ${alert.lng.toFixed(4)}</strong></li>
                        <li><span>Variación de área</span><strong>+${alert.areaM2}m²</strong></li>
                        <li><span>Riesgo</span><strong class="badge ${alert.risk}">${riskLabel(alert.risk)}</strong></li>
                        <li><span>Índice de priorización</span><strong class="score">${priorityIndex(alert)}</strong></li>
                        <li><span>Estado</span><strong class="badge ${alert.status}">${statusLabel(alert.status)}</strong></li>
                    </ul>
                    <div class="btn-row mt">
                        <button class="btn btn-ghost" type="button" data-action="copy-coords">${icon("copy")} Copiar coordenadas</button>
                        <button class="btn btn-primary" type="button" data-action="open-vulnerability">Evaluar vulnerabilidad</button>
                    </div>
                </section>
            </div>
            <div class="stack">
                <section class="card" style="padding:0">
                    <div class="mini-map"><div class="map-canvas">${heatMapPin(alert)}</div></div>
                </section>
                <section class="card">
                    <h4>Línea de detección</h4>
                    <ul class="timeline">
                        <li><strong>Primera evidencia</strong><div class="muted">${formatDateLong(alert.firstSeen)}</div></li>
                        <li><strong>Imagen actual</strong><div class="muted">${formatDateLong(alert.detected)} · ${esc(alert.source)}</div></li>
                        <li><strong>Confianza del modelo</strong><div class="muted">${alert.confidence}%</div></li>
                    </ul>
                    <p>${esc(alert.summary)}</p>
                    <p class="hint">Cuadrilla sugerida: ${esc(crew.name)}</p>
                </section>
                <section class="card">
                    <h4>Gestión de la alerta</h4>
                    ${statusActions(alert)}
                    ${alert.assignedTo ? `<p class="hint mt">Asignada a ${esc(alert.assignedTo)} · ${esc(alert.assignedSystem)} · ${esc(formatStamp(alert.assignedAt))}</p>` : ""}
                    ${alert.closeReason ? `<p class="hint">Cierre: ${esc(closeReasonLabel(alert.closeReason))}</p>` : ""}
                </section>
            </div>
        </div>`;
}

function heatMapPin(alert) {
    return `<button class="pin ${alert.risk} critical active" style="left:${alert.x}%;top:${alert.y}%;--halo:rgba(240,82,82,.35)" type="button" data-action="open-compare" data-id="${alert.id}"><span class="dot"></span><span class="pin-label">${esc(alert.neighborhood)}</span></button>`;
}

function statusActions(alert) {
    if (alert.status === "cerrada") {
        return `<button class="btn btn-ghost btn-block" type="button" data-action="reopen-alert">Reabrir alerta</button>`;
    }
    if (alert.status === "asignada") {
        return `<div class="btn-row"><button class="btn btn-ghost" type="button" data-action="open-report">Abrir reporte</button><button class="btn btn-danger" type="button" data-action="ask-close">Cerrar alerta</button></div>`;
    }
    if (alert.status === "analisis") {
        return `<div class="btn-row"><button class="btn btn-ghost" type="button" data-action="set-status" data-status="nueva">Devolver a nuevas</button><button class="btn btn-danger" type="button" data-action="ask-close">Cerrar alerta</button></div>`;
    }
    return `<button class="btn btn-ghost btn-block" type="button" data-action="set-status" data-status="analisis">Marcar en análisis</button>`;
}

function closeReasonLabel(reason) {
    return { atendida: "Atendida en campo", falso: "Falso positivo", duplicada: "Alerta duplicada" }[reason] || reason;
}

function vulnerabilityHTML() {
    const alert = selected();
    const angle = Math.atan(alert.slope / 100) * (180 / Math.PI);
    const color = alert.slope >= 35 ? "#f05252" : alert.slope >= 25 ? "#f5a524" : alert.slope >= 15 ? "#eab308" : "#22c55e";
    const marker = Math.max(2, Math.min(98, (alert.slope / 60) * 100));
    const radius = 58;
    const circ = 2 * Math.PI * radius;
    const dash = (Math.min(alert.slope, 100) / 100) * circ;
    return `
        ${crumbs("Ladera")}
        <div class="page-intro">
            <div>
                <h3>Análisis de ladera</h3>
                <p class="muted" style="margin:0">${esc(alert.neighborhood)} · Comuna ${alert.commune} ${esc(alert.communeName)}</p>
            </div>
            <button class="btn btn-primary" style="width:auto" type="button" data-action="open-report">Generar reporte técnico</button>
        </div>
        <div class="grid-2">
            <section class="card">
                <div class="terrain" aria-hidden="true">
                    <div class="slope-wedge" style="--angle:${angle.toFixed(1)}%"></div>
                    ${alert.types.includes("construccion") ? `<div class="house"></div>` : ""}
                    <div class="soil-key">${alert.mitigable ? "Perfil con suelo aún contenible" : "Perfil con suelo comprometido"}</div>
                </div>
                <div class="scale" aria-label="Escala de verde seguro a rojo peligro">
                    <div class="scale-marker" style="left:${marker}%"><span>${alert.slope}%</span></div>
                    <div class="scale-bar"></div>
                    <div class="scale-labels"><span>Seguro</span><span>Vigilancia</span><span>Peligro</span></div>
                </div>
            </section>
            <section class="card gauge-box">
                <svg viewBox="0 0 160 160" role="img" aria-label="Pendiente ${alert.slope} por ciento">
                    <circle cx="80" cy="80" r="${radius}" fill="none" stroke="#0c1b2e" stroke-width="12"/>
                    <circle cx="80" cy="80" r="${radius}" fill="none" stroke="${color}" stroke-width="12" stroke-linecap="round" stroke-dasharray="${dash.toFixed(1)} ${circ.toFixed(1)}" transform="rotate(-90 80 80)"/>
                    <text x="80" y="78" text-anchor="middle" fill="#e7f0fa" font-size="28" font-weight="700">${alert.slope}%</text>
                    <text x="80" y="98" text-anchor="middle" fill="#93a7bf" font-size="11">Pendiente</text>
                </svg>
                <div class="verdict ${alert.mitigable ? "ok" : ""}">
                    <strong>Pendiente: ${alert.slope}% (${alert.mitigable ? "Zona mitigable" : "Zona no mitigable"})</strong>
                    <div>Estabilidad del suelo: ${esc(alert.stability)} / ${esc(alert.stabilityDetail)}</div>
                </div>
            </section>
        </div>
        <div class="grid-3 mt">
            ${factorCard("Pendiente", alert.slope, 60, alert.slope >= 35 ? "red" : "amber", `${alert.slope}% de inclinación`)}
            ${factorCard("Lluvia 30 días", alert.rain30, 220, alert.rain30 > 150 ? "red" : "amber", `${alert.rain30} mm acumulados`)}
            ${factorCard("Cobertura vegetal", alert.vegetation, 100, alert.vegetation < 35 ? "red" : "green", alert.vegetation < 35 ? "Suelo expuesto" : "Cobertura media o alta")}
        </div>
        <section class="card mt">
            <h4>Diagnóstico del terreno</h4>
            <p>${esc(alert.summary)} Distancia aproximada a vía: ${alert.roadM} m. Confianza del cambio: ${alert.confidence}%.</p>
            <p class="hint">La lectura apoya el ODS 11 al separar las laderas que exigen visita de las que pueden seguir en monitoreo remoto.</p>
        </section>`;
}

function factorCard(title, value, max, tone, caption) {
    return `<section class="card factor"><h4>${title}</h4><div class="bar-track"><span class="${tone}" style="width:${Math.min(100, (value / max) * 100)}%"></span></div><p class="hint">${caption}</p></section>`;
}

function reportHTML() {
    const alert = selected();
    const priority = alert.opPriority || suggestedPriority(alert);
    const crew = suggestedCrew(alert);
    const locked = alert.status === "cerrada";
    return `
        ${crumbs("Reporte")}
        <div class="page-intro">
            <div>
                <h3>Resumen de inspección remota</h3>
                <p class="muted" style="margin:0">Los datos ya vienen de la alerta. Completa la nota y la ventana de visita.</p>
            </div>
            <span class="badge ${priority === "inmediata" ? "alto" : "medio"}">Prioridad ${esc(priorityLabel(priority))}</span>
        </div>
        <div class="grid-2">
            <section class="card">
                <ul class="data-list">
                    <li><span>Inspector</span><strong>${esc(state.user.name)}</strong></li>
                    <li><span>Entidad</span><strong>${esc(state.user.org)}</strong></li>
                    <li><span>Fecha del reporte</span><strong>${REPORT_DATE_LABEL}</strong></li>
                    <li><span>Imagen analizada</span><strong>${formatDateLong(alert.detected)}</strong></li>
                    <li><span>Alerta</span><strong>${esc(alert.id)} · ${esc(alert.neighborhood)}</strong></li>
                    <li><span>Coordenadas</span><strong>${alert.lat.toFixed(4)}, ${alert.lng.toFixed(4)}</strong></li>
                    <li><span>Variación de área</span><strong>+${alert.areaM2}m²</strong></li>
                    <li><span>Riesgo</span><strong>${riskLabel(alert.risk)}</strong></li>
                    <li><span>Pendiente</span><strong>${alert.slope}% (${alert.mitigable ? "Zona mitigable" : "Zona no mitigable"})</strong></li>
                    <li><span>Estabilidad</span><strong>${esc(alert.stability)} / ${esc(alert.stabilityDetail)}</strong></li>
                    <li><span>Índice</span><strong class="score">${priorityIndex(alert)}</strong></li>
                    <li><span>Cuadrilla sugerida</span><strong>${esc(crew.name)}</strong></li>
                </ul>
            </section>
            <div class="stack">
                <section class="card">
                    <div class="field">
                        <label for="op-priority">Prioridad operativa</label>
                        <select id="op-priority" data-model="opPriority">
                            ${["inmediata", "48h", "programada"].map((key) => `<option value="${key}" ${priority === key ? "selected" : ""}>${esc(priorityLabel(key))}</option>`).join("")}
                        </select>
                    </div>
                    <div class="field">
                        <label for="visit-date">Fecha sugerida de visita</label>
                        <input id="visit-date" type="date" value="${alert.visitDate}" data-model="visitDate">
                    </div>
                    <div class="field">
                        <label for="visit-window">Ventana horaria</label>
                        <select id="visit-window" data-model="visitWindow">
                            ${["07:00 - 10:00", "10:00 - 13:00", "13:00 - 16:00"].map((slot) => `<option ${alert.visitWindow === slot ? "selected" : ""}>${slot}</option>`).join("")}
                        </select>
                    </div>
                    <div class="field">
                        <label for="notes">Notas de campo</label>
                        <textarea id="notes" rows="4" placeholder="Escribir observaciones previas a la visita..." data-model="notes">${esc(alert.notes)}</textarea>
                    </div>
                </section>
                <section class="card">
                    <h4>Incluir en el PDF</h4>
                    <div class="checks">
                        ${optionCheck("coords", "Coordenadas y variación de área")}
                        ${optionCheck("slope", "Diagnóstico de ladera")}
                        ${optionCheck("notes", "Notas del inspector")}
                        ${optionCheck("evidence", "Referencia para ArcGIS o CRM")}
                    </div>
                    <div class="btn-row mt">
                        <button class="btn btn-ghost" type="button" data-action="download-pdf">${icon("file")} Descargar PDF</button>
                        <button class="btn btn-primary" type="button" data-action="open-sync" ${locked ? "disabled" : ""}>${alert.status === "asignada" ? "Reasignar visita" : "Asignar visita a campo"}</button>
                    </div>
                    ${locked ? `<p class="hint">La alerta está cerrada. Reábrela desde la ficha si necesitas asignarla de nuevo.</p>` : ""}
                    <p class="hint">${recommendation(alert)}</p>
                </section>
            </div>
        </div>`;
}

function optionCheck(key, label) {
    return `<label><input type="checkbox" data-model="reportOptions.${key}" ${state.reportOptions[key] ? "checked" : ""}> ${label}</label>`;
}

function recommendation(alert) {
    const index = priorityIndex(alert);
    if (!alert.mitigable || index >= 80) return "Prioridad inmediata: la visita de campo evita dejar esta ladera solo en monitoreo remoto.";
    if (index >= 55) return "Programa la visita en 48 horas. El cambio es relevante, pero la ladera aún admite contención.";
    return "El monitoreo remoto alcanza por ahora. La visita queda como opción, no como salida urgente.";
}

function successHTML() {
    const job = state.lastAssignment;
    if (!job) {
        return `<div class="card empty">Aún no hay una sincronización en esta sesión. Genera un reporte y confirma el envío.</div>`;
    }
    return `
        <section class="card success-wrap">
            <div class="success-icon">${icon("check")}</div>
            <h3>¡Todo listo, ${esc(state.user.shortName)}!</h3>
            <p>${esc(job.lead)}</p>
            <p>${esc(job.rest)}</p>
            <div class="summary-dl">
                <div><span class="muted">Alerta</span><strong>${esc(job.alertId)} · ${esc(job.place)}</strong></div>
                <div><span class="muted">Destino</span><strong>${esc(job.systemFull)}</strong></div>
                <div><span class="muted">Asignación</span><strong>${esc(job.assignee)}</strong></div>
                <div><span class="muted">Visita</span><strong>${esc(job.visit)}</strong></div>
                <div><span class="muted">Hora de envío</span><strong>${esc(formatStamp(job.at))}</strong></div>
            </div>
            <div class="btn-row mt">
                <button class="btn btn-ghost" type="button" data-action="show" data-view="history">Ver historial</button>
                <button class="btn btn-primary" type="button" data-action="show" data-view="dashboard">Volver al Dashboard</button>
            </div>
        </section>`;
}

function passAlertFilter(alert) {
    const query = state.alertsQuery.trim().toLowerCase();
    if (query) {
        const blob = `${alert.id} ${alert.commune} ${alert.communeName} ${alert.neighborhood} ${alert.status}`.toLowerCase();
        if (!blob.includes(query)) return false;
    }
    const filter = state.alertsFilter;
    if (filter === "nueva" || filter === "analisis" || filter === "asignada" || filter === "cerrada") return alert.status === filter;
    if (filter === "alto" || filter === "medio" || filter === "bajo") return alert.risk === filter;
    if (filter === "criticas") return isCritical(alert);
    return true;
}

function sortedAlerts(list) {
    const { key, dir } = state.alertSort;
    const mul = dir === "asc" ? 1 : -1;
    const riskRank = { alto: 3, medio: 2, bajo: 1 };
    const statusRank = { nueva: 1, analisis: 2, asignada: 3, cerrada: 4 };
    return [...list].sort((a, b) => {
        const value = {
            index: [priorityIndex(a), priorityIndex(b)],
            risk: [riskRank[a.risk], riskRank[b.risk]],
            area: [a.areaM2, b.areaM2],
            slope: [a.slope, b.slope],
            status: [statusRank[a.status], statusRank[b.status]],
            commune: [a.commune, b.commune],
            id: [a.id, b.id]
        }[key] || [a.id, b.id];
        if (value[0] < value[1]) return -1 * mul;
        if (value[0] > value[1]) return 1 * mul;
        return 0;
    });
}

function alertsHTML() {
    const filters = [
        ["todas", "Todas"], ["nueva", "Nuevas"], ["analisis", "En análisis"], ["asignada", "Asignadas"],
        ["cerrada", "Cerradas"], ["criticas", "Zonas críticas"], ["alto", "Riesgo alto"], ["medio", "Riesgo medio"], ["bajo", "Riesgo bajo"]
    ];
    return `
        <div class="page-intro">
            <div>
                <h3>Cola de alertas</h3>
                <p class="muted" style="margin:0">Ordena, filtra y abre la ficha. El índice más alto debería visitarse primero.</p>
            </div>
            <button class="btn btn-ghost" style="width:auto" type="button" data-action="export-csv">${icon("file")} Exportar CSV</button>
        </div>
        <div class="chips mb">
            ${filters.map(([id, label]) => `<button class="chip ${state.alertsFilter === id ? "on" : ""}" type="button" data-action="set-filter" data-filter="${id}">${label}</button>`).join("")}
        </div>
        <section class="card">
            <div class="field">
                <label for="alert-query">Buscar en la cola</label>
                <input id="alert-query" value="${esc(state.alertsQuery)}" placeholder="Comuna, barrio o AU-24…" data-model="alertsQuery" data-refresh="table">
            </div>
            <div id="alert-table-wrap">${alertTableHTML()}</div>
        </section>`;
}

function alertTableHTML() {
    const rows = sortedAlerts(state.alerts.filter(passAlertFilter));
    const arrow = (key) => state.alertSort.key === key ? (state.alertSort.dir === "asc" ? " ↑" : " ↓") : "";
    const th = (key, label) => `<th><button type="button" data-action="sort" data-key="${key}">${label}${arrow(key)}</button></th>`;
    if (!rows.length) return `<div class="empty">Ninguna alerta coincide con el filtro.</div>`;
    return `
        <div class="table-wrap">
            <table>
                <thead><tr>${th("id", "ID")}${th("commune", "Comuna")}<th>Barrio</th><th>Tipo</th>${th("risk", "Riesgo")}${th("slope", "Pendiente")}${th("area", "Área")}${th("index", "Índice")}${th("status", "Estado")}</tr></thead>
                <tbody>
                    ${rows.map((alert) => `
                        <tr class="clickable" data-action="open-alert" data-id="${alert.id}">
                            <td>${esc(alert.id)}</td>
                            <td>${alert.commune} ${esc(alert.communeName)}</td>
                            <td>${esc(alert.neighborhood)}</td>
                            <td>${esc(alert.types.map(typeLabel).join(" + "))}</td>
                            <td><span class="badge ${alert.risk}">${riskLabel(alert.risk)}</span></td>
                            <td>${alert.slope}%</td>
                            <td>+${alert.areaM2}m²</td>
                            <td class="score">${priorityIndex(alert)}</td>
                            <td><span class="badge ${alert.status}">${statusLabel(alert.status)}</span></td>
                        </tr>`).join("")}
                </tbody>
            </table>
        </div>
        <p class="hint">${rows.length} alerta${rows.length === 1 ? "" : "s"} en esta vista.</p>`;
}

function historyHTML() {
    const items = state.history;
    return `
        <div class="page-intro"><div><h3>Historial operativo</h3><p class="muted" style="margin:0">Sesiones, cambios de estado, descargas y sincronizaciones de esta demostración.</p></div></div>
        <section class="card">
            ${items.length ? items.map((item) => `<div class="history-item"><div>${esc(item.text)}</div><span class="muted">${esc(formatStamp(item.at))}</span></div>`).join("") : `<div class="empty">Todavía no hay movimientos además del ingreso.</div>`}
        </section>`;
}

function integrationsHTML() {
    return `
        <div class="page-intro">
            <div>
                <h3>Integraciones</h3>
                <p class="muted" style="margin:0">AeroUrbis no reemplaza el GIS ni el core: les entrega la geometría y la prioridad.</p>
            </div>
        </div>
        <div class="integ-grid">
            ${integrationCard("arcgis", "ArcGIS Institucional (DAGRD)", "https://dagrd.medellin.gov.co/arcgis/rest/services/AeroUrbis/Alertas/FeatureServer", "Capa de alertas, polígono, atributos de riesgo y cuadrilla.")}
            ${integrationCard("crm", "CRM / Core bancario", "https://api.aerourbis.demo/v1/crm/garantias", "Ficha de la garantía, coordenada y bandera de informalidad en ladera.")}
        </div>
        <section class="card mt">
            <h4>Qué viaja en la sincronización</h4>
            <ul class="data-list">
                <li><span>Geometría</span><strong>Punto y polígono del cambio</strong></li>
                <li><span>Atributos</span><strong>Área, pendiente, estabilidad, índice</strong></li>
                <li><span>Operación</span><strong>Cuadrilla o mesa, fecha y notas</strong></li>
            </ul>
        </section>`;
}

function integrationCard(key, title, endpoint, text) {
    const info = state.integrations[key];
    const latency = info.latency ? `${info.latency} ms` : "sin prueba en esta sesión";
    return `
        <section class="card">
            <h4><span class="status-dot ${info.status === "conectado" ? "" : "wait"}"></span>${esc(title)}</h4>
            <p>${esc(text)}</p>
            <p class="mono">${esc(endpoint)}</p>
            <p class="hint">Estado: ${esc(info.status)} · última prueba: ${info.checkedAt ? esc(formatStamp(info.checkedAt)) : "—"} · latencia ${esc(latency)}</p>
            <button class="btn btn-ghost btn-sm" type="button" data-action="test-api" data-system="${key}">Probar conexión</button>
        </section>`;
}

function crumbs(current) {
    const alert = selected();
    return `
        <div class="crumbs">
            <button type="button" data-action="show" data-view="dashboard">Panel</button><span>/</span>
            <button type="button" data-action="open-compare" data-id="${alert.id}">Comparador</button><span>/</span>
            ${current === "Ficha" ? `<span>${esc(alert.id)}</span>` : `<button type="button" data-action="open-alert" data-id="${alert.id}">${esc(alert.id)}</button><span>/</span><span>${esc(current)}</span>`}
        </div>`;
}

function notificationList() {
    return state.alerts.filter((alert) => alert.status === "nueva" && (alert.risk === "alto" || !alert.mitigable)).slice(0, 6);
}

function notificationsHTML() {
    const items = notificationList();
    if (!items.length) return `<header><strong>Notificaciones</strong></header><div class="empty">No hay alertas nuevas de riesgo alto.</div>`;
    return `<header><strong>Por revisar</strong><span class="muted">${items.length}</span></header>
        ${items.map((alert) => `<button class="item" type="button" data-action="open-alert" data-id="${alert.id}"><strong>${esc(alert.neighborhood)}</strong><div class="muted">${esc(bannerFor(alert).text)} · índice ${priorityIndex(alert)}</div></button>`).join("")}`;
}

function searchResultsHTML(query) {
    const text = query.trim().toLowerCase();
    if (!text) return "";
    const found = state.alerts.filter((alert) => `${alert.id} ${alert.commune} ${alert.communeName} ${alert.neighborhood}`.toLowerCase().includes(text)).slice(0, 6);
    if (!found.length) return `<div class="empty">Sin coincidencias.</div>`;
    return found.map((alert) => `<button type="button" data-action="open-alert" data-id="${alert.id}"><span class="badge ${alert.risk}">${riskLabel(alert.risk)}</span><span><strong>${esc(alert.neighborhood)}</strong><div class="muted">${esc(alert.id)} · Comuna ${alert.commune}</div></span></button>`).join("");
}

function openModal(content, wide) {
    document.getElementById("modal-root").innerHTML = `<div class="modal-backdrop" data-action="close-modal"><div class="modal ${wide ? "wide" : ""}" role="dialog" aria-modal="true">${content}</div></div>`;
}

function closeModal() {
    if (syncing) return;
    pendingAction = null;
    document.getElementById("modal-root").innerHTML = "";
}

function momentsHTML() {
    const steps = [
        ["1", "Login institucional", "Acceso del DAGRD y del sector privado.", "dashboard"],
        ["2", "Panel de control", "KPIs, heat map y prioridad del día.", "dashboard"],
        ["3", "Comparador multitemporal", "Slider, fechas y capas de IA.", "compare"],
        ["4", "Detalle de alerta", "Coordenada, área y riesgo de la Comuna 3.", "alert"],
        ["5", "Análisis de ladera", "Pendiente 42% y zona no mitigable.", "vulnerability"],
        ["6", "Reporte y priorización", "Notas, PDF y visita de campo.", "report"],
        ["7", "Sincronización", "ArcGIS o CRM, con la cuadrilla sugerida.", "sync"],
        ["8", "Confirmación", "Cierra el flujo y vuelve al panel.", "success"]
    ];
    return `
        <h3>Guía del prototipo</h3>
        <p class="muted">Ocho momentos del documento. Puedes saltar a cada pantalla con la alerta de La Cruz, Comuna 3, ya seleccionada.</p>
        <div class="moments">
            ${steps.map(([n, title, text, target]) => `
                <div class="moment">
                    <b>${n}</b>
                    <div><strong>${title}</strong><div class="muted">${text}</div></div>
                    <button class="btn btn-soft btn-sm" type="button" data-action="goto-moment" data-target="${target}">Ir</button>
                </div>`).join("")}
        </div>
        <div class="btn-row mt"><button class="btn btn-ghost" type="button" data-action="close-modal">Cerrar</button></div>`;
}

function syncModalHTML() {
    const alert = selected();
    const system = state.sync.system;
    const options = system === "arcgis" ? CREWS : BANK_UNITS;
    return `
        <h3>Sincronizar con sistema interno</h3>
        <p class="muted">Seleccione destino. La cuadrilla sugerida para ${esc(alert.neighborhood)} ya viene marcada.</p>
        <div class="stack">
            <button class="radio-card ${system === "arcgis" ? "on" : ""}" type="button" data-action="set-system" data-system="arcgis"><span><strong>ArcGIS Institucional (DAGRD)</strong><span class="muted">Capa operativa de gestión del riesgo.</span></span></button>
            <button class="radio-card ${system === "crm" ? "on" : ""}" type="button" data-action="set-system" data-system="crm"><span><strong>CRM / Core bancario</strong><span class="muted">Garantías, crédito hipotecario o avalúos.</span></span></button>
        </div>
        <div class="field mt">
            <label for="dest">${system === "arcgis" ? "Cuadrilla asignada" : "Unidad de destino"}</label>
            <select id="dest" data-model="sync.dest">
                ${options.map((item) => `<option value="${item.id}" ${state.sync.dest === item.id ? "selected" : ""}>${esc(item.name)}</option>`).join("")}
            </select>
        </div>
        <div class="card" style="background:#0b1828">
            <strong>${esc(alert.id)}</strong>
            <div class="muted">${esc(alert.neighborhood)} · índice ${priorityIndex(alert)} · visita ${esc(formatDate(alert.visitDate))} · ${esc(alert.visitWindow)}</div>
        </div>
        <div class="btn-row mt">
            <button class="btn btn-ghost" type="button" data-action="close-modal">Cancelar</button>
            <button class="btn btn-primary" type="button" data-action="confirm-sync">Confirmar sincronización</button>
        </div>`;
}

function progressModal(step, total, label) {
    document.getElementById("modal-root").innerHTML = `
        <div class="modal-backdrop">
            <div class="modal" role="dialog" aria-modal="true">
                <h3>Enviando por API</h3>
                <p>${esc(label)}</p>
                <div class="progress"><span style="width:${Math.round((step / total) * 100)}%"></span></div>
                <p class="hint">Paso ${step} de ${total}. No cierres esta ventana.</p>
            </div>
        </div>`;
}

function closeDialogHTML() {
    return `
        <h3>Cerrar alerta</h3>
        <p class="muted">El cierre queda en el historial. La zona crítica solo baja si ya no quedan laderas no mitigables abiertas en esa comuna.</p>
        <div class="field">
            <label for="close-reason">Motivo</label>
            <select id="close-reason">
                <option value="atendida">Atendida en campo</option>
                <option value="falso">Falso positivo</option>
                <option value="duplicada">Alerta duplicada</option>
            </select>
        </div>
        <div class="btn-row">
            <button class="btn btn-ghost" type="button" data-action="close-modal">Cancelar</button>
            <button class="btn btn-danger" type="button" data-action="confirm-close">Cerrar alerta</button>
        </div>`;
}

function bindSpecial(view) {
    if (view !== "compare") return;
    const stage = document.getElementById("compare-stage");
    if (!stage) return;
    stage.classList.add(`source-${state.compare.source}`);
    const move = (clientX) => {
        const rect = stage.getBoundingClientRect();
        const next = Math.max(4, Math.min(96, ((clientX - rect.left) / rect.width) * 100));
        state.compare.pos = next;
        stage.style.setProperty("--pos", `${next}%`);
        const handle = stage.querySelector(".handle");
        if (handle) handle.setAttribute("aria-valuenow", String(Math.round(next)));
    };
    stage.addEventListener("pointerdown", (event) => {
        if (event.target.closest(".poly")) return;
        stage.setPointerCapture(event.pointerId);
        move(event.clientX);
    });
    stage.addEventListener("pointermove", (event) => {
        if (stage.hasPointerCapture(event.pointerId)) move(event.clientX);
    });
    stage.addEventListener("pointerup", () => persist());
}

function animateNumbers() {
    document.querySelectorAll("[data-count]").forEach((element) => {
        const target = Number(element.dataset.count);
        const started = performance.now();
        const tick = (now) => {
            const progress = Math.min(1, (now - started) / 700);
            const value = Math.round(target * (1 - Math.pow(1 - progress, 3)));
            element.textContent = element.dataset.format === "ha" ? value.toLocaleString("es-CO") : String(value);
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    });
}

function applyModel(element) {
    const path = element.dataset.model;
    if (!path) return;
    const value = element.type === "checkbox" ? element.checked : element.value;
    if (path === "notes" || path === "visitDate" || path === "visitWindow" || path === "opPriority") {
        selected()[path] = value;
        persist();
        return;
    }
    if (path === "alertsQuery") {
        state.alertsQuery = value;
        const wrap = document.getElementById("alert-table-wrap");
        if (wrap) wrap.innerHTML = alertTableHTML();
        return;
    }
    if (path === "ui.search") {
        state.ui.search = value;
        const box = document.getElementById("search-results");
        if (!box) return;
        box.innerHTML = searchResultsHTML(value);
        box.hidden = !value.trim();
        return;
    }
    const parts = path.split(".");
    let cursor = state;
    for (let index = 0; index < parts.length - 1; index += 1) cursor = cursor[parts[index]];
    cursor[parts[parts.length - 1]] = value;
    persist();
    if (element.dataset.refresh === "view") showView(state.view);
}

function openCompare(id) {
    if (id) state.selectedId = id;
    showView("compare");
}

function openAlert(id) {
    if (id) state.selectedId = id;
    showView("alert");
}

function handleLogin(form) {
    const email = form.email.value.trim().toLowerCase();
    const password = form.password.value;
    const known = USERS[email];
    let error = "";
    if (!email || !email.includes("@")) error = "Escribe un correo institucional válido.";
    else if (password.length < 4) error = "La contraseña debe tener al menos 4 caracteres.";
    else if (known && password !== known.password) error = "La contraseña de demostración es AeroUrbis2026.";
    if (error) {
        state.auth.email = email;
        state.auth.error = error;
        renderLogin();
        return;
    }
    const button = form.querySelector("button[type=submit]");
    button.disabled = true;
    button.textContent = "Verificando credenciales…";
    const user = known ? sessionFrom(email) : guestFrom(email);
    const remember = form.remember.checked;
    setTimeout(() => startSession(user, remember), 650);
}

function destinationOf() {
    if (state.sync.system === "arcgis") {
        const crew = CREWS.find((item) => item.id === state.sync.dest) || suggestedCrew(selected());
        return {
            assignee: crew.name,
            systemFull: "ArcGIS Institucional (DAGRD)",
            systemShort: "ArcGIS",
            kind: "crew"
        };
    }
    const unit = BANK_UNITS.find((item) => item.id === state.sync.dest) || BANK_UNITS[0];
    return {
        assignee: unit.name,
        systemFull: "CRM / Core bancario",
        systemShort: "CRM",
        kind: "bank"
    };
}

function assignCurrent() {
    const alert = selected();
    const dest = destinationOf();
    const priority = alert.opPriority || suggestedPriority(alert);
    alert.opPriority = priority;
    alert.status = "asignada";
    alert.assignedTo = dest.assignee;
    alert.assignedSystem = dest.systemFull;
    alert.assignedAt = new Date().toISOString();
    alert.closeReason = "";
    const lead = dest.kind === "crew"
        ? `La alerta ha sido priorizada y asignada correctamente a la cuadrilla de la ${dest.assignee}.`
        : `La alerta ha sido priorizada y enviada correctamente a ${dest.assignee}.`;
    const rest = dest.kind === "crew"
        ? "Los datos ya reposan en tu ArcGIS."
        : "Los datos ya reposan en tu CRM.";
    state.lastAssignment = {
        alertId: alert.id,
        place: `${alert.neighborhood}, Comuna ${alert.commune}`,
        assignee: dest.assignee,
        systemFull: dest.systemFull,
        lead,
        rest,
        visit: `${formatDateLong(alert.visitDate)} · ${alert.visitWindow}`,
        at: alert.assignedAt
    };
    state.integrations[state.sync.system].checkedAt = alert.assignedAt;
    state.integrations[state.sync.system].status = "conectado";
    addHistory(`${alert.id} sincronizada con ${dest.systemFull} y asignada a ${dest.assignee}.`);
    syncing = false;
    closeModal();
    showView("success");
    toast("Sincronización completada", "ok");
}

async function confirmSync() {
    if (syncing) return;
    syncing = true;
    const dest = destinationOf();
    const steps = [
        "Validando credenciales de la API…",
        "Empaquetando geometría y atributos…",
        `Enviando a ${dest.systemFull}…`,
        `Asignando ${dest.assignee}…`,
        "Confirmando recepción…"
    ];
    for (let index = 0; index < steps.length; index += 1) {
        progressModal(index + 1, steps.length, steps[index]);
        await wait(520);
    }
    assignCurrent();
}

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function reportLines(alert) {
    const options = state.reportOptions;
    const priority = alert.opPriority || suggestedPriority(alert);
    const lines = [
        { text: "AeroUrbis  ·  Resumen de inspección remota", size: 15, y: 770 }
    ];
    let y = 730;
    const push = (text, size) => {
        wrapText(text, 90).forEach((row) => {
            lines.push({ text: row, size: size || 11, y });
            y -= 16;
        });
    };
    push(`Inspector: ${state.user.name}`);
    push(`Entidad: ${state.user.org}`);
    push(`Fecha del reporte: ${REPORT_DATE_LABEL}`);
    push(`Imagen analizada: ${formatDateLong(alert.detected)}  ·  ${alert.source}`);
    y -= 8;
    push(`${alert.id}  ·  Comuna ${alert.commune} ${alert.communeName}  ·  ${alert.neighborhood}`, 12);
    push(headlineFor(alert));
    push(alert.summary, 10);
    y -= 6;
    if (options.coords) {
        push(`Coordenadas: ${alert.lat.toFixed(4)}, ${alert.lng.toFixed(4)}`);
        push(`Variación de área: +${alert.areaM2} m2`);
        push(`Riesgo: ${riskLabel(alert.risk)}    Índice de priorización: ${priorityIndex(alert)}`);
    }
    if (options.slope) {
        push(`Pendiente: ${alert.slope}% (${alert.mitigable ? "Zona mitigable" : "Zona no mitigable"})`);
        push(`Estabilidad del suelo: ${alert.stability} / ${alert.stabilityDetail}`);
        push(`Lluvia 30 días: ${alert.rain30} mm    Cobertura vegetal: ${alert.vegetation}%`);
    }
    push(`Prioridad operativa: ${priorityLabel(priority)}`);
    push(`Visita sugerida: ${formatDateLong(alert.visitDate)}  ·  ${alert.visitWindow}`);
    push(`Cuadrilla sugerida: ${suggestedCrew(alert).name}`);
    if (options.notes) push(`Notas: ${alert.notes || "Sin observaciones adicionales."}`);
    if (options.evidence) push("Pieza lista para sincronizar con ArcGIS Institucional (DAGRD) o con CRM / core bancario.");
    push("Documento de demostración académica. No constituye un concepto técnico oficial del DAGRD.");
    return lines.filter((line) => line.y > 48);
}

function wrapText(text, width) {
    const words = String(text).split(/\s+/);
    const rows = [];
    let current = "";
    words.forEach((word) => {
        const next = current ? `${current} ${word}` : word;
        if (next.length > width) {
            if (current) rows.push(current);
            current = word;
        } else current = next;
    });
    if (current) rows.push(current);
    return rows;
}

function winAnsi(text) {
    const map = {
        á: "\\341", é: "\\351", í: "\\355", ó: "\\363", ú: "\\372", ñ: "\\361",
        Á: "\\301", É: "\\311", Í: "\\315", Ó: "\\323", Ú: "\\332", Ñ: "\\321",
        "¿": "\\277", "¡": "\\241", "°": "\\260", "²": "\\262"
    };
    let out = "";
    for (const char of text) {
        if (map[char]) out += map[char];
        else if (char === "(" || char === ")" || char === "\\") out += `\\${char}`;
        else if (char.charCodeAt(0) >= 32 && char.charCodeAt(0) <= 126) out += char;
        else out += "?";
    }
    return out;
}

function buildPdf(lines) {
    let stream = "0.09 0.16 0.28 rg\n0 760 612 32 re f\n";
    lines.forEach((line) => {
        const fill = line.y >= 760 ? "1 1 1 rg " : "0.09 0.14 0.22 rg ";
        stream += "BT /F1 " + (line.size || 11) + " Tf " + fill + "48 " + line.y + " Td (" + winAnsi(line.text) + ") Tj ET\n";
    });
    const objects = [
        "<< /Type /Catalog /Pages 2 0 R >>",
        "<< /Type /Pages /Count 1 /Kids [3 0 R] >>",
        "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
        `<< /Length ${stream.length} >>\nstream\n${stream}endstream`,
        "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>"
    ];
    let pdf = "%PDF-1.4\n";
    const offsets = [0];
    objects.forEach((object, index) => {
        offsets.push(pdf.length);
        pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
    });
    const xref = pdf.length;
    pdf += `xref\n0 ${objects.length + 1}\n`;
    pdf += "0000000000 65535 f \n";
    for (let index = 1; index <= objects.length; index += 1) {
        pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
    }
    pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
    return pdf;
}

function downloadPdf() {
    const alert = selected();
    const pdf = buildPdf(reportLines(alert));
    downloadBlob(`AeroUrbis_${alert.id}_reporte.pdf`, pdf, "application/pdf");
    addHistory(`Reporte PDF descargado · ${alert.id} · ${alert.neighborhood}`);
    persist();
    toast("PDF descargado", "ok");
}

function exportCsv() {
    const header = ["id", "comuna", "nombre_comuna", "barrio", "tipos", "lat", "lng", "area_m2", "riesgo", "pendiente", "mitigable", "estado", "indice"];
    const rows = state.alerts.map((alert) => [
        alert.id, alert.commune, alert.communeName, alert.neighborhood, alert.types.join("|"),
        alert.lat.toFixed(4), alert.lng.toFixed(4), alert.areaM2, alert.risk, alert.slope,
        alert.mitigable ? "si" : "no", alert.status, priorityIndex(alert)
    ]);
    const csv = [header, ...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    downloadBlob("AeroUrbis_alertas_2026-10-25.csv", `\uFEFF${csv}`, "text/csv;charset=utf-8");
    addHistory("Cola de alertas exportada a CSV.");
    persist();
    toast("CSV exportado", "ok");
}

function handleAction(action, element, event) {
    const id = element.dataset.id;
    if (action === "login") return handleLogin(element);
    if (action === "fill-demo") {
        element.disabled = true;
        setTimeout(() => startSession(sessionFrom(element.dataset.email), false), 500);
        return;
    }
    if (action === "toggle-password") {
        const input = document.getElementById("password");
        if (!input) return;
        const show = input.type === "password";
        input.type = show ? "text" : "password";
        element.textContent = show ? "Ocultar" : "Mostrar";
        return;
    }
    if (action === "auth-screen") {
        state.auth.screen = element.dataset.screen;
        state.auth.error = "";
        renderLogin();
        return;
    }
    if (action === "send-code") {
        const email = element.email.value.trim().toLowerCase();
        if (!email.includes("@")) {
            state.auth.error = "Escribe el correo institucional.";
            state.auth.screen = "forgot";
            renderLogin();
            return;
        }
        resetCodeSentTo = email;
        state.auth = { screen: "reset", email, error: "" };
        renderLogin();
        return;
    }
    if (action === "reset-password") {
        const code = element.code.value.trim();
        const password = element.password.value;
        const confirm = element.confirm.value;
        state.auth.error = "";
        if (code !== "482913") state.auth.error = "El código de demostración es 482913.";
        else if (password.length < 6) state.auth.error = "Usa al menos 6 caracteres.";
        else if (password !== confirm) state.auth.error = "Las contraseñas no coinciden.";
        if (state.auth.error) {
            state.auth.screen = "reset";
            renderLogin();
            return;
        }
        state.auth = { screen: "login", email: resetCodeSentTo, error: "" };
        renderLogin();
        toast("Contraseña actualizada en la simulación. Usa AeroUrbis2026 para entrar.", "ok");
        return;
    }
    if (action === "show") return showView(element.dataset.view);
    if (action === "toggle-sidebar") {
        document.getElementById("sidebar").classList.toggle("open");
        const scrim = document.querySelector(".scrim");
        if (scrim) scrim.hidden = !document.getElementById("sidebar").classList.contains("open");
        return;
    }
    if (action === "open-compare") return openCompare(id);
    if (action === "open-alert") {
        closeModal();
        const panel = document.getElementById("notif-panel");
        if (panel) panel.hidden = true;
        const results = document.getElementById("search-results");
        if (results) results.hidden = true;
        return openAlert(id);
    }
    if (action === "select-pin") {
        state.selectedId = id;
        showView("map");
        return;
    }
    if (action === "open-vulnerability") return showView("vulnerability");
    if (action === "open-report") return showView("report");
    if (action === "drill") {
        state.alertsFilter = element.dataset.filter;
        showView("alerts");
        return;
    }
    if (action === "set-filter") {
        state.alertsFilter = element.dataset.filter;
        showView("alerts");
        return;
    }
    if (action === "sort") {
        const key = element.dataset.key;
        if (state.alertSort.key === key) state.alertSort.dir = state.alertSort.dir === "asc" ? "desc" : "asc";
        else state.alertSort = { key, dir: key === "id" || key === "commune" ? "asc" : "desc" };
        const wrap = document.getElementById("alert-table-wrap");
        if (wrap) wrap.innerHTML = alertTableHTML();
        else showView("alerts");
        return;
    }
    if (action === "zoom") {
        const delta = element.dataset.dir === "in" ? 0.15 : -0.15;
        state.map.zoom = Math.max(1, Math.min(1.8, state.map.zoom + delta));
        showView("map");
        return;
    }
    if (action === "swap-dates") {
        const { base, current } = state.compare;
        state.compare.base = current;
        state.compare.current = base;
        showView("compare");
        return;
    }
    if (action === "copy-coords") {
        const alert = selected();
        const text = `${alert.lat.toFixed(4)}, ${alert.lng.toFixed(4)}`;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => toast("Coordenadas copiadas", "ok")).catch(() => toast(text, "ok"));
        } else toast(text, "ok");
        return;
    }
    if (action === "set-status") {
        const alert = selected();
        alert.status = element.dataset.status;
        addHistory(`${alert.id} pasó a ${statusLabel(alert.status)}.`);
        showView("alert");
        toast(`Alerta ${statusLabel(alert.status).toLowerCase()}`, "ok");
        return;
    }
    if (action === "ask-close") {
        openModal(closeDialogHTML());
        return;
    }
    if (action === "confirm-close") {
        const alert = selected();
        const reason = document.getElementById("close-reason").value;
        alert.status = "cerrada";
        alert.closeReason = reason;
        addHistory(`${alert.id} cerrada · ${closeReasonLabel(reason)}.`);
        closeModal();
        showView("alert");
        toast("Alerta cerrada", "ok");
        return;
    }
    if (action === "reopen-alert") {
        const alert = selected();
        alert.status = "analisis";
        alert.closeReason = "";
        addHistory(`${alert.id} reabierta y devuelta a análisis.`);
        showView("alert");
        toast("Alerta reabierta", "ok");
        return;
    }
    if (action === "download-pdf") return downloadPdf();
    if (action === "export-csv") return exportCsv();
    if (action === "open-sync") {
        const alert = selected();
        state.sync.system = state.user.sector === "privado" ? "crm" : "arcgis";
        state.sync.dest = state.sync.system === "arcgis" ? suggestedCrew(alert).id : "garantias";
        openModal(syncModalHTML());
        return;
    }
    if (action === "set-system") {
        state.sync.system = element.dataset.system;
        state.sync.dest = state.sync.system === "arcgis" ? suggestedCrew(selected()).id : "garantias";
        openModal(syncModalHTML());
        return;
    }
    if (action === "confirm-sync") {
        confirmSync();
        return;
    }
    if (action === "close-modal") {
        if (event.target !== element && !element.classList.contains("btn")) return;
        closeModal();
        return;
    }
    if (action === "toggle-notif") {
        const panel = document.getElementById("notif-panel");
        panel.hidden = !panel.hidden;
        if (!panel.hidden) panel.innerHTML = notificationsHTML();
        return;
    }
    if (action === "open-moments") {
        openModal(momentsHTML(), true);
        return;
    }
    if (action === "goto-moment") {
        closeModal();
        state.selectedId = "AU-2412";
        const target = element.dataset.target;
        if (target === "sync") {
            showView("report");
            state.sync.system = "arcgis";
            state.sync.dest = "nororiente";
            openModal(syncModalHTML());
            return;
        }
        showView(target === "success" && !state.lastAssignment ? "report" : target);
        if (target === "success" && !state.lastAssignment) toast("La confirmación aparece después de sincronizar.", "warn");
        return;
    }
    if (action === "ask-reset") {
        openModal(`
            <h3>Restablecer demostración</h3>
            <p>Vuelven las 12 alertas nuevas, se borra el historial y la Comuna 3 queda otra vez sin asignar. Tu sesión sigue abierta.</p>
            <div class="btn-row">
                <button class="btn btn-ghost" type="button" data-action="close-modal">Cancelar</button>
                <button class="btn btn-danger" type="button" data-action="reset-demo">Restablecer</button>
            </div>`);
        return;
    }
    if (action === "reset-demo") {
        const user = state.user;
        const remember = state.remember;
        state = defaultState();
        state.user = user;
        state.remember = remember;
        addHistory("Demostración restablecida.");
        closeModal();
        showView("dashboard");
        toast("Datos de demostración restablecidos", "ok");
        return;
    }
    if (action === "logout") {
        state.user = null;
        state.remember = false;
        persist();
        renderLogin();
        toast("Sesión cerrada");
        return;
    }
    if (action === "test-api") {
        const key = element.dataset.system;
        element.disabled = true;
        element.textContent = "Probando…";
        const latency = 140 + Math.floor(Math.random() * 180);
        setTimeout(() => {
            state.integrations[key].latency = latency;
            state.integrations[key].checkedAt = new Date().toISOString();
            state.integrations[key].status = "conectado";
            addHistory(`Prueba de API ${key === "arcgis" ? "ArcGIS" : "CRM"} · ${latency} ms.`);
            showView("integrations");
            toast(`Conexión operativa · ${latency} ms`, "ok");
        }, 800);
    }
}

document.addEventListener("click", (event) => {
    const actionEl = event.target.closest("[data-action]");
    if (actionEl && actionEl.dataset.action !== "login" && actionEl.dataset.action !== "send-code" && actionEl.dataset.action !== "reset-password") {
        handleAction(actionEl.dataset.action, actionEl, event);
    }
    if (!event.target.closest(".notif-wrap")) {
        const panel = document.getElementById("notif-panel");
        if (panel) panel.hidden = true;
    }
    if (!event.target.closest(".search-wrap")) {
        const results = document.getElementById("search-results");
        if (results) results.hidden = true;
    }
});

document.addEventListener("submit", (event) => {
    const form = event.target.closest("form[data-action]");
    if (!form) return;
    event.preventDefault();
    handleAction(form.dataset.action, form, event);
});

document.addEventListener("input", (event) => {
    if (event.target.dataset && event.target.dataset.model && event.target.type !== "checkbox" && event.target.tagName !== "SELECT") {
        applyModel(event.target);
    }
});

document.addEventListener("change", (event) => {
    if (event.target.dataset && event.target.dataset.model) applyModel(event.target);
});

document.addEventListener("keydown", (event) => {
    const handle = event.target.closest && event.target.closest(".handle");
    if (handle) {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            const delta = event.key === "ArrowLeft" ? -2 : 2;
            state.compare.pos = Math.max(4, Math.min(96, state.compare.pos + delta));
            const stage = document.getElementById("compare-stage");
            if (stage) stage.style.setProperty("--pos", `${state.compare.pos}%`);
            handle.setAttribute("aria-valuenow", String(Math.round(state.compare.pos)));
            persist();
        }
    }
    if (event.key === "Escape") closeModal();
});

load();
if (state.user) renderShell();
else renderLogin();
