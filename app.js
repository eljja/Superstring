/**
 * Superstring Hub Core Application (v1.1)
 * Handles database UI rendering, tab navigation, interactive solvers,
 * real-time Canvas-based string vibration simulation, and the
 * Particle Assembly Lab + Theoretical Diagnostics engines.
 */

// --- 1. Database (Ported from superstring_db/data.py) ---
const THEORIES_DB = {
    "Type_IIB": {
        name: "Type IIB",
        dimensions: 10,
        orientation: "Oriented",
        string_type: "Closed",
        supersymmetry: "N=2 chiral (2,0)",
        supercharges: 32,
        gauge_group: "None",
        description: "Type IIB superstring theory consists of oriented, closed strings. It has N=2 supersymmetry, which is chiral (meaning left- and right-movers have the same chirality). It is exceptionally symmetric, possessing a non-perturbative SL(2, Z) S-duality symmetry that maps the theory to itself, exchanging the fundamental string (F1) and the D-string (D1).",
        massless_spectrum: [
            { name: "Graviton", symbol: "g_μν", spin: 2, sector: "NS-NS", description: "Mediator of gravity" },
            { name: "Dilaton", symbol: "φ", spin: 0, sector: "NS-NS", description: "Governs string coupling strength" },
            { name: "Kalb-Ramond 2-form", symbol: "B₂", spin: 1, sector: "NS-NS", description: "Kalb-Ramond field, couples to F1 strings" },
            { name: "Axion", symbol: "C₀", spin: 0, sector: "R-R", description: "Ramond-Ramond 0-form field" },
            { name: "Ramond-Ramond 2-form", symbol: "C₂", spin: 1, sector: "R-R", description: "Kalb-Ramond-like field, couples to D-strings" },
            { name: "Ramond-Ramond 4-form", symbol: "C₄", spin: 1, sector: "R-R", description: "Has a self-dual 5-form field strength F₅⁺, couples to D3-branes" },
            { name: "Gravitinos", symbol: "Ψ_μ¹, Ψ_μ²", spin: 1.5, sector: "NS-R / R-NS", description: "Two gravitinos of the same chirality" },
            { name: "Dilatinos", symbol: "λ¹, λ²", spin: 0.5, sector: "NS-R / R-NS", description: "Two dilatinos of the same chirality" }
        ],
        allowed_branes: [
            { name: "D1-brane (D-string)", dimension: 1, tension_formula: "1 / (2π · g_s · α')", charge: "C₂" },
            { name: "D3-brane", dimension: 3, tension_formula: "1 / ((2π)³ · g_s · α'²)", charge: "C₄" },
            { name: "D5-brane", dimension: 5, tension_formula: "1 / ((2π)⁵ · g_s · α'³)", charge: "C₆" },
            { name: "D7-brane", dimension: 7, tension_formula: "1 / ((2π)⁷ · g_s · α'⁴)", charge: "C₈" },
            { name: "NS5-brane", dimension: 5, tension_formula: "1 / ((2π)⁵ · g_s² · α'³)", charge: "B₆ (Kalb-Ramond)" }
        ],
        dualities: [
            { type: "T-이중성 (T-Duality)", target: "Type_IIA", mapping: "R ↔ α' / R", effect: "Type IIB를 반경 R 원에 압축화한 것은 Type IIA를 반경 α'/R 원에 압축화한 것과 물리적으로 완벽히 동등합니다." },
            { type: "S-이중성 (S-Duality)", target: "Type_IIB (자가이중성)", mapping: "g_s ↔ 1 / g_s", effect: "강결합 Type IIB는 약결합 Type IIB와 동등하며, 이 과정에서 F1 끈 ↔ D1 끈, NS5-브레인 ↔ D5-브레인으로 교환됩니다." }
        ]
    },
    "Type_IIA": {
        name: "Type IIA",
        dimensions: 10,
        orientation: "Oriented",
        string_type: "Closed",
        supersymmetry: "N=2 non-chiral (1,1)",
        supercharges: 32,
        gauge_group: "None",
        description: "Type IIA superstring theory consists of oriented, closed strings. It has N=2 supersymmetry, which is non-chiral (meaning left- and right-movers have opposite chiralities). It is equivalent to 11D M-Theory compactified on a circle, where D0-branes represent Kaluza-Klein momentum states. It is T-dual to Type IIB.",
        massless_spectrum: [
            { name: "Graviton", symbol: "g_μν", spin: 2, sector: "NS-NS", description: "Mediator of gravity" },
            { name: "Dilaton", symbol: "φ", spin: 0, sector: "NS-NS", description: "Governs string coupling strength" },
            { name: "Kalb-Ramond 2-form", symbol: "B₂", spin: 1, sector: "NS-NS", description: "Kalb-Ramond field, couples to F1 strings" },
            { name: "Ramond-Ramond 1-form", symbol: "C₁", spin: 1, sector: "R-R", description: "Gauge potential for D0-branes" },
            { name: "Ramond-Ramond 3-form", symbol: "C₃", spin: 1, sector: "R-R", description: "Gauge potential for D2-branes" },
            { name: "Gravitinos", symbol: "Ψ_μ¹, Ψ_μ²", spin: 1.5, sector: "NS-R / R-NS", description: "Two gravitinos of opposite chirality" },
            { name: "Dilatinos", symbol: "λ¹, λ²", spin: 0.5, sector: "NS-R / R-NS", description: "Two dilatinos of opposite chirality" }
        ],
        allowed_branes: [
            { name: "D0-brane", dimension: 0, tension_formula: "1 / (g_s · √α')", charge: "C₁" },
            { name: "D2-brane", dimension: 2, tension_formula: "1 / ((2π)² · g_s · α'¹.⁵)", charge: "C₃" },
            { name: "D4-brane", dimension: 4, tension_formula: "1 / ((2π)⁴ · g_s · α'².⁵)", charge: "C₅" },
            { name: "D6-brane", dimension: 6, tension_formula: "1 / ((2π)⁶ · g_s · α'³.⁵)", charge: "C₇" },
            { name: "D8-brane", dimension: 8, tension_formula: "1 / ((2π)⁸ · g_s · α'⁴.⁵)", charge: "C₉" },
            { name: "NS5-brane", dimension: 5, tension_formula: "1 / ((2π)⁵ · g_s² · α'³)", charge: "B₆" }
        ],
        dualities: [
            { type: "T-이중성 (T-Duality)", target: "Type_IIB", mapping: "R ↔ α' / R", effect: "Type IIA를 반경 R의 원에 압축화한 물리적 상태는 Type IIB를 반경 α'/R의 원에 압축화한 상태와 완전히 동일합니다." },
            { type: "강결합 극한 (M-Theory Limit)", target: "M_Theory", mapping: "R_11 = g_s · √α'", effect: "결합 상수 g_s가 무한대로 가는 강결합 극한에서 Type IIA는 11번째 공간 차원이 자라나며 11차원 M-이론으로 전이합니다." }
        ]
    },
    "Type_I": {
        name: "Type I",
        dimensions: 10,
        orientation: "Unoriented",
        string_type: "Open & Closed",
        supersymmetry: "N=1 chiral",
        supercharges: 16,
        gauge_group: "SO(32)",
        description: "Type I superstring theory includes both open and closed, unoriented strings. It exhibits N=1 supersymmetry in 10 dimensions, with 16 supercharges. An anomaly cancellation mechanism forces its gauge group to be SO(32). It is dual to the Heterotic SO(32) theory under S-duality.",
        massless_spectrum: [
            { name: "Graviton", symbol: "g_μν", spin: 2, sector: "NS-NS (Closed)", description: "Mediator of gravity" },
            { name: "Dilaton", symbol: "φ", spin: 0, sector: "NS-NS (Closed)", description: "Governs string coupling strength" },
            { name: "RR 2-form", symbol: "C₂", spin: 1, sector: "R-R (Closed)", description: "Couples to D1 and D5 branes" },
            { name: "SO(32) Gauge Bosons", symbol: "A_μ", spin: 1, sector: "Gauge (Open)", description: "Gauge fields for SO(32) Yang-Mills force fields" },
            { name: "Gravitino", symbol: "Ψ_μ", spin: 1.5, sector: "NS-R / R-NS", description: "Supersymmetric partner of the graviton" },
            { name: "Dilatino", symbol: "λ", spin: 0.5, sector: "NS-R / R-NS", description: "Supersymmetric partner of the dilaton" },
            { name: "Gaugino", symbol: "χ", spin: 0.5, sector: "Gaugino (Open)", description: "Supersymmetric partner of the gauge bosons" }
        ],
        allowed_branes: [
            { name: "D1-brane (D-string)", dimension: 1, tension_formula: "1 / (2π · g_s · α')", charge: "C₂" },
            { name: "D5-brane", dimension: 5, tension_formula: "1 / ((2π)⁵ · g_s · α'³)", charge: "C₆" },
            { name: "D9-brane", dimension: 9, tension_formula: "1 / ((2π)⁹ · g_s · α'⁵)", charge: "C₁₀" }
        ],
        dualities: [
            { type: "S-이중성 (S-Duality)", target: "Heterotic_SO32", mapping: "g_s^(Type I) = 1 / g_s^(Het)", effect: "강결합된 Type I 열린끈 이론은 수학적으로 약결합된 Heterotic SO(32) 닫힌끈 이론과 물리적으로 완전히 동일합니다." }
        ]
    },
    "Heterotic_E8xE8": {
        name: "Heterotic E8 x E8",
        dimensions: 10,
        orientation: "Oriented",
        string_type: "Closed",
        supersymmetry: "N=1 chiral",
        supercharges: 16,
        gauge_group: "E8 x E8",
        description: "Heterotic E8 x E8 is a highly unique closed-string theory. Left-moving modes are bosonic strings in 26 dimensions (where 16 compact dimensions generate the E8 x E8 gauge group), while right-moving modes are 10D superstrings. Compactifying this on a Calabi-Yau manifold naturally breaks E8 to E6, creating standard 3-generation grand unified theories (GUTs).",
        massless_spectrum: [
            { name: "Graviton", symbol: "g_μν", spin: 2, sector: "NS-NS", description: "Mediator of gravity" },
            { name: "Dilaton", symbol: "φ", spin: 0, sector: "NS-NS", description: "Governs string coupling strength" },
            { name: "Kalb-Ramond 2-form", symbol: "B₂", spin: 1, sector: "NS-NS", description: "Kalb-Ramond field, couples to string worldsheet" },
            { name: "E8 x E8 Gauge Bosons", symbol: "A_μ", spin: 1, sector: "Gauge (Left-movers)", description: "Gauge fields representing E8 x E8 local symmetries" },
            { name: "Gravitino", symbol: "Ψ_μ", spin: 1.5, sector: "R (Right-movers)", description: "Supersymmetric partner of the graviton" },
            { name: "Dilatino", symbol: "λ", spin: 0.5, sector: "R (Right-movers)", description: "Supersymmetric partner of the dilaton" },
            { name: "E8 x E8 Gaugino", symbol: "χ", spin: 0.5, sector: "Gaugino (Left/Right)", description: "Supersymmetric partner of the gauge bosons" }
        ],
        allowed_branes: [
            { name: "NS5-brane", dimension: 5, tension_formula: "1 / ((2π)⁵ · g_s² · α'³)", charge: "B₆ (Kalb-Ramond)" }
        ],
        dualities: [
            { type: "T-이중성 (T-Duality)", target: "Heterotic_SO32", mapping: "R ↔ α' / R", effect: "반경 R의 원에 압축화된 Heterotic E8xE8 이론은 반경 α'/R의 원에 압축화된 Heterotic SO(32)와 이중성 관계를 이룹니다." },
            { type: "강결합 극한 (Horava-Witten)", target: "M_Theory", mapping: "R_11 = g_s · √α'", effect: "결합상수가 커지면 11차원 M-이론이 S1/Z2(선분) 상에 놓인 상태(호자바-위튼 이론)로 전이하며, 두 E8 게이지 그룹은 각각 선분의 양끝 9차원 경계면에 국소화됩니다." }
        ]
    },
    "Heterotic_SO32": {
        name: "Heterotic SO(32)",
        dimensions: 10,
        orientation: "Oriented",
        string_type: "Closed",
        supersymmetry: "N=1 chiral",
        supercharges: 16,
        gauge_group: "SO(32)",
        description: "Heterotic SO(32) theory shares the hybrid structure of the E8 x E8 theory (left-moving 26D bosonic modes, right-moving 10D superstring modes), but the 16 compact left-moving dimensions are configured to produce SO(32) gauge symmetry. It is chiral, has N=1 supersymmetry, and is T-dual to Heterotic E8 x E8.",
        massless_spectrum: [
            { name: "Graviton", symbol: "g_μν", spin: 2, sector: "NS-NS", description: "Mediator of gravity" },
            { name: "Dilaton", symbol: "φ", spin: 0, sector: "NS-NS", description: "Governs string coupling strength" },
            { name: "Kalb-Ramond 2-form", symbol: "B₂", spin: 1, sector: "NS-NS", description: "Kalb-Ramond field" },
            { name: "SO(32) Gauge Bosons", symbol: "A_μ", spin: 1, sector: "Gauge (Left-movers)", description: "Gauge fields representing SO(32) symmetries" },
            { name: "Gravitino", symbol: "Ψ_μ", spin: 1.5, sector: "R (Right-movers)", description: "Supersymmetric partner of the graviton" },
            { name: "Dilatino", symbol: "λ", spin: 0.5, sector: "R (Right-movers)", description: "Supersymmetric partner of the dilaton" },
            { name: "SO(32) Gaugino", symbol: "χ", spin: 0.5, sector: "Gaugino", description: "Supersymmetric partner of the gauge bosons" }
        ],
        allowed_branes: [
            { name: "NS5-brane", dimension: 5, tension_formula: "1 / ((2π)⁵ · g_s² · α'³)", charge: "B₆" }
        ],
        dualities: [
            { type: "T-이중성 (T-Duality)", target: "Heterotic_E8xE8", mapping: "R ↔ α' / R", effect: "Heterotic SO(32)를 반경 R 원에 압축화한 상태는 Heterotic E8xE8을 반경 α'/R 원에 압축화한 물리적 상태와 같습니다." },
            { type: "S-이중성 (S-Duality)", target: "Type_I", mapping: "g_s^(Het) = 1 / g_s^(Type I)", effect: "강하게 결합된 Heterotic SO(32) 이론은 약하게 결합된 Type I 열린끈/닫힌끈 이론과 수학적으로 완전히 동치입니다." }
        ]
    },
    "M_Theory": {
        name: "M-Theory",
        dimensions: 11,
        orientation: "Oriented",
        string_type: "None (Membranes only)",
        supersymmetry: "N=1 (11D)",
        supercharges: 32,
        gauge_group: "None",
        description: "M-Theory is the overarching 11-dimensional theory that unites all five superstring theories. Instead of strings, its fundamental excitations are 2-dimensional membranes (M2-branes) and 5-dimensional membranes (M5-branes). Superstring theories emerge as different limits of M-Theory (e.g., Type IIA is M-Theory compactified on a circle, Heterotic E8xE8 is M-Theory compactified on an interval S1/Z2).",
        massless_spectrum: [
            { name: "11D Graviton", symbol: "g_MN", spin: 2, sector: "11D Supergravity", description: "11-dimensional graviton field" },
            { name: "11D 3-form field", symbol: "A₃", spin: 1, sector: "11D Supergravity", description: "Three-form gauge potential, couples to M2-branes" },
            { name: "11D Gravitino", symbol: "Ψ_M", spin: 1.5, sector: "11D Supergravity", description: "11-dimensional N=1 chiral gravitino (32 supercharges)" }
        ],
        allowed_branes: [
            { name: "M2-brane", dimension: 2, tension_formula: "1 / ((2π)² · l_p³)", charge: "A₃ (3-form)" },
            { name: "M5-brane", dimension: 5, tension_formula: "1 / ((2π)⁵ · l_p⁶)", charge: "A₆ (magnetic dual of A₃)" }
        ],
        dualities: []
    }
};

// --- 2. State & DOM References ---
let activeTab = "explorer";
let activeTheory = "Type_IIB";
const canvas = document.getElementById("string-canvas");
const ctx = canvas.getContext("2d");

// Particle Presets
const presets = {
    photon: { type: "open", n: 0.5, sector: "NS", desc: "열린 끈의 가진 진동(NS sector, N=1/2): 종단점이 D-브레인에 구속된 벡터 전자기력 광자 요동을 묘사합니다.", m2: 0, mass: "0.00 GeV" },
    open_massive: { type: "open", n: 1.5, sector: "NS", desc: "열린 끈의 고진동 흥분 상태(NS sector, N=3/2): 질량이 1.0/sqrt(α') 근처에 형성되는 무거운 보손 입자입니다.", m2: 1.0, mass: "1.00 M_s" },
    tachyon: { type: "open", n: 0.0, sector: "NS", desc: "열린 끈의 타키온 불안정 진동 상태(NS sector, N=0): 질량 제곱이 음수(-0.5/α')이며, 끈 응축과 진공 붕괴 상태의 급격한 변동을 의미하는 허수 질량 진동입니다.", m2: -0.5, mass: "i · 0.707 M_s" },
    graviton: { type: "closed", nl: 0.5, nr: 0.5, sector: "NS", desc: "닫힌 끈의 가로-세로 편향 진동(NS-NS sector, N_L=0.5, N_R=0.5): 두 개의 반대 방향 진행파가 합성되어 정상파 형태의 스핀-2 중력 자극을 구현합니다.", m2: 0, mass: "0.00 GeV" },
    dilaton: { type: "closed", nl: 0.5, nr: 0.5, sector: "NS", desc: "닫힌 끈의 방사형 팽창 수축 진동(NS-NS sector, breathing mode): 끈의 평균 반경이 주기적으로 요동하며 우주의 끈 결합 상수 g_s의 진공 상태(VEV)를 결정하는 딜라톤을 묘사합니다.", m2: 0, mass: "0.00 GeV" },
    kk_mode: { type: "closed", nl: 1.5, nr: 0.5, sector: "NS", desc: "압축된 원주 차원을 따라 회전(momentum)하는 Kaluza-Klein 진동: 끈이 압축 차원 축으로 물리적 속도를 가지며 달리는 양자 운동량을 묘사합니다.", m2: 1.25, mass: "1.118 M_s" },
    winding_mode: { type: "closed", nl: 0.5, nr: 1.5, sector: "NS", desc: "압축된 원주 차원을 감고(winding) 있는 진동: 공간이 작게 휘어짐에 따라 끈 자체가 둥글게 원 형태의 4차원에 단단히 감겨 있는 위상학적 요소를 묘사합니다.", m2: 1.25, mass: "1.118 M_s" }
};

// --- 3. Tab Switching Logic (v1.1) ---
function initTabs() {
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const tabId = btn.getAttribute("data-tab");
            activeTab = tabId;
            
            // Toggle active tab buttons
            document.querySelectorAll(".tab-btn").forEach(b => b.classList.toggle("active", b === btn));
            
            // Toggle left panels
            document.querySelectorAll(".left-panel .subpanel-content").forEach(panel => {
                panel.classList.toggle("active", panel.id === `left-${tabId}`);
            });
            
            // Toggle right panels
            document.querySelectorAll(".right-panel .subpanel-content").forEach(panel => {
                panel.classList.toggle("active", panel.id === `right-${tabId}`);
            });
            
            // Update canvas description based on active tab
            const canvasDesc = document.getElementById("canvas-desc");
            if (tabId === "explorer") {
                handlePresetChange();
            } else if (tabId === "assembly") {
                canvasDesc.innerText = "입자 조립 연구소 라이브 진동면: 조합된 양자수와 압축 반경에 맞게 닫힌끈 또는 열린끈의 커스텀 정상파 진동 요동을 실시간으로 렌더링합니다.";
            } else if (tabId === "scattering") {
                canvasDesc.innerText = "입자 산란 연구소 세계면 튜브 (pants diagram): 두 개의 끈이 병합된 후 붕괴하여 새로운 끈들로 나누어지는 연속적이고 특이점 없는 2차원 세계면 위상 공간을 시각화합니다.";
            } else if (tabId === "diagnostics") {
                canvasDesc.innerText = "이론적 검증 및 진단 라이브 모니터: 설정된 매개변수 하에서 끈의 무결성 및 등각 변칙 붕괴 파동을 감지하고 상태를 점검합니다.";
            }
            
            // Execute related calculations immediately
            if (tabId === "assembly") {
                runAssemblyEngine();
            } else if (tabId === "scattering") {
                runScatteringEngine();
            } else if (tabId === "diagnostics") {
                runDiagnosticsEngine();
            }
        });
    });
}

// --- 4. Theory Explorer rendering ---
function updateTheoryUI(theoryId) {
    const theory = THEORIES_DB[theoryId];
    if (!theory) return;

    activeTheory = theoryId;
    
    // Update active tab button styling
    document.querySelectorAll(".theory-btn").forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-theory") === theoryId);
    });

    // Update Text details
    document.getElementById("theory-title").innerText = theory.name + " Superstring";
    document.getElementById("theory-desc").innerText = theory.description;
    document.getElementById("theory-dims").innerText = theory.dimensions + "D";
    document.getElementById("theory-string-type").innerText = theory.string_type;
    document.getElementById("theory-susy").innerText = theory.supersymmetry;
    document.getElementById("theory-gauge").innerText = theory.gauge_group || "None";

    // Populate Massless Table
    const tbody = document.getElementById("massless-table").querySelector("tbody");
    tbody.innerHTML = "";
    theory.massless_spectrum.forEach(field => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${field.name}</strong></td>
            <td><span class="field-symbol">${field.symbol}</span></td>
            <td>${field.spin}</td>
            <td style="color: var(--text-muted); font-size:11px;">${field.sector}</td>
        `;
        tbody.appendChild(tr);
    });

    // Populate Allowed Branes Cards
    const branesContainer = document.getElementById("branes-container");
    branesContainer.innerHTML = "";
    theory.allowed_branes.forEach(brane => {
        const card = document.createElement("div");
        card.className = "brane-badge-card";
        card.innerHTML = `
            <h5>${brane.name} (p=${brane.dimension})</h5>
            <span class="brane-formula">장력: T_p = ${brane.tension_formula}</span>
            <span style="font-size:10px; color:#22d3ee;">전하 캐리어: ${brane.charge}</span>
        `;
        branesContainer.appendChild(card);
    });

    // Populate Dualities
    const dualitiesContainer = document.getElementById("dualities-container");
    dualitiesContainer.innerHTML = "";
    if (theory.dualities.length === 0) {
        dualitiesContainer.innerHTML = `<p style="font-size:11px; color:var(--text-muted);">M-이론은 최상위 11차원 연합 이론으로, 다른 끈 이론들이 극한 상태에서 M-이론으로 수렴합니다.</p>`;
    } else {
        theory.dualities.forEach(dual => {
            const card = document.createElement("div");
            card.className = "duality-item-card";
            card.innerHTML = `
                <h6>${dual.type} ➔ ${THEORIES_DB[dual.target]?.name || dual.target}</h6>
                <p style="font-family:'Fira Code', monospace; color:#34d399; margin-bottom:4px;">매핑: ${dual.mapping}</p>
                <p>${dual.effect}</p>
            `;
            dualitiesContainer.appendChild(card);
        });
    }
}

// Add event listeners to theory buttons in explorer
document.querySelectorAll(".theory-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-theory");
        updateTheoryUI(id);
    });
});

// --- 5. Interactive Math Solvers (Tab 1) ---

function runSpectrumCalc() {
    const alpha = parseFloat(document.getElementById("spec-alpha").value) || 1.0;
    const type = document.getElementById("spec-type").value;
    const sector = document.getElementById("spec-sector").value;
    const a = sector === "NS" ? 0.5 : 0.0;
    
    let resultText = "";
    
    if (type === "open") {
        document.getElementById("nl-wrapper").style.display = "none";
        document.getElementById("nr-wrapper").style.display = "none";
        document.getElementById("n-wrapper").style.display = "block";
        
        const N = parseFloat(document.getElementById("spec-n").value) || 0;
        const massSq = (1.0 / alpha) * (N - a);
        
        if (massSq < 0) {
            const massImag = Math.sqrt(Math.abs(massSq));
            resultText = `질량 제곱 M² = ${massSq.toFixed(4)} GeV²\n물리 질량 M  = i · ${massImag.toFixed(4)} GeV (타키온 불안정성)`;
        } else {
            const mass = Math.sqrt(massSq);
            resultText = `질량 제곱 M² = ${massSq.toFixed(4)} GeV²\n물리 질량 M  = ${mass.toFixed(4)} GeV\n형태: ${massSq === 0 ? "무질량 게이지 보손/페르미온" : "질량성 가진 상태"}`;
        }
    } else {
        document.getElementById("nl-wrapper").style.display = "block";
        document.getElementById("nr-wrapper").style.display = "block";
        document.getElementById("n-wrapper").style.display = "none";
        
        const nL = parseFloat(document.getElementById("spec-nl").value) || 0;
        const nR = parseFloat(document.getElementById("spec-nr").value) || 0;
        
        const isMatched = Math.abs((nL - a) - (nR - a)) < 1e-9;
        const massSq = (4.0 / alpha) * (nL - a);
        
        if (!isMatched) {
            resultText = `경고: 좌진동(N_L - a) ≠ 우진동(N_R - a)로 수준 일치 조건(Level Matching)에 어긋납니다. 물리적인 닫힌 끈 상태가 아닙니다!`;
        } else if (massSq < 0) {
            const massImag = Math.sqrt(Math.abs(massSq));
            resultText = `질량 제곱 M² = ${massSq.toFixed(4)} GeV²\n물리 질량 M  = i · ${massImag.toFixed(4)} GeV (타키온 닫힌끈)`;
        } else {
            const mass = Math.sqrt(massSq);
            resultText = `질량 제곱 M² = ${massSq.toFixed(4)} GeV²\n물리 질량 M  = ${mass.toFixed(4)} GeV\n상태: ${massSq === 0 ? "무질량 중력자/딜라톤/Kalb-Ramond" : "질량성 닫힌끈 가진 입자"}\n수준 일치: 성공 (N_L = N_R = ${nL})`;
        }
    }
    document.getElementById("spec-result").innerText = resultText;
}

function runCompactificationCalc() {
    const R = parseFloat(document.getElementById("comp-r").value) || 2.0;
    const n = parseInt(document.getElementById("comp-n").value) || 0;
    const w = parseInt(document.getElementById("comp-w").value) || 0;
    const alpha_prime = 1.0;
    
    let N_L = 0.5;
    let N_R = 0.5;
    const prod = n * w;
    if (prod > 0) {
        N_L = 0.5 + prod;
        N_R = 0.5;
    } else if (prod < 0) {
        N_L = 0.5;
        N_R = 0.5 + Math.abs(prod);
    }
    
    const kk_contrib = (n / R) ** 2;
    const winding_contrib = (w * R / alpha_prime) ** 2;
    const osc_contrib = (2.0 / alpha_prime) * (N_L + N_R - 1.0);
    
    const massSq = kk_contrib + winding_contrib + osc_contrib;
    const mass = Math.sqrt(massSq);
    const dualR = alpha_prime / R;
    
    document.getElementById("comp-r-val").innerText = R.toFixed(2) + " l_s";
    
    let resHtml = `총 질량 제곱 M² = ${massSq.toFixed(4)} GeV²\n`;
    resHtml += `물리적 질량 M  = ${mass.toFixed(4)} GeV\n`;
    resHtml += `  ↳ KK 운동량 기여: ${kk_contrib.toFixed(4)} GeV²\n`;
    resHtml += `  ↳ Winding 감김 기여: ${winding_contrib.toFixed(4)} GeV²\n`;
    resHtml += `  ↳ 끈 진동자 기여: ${osc_contrib.toFixed(4)} GeV²`;
    
    document.getElementById("comp-result").innerText = resHtml;
    document.getElementById("t-duality-note").innerText = `T-이중성 관계: 반경 R' = ${dualR.toFixed(2)} l_s에서 모드 n=${w}, w=${n}일 때 질량은 ${mass.toFixed(4)} GeV로 완벽히 대칭을 이룹니다.`;
}

function runCYCalc() {
    const h11 = parseInt(document.getElementById("cy-h11").value);
    const h21 = parseInt(document.getElementById("cy-h21").value);
    
    document.getElementById("cy-h11-val").innerText = h11;
    document.getElementById("cy-h21-val").innerText = h21;
    
    const chi = 2 * (h11 - h21);
    const gen = Math.abs(chi) / 2;
    
    let res = `오일러 지표 (Euler Characteristic) χ = ${chi}\n`;
    res += `입자 세대 수 (Fermion Generations) = ${gen} 세대\n\n`;
    res += `물리적 결과: Heterotic E8xE8을 본 칼라비-야우 다양체에 압축화하면 E8 하나가 SU(3) 홀로노미에 의해 깨져 E6 GUT 그룹이 되며, 4차원상에 정확히 ${gen} 세대의 페르미온 입자가 출현합니다.`;
    
    document.getElementById("cy-result").innerText = res;
}

// Bind Tab 1 events
document.getElementById("spec-alpha").addEventListener("input", runSpectrumCalc);
document.getElementById("spec-type").addEventListener("change", runSpectrumCalc);
document.getElementById("spec-sector").addEventListener("change", runSpectrumCalc);
document.getElementById("spec-nl").addEventListener("input", runSpectrumCalc);
document.getElementById("spec-nr").addEventListener("input", runSpectrumCalc);
document.getElementById("spec-n").addEventListener("input", runSpectrumCalc);

document.getElementById("comp-r").addEventListener("input", runCompactificationCalc);
document.getElementById("comp-n").addEventListener("input", runCompactificationCalc);
document.getElementById("comp-w").addEventListener("input", runCompactificationCalc);

document.getElementById("cy-h11").addEventListener("input", runCYCalc);
document.getElementById("cy-h21").addEventListener("input", runCYCalc);


// --- 6. Particle Assembly Lab Engine (Tab 2) ---

function checkGsoProjection(sector, N) {
    const sec = sector.toUpperCase();
    if (sec.includes("NS")) {
        // NS sector: requires N to be k + 0.5 (half-integer)
        return Math.abs((N % 1.0) - 0.5) < 1e-9;
    } else {
        // R sector: requires N to be integer
        return Math.abs((N % 1.0) - 0.0) < 1e-9;
    }
}

function runAssemblyEngine() {
    const theory = document.getElementById("asm-theory").value;
    const sector = document.getElementById("asm-sector").value;
    const nl = parseFloat(document.getElementById("asm-nl").value);
    const nr = parseFloat(document.getElementById("asm-nr").value);
    const n = parseInt(document.getElementById("asm-n").value) || 0;
    const w = parseInt(document.getElementById("asm-w").value) || 0;
    const R = parseFloat(document.getElementById("asm-r").value) || 1.0;
    const susy = parseFloat(document.getElementById("asm-susy").value) || 0.0;
    
    document.getElementById("asm-nl-val").innerText = nl;
    document.getElementById("asm-nr-val").innerText = nr;
    document.getElementById("asm-r-val").innerText = R.toFixed(1) + " l_s";
    document.getElementById("asm-susy-val").innerText = susy.toFixed(1) + " GeV";
    
    const alpha_prime = 1.0;
    const isClosed = !sector.includes("Open") && theory !== "Type_I";
    
    const a_L = sector.split("-")[0].includes("NS") ? 0.5 : 0.0;
    const a_R = sector.split("-")[sector.split("-").length - 1].includes("NS") ? 0.5 : 0.0;
    
    // GSO projection check
    const gso_l = checkGsoProjection(sector.split("-")[0], nl);
    const gso_r = checkGsoProjection(sector.split("-")[sector.split("-").length - 1], nr);
    const gsoPassed = gso_l && gso_r;
    
    // Vibrational mass
    let massSqVib = 0;
    if (isClosed) {
        massSqVib = (4.0 / alpha_prime) * (nl - a_L);
    } else {
        massSqVib = (1.0 / alpha_prime) * (nl - a_L);
    }
    
    // Compactification contributions
    const kk_contrib = (n / R) ** 2;
    const winding_contrib = (w * R / alpha_prime) ** 2;
    const susy_contrib = susy ** 2;
    
    const totalMassSq = massSqVib + kk_contrib + winding_contrib + susy_contrib;
    const isTachyon = totalMassSq < 0;
    const physicalMass = isTachyon ? `i · ${Math.sqrt(Math.abs(totalMassSq)).toFixed(3)}` : Math.sqrt(totalMassSq).toFixed(3);
    
    // Update Result UI
    document.getElementById("asm-res-m2").innerText = totalMassSq.toFixed(3) + " GeV²";
    document.getElementById("asm-res-mass").innerText = physicalMass + " GeV";
    
    const gsoBadge = document.getElementById("asm-res-gso");
    if (gsoPassed) {
        gsoBadge.innerText = "GSO 통과";
        gsoBadge.style.background = "#10b981";
    } else {
        gsoBadge.innerText = "GSO 필터링됨";
        gsoBadge.style.background = "#ef4444";
    }
    
    // Identify state
    let particleName = "조합된 가진 상태 (Assembled String Resonance)";
    let spin = 1.0;
    let rep = "Gauge Group Adjoint";
    let desc = "기본 진동 및 소형차원 모멘텀 모드가 결합된 질량성 끈 여흥 상태입니다.";
    
    if (Math.abs(massSqVib) < 1e-9 && n === 0 && w === 0) {
        if (isClosed) {
            if (a_L === 0.5 && a_R === 0.5) {
                particleName = "중력자 (Graviton)";
                spin = 2.0;
                rep = "4D 중력 싱글렛 (Singlet)";
                desc = "닫힌 끈의 무질량 기저 상태(NS-NS sector)로 시공간 기하학 요동을 조율하는 중력의 매개 입자입니다.";
            } else if (a_L === 0.0 && a_R === 0.0) {
                particleName = "Ramond-Ramond 폼 게이지";
                spin = 1.0;
                rep = "4D 싱글렛";
                desc = "R-R sector의 무질량 게이지 대칭 성분으로, D-브레인의 하전 전하를 보장하는 미립자 형태입니다.";
            }
        } else {
            if (a_L === 0.5) {
                particleName = "광자/글루온 (Gauge Boson)";
                spin = 1.0;
                rep = "GUT 게이지 결합 표현";
                desc = "열린 끈의 무질량 기저 보손 상태로 상호작용의 게이지 전기력을 매개하는 매개 입자입니다.";
            } else {
                particleName = "쿼크/렙톤 페르미온";
                spin = 0.5;
                rep = "게이지 27 혹은 기본 표현";
                desc = "Ramond sector 열린 끈의 무질량 페르미온 상태로 우리 우주의 일반적인 질량성 물질을 구성합니다.";
            }
        }
    }
    
    if (isTachyon) {
        particleName = "타키온 (Tachyon)";
        spin = 0.0;
        rep = "불안정 상태";
        desc = "질량 제곱이 음수이며 진공 기저 상태의 붕괴(Tachyon Condensation)를 나타내는 비물리적 가상 입자입니다. GSO 투영에 의해 필터링됩니다.";
    }
    
    document.getElementById("asm-res-name").innerText = particleName;
    document.getElementById("asm-res-spin").innerText = spin.toFixed(1);
    document.getElementById("asm-res-rep").innerText = "게이지 대칭 표현: " + rep;
    document.getElementById("asm-res-desc").innerText = desc;
    
    const stableLabel = document.getElementById("asm-res-stable");
    if (isTachyon) {
        stableLabel.innerText = "불안정 (Tachyon)";
        stableLabel.style.color = "#ef4444";
    } else if (!gsoPassed) {
        stableLabel.innerText = "비물리적 (GSO 차단)";
        stableLabel.style.color = "#f59e0b";
    } else {
        stableLabel.innerText = "안정 (Stable)";
        stableLabel.style.color = "#10b981";
    }
    
    // Draw GUT Breaking Tree
    const gutTree = document.getElementById("asm-gut-tree");
    gutTree.innerHTML = "";
    
    const path = [
        { group: "E8 x E8 (10차원 초대칭 헤테로틱 게이지군)", cls: "active-root" },
        { group: "➔ E6 x SU(3)_holonomy (칼라비-야우 다양체 진동면 매핑)", cls: "" },
        { group: "  ➔ SO(10) x U(1) (E6 대칭성 대수적 분해)", cls: "" },
        { group: "    ➔ SU(5) x U(1) (최소 대통합 이론 GUT 단계)", cls: "" },
        { group: "      ➔ SU(3)_C x SU(2)_L x U(1)_Y (현대 저에너지 표준모형)", cls: "sm-leaf" }
    ];
    
    path.forEach(node => {
        const div = document.createElement("div");
        div.className = `gut-node ${node.cls}`;
        div.innerText = node.group;
        gutTree.appendChild(div);
    });
}

// Bind Tab 2 events
document.getElementById("asm-theory").addEventListener("change", () => {
    // Dynamically adjust sectors based on theory
    const th = document.getElementById("asm-theory").value;
    const sect = document.getElementById("asm-sector");
    
    if (th === "Type_I") {
        sect.innerHTML = `
            <option value="NS">NS 보손 섹터 (Open)</option>
            <option value="R">R 페르미온 섹터 (Open)</option>
            <option value="NS-NS">NS-NS 닫힌 끈 섹터</option>
        `;
    } else if (th.startsWith("Heterotic")) {
        sect.innerHTML = `
            <option value="NS-NS">NS-NS 보손 섹터 (Closed)</option>
            <option value="R">R 페르미온 섹터 (Right-movers)</option>
        `;
    } else {
        sect.innerHTML = `
            <option value="NS-NS">NS-NS 보손 섹터 (Closed)</option>
            <option value="R-R">R-R 보손 섹터 (Closed)</option>
            <option value="NS-R">NS-R 페르미온 섹터 (Closed)</option>
            <option value="R-NS">R-NS 페르미온 섹터 (Closed)</option>
        `;
    }
    runAssemblyEngine();
});
document.getElementById("asm-sector").addEventListener("change", runAssemblyEngine);
document.getElementById("asm-nl").addEventListener("input", runAssemblyEngine);
document.getElementById("asm-nr").addEventListener("input", runAssemblyEngine);
document.getElementById("asm-n").addEventListener("input", runAssemblyEngine);
document.getElementById("asm-w").addEventListener("input", runAssemblyEngine);
document.getElementById("asm-r").addEventListener("input", runAssemblyEngine);
document.getElementById("asm-susy").addEventListener("input", runAssemblyEngine);


// --- 7. Theoretical Diagnostics Engine (Tab 3) ---

function runDiagnosticsEngine() {
    const D = parseInt(document.getElementById("diag-dims").value);
    const gauge = document.getElementById("diag-gauge").value;
    
    document.getElementById("diag-dims-val").innerText = D + "차원";
    
    // Perform checks
    const checks = [
        {
            name: "시공간 임계 차원 검사 (Critical Spacetime Dimension)",
            passed: D === 10,
            error: D !== 10 ? `임계 차원 붕괴: 현재 ${D}차원 설정입니다.` : "",
            exp: D === 10 ? "등각 이상 변칙(Conformal Anomaly)과 유령 상태(Ghost State)가 완전히 제거되는 유일한 임계차원 D=10을 만족합니다." 
                          : "임계 차원 D=10이 아니면 세계면의 등각 대칭성(Weyl Symmetry)이 깨져 양자 붕괴가 발생하며 질량 계산이 무의미해집니다."
        },
        {
            name: "Green-Schwarz 게이지 변칙 상쇄 검사 (Anomaly Cancellation)",
            passed: gauge.toUpperCase().replace(/\s/g, "") === "SO(32)" || gauge.toUpperCase().replace(/\s/g, "") === "E8XE8" || gauge.toUpperCase().replace(/\s/g, "") === "E8*E8",
            error: !(gauge.toUpperCase().replace(/\s/g, "") === "SO(32)" || gauge.toUpperCase().replace(/\s/g, "") === "E8XE8" || gauge.toUpperCase().replace(/\s/g, "") === "E8*E8") 
                   ? `양자 게이지 변칙 발생: 게이지군 ${gauge}는 10D Green-Schwarz 상쇄를 만족하지 않습니다.` : "",
            exp: (gauge.toUpperCase().replace(/\s/g, "") === "SO(32)" || gauge.toUpperCase().replace(/\s/g, "") === "E8XE8" || gauge.toUpperCase().replace(/\s/g, "") === "E8*E8")
                 ? "10차원 N=1 초대칭 이론에서 발생하는 게이지 및 중력 합성 변칙이 해당 게이지군 하에서 대수적으로 상쇄되어 진공이 완전무결합니다."
                 : "게이지군이 SO(32) 또는 E8 x E8이 아니면 중력-게이지 양자 변칙으로 인해 등가원리가 붕괴하고 광자가 가상 질량을 가지는 파멸적 오류가 발생합니다."
        },
        {
            name: "닫힌 끈 수준 일치 조건 검사 (Level Matching)",
            passed: true, // evaluated dynamically based on particle lab
            error: "",
            exp: "닫힌 끈의 물리적 상태는 세계면 위에서 좌진동과 우진동 에너지 레벨이 정확히 일치하여 고유 회전 매개변수화의 모순이 없는 상태여야 합니다."
        },
        {
            name: "GSO 초대칭 투영 검사 (GSO Projection check)",
            passed: true,
            error: "",
            exp: "가토-스탠저-올리브(GSO) 투영을 통해 세계면의 불안정한 타키온 및 고스트 모드가 완전히 지워져, 시공간 초대칭(Space-time SUSY)이 보존되는 물리적 상태를 보증합니다."
        }
    ];

    // Get dynamic state from Tab 2 for Level Matching and GSO in diagnostic checks
    const sector = document.getElementById("asm-sector").value;
    const nl = parseFloat(document.getElementById("asm-nl").value);
    const nr = parseFloat(document.getElementById("asm-nr").value);
    const n = parseInt(document.getElementById("asm-n").value) || 0;
    const w = parseInt(document.getElementById("asm-w").value) || 0;
    
    const a_L = sector.split("-")[0].includes("NS") ? 0.5 : 0.0;
    const a_R = sector.split("-")[sector.split("-").length - 1].includes("NS") ? 0.5 : 0.0;
    
    const actual_diff = (nl - a_L) - (nr - a_R);
    const expected_diff = n * w;
    const levelMatched = Math.abs(actual_diff - expected_diff) < 1e-9;
    
    checks[2].passed = levelMatched;
    if (!levelMatched) {
        checks[2].error = `수준 불일치: 좌진동(N_L - a_L)과 우진동(N_R - a_R)의 차이(${actual_diff})가 n * w (${expected_diff})와 다릅니다.`;
        checks[2].exp += " 이 조건이 무너지면 끈의 폐곡선 연속성이 파괴되어 4차원에 물리적 입자 상태를 형성할 수 없게 됩니다.";
    }

    const gso_l = checkGsoProjection(sector.split("-")[0], nl);
    const gso_r = checkGsoProjection(sector.split("-")[sector.split("-").length - 1], nr);
    const gsoPassed = gso_l && gso_r;
    
    checks[3].passed = gsoPassed;
    if (!gsoPassed) {
        checks[3].error = "GSO 차단: 설정된 끈 진동은 GSO 투영 필터링 조건에 탈락하여 시공간 초대칭에 어긋납니다.";
        checks[3].exp += " 초끈 이론이 안정적인 상태를 유지하려면 이 필터를 통해 비물리적 타키온 진동을 걸러내고 무질량 페르미온을 남겨야 합니다.";
    }

    // Render diagnostic cards
    const container = document.getElementById("diag-checklist-container");
    container.innerHTML = "";
    
    checks.forEach(chk => {
        const card = document.createElement("div");
        card.className = `diag-card ${chk.passed ? 'passed' : 'failed'}`;
        
        card.innerHTML = `
            <div class="diag-header">
                <span class="diag-title">${chk.name}</span>
                <span class="diag-status-badge ${chk.passed ? 'pass' : 'fail'}">${chk.passed ? 'PASS' : 'FAIL'}</span>
            </div>
            ${!chk.passed ? `<div class="diag-error-msg">⚠️ ${chk.error}</div>` : ''}
            <p class="diag-explanation">${chk.exp}</p>
        `;
        container.appendChild(card);
    });
}

// Bind Tab 3 events
document.getElementById("diag-dims").addEventListener("input", runDiagnosticsEngine);
document.getElementById("diag-gauge").addEventListener("input", runDiagnosticsEngine);


// --- 8. Real-Time String Animation (Canvas Engine) ---
let animationFrameId = null;
let time = 0;

function resizeCanvas() {
    const rect = canvas.parentNode.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
}
window.addEventListener("resize", resizeCanvas);

// Background particles for cosmetic depth
const cosmicParticles = [];
for (let i = 0; i < 30; i++) {
    cosmicParticles.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.0005 + 0.0002,
        opacity: Math.random() * 0.5 + 0.2
    });
}

function drawCosmicBackground() {
    ctx.fillStyle = "rgba(3, 3, 8, 0.25)"; // trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw subtle stars
    cosmicParticles.forEach(p => {
        p.y -= p.speed;
        if (p.y < 0) p.y = 1.0;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x * canvas.width, p.y * canvas.height, p.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawStringSimulation() {
    drawStringSimulationFrame();
}

function drawStringSimulationFrame() {
    drawCosmicBackground();
    
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    
    time += 0.04;
    ctx.shadowBlur = 15;
    
    if (activeTab === "explorer") {
        // --- TAB 1: Classic Explorer Presets ---
        const presetKey = document.getElementById("particle-preset").value;
        const preset = presets[presetKey];
        
        if (preset.type === "open") {
            ctx.shadowColor = presetKey === "tachyon" ? "rgba(239, 68, 68, 0.8)" : "rgba(34, 211, 238, 0.8)";
            ctx.strokeStyle = presetKey === "tachyon" ? "#ef4444" : "#22d3ee";
            ctx.lineWidth = 3.5;
            
            const leftBraneX = cx - 180;
            const rightBraneX = cx + 180;
            
            ctx.save();
            ctx.shadowBlur = 0;
            ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(leftBraneX, cy - 80);
            ctx.lineTo(leftBraneX, cy + 80);
            ctx.moveTo(rightBraneX, cy - 80);
            ctx.lineTo(rightBraneX, cy + 80);
            ctx.stroke();
            ctx.restore();

            const harmonic = preset.n * 2;
            ctx.beginPath();
            const steps = 120;
            for (let i = 0; i <= steps; i++) {
                const frac = i / steps;
                const x = leftBraneX + frac * (rightBraneX - leftBraneX);
                let y = cy;
                
                if (presetKey === "tachyon") {
                    const breath = 15 * Math.sin(time) * Math.cosh(0.8 * Math.sin(time * 0.4));
                    y = cy + breath * Math.sin(Math.PI * frac);
                } else {
                    const amp = 32 * Math.cos(time * 1.5);
                    y = cy + amp * Math.sin(harmonic * Math.PI * frac);
                }
                
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
            
        } else if (presetKey === "kk_mode") {
            ctx.shadowColor = "rgba(167, 139, 250, 0.8)";
            ctx.strokeStyle = "#a78bfa";
            ctx.lineWidth = 3.5;
            const R = 80;
            ctx.beginPath();
            for (let i = 0; i <= 150; i++) {
                const angle = (i / 150) * Math.PI * 2;
                const n = 4;
                const amp = 8 * Math.sin(n * angle - time * 2);
                const currentR = R + amp;
                const x = cx + currentR * Math.cos(angle);
                const y = cy + currentR * Math.sin(angle);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();
            
        } else if (presetKey === "winding_mode") {
            ctx.shadowColor = "rgba(6, 182, 212, 0.8)";
            ctx.strokeStyle = "#06b6d4";
            ctx.lineWidth = 3;
            
            const cylW = 100;
            const cylH = 180;
            ctx.save();
            ctx.shadowBlur = 0;
            ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
            ctx.beginPath();
            ctx.ellipse(cx, cy - cylH/2, cylW, 20, 0, 0, Math.PI * 2);
            ctx.ellipse(cx, cy + cylH/2, cylW, 20, 0, 0, Math.PI * 2);
            ctx.moveTo(cx - cylW, cy - cylH/2);
            ctx.lineTo(cx - cylW, cy + cylH/2);
            ctx.moveTo(cx + cylW, cy - cylH/2);
            ctx.lineTo(cx + cylW, cy + cylH/2);
            ctx.stroke();
            ctx.restore();
            
            ctx.beginPath();
            const helixSteps = 300;
            const w = 3;
            for (let i = 0; i <= helixSteps; i++) {
                const frac = i / helixSteps;
                const hY = cy - cylH/2 + frac * cylH;
                const angle = frac * Math.PI * 2 * w + time * 0.3;
                const r = cylW + 6 * Math.sin(angle * 3 + time * 1.5);
                const hX = cx + r * Math.cos(angle);
                const finalY = hY + 12 * Math.sin(angle);
                
                const isFront = Math.sin(angle) > 0;
                ctx.lineWidth = isFront ? 3.5 : 1.5;
                ctx.strokeStyle = isFront ? "#06b6d4" : "rgba(6, 182, 212, 0.35)";
                
                if (i === 0) ctx.moveTo(hX, finalY);
                else {
                    ctx.lineTo(hX, finalY);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(hX, finalY);
                }
            }
            ctx.stroke();
            
        } else {
            // Closed String loop deforming (Graviton / Dilaton)
            ctx.shadowColor = presetKey === "dilaton" ? "rgba(16, 185, 129, 0.8)" : "rgba(124, 58, 237, 0.8)";
            ctx.strokeStyle = presetKey === "dilaton" ? "#10b981" : "#7c3aed";
            ctx.lineWidth = 4;
            const R = 80;
            ctx.beginPath();
            const steps = 160;
            for (let i = 0; i <= steps; i++) {
                const angle = (i / steps) * Math.PI * 2;
                let currentR = R;
                if (presetKey === "dilaton") {
                    currentR = R + 14 * Math.cos(time * 1.8);
                } else {
                    const leftMode = 8 * Math.sin(2 * angle - time * 1.5);
                    const rightMode = 8 * Math.sin(2 * angle + time * 1.5);
                    currentR = R + leftMode + rightMode;
                }
                const x = cx + currentR * Math.cos(angle);
                const y = cy + currentR * Math.sin(angle);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();
        }
    } else if (activeTab === "scattering") {
        // --- TAB 4: Scattering Lab (3D Pants Worldsheet Tube) ---
        ctx.save();
        
        // Draw incoming/outgoing boundary lines
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        // Draw branes/boundaries
        ctx.moveTo(cx - 180, cy - 80); ctx.lineTo(cx - 180, cy + 80);
        ctx.moveTo(cx + 180, cy - 80); ctx.lineTo(cx + 180, cy + 80);
        ctx.stroke();
        
        // Helper function for 3D pants coordinate math
        function getPantsPoint(u, v, upper) {
            const X = u * 180;
            const center_offset = 38 * (1.0 - Math.exp(-3.0 * u * u));
            const Y_center = upper ? center_offset : -center_offset;
            const R = 18 + 14 * Math.exp(-3.0 * u * u) + 2.0 * Math.sin(time * 2.0 + u * 6.0);
            
            const Y = Y_center + R * Math.cos(v);
            const Z = R * Math.sin(v);
            
            const projX = cx + X + Z * 0.35;
            const projY = cy + Y - Z * 0.15;
            return { x: projX, y: projY, z: Z };
        }
        
        // 1. Draw BACK half of longitudinal lines (Z < 0)
        ctx.lineWidth = 1.0;
        ctx.strokeStyle = "rgba(124, 58, 237, 0.2)";
        const numLongs = 8;
        for (let j = 0; j < numLongs; j++) {
            const v = (j / numLongs) * Math.PI * 2;
            const isBack = Math.sin(v) < 0;
            if (!isBack) continue;
            
            // Upper sheet
            ctx.beginPath();
            let p = getPantsPoint(-1.0, v, true);
            ctx.moveTo(p.x, p.y);
            for (let i = 1; i <= 30; i++) {
                const u = -1.0 + 2.0 * (i / 30);
                p = getPantsPoint(u, v, true);
                ctx.lineTo(p.x, p.y);
            }
            ctx.stroke();
            
            // Lower sheet
            ctx.beginPath();
            p = getPantsPoint(-1.0, v, false);
            ctx.moveTo(p.x, p.y);
            for (let i = 1; i <= 30; i++) {
                const u = -1.0 + 2.0 * (i / 30);
                p = getPantsPoint(u, v, false);
                ctx.lineTo(p.x, p.y);
            }
            ctx.stroke();
        }
        
        // 2. Draw BACK half of latitude rings (Z < 0)
        const numRings = 16;
        for (let i = 0; i <= numRings; i++) {
            const u = -1.0 + 2.0 * (i / numRings);
            ctx.beginPath();
            let start = getPantsPoint(u, Math.PI / 2, true);
            ctx.moveTo(start.x, start.y);
            for (let j = 1; j <= 20; j++) {
                const v = Math.PI / 2 + Math.PI * (j / 20);
                const p = getPantsPoint(u, v, true);
                ctx.lineTo(p.x, p.y);
            }
            ctx.stroke();
            
            ctx.beginPath();
            start = getPantsPoint(u, Math.PI / 2, false);
            ctx.moveTo(start.x, start.y);
            for (let j = 1; j <= 20; j++) {
                const v = Math.PI / 2 + Math.PI * (j / 20);
                const p = getPantsPoint(u, v, false);
                ctx.lineTo(p.x, p.y);
            }
            ctx.stroke();
        }
        
        // 3. Draw FRONT half of latitude rings (Z >= 0) - Glowing cyan
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = "#22d3ee";
        ctx.shadowColor = "#22d3ee";
        ctx.shadowBlur = 12;
        for (let i = 0; i <= numRings; i++) {
            const u = -1.0 + 2.0 * (i / numRings);
            
            // Fade ends slightly, make center glow more
            const alpha = 0.4 + 0.5 * Math.exp(-3.0 * u * u);
            ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
            
            ctx.beginPath();
            let start = getPantsPoint(u, -Math.PI / 2, true);
            ctx.moveTo(start.x, start.y);
            for (let j = 1; j <= 20; j++) {
                const v = -Math.PI / 2 + Math.PI * (j / 20);
                const p = getPantsPoint(u, v, true);
                ctx.lineTo(p.x, p.y);
            }
            ctx.stroke();
            
            ctx.beginPath();
            start = getPantsPoint(u, -Math.PI / 2, false);
            ctx.moveTo(start.x, start.y);
            for (let j = 1; j <= 20; j++) {
                const v = -Math.PI / 2 + Math.PI * (j / 20);
                const p = getPantsPoint(u, v, false);
                ctx.lineTo(p.x, p.y);
            }
            ctx.stroke();
        }
        ctx.shadowBlur = 0;
        
        // 4. Draw FRONT half of longitudinal lines (Z >= 0) - Sleek purple
        ctx.lineWidth = 1.8;
        ctx.strokeStyle = "#a78bfa";
        for (let j = 0; j < numLongs; j++) {
            const v = (j / numLongs) * Math.PI * 2;
            const isFront = Math.sin(v) >= 0;
            if (!isFront) continue;
            
            // Upper sheet
            ctx.beginPath();
            let p = getPantsPoint(-1.0, v, true);
            ctx.moveTo(p.x, p.y);
            for (let i = 1; i <= 30; i++) {
                const u = -1.0 + 2.0 * (i / 30);
                p = getPantsPoint(u, v, true);
                ctx.lineTo(p.x, p.y);
            }
            ctx.stroke();
            
            // Lower sheet
            ctx.beginPath();
            p = getPantsPoint(-1.0, v, false);
            ctx.moveTo(p.x, p.y);
            for (let i = 1; i <= 30; i++) {
                const u = -1.0 + 2.0 * (i / 30);
                p = getPantsPoint(u, v, false);
                ctx.lineTo(p.x, p.y);
            }
            ctx.stroke();
        }
        ctx.restore();
        
    } else {
        // --- TAB 2 & 3: Interactive Physics String (renders dynamic Custom Vibrations) ---
        const sector = document.getElementById("asm-sector").value;
        const nl = parseFloat(document.getElementById("asm-nl").value);
        const nr = parseFloat(document.getElementById("asm-nr").value);
        const n = parseInt(document.getElementById("asm-n").value) || 0;
        const w = parseInt(document.getElementById("asm-w").value) || 0;
        const R_param = parseFloat(document.getElementById("asm-r").value) || 1.0;
        
        const isClosed = !sector.includes("Open") && document.getElementById("asm-theory").value !== "Type_I";
        
        ctx.lineWidth = 3.5;
        
        if (!isClosed) {
            // Open String: standing waves with endpoint branes
            ctx.shadowColor = "rgba(6, 182, 212, 0.8)";
            ctx.strokeStyle = "#06b6d4";
            
            const leftBraneX = cx - 180;
            const rightBraneX = cx + 180;
            
            ctx.save();
            ctx.shadowBlur = 0;
            ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
            ctx.beginPath();
            ctx.moveTo(leftBraneX, cy - 70);
            ctx.lineTo(leftBraneX, cy + 70);
            ctx.moveTo(rightBraneX, cy - 70);
            ctx.lineTo(rightBraneX, cy + 70);
            ctx.stroke();
            ctx.restore();
            
            ctx.beginPath();
            const steps = 100;
            const harmonic = nl * 2 || 1;
            for (let i = 0; i <= steps; i++) {
                const frac = i / steps;
                const x = leftBraneX + frac * (rightBraneX - leftBraneX);
                const amp = 30 * Math.cos(time * 1.6);
                const y = cy + amp * Math.sin(harmonic * Math.PI * frac);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        } else {
            // Closed String deforming loop with custom Fourier components and KK momentum
            ctx.shadowColor = "rgba(124, 58, 237, 0.8)";
            ctx.strokeStyle = "#7c3aed";
            
            const baseRadius = 80;
            ctx.beginPath();
            const steps = 180;
            for (let i = 0; i <= steps; i++) {
                const angle = (i / steps) * Math.PI * 2;
                
                // Vibrational Left and Right waves
                const lHarm = Math.max(1, Math.round(nl * 2));
                const rHarm = Math.max(1, Math.round(nr * 2));
                const leftWave = 8 * Math.sin(lHarm * angle - time * 1.5);
                const rightWave = 8 * Math.sin(rHarm * angle + time * 1.5);
                
                // KK momentum traveling envelope
                const kkWave = n !== 0 ? 6 * Math.sin(n * angle - time * 2.5) : 0;
                
                // Winding envelope wrapping
                const windWave = w !== 0 ? 6 * Math.sin(w * angle) : 0;
                
                const currentR = baseRadius + leftWave + rightWave + kkWave + windWave;
                const x = cx + currentR * Math.cos(angle);
                const y = cy + currentR * Math.sin(angle);
                
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();
            
            // Draw compactified boundary if winding is present
            if (w !== 0 || n !== 0) {
                ctx.save();
                ctx.shadowBlur = 0;
                ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
                ctx.beginPath();
                ctx.arc(cx, cy, baseRadius, 0, Math.PI*2);
                ctx.stroke();
                ctx.restore();
            }
        }
    }
    
    animationFrameId = requestAnimationFrame(drawStringSimulationFrame);
}

// Handle Preset Changes in Tab 1
function handlePresetChange() {
    const key = document.getElementById("particle-preset").value;
    const preset = presets[key];
    if (!preset) return;
    
    document.getElementById("sim-mass-sq").innerText = preset.m2.toFixed(2) + " M_s²";
    document.getElementById("sim-mass").innerText = preset.mass;
    document.getElementById("sim-freq").innerText = key === "tachyon" ? "불안정 진동" : (key === "photon" || key === "graviton" ? "1.0x (안정)" : "1.8x (고에너지)");
    document.getElementById("canvas-desc").innerText = preset.desc;
}
document.getElementById("particle-preset").addEventListener("change", handlePresetChange);

// --- 8.5 Scattering Lab Calculation & Visualizers ---
function complexGamma(z) {
    if (z.real <= 0 && Math.abs(z.real - Math.round(z.real)) < 1e-9 && Math.abs(z.imag) < 1e-9) {
        return { real: Infinity, imag: 0 };
    }
    if (z.real < 0.5) {
        const pix = Math.PI * z.real;
        const piy = Math.PI * z.imag;
        const sin_real = Math.sin(pix) * Math.cosh(piy);
        const sin_imag = Math.cos(pix) * Math.sinh(piy);
        const sin_mag_sq = sin_real * sin_real + sin_imag * sin_imag;
        if (sin_mag_sq < 1e-12) return { real: Infinity, imag: 0 };
        const inv_sin = {
            real: sin_real / sin_mag_sq,
            imag: -sin_imag / sin_mag_sq
        };
        const g_one_minus_z = complexGamma({ real: 1.0 - z.real, imag: -z.imag });
        const denom_real = g_one_minus_z.real * g_one_minus_z.real + g_one_minus_z.imag * g_one_minus_z.imag;
        if (denom_real < 1e-12) return { real: Infinity, imag: 0 };
        const num = {
            real: Math.PI * inv_sin.real,
            imag: Math.PI * inv_sin.imag
        };
        return {
            real: (num.real * g_one_minus_z.real + num.imag * g_one_minus_z.imag) / denom_real,
            imag: (num.imag * g_one_minus_z.real - num.real * g_one_minus_z.imag) / denom_real
        };
    }
    const p = [
        0.99999999999980993,
        676.5203681218851,
        -1259.1392167224028,
        771.32342877765313,
        -176.61502916214059,
        12.507343278686905,
        -0.13857109526572012,
        9.9843695780195716e-6,
        1.5056327351493116e-7
    ];
    const g = 7;
    const z_adj = { real: z.real - 1.0, imag: z.imag };
    let x_real = p[0];
    let x_imag = 0.0;
    for (let i = 1; i < p.length; i++) {
        const denom_r = z_adj.real + i;
        const denom_i = z_adj.imag;
        const d_mag_sq = denom_r * denom_r + denom_i * denom_i;
        x_real += p[i] * denom_r / d_mag_sq;
        x_imag -= p[i] * denom_i / d_mag_sq;
    }
    const t = { real: z_adj.real + g + 0.5, imag: z_adj.imag };
    const t_mag = Math.sqrt(t.real * t.real + t.imag * t.imag);
    const t_arg = Math.atan2(t.imag, t.real);
    const ln_t_r = Math.log(t_mag);
    const ln_t_i = t_arg;
    const a_r = z_adj.real + 0.5;
    const a_i = z_adj.imag;
    const exponent_r = a_r * ln_t_r - a_i * ln_t_i;
    const exponent_i = a_r * ln_t_i + a_i * ln_t_r;
    const pwr_mag = Math.exp(exponent_r);
    const pwr_real = pwr_mag * Math.cos(exponent_i);
    const pwr_imag = pwr_mag * Math.sin(exponent_i);
    const exp_neg_t_mag = Math.exp(-t.real);
    const exp_neg_t_r = exp_neg_t_mag * Math.cos(-t.imag);
    const exp_neg_t_i = exp_neg_t_mag * Math.sin(-t.imag);
    const sqrt_2pi = Math.sqrt(2.0 * Math.PI);
    const c1_r = pwr_real * exp_neg_t_r - pwr_imag * exp_neg_t_i;
    const c1_i = pwr_real * exp_neg_t_i + pwr_imag * exp_neg_t_r;
    const c2_r = c1_r * x_real - c1_i * x_imag;
    const c2_i = c1_r * x_imag + c1_i * x_real;
    return {
        real: sqrt_2pi * c2_r,
        imag: sqrt_2pi * c2_i
    };
}

function calculateVenezianoJS(s, t, alpha_prime, alpha_zero, epsilon = 0.04) {
    const alpha_s = { real: alpha_zero + alpha_prime * s, imag: alpha_prime * epsilon };
    const alpha_t = { real: alpha_zero + alpha_prime * t, imag: 0.0 };
    
    const gamma_s = complexGamma({ real: -alpha_s.real, imag: -alpha_s.imag });
    const gamma_t = complexGamma({ real: -alpha_t.real, imag: -alpha_t.imag });
    const gamma_st = complexGamma({ real: -(alpha_s.real + alpha_t.real), imag: -(alpha_s.imag + alpha_t.imag) });
    
    if (gamma_s.real === Infinity || gamma_t.real === Infinity) {
        return { real: Infinity, imag: 0, magnitude_squared: Infinity };
    }
    if (gamma_st.real === Infinity) {
        return { real: 0, imag: 0, magnitude_squared: 0 };
    }
    
    const num_r = gamma_s.real * gamma_t.real - gamma_s.imag * gamma_t.imag;
    const num_i = gamma_s.real * gamma_t.imag + gamma_s.imag * gamma_t.real;
    
    const denom = gamma_st.real * gamma_st.real + gamma_st.imag * gamma_st.imag;
    if (denom < 1e-15) {
        return { real: Infinity, imag: 0, magnitude_squared: Infinity };
    }
    
    const amp_r = (num_r * gamma_st.real + num_i * gamma_st.imag) / denom;
    const amp_i = (num_i * gamma_st.real - num_r * gamma_st.imag) / denom;
    
    const mag_sq = amp_r * amp_r + amp_i * amp_i;
    
    return {
        real: amp_r,
        imag: amp_i,
        magnitude_squared: mag_sq
    };
}

function runScatteringEngine() {
    const s = parseFloat(document.getElementById("scat-s").value);
    const t = parseFloat(document.getElementById("scat-t").value);
    const alpha_prime = parseFloat(document.getElementById("scat-alpha-prime").value) || 1.0;
    const alpha_zero = parseFloat(document.getElementById("scat-alpha-zero").value) || -1.0;
    const p = parseInt(document.getElementById("scat-p-brane").value) || 3;
    const v_compact = parseFloat(document.getElementById("scat-v-compact").value) || 1.0;
    const v_6 = parseFloat(document.getElementById("scat-v-6").value) || 1.0;
    
    document.getElementById("scat-s-val").innerText = s.toFixed(2) + " GeV²";
    document.getElementById("scat-t-val").innerText = t.toFixed(2) + " GeV²";
    document.getElementById("scat-p-brane-val").innerText = `D${p}-brane`;
    
    const res = calculateVenezianoJS(s, t, alpha_prime, alpha_zero);
    let mag = res.magnitude_squared;
    
    let scatText = `4-Point Veneziano Amplitude 계산결과:\n`;
    scatText += `  Mandelstam s: ${s.toFixed(2)} | t: ${t.toFixed(2)} | u: ${(-s-t).toFixed(2)}\n`;
    scatText += `  α(s) = ${alpha_zero.toFixed(1)} + ${alpha_prime.toFixed(1)}·(${s.toFixed(2)} + 0.04i) = ${(alpha_zero + alpha_prime * s).toFixed(2)} + ${(alpha_prime * 0.04).toFixed(3)}i\n`;
    scatText += `  진폭 A(s,t): ${res.real === Infinity ? "Infinity" : `${res.real.toFixed(3)} + ${res.imag.toFixed(3)}i`}\n`;
    scatText += `  강도 |A|²: ${mag === Infinity ? "Infinity" : mag.toFixed(4)}`;
    document.getElementById("scat-result").innerText = scatText;
    
    // holographic coupling unification
    const g_s = 0.2;
    const factor = Math.pow(2 * Math.PI, p - 3);
    const g_ym_sq = factor * g_s * Math.pow(alpha_prime, (p - 3) / 2.0) / v_compact;
    const g_ym = Math.sqrt(g_ym_sq);
    const alpha_ym = g_ym_sq / (4.0 * Math.PI);
    const G_N = (g_s * g_s * Math.pow(alpha_prime, 4)) / (8.0 * v_6);
    
    document.getElementById("scat-res-gym").innerText = g_ym.toFixed(4);
    document.getElementById("scat-res-gn").innerText = G_N.toExponential(4);
    
    const ym_pct = Math.min(100, Math.max(0, alpha_ym * 100));
    document.getElementById("scat-bar-val-ym").innerText = (alpha_ym * 100).toFixed(2) + "%";
    document.getElementById("scat-bar-fill-ym").style.width = ym_pct.toFixed(1) + "%";
    
    const rel_strength = g_ym_sq > 0 ? G_N / g_ym_sq : 0;
    document.getElementById("scat-bar-val-gn").innerText = rel_strength.toExponential(2);
    
    const log_strength = rel_strength > 0 ? Math.log10(rel_strength) : -120;
    const strength_pct = Math.min(100, Math.max(0, ((log_strength + 40) / 40) * 100));
    document.getElementById("scat-bar-fill-gn").style.width = strength_pct.toFixed(1) + "%";
    
    let desc = `양-밀스 이론이 D${p}-brane 상에 국소화되었습니다.\n`;
    desc += `끈 스케일에서의 결합 대칭성: g_YM = ${g_ym.toFixed(3)} (α_YM = ${alpha_ym.toFixed(4)}).\n`;
    desc += `4차원 중력 대비 게이지 힘 강도 비율: 1 : ${rel_strength > 0 ? (1/rel_strength).toExponential(2) : "Infinity"}.\n`;
    desc += `이는 초끈의 고에너지 영역에서 게이지 힘과 중력이 기하학적으로 통합됨을 시연합니다.`;
    document.getElementById("scat-unification-desc").innerText = desc;
    
    // Draw resonance chart
    const rCanvas = document.getElementById("resonance-canvas");
    if (!rCanvas) return;
    const rCtx = rCanvas.getContext("2d");
    const rW = rCanvas.width = rCanvas.parentNode.clientWidth;
    const rH = rCanvas.height = 180;
    
    rCtx.fillStyle = "#030308";
    rCtx.fillRect(0, 0, rW, rH);
    
    rCtx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    rCtx.lineWidth = 1;
    const numGridLines = 6;
    for (let i = 1; i < numGridLines; i++) {
        const gx = (i / numGridLines) * rW;
        rCtx.beginPath();
        rCtx.moveTo(gx, 0); rCtx.lineTo(gx, rH);
        rCtx.stroke();
        const gy = (i / numGridLines) * rH;
        rCtx.beginPath();
        rCtx.moveTo(0, gy); rCtx.lineTo(rW, gy);
        rCtx.stroke();
    }
    
    const points = [];
    const sMax = 5.0;
    const pointsCount = 120;
    for (let i = 0; i <= pointsCount; i++) {
        const ptS = (i / pointsCount) * sMax;
        const ampRes = calculateVenezianoJS(ptS, t, alpha_prime, alpha_zero);
        let val = ampRes.magnitude_squared;
        if (isNaN(val) || val === Infinity) val = 1e6;
        points.push({ s: ptS, val: val });
    }
    
    const logPoints = points.map(pt => ({
        x: (pt.s / sMax) * (rW - 40) + 20,
        y: rH - 20 - (Math.min(1.0, Math.log10(pt.val + 1.0) / 6.0) * (rH - 35))
    }));
    
    rCtx.beginPath();
    rCtx.moveTo(logPoints[0].x, logPoints[0].y);
    for (let i = 1; i < logPoints.length; i++) {
        rCtx.lineTo(logPoints[i].x, logPoints[i].y);
    }
    const gr = rCtx.createLinearGradient(0, 0, rW, 0);
    gr.addColorStop(0, "#06b6d4");
    gr.addColorStop(0.5, "#7c3aed");
    gr.addColorStop(1, "#c084fc");
    rCtx.strokeStyle = gr;
    rCtx.lineWidth = 2;
    rCtx.stroke();
    
    rCtx.lineTo(logPoints[logPoints.length - 1].x, rH - 20);
    rCtx.lineTo(logPoints[0].x, rH - 20);
    rCtx.closePath();
    const fillGr = rCtx.createLinearGradient(0, 0, 0, rH);
    fillGr.addColorStop(0, "rgba(124, 58, 237, 0.15)");
    fillGr.addColorStop(1, "rgba(3, 3, 8, 0.0)");
    rCtx.fillStyle = fillGr;
    rCtx.fill();
    
    rCtx.fillStyle = "#9ca3af";
    rCtx.font = "8px Fira Code, monospace";
    rCtx.textAlign = "center";
    for (let sTick = 0; sTick <= sMax; sTick += 1) {
        const tx = (sTick / sMax) * (rW - 40) + 20;
        rCtx.fillText(sTick.toFixed(0), tx, rH - 6);
        rCtx.strokeStyle = "rgba(255,255,255,0.15)";
        rCtx.beginPath();
        rCtx.moveTo(tx, rH - 18); rCtx.lineTo(tx, rH - 20);
        rCtx.stroke();
    }
    
    const curX = (s / sMax) * (rW - 40) + 20;
    rCtx.strokeStyle = "rgba(34, 211, 238, 0.35)";
    rCtx.lineWidth = 1;
    rCtx.setLineDash([3, 3]);
    rCtx.beginPath();
    rCtx.moveTo(curX, 8); rCtx.lineTo(curX, rH - 20);
    rCtx.stroke();
    rCtx.setLineDash([]);
    
    let activeY = rH - 20 - (Math.min(1.0, Math.log10(mag + 1.0) / 6.0) * (rH - 35));
    if (isNaN(activeY)) activeY = rH - 20;
    rCtx.fillStyle = "#22d3ee";
    rCtx.shadowColor = "#22d3ee";
    rCtx.shadowBlur = 8;
    rCtx.beginPath();
    rCtx.arc(curX, activeY, 4, 0, Math.PI * 2);
    rCtx.fill();
    rCtx.shadowBlur = 0;
}

// Bind Scattering events
document.getElementById("scat-s").addEventListener("input", runScatteringEngine);
document.getElementById("scat-t").addEventListener("input", runScatteringEngine);
document.getElementById("scat-alpha-prime").addEventListener("input", runScatteringEngine);
document.getElementById("scat-alpha-zero").addEventListener("change", runScatteringEngine);
document.getElementById("scat-p-brane").addEventListener("input", runScatteringEngine);
document.getElementById("scat-v-compact").addEventListener("input", runScatteringEngine);
document.getElementById("scat-v-6").addEventListener("input", runScatteringEngine);

// --- 9. Initialization ---
window.onload = () => {
    resizeCanvas();
    initTabs();
    
    // Select default explorer values
    updateTheoryUI("Type_IIB");
    
    // Initial runs
    runSpectrumCalc();
    runCompactificationCalc();
    runCYCalc();
    
    // Rerun dynamic checks for other tabs
    runAssemblyEngine();
    runScatteringEngine();
    runDiagnosticsEngine();
    
    handlePresetChange();
    drawStringSimulation();
};

window.addEventListener("resize", () => {
    resizeCanvas();
});
