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
            } else if (tabId === "holography") {
                canvasDesc.innerText = "홀로그래피 & 블랙홀 연구소: D1-D5-P 블랙홀의 슈바르츠실트/BPS 이벤트 지평선(Event Horizon) 및 끈 fuzzball 미시진동 상태를 시각화합니다.";
            } else if (tabId === "diagnostics") {
                canvasDesc.innerText = "이론적 검증 및 진단 라이브 모니터: 설정된 매개변수 하에서 끈의 무결성 및 등각 변칙 붕괴 파동을 감지하고 상태를 점검합니다.";
            } else if (tabId === "cosmology") {
                canvasDesc.innerText = "우주끈 & 우주론 연구소: 우주 거대 루프의 Cusp 진동 및 시공간을 흔드는 중력파 버스트 파동, 그리고 KKLT 인플레이션의 CMB 전천 편평도를 시각화합니다.";
            } else if (tabId === "dualities") {
                canvasDesc.innerText = "M-이론 & 이중성 연구소: 11차원 비가환 BFSS 행렬 역학에 의해 진공에서 안정화된 Fuzzy Sphere 막(membrane)을 시각화합니다.";
            } else if (tabId === "swampland") {
                canvasDesc.innerText = "지형과 늪지대 연구소: 컴팩트화 moduli 공간 상의 양자중력 포텐셜을 따라 구르는 모듈러스(Modulus) 구슬과, 장거리 한계(Δφ > 1) 돌파 시 쏟아져 내리는 지수 감쇠 KK 파티클 타워를 묘사합니다.";
            }
            
            // Execute related calculations immediately
            if (tabId === "assembly") {
                runAssemblyEngine();
            } else if (tabId === "scattering") {
                runScatteringEngine();
            } else if (tabId === "holography") {
                runHolographyEngine();
            } else if (tabId === "diagnostics") {
                runDiagnosticsEngine();
            } else if (tabId === "cosmology") {
                runCosmologyEngine();
            } else if (tabId === "dualities") {
                runDualitiesEngine();
            } else if (tabId === "swampland") {
                runSwamplandEngine();
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
let lastCuspTime = 0;
const gwRipples = [];
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
        }
        ctx.restore();
        
    } else if (activeTab === "holography") {
        // --- TAB 5: Holography & Black Holes (3D Event Horizon & Fuzzball strings) ---
        ctx.save();
        
        const q1 = parseInt(document.getElementById("holo-q1").value) || 4;
        const q5 = parseInt(document.getElementById("holo-q5").value) || 9;
        const np = parseInt(document.getElementById("holo-np").value) || 16;
        const deltam = parseFloat(document.getElementById("holo-deltam").value) || 0.0;
        
        const horizonR = Math.min(100, Math.max(45, 30 + 1.5 * Math.sqrt(q1 * q5)));
        
        // Accretion disk/gravity lensing glow behind BH
        const lensGrad = ctx.createRadialGradient(cx, cy, horizonR * 0.8, cx, cy, horizonR * 2.2);
        lensGrad.addColorStop(0, "rgba(3, 3, 8, 1)");
        lensGrad.addColorStop(0.2, "rgba(245, 158, 11, 0.18)"); // glowing amber
        lensGrad.addColorStop(0.5, "rgba(139, 92, 246, 0.06)"); // red-shifted purple
        lensGrad.addColorStop(1.0, "rgba(3, 3, 8, 0)");
        ctx.fillStyle = lensGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, horizonR * 2.2, 0, Math.PI * 2);
        ctx.fill();
        
        // Event Horizon sphere shadow
        ctx.strokeStyle = "rgba(0, 0, 0, 0.9)";
        ctx.fillStyle = "rgba(4, 4, 10, 0.95)";
        ctx.beginPath();
        ctx.arc(cx, cy, horizonR, 0, Math.PI * 2);
        ctx.fill();
        
        // Rotating 3D wireframe grid
        const numLatitudes = 8;
        const numLongitudes = 8;
        const rotX = time * 0.25;
        const rotY = time * 0.12;
        
        function projectSphere(lat, lon) {
            const theta = (lat / numLatitudes) * Math.PI;
            const phi = (lon / numLongitudes) * Math.PI * 2 + rotY;
            
            const X3 = horizonR * Math.sin(theta) * Math.cos(phi);
            const Y3 = horizonR * Math.cos(theta);
            const Z3 = horizonR * Math.sin(theta) * Math.sin(phi);
            
            const cosX = Math.cos(rotX);
            const sinX = Math.sin(rotX);
            const Y_rot = Y3 * cosX - Z3 * sinX;
            const Z_rot = Y3 * sinX + Z3 * cosX;
            
            const projX = cx + X3 + Z_rot * 0.3;
            const projY = cy + Y_rot - Z_rot * 0.12;
            return { x: projX, y: projY, z: Z_rot };
        }
        
        // Draw back grid (Z < 0) - thin and faded
        ctx.lineWidth = 1.0;
        ctx.strokeStyle = "rgba(245, 158, 11, 0.12)";
        for (let i = 1; i < numLatitudes; i++) {
            ctx.beginPath();
            let start = projectSphere(i, 0);
            ctx.moveTo(start.x, start.y);
            for (let j = 1; j <= 24; j++) {
                const p = projectSphere(i, (j / 24) * numLongitudes * 2);
                if (p.z < 0) ctx.lineTo(p.x, p.y);
                else ctx.moveTo(p.x, p.y);
            }
            ctx.stroke();
        }
        
        // Draw front grid (Z >= 0) - glowing amber gold
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "rgba(251, 191, 36, 0.38)";
        ctx.shadowColor = "rgba(251, 191, 36, 0.35)";
        ctx.shadowBlur = 8;
        for (let i = 1; i < numLatitudes; i++) {
            ctx.beginPath();
            let pStart = projectSphere(i, 0);
            if (pStart.z >= 0) ctx.moveTo(pStart.x, pStart.y);
            for (let j = 1; j <= 24; j++) {
                const p = projectSphere(i, (j / 24) * numLongitudes * 2);
                if (p.z >= 0) {
                    if (j === 1 || pStart.z < 0) ctx.moveTo(p.x, p.y);
                    else ctx.lineTo(p.x, p.y);
                }
                pStart = p;
            }
            ctx.stroke();
        }
        ctx.shadowBlur = 0;
        
        // Draw vibrating quantum fuzzball strings (cyan & purple)
        const numFuzzStrings = Math.min(8, Math.max(3, Math.round(Math.sqrt(np))));
        for (let sIdx = 0; sIdx < numFuzzStrings; sIdx++) {
            const stringPhase = (sIdx / numFuzzStrings) * Math.PI * 2 + time * 0.8;
            ctx.lineWidth = 2.0;
            ctx.strokeStyle = sIdx % 2 === 0 ? "rgba(34, 211, 238, 0.75)" : "rgba(167, 139, 250, 0.75)";
            ctx.shadowColor = sIdx % 2 === 0 ? "#22d3ee" : "#a78bfa";
            ctx.shadowBlur = 10;
            
            ctx.beginPath();
            const fuzzSteps = 90;
            for (let i = 0; i <= fuzzSteps; i++) {
                const angle = (i / fuzzSteps) * Math.PI * 2;
                
                const freq = 6 + sIdx;
                const fuzzAmp = (3 + 5 * Math.sin(Math.sqrt(deltam))) * Math.sin(freq * angle - time * 3.5);
                const currentR = horizonR + fuzzAmp;
                
                const tiltAngle = (sIdx / numFuzzStrings) * Math.PI;
                const X = currentR * Math.cos(angle);
                const Y = currentR * Math.sin(angle) * Math.cos(tiltAngle);
                const Z = currentR * Math.sin(angle) * Math.sin(tiltAngle);
                
                const projX = cx + X + Z * 0.35;
                const projY = cy + Y - Z * 0.15;
                
                const isFront = Z >= -10;
                if (isFront) {
                    if (i === 0) ctx.moveTo(projX, projY);
                    else ctx.lineTo(projX, projY);
                } else {
                    ctx.moveTo(projX, projY);
                }
            }
            ctx.stroke();
        }
        ctx.shadowBlur = 0;
        ctx.restore();
        
    } else if (activeTab === "cosmology") {
        // --- TAB 6: Cosmic Cosmology Loop Cusp & Gravitational Wave Shockwaves ---
        ctx.save();
        
        const gmuLog = parseFloat(document.getElementById("cosmo-gmu-log").value) || -7.0;
        const tensionGmu = Math.pow(10, gmuLog);
        const baseRadius = 80;
        
        // Draw deforming closed cosmic string loop
        ctx.strokeStyle = "rgba(16, 185, 129, 0.85)"; // Emerald Green
        ctx.shadowColor = "#10b981";
        ctx.shadowBlur = 12;
        ctx.lineWidth = 3.5;
        
        const steps = 180;
        ctx.beginPath();
        for (let i = 0; i <= steps; i++) {
            const angle = (i / steps) * Math.PI * 2;
            
            // Left and right running modes
            const leftMode = 12 * Math.sin(2 * angle - time * 1.8);
            const rightMode = 8 * Math.sin(3 * angle + time * 1.2);
            
            // Periodic cusp factor peaking every ~3.6 seconds
            const cuspCycle = (time * 0.87) % Math.PI;
            const cuspStrength = Math.pow(Math.sin(cuspCycle), 12);
            
            // Cusp localized deformation at angle = 0
            const dAngle = angle > Math.PI ? angle - 2 * Math.PI : angle;
            const cuspDeform = -35 * cuspStrength * Math.exp(-30 * dAngle * dAngle);
            
            const currentR = baseRadius + leftMode + rightMode + cuspDeform;
            
            const x = cx + currentR * Math.cos(angle);
            const y = cy + currentR * Math.sin(angle) + 10 * cuspStrength * Math.exp(-30 * dAngle * dAngle);
            
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // Periodic ripple spawn logic
        const cuspCycle = (time * 0.87) % Math.PI;
        const cuspStrength = Math.pow(Math.sin(cuspCycle), 12);
        
        if (cuspStrength > 0.9 && time - lastCuspTime > 3.0) {
            lastCuspTime = time;
            
            // Spawn concentric expanding GW ripple from the cusp point at angle=0
            gwRipples.push({
                x: cx + baseRadius - 15,
                y: cy,
                r: 5,
                maxR: 280,
                opacity: 1.0,
                speed: 4.5
            });
        }
        
        // Draw and update GW ripples
        ctx.restore();
        ctx.save();
        ctx.shadowBlur = 0;
        for (let rIdx = gwRipples.length - 1; rIdx >= 0; rIdx--) {
            const rip = gwRipples[rIdx];
            rip.r += rip.speed;
            rip.opacity = 1.0 - (rip.r / rip.maxR);
            
            if (rip.opacity <= 0) {
                gwRipples.splice(rIdx, 1);
                continue;
            }
            
            ctx.strokeStyle = `rgba(16, 185, 129, ${rip.opacity * 0.7})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
            ctx.stroke();
            
            if (rip.r > 30) {
                ctx.strokeStyle = `rgba(34, 211, 238, ${rip.opacity * 0.35})`;
                ctx.beginPath();
                ctx.arc(rip.x, rip.y, rip.r - 25, 0, Math.PI * 2);
                ctx.stroke();
            }
        }
        ctx.restore();
        
    } else if (activeTab === "dualities") {
        // --- TAB 7: M-Theory Dualities (3D Fuzzy Sphere Noncommutative Membrane) ---
        ctx.save();
        
        const N = parseInt(document.getElementById("dual-matrix-n").value) || 16;
        const theta = parseFloat(document.getElementById("dual-theta").value) || 0.2;
        
        // Compute active fuzzy radius in screen pixels
        const expectedRFuzzy = theta * Math.sqrt((N * N - 1) / 4.0);
        const screenR = Math.min(180, Math.max(40, 55 + expectedRFuzzy * 12));
        
        // Accretion disk/gravity lensing glow behind the membrane
        const memGrad = ctx.createRadialGradient(cx, cy, screenR * 0.4, cx, cy, screenR * 1.8);
        memGrad.addColorStop(0, "rgba(8, 8, 16, 1)");
        memGrad.addColorStop(0.3, "rgba(167, 139, 250, 0.12)"); // glowing purple
        memGrad.addColorStop(0.6, "rgba(34, 211, 238, 0.05)");  // cyan edge
        memGrad.addColorStop(1.0, "rgba(3, 3, 8, 0)");
        ctx.fillStyle = memGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, screenR * 1.8, 0, Math.PI * 2);
        ctx.fill();
        
        // Renders the 3D rotating fuzzy sphere coordinate shell
        const numPoints = Math.min(600, Math.max(100, N * 8));
        const rotX = time * 0.18;
        const rotY = time * 0.25;
        
        ctx.shadowBlur = 8;
        
        // Golden spiral distribution of points on a sphere
        for (let i = 0; i < numPoints; i++) {
            const yOffset = 1.0 - (i / (numPoints - 1)) * 2.0; 
            const radiusAtY = Math.sqrt(1.0 - yOffset * yOffset);
            const goldenAngle = i * 2.39996323; 
            const phi = goldenAngle + rotY;
            const thetaAngle = Math.acos(yOffset);
            
            // Physical coordinates
            const x3d = screenR * Math.sin(thetaAngle) * Math.cos(phi);
            const y3d = screenR * yOffset;
            const z3d = screenR * Math.sin(thetaAngle) * Math.sin(phi);
            
            // Rotate around X-axis
            const cosX = Math.cos(rotX);
            const sinX = Math.sin(rotX);
            const rotY3d = y3d * cosX - z3d * sinX;
            const rotZ3d = y3d * sinX + z3d * cosX;
            
            // Screen projection coordinates
            const projX = cx + x3d + rotZ3d * 0.3;
            const projY = cy + rotY3d - rotZ3d * 0.12;
            
            // Add quantum fluctuations representing coordinate noncommutativity [X_i, X_j] != 0!
            const fluctAmp = 6.0 * theta * Math.sin(time * 4.5 + i);
            const finalX = projX + (Math.random() - 0.5) * fluctAmp;
            const finalY = projY + (Math.random() - 0.5) * fluctAmp;
            
            const isFront = rotZ3d >= -10;
            
            if (isFront) {
                ctx.fillStyle = i % 2 === 0 ? "#a78bfa" : "#22d3ee"; 
                ctx.shadowColor = i % 2 === 0 ? "#a78bfa" : "#22d3ee";
                ctx.beginPath();
                const pointSize = Math.max(1.5, Math.min(4.5, 4.0 - N * 0.02));
                ctx.arc(finalX, finalY, pointSize, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillStyle = "rgba(167, 139, 250, 0.25)";
                ctx.shadowBlur = 0;
                ctx.beginPath();
                ctx.arc(finalX, finalY, 1.2, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 8;
            }
        }
        
        ctx.shadowBlur = 0;
        ctx.restore();
        
    } else if (activeTab === "swampland") {
        // --- TAB 8: Landscape & Swampland (Rolling Moduli Potential & KK Tower Rain) ---
        ctx.save();
        
        const roll = parseFloat(document.getElementById("swamp-roll").value) || 0.5;
        const T = parseFloat(document.getElementById("swamp-t-modulus").value) || 10.0;
        
        // Background color shift if Swampland is active (flashes subtle reddish overlay)
        const isSwamplandActive = roll > 1.0;
        if (isSwamplandActive) {
            ctx.fillStyle = "rgba(239, 68, 68, 0.035)"; 
            ctx.fillRect(0, 0, W, H);
        }
        
        // 1. Draw 2D potential energy curve V(phi)
        const xMin = cx - 180;
        const xMax = cx + 180;
        const curveY = (xVal) => {
            const phi = (xVal - cx) / 100.0; 
            return cy + 20 + 35 * Math.sin(phi * 2.8) + 10 * phi * phi;
        };
        
        ctx.strokeStyle = isSwamplandActive ? "rgba(239, 68, 68, 0.6)" : "rgba(16, 185, 129, 0.6)";
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        for (let x = xMin; x <= xMax; x += 2) {
            const y = curveY(x);
            if (x === xMin) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
        
        // Draw the Swampland critical boundary lines at delta_phi = 1.0 (corresponds to x = cx + 100)
        ctx.save();
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = "rgba(239, 68, 68, 0.35)";
        ctx.beginPath();
        ctx.moveTo(cx + 100, cy - 80);
        ctx.lineTo(cx + 100, cy + 80);
        ctx.stroke();
        
        ctx.fillStyle = "rgba(239, 68, 68, 0.4)";
        ctx.font = "8px 'Fira Code', monospace";
        ctx.fillText("SWAMPLAND LIMIT (1.0 M_pl)", cx + 106, cy - 65);
        ctx.restore();
        
        // 2. Draw rolling Moduli marble at position phi = roll (x = cx + roll * 100)
        const marbleX = cx + roll * 100;
        const marbleY = curveY(marbleX);
        
        // Glowing halo for the marble
        ctx.save();
        ctx.fillStyle = isSwamplandActive ? "rgba(239, 68, 68, 0.15)" : "rgba(34, 211, 238, 0.15)";
        ctx.beginPath();
        ctx.arc(marbleX, marbleY - 6, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        
        // Drawing marble ball
        ctx.fillStyle = isSwamplandActive ? "#fca5a5" : "#22d3ee";
        ctx.shadowColor = isSwamplandActive ? "#ef4444" : "#22d3ee";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(marbleX, marbleY - 6, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // 3. Cascading light particle rain representing tower states descending!
        if (isSwamplandActive) {
            const density = Math.min(25, Math.floor((roll - 1.0) * 12));
            for (let i = 0; i < density; i++) {
                if (Math.random() > 0.6) {
                    const px = cx - 180 + Math.random() * 360;
                    const py = cy - 80 + Math.random() * 160;
                    
                    ctx.fillStyle = `rgba(239, 68, 68, ${Math.random() * 0.7 + 0.3})`;
                    ctx.beginPath();
                    ctx.arc(px, py + (time * 60) % 20, Math.random() * 1.5 + 0.5, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
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

// --- 8.6 Holography & Black Hole Thermodynamics Solver ---
function runHolographyEngine() {
    const q1 = parseInt(document.getElementById("holo-q1").value) || 4;
    const q5 = parseInt(document.getElementById("holo-q5").value) || 9;
    const np = parseInt(document.getElementById("holo-np").value) || 16;
    const deltam = parseFloat(document.getElementById("holo-deltam").value) || 0.0;
    const nc = parseInt(document.getElementById("holo-nc").value) || 100;
    const gym_sq = parseFloat(document.getElementById("holo-gym").value) || 0.5;
    
    document.getElementById("holo-q1-val").innerText = q1;
    document.getElementById("holo-q5-val").innerText = q5;
    document.getElementById("holo-np-val").innerText = np;
    document.getElementById("holo-deltam-val").innerText = deltam === 0.0 ? "0.0 GeV (Extremal BPS)" : `${deltam.toFixed(1)} GeV`;
    document.getElementById("holo-nc-val").innerText = nc;
    document.getElementById("holo-gym-val").innerText = gym_sq.toFixed(2);
    
    const q1_abs = Math.abs(q1);
    const q5_abs = Math.abs(q5);
    const np_abs = Math.abs(np);
    
    const s_micro = 2.0 * Math.PI * Math.sqrt(q1_abs * q5_abs * np_abs);
    
    const g_s = 0.2;
    const alpha_prime = 1.0;
    const g_5 = (g_s * g_s * Math.pow(alpha_prime, 1.5)) / (32.0 * Math.PI * Math.PI);
    
    const area = 8.0 * Math.PI * g_5 * Math.sqrt(q1_abs * q5_abs * np_abs);
    const s_macro = area / (4.0 * g_5);
    
    const denom = 2.0 * Math.PI * Math.sqrt(q1_abs * q5_abs * np_abs);
    const t_h = Math.sqrt(2.0 * deltam) / denom;
    
    const bps_mass = (q1_abs / g_s) + (q5_abs / g_s) + np_abs;
    
    document.getElementById("holo-res-smicro").innerText = s_micro.toFixed(4);
    document.getElementById("holo-res-smacro").innerText = s_macro.toFixed(4);
    document.getElementById("holo-res-th").innerText = t_h === 0.0 ? "0.00000 GeV (BPS)" : `${t_h.toFixed(5)} GeV`;
    document.getElementById("holo-res-bpsmass").innerText = bps_mass.toFixed(2) + " M_s";
    
    let entropyText = `열역학적 일치도 평가:\n`;
    entropyText += `  S_micro (미시 상태 수):  ${s_micro.toFixed(6)}\n`;
    entropyText += `  S_macro (아인슈타인 영역): ${s_macro.toFixed(6)}\n`;
    entropyText += `  일치 비율 (Ratio):       ${(s_micro / s_macro).toFixed(6)}\n`;
    entropyText += `  ↳ 결과: D1-D5-P 끈의 통계역학적 모드 수와 초중력 시공간 지평선 면적 비례 엔트로피가 100% 완벽히 일치합니다!`;
    document.getElementById("holo-entropy-result").innerText = entropyText;
    
    const lambda = gym_sq * nc;
    const rads = Math.pow(lambda, 0.25);
    
    document.getElementById("holo-res-lambda").innerText = lambda.toFixed(2);
    document.getElementById("holo-res-rads").innerText = rads.toFixed(3) + " l_s";
    
    const opList = document.getElementById("holo-op-mapping-list");
    opList.innerHTML = `
      Boundary CFT 연산자 (4D)  ↔  Bulk AdS 필드 (5D)\n
      -------------------------------------------\n
      • Chiral Primary (O₂):    m²R² = -4.0 (초중력 스칼라)\n
      • tr F² (Dilaton Operator): m²R² =  0.0 (무질량 딜라톤)\n
      • KK Excited State (O₆):   m²R² = 12.0 (질량성 KK 스칼라)
    `;
    
    let regimeDesc = `Holographic Regime:\n`;
    if (lambda < 1.0) {
        regimeDesc += `Boundary Perturbative CFT / Highly Curved Quantum String. (λ = ${lambda.toFixed(2)}). 강한 시공간 곡률로 양자 중력 이상이 작용하여 고전적 아인슈타인 초중력 근사가 불가능합니다.`;
    } else if (lambda < 10.0) {
        regimeDesc += `Intermediate Coupling. 반클래식 끈 요동 및 보정 계수가 활성화됩니다.`;
    } else {
        regimeDesc += `Strong CFT / Weak Classical Supergravity. (λ = ${lambda.toFixed(2)}). AdS 반경 R_ads = ${rads.toFixed(2)} l_s >> l_s로 시공간이 평평해져 클래식 Einstein 초중력 계산이 고도로 정확합니다!`;
    }
    document.getElementById("holo-regime-desc").innerText = regimeDesc;
}

// Bind Holography events
document.getElementById("holo-q1").addEventListener("input", runHolographyEngine);
document.getElementById("holo-q5").addEventListener("input", runHolographyEngine);
document.getElementById("holo-np").addEventListener("input", runHolographyEngine);
document.getElementById("holo-deltam").addEventListener("input", runHolographyEngine);
document.getElementById("holo-nc").addEventListener("input", runHolographyEngine);
document.getElementById("holo-gym").addEventListener("input", runHolographyEngine);

// --- 8.7 Cosmic Cosmology Tab Solver & Graph ---
function runCosmologyEngine() {
    const gmuLog = parseFloat(document.getElementById("cosmo-gmu-log").value) || -7.0;
    const loopLengthLy = parseFloat(document.getElementById("cosmo-length").value) || 10.0;
    const distanceMpc = parseFloat(document.getElementById("cosmo-dist").value) || 100.0;
    
    const zInflaton = parseFloat(document.getElementById("cosmo-z").value) || 0.5;
    const fluxW0 = parseFloat(document.getElementById("cosmo-w0").value) || 1.0;
    const betaHsq = parseFloat(document.getElementById("cosmo-beta").value) || 0.05;
    
    const tensionGmu = Math.pow(10, gmuLog);
    document.getElementById("cosmo-gmu-val").innerText = `Gμ = ${tensionGmu.toExponential(2)}`;
    document.getElementById("cosmo-length-val").innerText = `${loopLengthLy.toFixed(1)} 광년`;
    document.getElementById("cosmo-dist-val").innerText = `${distanceMpc.toFixed(0)} Mpc`;
    
    document.getElementById("cosmo-z-val").innerText = zInflaton.toFixed(2);
    document.getElementById("cosmo-w0-val").innerText = fluxW0.toFixed(1);
    document.getElementById("cosmo-beta-val").innerText = betaHsq.toFixed(2);
    
    // Cosmic String calculations
    const gamma = 50.0;
    const lifetimeYears = loopLengthLy / (gamma * tensionGmu);
    const massSolar = loopLengthLy * tensionGmu * 7.126e13;
    const pPlanck = 3.628e52;
    const powerWatts = gamma * Math.pow(tensionGmu, 2) * pPlanck;
    
    const testFrequency = 1.0; // Hz
    const lMpc = loopLengthLy * 3.066e-7;
    let hSingle = (tensionGmu * Math.pow(lMpc, 2.0/3.0)) / (distanceMpc * Math.pow(testFrequency, 1.0/3.0)) * 1.5e-3;
    if (hSingle > 1e-15) hSingle = 1e-15;
    
    let detectability = "Below current detector sensitivities";
    if (hSingle > 1e-21) {
        detectability = "Highly Detectable (LIGO / Virgo / KAGRA cusp burst)";
    } else if (hSingle > 1e-25) {
        detectability = "Observable (LISA space-based interferometer)";
    } else if (hSingle > 1e-28) {
        detectability = "Observable (NANOGrav / Pulsar Timing Array stochastic range)";
    }
    
    let gwText = `우주끈 루프 동역학 및 중력파 버스트 분석 결과:\n`;
    gwText += `  • 무차원 장력 (Gμ):       ${tensionGmu.toExponential(4)}\n`;
    gwText += `  • 고유 루프 질량 (Mass):   ${massSolar.toExponential(4)} M_solar\n`;
    gwText += `  • 방출 중력파 일률(Power):  ${powerWatts.toExponential(4)} Watts\n`;
    gwText += `  • 중력 댐핑 수명 (τ):     ${lifetimeYears.toExponential(4)} 년\n`;
    gwText += `  • 1Hz Cusp 변형률 h(f):   ${hSingle.toExponential(4)}\n`;
    gwText += `  • 감지 가능 상태:         ${detectability}`;
    
    document.getElementById("cosmo-gw-result").innerText = gwText;
    
    // KKLT Inflation calculations
    const v0 = fluxW0 * 1.5e-9;
    const V = v0 * (1.0 - 0.5 * betaHsq * zInflaton * zInflaton);
    const vPrime = -v0 * betaHsq * zInflaton;
    const vDoublePrime = -v0 * betaHsq;
    
    const epsilon = V > 0 ? 0.5 * Math.pow(vPrime / V, 2) : 0.0;
    const eta = V > 0 ? vDoublePrime / V : 0.0;
    
    const ns = 1.0 - 6.0 * epsilon + 2.0 * eta;
    const r = 16.0 * epsilon;
    
    document.getElementById("cosmo-res-ns").innerText = ns.toFixed(4);
    document.getElementById("cosmo-res-r").innerText = r.toFixed(5);
    
    // Match progress bars
    const nsDiff = Math.abs(ns - 0.965);
    const nsPercentage = Math.max(0, 100 - (nsDiff / 0.02) * 100);
    document.getElementById("cosmo-bar-val-ns").innerText = `${nsPercentage.toFixed(1)}%`;
    document.getElementById("cosmo-bar-fill-ns").style.width = `${nsPercentage.toFixed(1)}%`;
    
    const rPercentage = r < 0.036 ? Math.max(0, 100 - (r / 0.036) * 100) : 0;
    document.getElementById("cosmo-bar-val-r").innerText = `${rPercentage.toFixed(1)}%`;
    document.getElementById("cosmo-bar-fill-r").style.width = `${rPercentage.toFixed(1)}%`;
    
    const isNsValid = Math.abs(ns - 0.965) <= 0.015;
    const isRValid = r < 0.036;
    
    let statusMsg = "";
    if (isNsValid && isRValid) {
        statusMsg = "🪐 Planck CMB Compliant (Successfully stabilized de Sitter vacuum)";
    } else if (isNsValid) {
        statusMsg = "⚠️ Tensor-to-scalar ratio exceeds Planck constraints (r > 0.036)";
    } else if (isRValid) {
        statusMsg = "⚠️ Spectral index violates Planck scale limits (n_s != 0.965)";
    } else {
        statusMsg = "❌ Violates all cosmological observational limits (Ghost/Eta problem active)";
    }
    document.getElementById("cosmo-status-desc").innerText = statusMsg;
    
    // Draw spectrum graph
    drawGwSpectrum(tensionGmu, lMpc, distanceMpc);
}

function drawGwSpectrum(gmu, lMpc, dL) {
    const gwCanvas = document.getElementById("cosmo-gw-canvas");
    if (!gwCanvas) return;
    const gCtx = gwCanvas.getContext("2d");
    
    const rect = gwCanvas.parentNode.getBoundingClientRect();
    gwCanvas.width = rect.width * (window.devicePixelRatio || 1);
    gwCanvas.height = rect.height * (window.devicePixelRatio || 1);
    
    const w = gwCanvas.width;
    const h = gwCanvas.height;
    
    gCtx.fillStyle = "#030308";
    gCtx.fillRect(0, 0, w, h);
    
    const padLeft = 50;
    const padRight = 15;
    const padTop = 15;
    const padBottom = 25;
    const pW = w - padLeft - padRight;
    const pH = h - padTop - padBottom;
    
    const logFMin = -9.0;
    const logFMax = 3.0;
    const logHMin = -30.0;
    const logHMax = -14.0;
    
    function getX(freq) {
        const logF = Math.log10(freq);
        const frac = (logF - logFMin) / (logFMax - logFMin);
        return padLeft + frac * pW;
    }
    function getY(strain) {
        const logH = Math.log10(strain);
        const frac = (logH - logHMin) / (logHMax - logHMin);
        return padTop + (1.0 - frac) * pH;
    }
    
    // Draw grid lines & labels
    gCtx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    gCtx.lineWidth = 1;
    gCtx.fillStyle = "rgba(255, 255, 255, 0.35)";
    gCtx.font = "8px 'Fira Code', monospace";
    gCtx.textAlign = "center";
    gCtx.textBaseline = "top";
    
    const freqDecades = [
        { val: 1e-9, label: "10⁻⁹" },
        { val: 1e-6, label: "10⁻⁶" },
        { val: 1e-3, label: "10⁻³" },
        { val: 1, label: "1" },
        { val: 1e3, label: "10³" }
    ];
    freqDecades.forEach(d => {
        const x = getX(d.val);
        gCtx.beginPath();
        gCtx.moveTo(x, padTop);
        gCtx.lineTo(x, h - padBottom);
        gCtx.stroke();
        
        gCtx.fillText(d.label + " Hz", x, h - padBottom + 4);
    });
    
    gCtx.textAlign = "right";
    gCtx.textBaseline = "middle";
    const strainDecades = [
        { val: 1e-30, label: "10⁻³⁰" },
        { val: 1e-25, label: "10⁻²⁵" },
        { val: 1e-20, label: "10⁻²⁰" },
        { val: 1e-15, label: "10⁻¹⁵" }
    ];
    strainDecades.forEach(d => {
        const y = getY(d.val);
        gCtx.beginPath();
        gCtx.moveTo(padLeft, y);
        gCtx.lineTo(w - padRight, y);
        gCtx.stroke();
        
        gCtx.fillText(d.label, padLeft - 6, y);
    });
    
    // Draw experimental bounds shaded regions
    // 1. NANOGrav PTA
    gCtx.save();
    gCtx.fillStyle = "rgba(167, 139, 250, 0.05)";
    gCtx.strokeStyle = "rgba(167, 139, 250, 0.15)";
    gCtx.beginPath();
    for (let fHz = 1e-9; fHz <= 1e-7; fHz *= 1.3) {
        const logF = Math.log10(fHz);
        const dist = logF - (-8.5);
        const logSens = -15.5 + 3.0 * dist * dist;
        const x = getX(fHz);
        const y = getY(Math.pow(10, logSens));
        if (fHz === 1e-9) gCtx.moveTo(x, y);
        else gCtx.lineTo(x, y);
    }
    gCtx.lineTo(getX(1e-7), getY(1e-14));
    gCtx.lineTo(getX(1e-9), getY(1e-14));
    gCtx.closePath();
    gCtx.fill();
    gCtx.stroke();
    gCtx.fillStyle = "rgba(167, 139, 250, 0.4)";
    gCtx.font = "7px 'Fira Code', monospace";
    gCtx.textAlign = "left";
    gCtx.fillText("PTA", getX(1.2e-9), getY(1e-14.8));
    gCtx.restore();
    
    // 2. LISA
    gCtx.save();
    gCtx.fillStyle = "rgba(16, 185, 129, 0.05)";
    gCtx.strokeStyle = "rgba(16, 185, 129, 0.15)";
    gCtx.beginPath();
    for (let fHz = 1e-5; fHz <= 1e-1; fHz *= 1.3) {
        const logF = Math.log10(fHz);
        const dist = logF - (-3.0);
        const logSens = -21.0 + 3.0 * dist * dist;
        const x = getX(fHz);
        const y = getY(Math.pow(10, logSens));
        if (fHz === 1e-5) gCtx.moveTo(x, y);
        else gCtx.lineTo(x, y);
    }
    gCtx.lineTo(getX(1e-1), getY(1e-14));
    gCtx.lineTo(getX(1e-5), getY(1e-14));
    gCtx.closePath();
    gCtx.fill();
    gCtx.stroke();
    gCtx.fillStyle = "rgba(16, 185, 129, 0.4)";
    gCtx.font = "7px 'Fira Code', monospace";
    gCtx.textAlign = "center";
    gCtx.fillText("LISA", getX(1e-3), getY(1e-18));
    gCtx.restore();
    
    // 3. LIGO
    gCtx.save();
    gCtx.fillStyle = "rgba(34, 211, 238, 0.05)";
    gCtx.strokeStyle = "rgba(34, 211, 238, 0.15)";
    gCtx.beginPath();
    for (let fHz = 10; fHz <= 2000; fHz *= 1.3) {
        const logF = Math.log10(fHz);
        const dist = logF - 2.0;
        const logSens = -23.0 + 4.0 * dist * dist;
        const x = getX(fHz);
        const y = getY(Math.pow(10, logSens));
        if (fHz === 10) gCtx.moveTo(x, y);
        else gCtx.lineTo(x, y);
    }
    gCtx.lineTo(getX(2000), getY(1e-14));
    gCtx.lineTo(getX(10), getY(1e-14));
    gCtx.closePath();
    gCtx.fill();
    gCtx.stroke();
    gCtx.fillStyle = "rgba(34, 211, 238, 0.4)";
    gCtx.font = "7px 'Fira Code', monospace";
    gCtx.textAlign = "center";
    gCtx.fillText("LIGO/Virgo", getX(100), getY(1e-19.5));
    gCtx.restore();
    
    // Draw the theoretical strain curve
    gCtx.save();
    gCtx.strokeStyle = "#10b981";
    gCtx.shadowColor = "#10b981";
    gCtx.shadowBlur = 6;
    gCtx.lineWidth = 2;
    gCtx.beginPath();
    
    for (let fHz = 1e-9; fHz <= 1e3; fHz *= 1.15) {
        let h_f = (gmu * Math.pow(lMpc, 2.0/3.0)) / (dL * Math.pow(fHz, 1.0/3.0)) * 1.5e-3;
        if (h_f > 1e-15) h_f = 1e-15;
        if (h_f < 1e-30) h_f = 1e-30;
        
        const x = getX(fHz);
        const y = getY(h_f);
        if (fHz === 1e-9) gCtx.moveTo(x, y);
        else gCtx.lineTo(x, y);
    }
    gCtx.stroke();
    gCtx.restore();
    
    // Single point marker at 1 Hz
    const markerF = 1.0;
    let markerH = (gmu * Math.pow(lMpc, 2.0/3.0)) / (dL * Math.pow(markerF, 1.0/3.0)) * 1.5e-3;
    if (markerH > 1e-15) markerH = 1e-15;
    if (markerH < 1e-30) markerH = 1e-30;
    
    const mX = getX(markerF);
    const mY = getY(markerH);
    
    gCtx.save();
    gCtx.fillStyle = "#ffffff";
    gCtx.shadowColor = "#ffffff";
    gCtx.shadowBlur = 8;
    gCtx.beginPath();
    gCtx.arc(mX, mY, 4, 0, Math.PI * 2);
    gCtx.fill();
    gCtx.restore();
}

// Bind Cosmology events
document.getElementById("cosmo-gmu-log").addEventListener("input", runCosmologyEngine);
document.getElementById("cosmo-length").addEventListener("input", runCosmologyEngine);
document.getElementById("cosmo-dist").addEventListener("input", runCosmologyEngine);
document.getElementById("cosmo-z").addEventListener("input", runCosmologyEngine);
document.getElementById("cosmo-w0").addEventListener("input", runCosmologyEngine);
document.getElementById("cosmo-beta").addEventListener("input", runCosmologyEngine);

// --- 8.8 M-Theory Dualities Tab Solver & Web Graph ---
function runDualitiesEngine() {
    const theory = document.getElementById("dual-theory").value;
    const gmuLog = parseFloat(document.getElementById("dual-gs-log").value) || 0.0;
    const R = parseFloat(document.getElementById("dual-radius").value) || 1.0;
    
    const N = parseInt(document.getElementById("dual-matrix-n").value) || 16;
    const theta = parseFloat(document.getElementById("dual-theta").value) || 0.2;
    
    const g_s = Math.pow(10, gmuLog);
    document.getElementById("dual-gs-val").innerText = `g_s = ${g_s.toFixed(2)}`;
    document.getElementById("dual-radius-val").innerText = `R = ${R.toFixed(1)} l_s`;
    
    document.getElementById("dual-matrix-n-val").innerText = `${N} × ${N}`;
    document.getElementById("dual-theta-val").innerText = theta.toFixed(2);
    
    const dual_g = 1.0 / g_s;
    const dual_R = 1.0 / R;
    
    const t_dual_map = {
        "Type_IIA": "Type_IIB",
        "Type_IIB": "Type_IIA",
        "Type_I": "None",
        "Heterotic_SO32": "Heterotic_E8xE8",
        "Heterotic_E8xE8": "Heterotic_SO32"
    };
    
    const s_dual_map = {
        "Type_IIA": "None (Type IIA S-duality opens 11D M-Theory)",
        "Type_IIB": "Type_IIB (Self-Dual)",
        "Type_I": "Heterotic_SO32",
        "Heterotic_SO32": "Type_I",
        "Heterotic_E8xE8": "None"
    };
    
    let activeRegime = "";
    let desc = "";
    if (theory === "Type_IIA" && g_s > 5.0) {
        activeRegime = "11D M-Theory (Strongly Coupled Type IIA)";
        desc = `Type IIA 결합 상수가 강해짐에 따라(g_s=${g_s.toFixed(2)}) ${g_s.toFixed(1)} l_s 반경의 11번째 공간 차원이 크게 발현되어 11차원 초중력/M-이론으로 대통합됩니다.`;
    } else if (theory === "Type_IIB" && g_s > 5.0) {
        activeRegime = "S-Dual Type IIB (S-Duality Active)";
        desc = `Type IIB 결합 상수가 강해짐에 따라 상쌍대성(S-Duality)이 동작하여, 결합 상수 g_s'=${dual_g.toFixed(4)}를 가지는 가벼운 기본 끈(F1)과 무거운 D1-브레인의 역할이 반전된 가상 약결합 IIB 이론과 완벽하게 매치됩니다.`;
    } else if (theory === "Type_I" && g_s > 5.0) {
        activeRegime = "SO(32) Heterotic (Strongly Coupled Type I)";
        desc = `Type I 개방현 이론의 강결합 한계는 상쌍대성에 의해 결합 상수 g_s'=${dual_g.toFixed(4)}를 가진 Heterotic SO(32) 폐곡선 이론의 약결합 한계로 매핑됩니다.`;
    } else if (theory === "Heterotic_SO32" && g_s > 5.0) {
        activeRegime = "Type I (Strongly Coupled Heterotic SO(32))";
        desc = `Heterotic SO(32) 폐곡선 이론의 강결합 한계는 상쌍대성에 의해 결합 상수 g_s'=${dual_g.toFixed(4)}인 Type I 개방현 이론의 약결합 한계로 완벽히 상쇄 매핑됩니다.`;
    } else if (R < 0.3) {
        const target = t_dual_map[theory];
        activeRegime = `T-Dual ${target} (Small Radius Limit)`;
        desc = `압축 반경 R=${R.toFixed(3)} l_s가 스트링 스케일(R < 1)보다 훨씬 작아짐에 따라 T-이중성이 활성화되어, 반경 R'=${dual_R.toFixed(2)} l_s를 가진 ${target}와 모든 양자 질량 스펙트럼이 엄밀하게 동등해집니다.`;
    } else {
        activeRegime = `Perturbative 10D ${theory}`;
        desc = `약결합 및 거시적 차원 반경 영역에 위치하며, 기존 ${theory} 초대칭적 끈 섭동 이론의 테두리 안에서 안정적인 물리 상태가 기술됩니다.`;
    }
    
    let webText = `초대칭 이중성 변환 결과 분석:\n`;
    webText += `  • 기점 이론:             ${theory}\n`;
    webText += `  • 현재 결합 상수 g_s:     ${g_s.toFixed(4)} (S-Dual g_s': ${dual_g.toFixed(4)})\n`;
    webText += `  • 압축 반경 R:           ${R.toFixed(2)} l_s (T-Dual R': ${dual_R.toFixed(2)} l_s)\n`;
    webText += `  • 활성 물리 영역:         ${activeRegime}\n`;
    webText += `  • ↳ 결과: ${desc}`;
    document.getElementById("dual-web-result").innerText = webText;
    
    // Fuzzy sphere math
    const rFuzzy = theta * Math.sqrt((N * N - 1) / 4.0);
    const energy = N * (N * N - 1) / 8.0 * Math.pow(theta, 4);
    const r11 = theory === "Type_IIA" ? g_s : 0.0;
    
    document.getElementById("dual-res-n").innerText = N;
    document.getElementById("dual-res-radius").innerText = `${rFuzzy.toFixed(4)} l_s`;
    document.getElementById("dual-res-energy").innerText = `${energy.toExponential(4)} e_s`;
    document.getElementById("dual-res-r11").innerText = r11 > 0 ? `${r11.toFixed(3)} l_s` : "0.000 l_s (11D Dimension Compacted)";
    
    let matrixStatus = "";
    if (N < 8) {
        matrixStatus = "양자 불연속 행렬 위상 (Discrete SU(2) Matrix state active)";
    } else if (N < 40) {
        matrixStatus = "초차원 fuzzy 막 진동상 (Stabilized quantum non-commutative membrane)";
    } else {
        matrixStatus = "반클래식 기하학적 2-브레인 수렴 (Classical continuous M2-brane continuum limit reached!)";
    }
    document.getElementById("dual-status-desc").innerText = matrixStatus;
    
    drawDualityWeb(theory, g_s, R);
}

function drawDualityWeb(activeTheory, gs, R) {
    const canvas = document.getElementById("m-theory-web-canvas");
    if (!canvas) return;
    const wCtx = canvas.getContext("2d");
    
    const rect = canvas.parentNode.getBoundingClientRect();
    canvas.width = rect.width * (window.devicePixelRatio || 1);
    canvas.height = rect.height * (window.devicePixelRatio || 1);
    
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2 - 5;
    const radius = Math.min(w, h) * 0.36;
    
    wCtx.fillStyle = "#030308";
    wCtx.fillRect(0, 0, w, h);
    
    // Pentagon theories mapping
    const theories = [
        { id: "Heterotic_E8xE8", name: "E8×E8 Het", angle: -Math.PI / 2 },
        { id: "Type_IIA", name: "Type IIA", angle: -Math.PI / 2 + (2 * Math.PI) / 5 },
        { id: "Type_IIB", name: "Type IIB", angle: -Math.PI / 2 + (4 * Math.PI) / 5 },
        { id: "Type_I", name: "Type I", angle: -Math.PI / 2 + (6 * Math.PI) / 5 },
        { id: "Heterotic_SO32", name: "SO(32) Het", angle: -Math.PI / 2 + (8 * Math.PI) / 5 }
    ];
    
    // Draw duality lines
    wCtx.lineWidth = 1;
    
    // S-Duality lines: Type I <-> SO(32)
    const tI = theories.find(t => t.id === "Type_I");
    const tSO = theories.find(t => t.id === "Heterotic_SO32");
    wCtx.strokeStyle = "rgba(167, 139, 250, 0.45)"; // purple
    wCtx.beginPath();
    wCtx.moveTo(cx + radius * Math.cos(tI.angle), cy + radius * Math.sin(tI.angle));
    wCtx.lineTo(cx + radius * Math.cos(tSO.angle), cy + radius * Math.sin(tSO.angle));
    wCtx.stroke();
    
    // T-Duality lines: IIA <-> IIB, SO(32) <-> E8xE8
    const tIIA = theories.find(t => t.id === "Type_IIA");
    const tIIB = theories.find(t => t.id === "Type_IIB");
    const tE8 = theories.find(t => t.id === "Heterotic_E8xE8");
    wCtx.strokeStyle = "rgba(6, 182, 212, 0.45)"; // cyan
    wCtx.beginPath();
    wCtx.moveTo(cx + radius * Math.cos(tIIA.angle), cy + radius * Math.sin(tIIA.angle));
    wCtx.lineTo(cx + radius * Math.cos(tIIB.angle), cy + radius * Math.sin(tIIB.angle));
    wCtx.moveTo(cx + radius * Math.cos(tSO.angle), cy + radius * Math.sin(tSO.angle));
    wCtx.lineTo(cx + radius * Math.cos(tE8.angle), cy + radius * Math.sin(tE8.angle));
    wCtx.stroke();
    
    // 11D M-Theory pathways: from E8xE8 and IIA to the center
    wCtx.strokeStyle = "rgba(245, 158, 11, 0.3)"; // amber
    wCtx.beginPath();
    wCtx.moveTo(cx, cy);
    wCtx.lineTo(cx + radius * Math.cos(tIIA.angle), cy + radius * Math.sin(tIIA.angle));
    wCtx.moveTo(cx, cy);
    wCtx.lineTo(cx + radius * Math.cos(tE8.angle), cy + radius * Math.sin(tE8.angle));
    wCtx.stroke();
    
    // Draw theories vertices
    theories.forEach(t => {
        const x = cx + radius * Math.cos(t.angle);
        const y = cy + radius * Math.sin(t.angle);
        const isActive = t.id === activeTheory;
        
        wCtx.save();
        wCtx.fillStyle = isActive ? "#ffffff" : "rgba(255, 255, 255, 0.15)";
        wCtx.shadowColor = isActive ? "#a78bfa" : "transparent";
        wCtx.shadowBlur = isActive ? 10 : 0;
        wCtx.beginPath();
        wCtx.arc(x, y, isActive ? 6 : 4, 0, Math.PI * 2);
        wCtx.fill();
        wCtx.restore();
        
        wCtx.fillStyle = isActive ? "#a78bfa" : "rgba(255, 255, 255, 0.45)";
        wCtx.font = "8px 'Fira Code', monospace";
        wCtx.textAlign = Math.cos(t.angle) > 0.1 ? "left" : (Math.cos(t.angle) < -0.1 ? "right" : "center");
        wCtx.textBaseline = Math.sin(t.angle) > 0.1 ? "top" : (Math.sin(t.angle) < -0.1 ? "bottom" : "middle");
        const xOffset = Math.cos(t.angle) * 8;
        const yOffset = Math.sin(t.angle) * 8;
        wCtx.fillText(t.name, x + xOffset, y + yOffset);
    });
    
    // Draw 11D M-Theory Center node
    const isMTheoryActive = activeTheory === "Type_IIA" && gs > 5.0;
    wCtx.save();
    wCtx.fillStyle = isMTheoryActive ? "#f59e0b" : "rgba(245, 158, 11, 0.25)";
    wCtx.shadowColor = isMTheoryActive ? "#f59e0b" : "transparent";
    wCtx.shadowBlur = isMTheoryActive ? 15 : 0;
    wCtx.beginPath();
    wCtx.arc(cx, cy, 7, 0, Math.PI * 2);
    wCtx.fill();
    wCtx.restore();
    
    wCtx.fillStyle = isMTheoryActive ? "#f59e0b" : "rgba(245, 158, 11, 0.6)";
    wCtx.font = "bold 9px 'Fira Code', monospace";
    wCtx.textAlign = "center";
    wCtx.fillText("11D M-Theory", cx, cy - 10);
    
    // Calculate active moving marker coordinates
    let mx = cx;
    let my = cy;
    
    const activeVertex = theories.find(t => t.id === activeTheory);
    if (activeVertex) {
        const vx = cx + radius * Math.cos(activeVertex.angle);
        const vy = cy + radius * Math.sin(activeVertex.angle);
        
        if (activeTheory === "Type_IIA") {
            if (gs > 1.0) {
                // Strong coupling Type IIA slides toward 11D M-Theory at center
                const frac = Math.min(1.0, Math.max(0.0, Math.log10(gs) / 3.0));
                mx = vx + frac * (cx - vx);
                my = vy + frac * (cy - vy);
            } else if (R < 1.0) {
                // Small radius Type IIA slides toward T-dual Type IIB along the perimeter
                const targetVertex = theories.find(t => t.id === "Type_IIB");
                const tx = cx + radius * Math.cos(targetVertex.angle);
                const ty = cy + radius * Math.sin(targetVertex.angle);
                const frac = Math.min(1.0, Math.max(0.0, -Math.log10(R) / 1.0));
                mx = vx + frac * (tx - vx);
                my = vy + frac * (ty - vy);
            } else {
                mx = vx;
                my = vy;
            }
        } else if (activeTheory === "Type_IIB") {
            if (R < 1.0) {
                // Small radius Type IIB slides toward T-dual Type IIA along the perimeter
                const targetVertex = theories.find(t => t.id === "Type_IIA");
                const tx = cx + radius * Math.cos(targetVertex.angle);
                const ty = cy + radius * Math.sin(targetVertex.angle);
                const frac = Math.min(1.0, Math.max(0.0, -Math.log10(R) / 1.0));
                mx = vx + frac * (tx - vx);
                my = vy + frac * (ty - vy);
            } else if (gs > 1.0) {
                // Self-duality Type IIB loops back to IIB
                const frac = Math.min(1.0, Math.max(0.0, Math.log10(gs) / 3.0));
                mx = vx - frac * 12 * Math.cos(activeVertex.angle);
                my = vy - frac * 12 * Math.sin(activeVertex.angle);
            } else {
                mx = vx;
                my = vy;
            }
        } else if (activeTheory === "Type_I") {
            if (gs > 1.0) {
                // Strong coupling Type I slides toward Heterotic SO(32)
                const targetVertex = theories.find(t => t.id === "Heterotic_SO32");
                const tx = cx + radius * Math.cos(targetVertex.angle);
                const ty = cy + radius * Math.sin(targetVertex.angle);
                const frac = Math.min(1.0, Math.max(0.0, Math.log10(gs) / 3.0));
                mx = vx + frac * (tx - vx);
                my = vy + frac * (ty - vy);
            } else {
                mx = vx;
                my = vy;
            }
        } else if (activeTheory === "Heterotic_SO32") {
            if (gs > 1.0) {
                // Strong coupling SO(32) Het slides toward S-dual Type I
                const targetVertex = theories.find(t => t.id === "Type_I");
                const tx = cx + radius * Math.cos(targetVertex.angle);
                const ty = cy + radius * Math.sin(targetVertex.angle);
                const frac = Math.min(1.0, Math.max(0.0, Math.log10(gs) / 3.0));
                mx = vx + frac * (tx - vx);
                my = vy + frac * (ty - vy);
            } else if (R < 1.0) {
                // Small radius SO(32) Het T-duals to E8xE8 Het
                const targetVertex = theories.find(t => t.id === "Heterotic_E8xE8");
                const tx = cx + radius * Math.cos(targetVertex.angle);
                const ty = cy + radius * Math.sin(targetVertex.angle);
                const frac = Math.min(1.0, Math.max(0.0, -Math.log10(R) / 1.0));
                mx = vx + frac * (tx - vx);
                my = vy + frac * (ty - vy);
            } else {
                mx = vx;
                my = vy;
            }
        } else if (activeTheory === "Heterotic_E8xE8") {
            if (R < 1.0) {
                // Small radius E8xE8 Het T-duals to SO(32) Het
                const targetVertex = theories.find(t => t.id === "Heterotic_SO32");
                const tx = cx + radius * Math.cos(targetVertex.angle);
                const ty = cy + radius * Math.sin(targetVertex.angle);
                const frac = Math.min(1.0, Math.max(0.0, -Math.log10(R) / 1.0));
                mx = vx + frac * (tx - vx);
                my = vy + frac * (ty - vy);
            } else if (gs > 1.0) {
                // Strong coupling Heterotic E8xE8 opens strongly coupled M-theory on cylinder
                const frac = Math.min(1.0, Math.max(0.0, Math.log10(gs) / 3.0));
                mx = vx + frac * (cx - vx);
                my = vy + frac * (cy - vy);
            } else {
                mx = vx;
                my = vy;
            }
        }
    }
    
    // Draw active glowing pointer marker
    wCtx.save();
    wCtx.fillStyle = "#ffffff";
    wCtx.shadowColor = "#22d3ee";
    wCtx.shadowBlur = 10;
    wCtx.beginPath();
    wCtx.arc(mx, my, 5, 0, Math.PI * 2);
    wCtx.fill();
    wCtx.restore();
    
    // Outer pulsing ring
    const pulseRad = 8 + 4 * Math.sin(time * 3.5);
    wCtx.strokeStyle = "rgba(34, 211, 238, 0.4)";
    wCtx.lineWidth = 1.5;
    wCtx.beginPath();
    wCtx.arc(mx, my, pulseRad, 0, Math.PI * 2);
    wCtx.stroke();
}

// Bind Dualities events
document.getElementById("dual-theory").addEventListener("change", runDualitiesEngine);
document.getElementById("dual-gs-log").addEventListener("input", runDualitiesEngine);
document.getElementById("dual-radius").addEventListener("input", runDualitiesEngine);
document.getElementById("dual-matrix-n").addEventListener("input", runDualitiesEngine);
document.getElementById("dual-theta").addEventListener("input", runDualitiesEngine);

// Duality direct triggers
document.getElementById("btn-t-duality").addEventListener("click", () => {
    const rSlider = document.getElementById("dual-radius");
    const R = parseFloat(rSlider.value) || 1.0;
    rSlider.value = (1.0 / R).toFixed(1);
    runDualitiesEngine();
});

document.getElementById("btn-s-duality").addEventListener("click", () => {
    const gsLogSlider = document.getElementById("dual-gs-log");
    const logG = parseFloat(gsLogSlider.value) || 0.0;
    gsLogSlider.value = (-logG).toFixed(1);
    runDualitiesEngine();
});

// --- 8.9 Moduli Stabilization & Swampland Tab Solver & Potential Curve ---
function runSwamplandEngine() {
    const roll = parseFloat(document.getElementById("swamp-roll").value) || 0.5;
    const alpha = parseFloat(document.getElementById("swamp-alpha").value) || 1.0;
    
    const T = parseFloat(document.getElementById("swamp-t-modulus").value) || 10.0;
    const w0 = parseFloat(document.getElementById("swamp-w0-flux").value) || -1.0;
    
    const charge = parseFloat(document.getElementById("swamp-charge").value) || 1.0;
    const mass = parseFloat(document.getElementById("swamp-mass").value) || 1.0;
    
    document.getElementById("swamp-roll-val").innerText = `${roll.toFixed(2)} M_pl`;
    document.getElementById("swamp-alpha-val").innerText = alpha.toFixed(2);
    document.getElementById("swamp-t-modulus-val").innerText = T.toFixed(1);
    document.getElementById("swamp-w0-flux-val").innerText = w0.toFixed(1);
    document.getElementById("swamp-charge-val").innerText = charge.toFixed(2);
    document.getElementById("swamp-mass-val").innerText = `${mass.toFixed(2)} M_pl`;
    
    // 1. Swampland Distance Conjecture (SDC)
    const massFraction = Math.exp(-alpha * roll);
    const isSdcActive = roll > 1.0;
    
    // 2. Weak Gravity Conjecture (WGC)
    const wgcLimit = 0.7071;
    const ratio = charge / mass;
    const isWgcCompliant = ratio >= wgcLimit;
    
    // 3. KKLT Potential calculation
    const a = 0.1;
    const A = 1.0;
    const exp_factor = Math.exp(-a * T);
    const bracket = (a * T * A * exp_factor / 3.0) + w0 + A * exp_factor;
    const V_val = (a * A * exp_factor / (T * T)) * bracket;
    
    // Derivatives numerical
    const h = 0.001;
    const get_V = (x) => {
        const exp = Math.exp(-a * x);
        return (a * A * exp / (x * x)) * ((a * x * A * exp / 3.0) + w0 + exp);
    };
    const V_plus = get_V(T + h);
    const V_minus = get_V(T - h);
    const v_prime = (V_plus - V_minus) / (2.0 * h);
    const v_double_prime = (V_plus - 2.0 * V_val + V_minus) / (h * h);
    
    // de Sitter Swampland Conjecture check
    let isDscViolated = false;
    if (V_val > 0) {
        const slope_ratio = Math.abs(v_prime) / V_val;
        const curve_ratio = v_double_prime / V_val;
        if (slope_ratio < 1.0 && curve_ratio > -1.0) {
            isDscViolated = true;
        }
    }
    const isStabilized = Math.abs(v_prime) < 1e-4 && v_double_prime > 0.0;
    
    // Update DOM Fields
    document.getElementById("swamp-res-mass").innerText = `${massFraction.toFixed(4)} M_pl`;
    document.getElementById("swamp-res-wgc").innerText = ratio.toFixed(4);
    
    let statusMsg = "";
    const isSwampland = isSdcActive || !isWgcCompliant;
    const badge = document.getElementById("swamp-res-badge");
    if (isSwampland) {
        badge.innerText = "SWAMPLAND";
        badge.style.background = "rgba(239, 68, 68, 0.15)";
        badge.style.borderColor = "#ef4444";
        badge.style.color = "#f87171";
        if (isSdcActive && !isWgcCompliant) {
            statusMsg = "EFT가 늪지대(Swampland)에 빠졌습니다: 대형 장 롤링(Delta phi > 1)으로 타워 질량이 급락하였으며, q/m 비가 WGC(q/m < 0.707) 제한을 위반했습니다.";
        } else if (isSdcActive) {
            statusMsg = "EFT가 늪지대에 빠졌습니다: 장 구동 거리가 플랑크 한계(1.0 M_pl)를 초과해 무한 입자 타워가 흘러내려와 저에너지 기술이 붕괴합니다.";
        } else {
            statusMsg = "EFT가 늪지대에 빠졌습니다: 테스트 입자의 전하/질량비(q/m)가 극대 블랙홀 한계(0.707) 미만으로 WGC를 위반했습니다.";
        }
    } else {
        badge.innerText = "LANDSCAPE";
        badge.style.background = "rgba(16, 185, 129, 0.15)";
        badge.style.borderColor = "#10b981";
        badge.style.color = "#34d399";
        statusMsg = "EFT가 Landscape(지형)에 위치합니다: 모듈러스 거리가 한계 내에 있어 KK 상태가 안정적이며 q/m 비가 극대 블랙홀 제한을 만족합니다.";
    }
    document.getElementById("swamp-status-desc").innerText = statusMsg;
    
    let potentialText = `KKLT Potential Stabilization Metrics:\n`;
    potentialText += `  • T-modulus 체적:         ${T.toFixed(2)}\n`;
    potentialText += `  • 진공 잠재 에너지 V(T):   ${V_val.toExponential(4)} V_pl\n`;
    potentialText += `  • 1차 미분 V'(T):         ${v_prime.toExponential(4)}\n`;
    potentialText += `  • 2차 미분 V''(T):        ${v_double_prime.toExponential(4)}\n`;
    potentialText += `  • moduli 고정 상태:       ${isStabilized ? "안정화 고정됨 (STABILIZED)" : "요동 중 (UNSTABILIZED)"}\n`;
    potentialText += `  • dS Swampland 위반 여부: ${isDscViolated ? "위반 (stable de Sitter 존재)" : "만족 (stable dS 배제)"}`;
    document.getElementById("swamp-potential-result").innerText = potentialText;
    
    drawSwamplandPotentialCurve(T, w0, V_val);
}

function drawSwamplandPotentialCurve(activeT, w0, activeV) {
    const canvas = document.getElementById("swampland-canvas");
    if (!canvas) return;
    const sCtx = canvas.getContext("2d");
    
    const rect = canvas.parentNode.getBoundingClientRect();
    canvas.width = rect.width * (window.devicePixelRatio || 1);
    canvas.height = rect.height * (window.devicePixelRatio || 1);
    
    const w = canvas.width;
    const h = canvas.height;
    
    sCtx.fillStyle = "#030308";
    sCtx.fillRect(0, 0, w, h);
    
    const padLeft = 50;
    const padRight = 15;
    const padTop = 15;
    const padBottom = 20;
    const pW = w - padLeft - padRight;
    const pH = h - padTop - padBottom;
    
    const tMin = 1.0;
    const tMax = 35.0;
    
    const a = 0.1;
    const A = 1.0;
    const V_func = (x) => {
        const exp = Math.exp(-a * x);
        return (a * A * exp / (x * x)) * ((a * x * A * exp / 3.0) + w0 + exp);
    };
    
    // Find potential range dynamically
    let minV = 0;
    let maxV = -Infinity;
    for (let x = tMin; x <= tMax; x += 0.5) {
        const v = V_func(x);
        if (v < minV) minV = v;
        if (v > maxV) maxV = v;
    }
    if (maxV === -Infinity) maxV = 1e-4;
    if (minV === 0) minV = -1e-4;
    
    // Add small buffer to top/bottom
    const spanV = maxV - minV;
    const scaleMinV = minV - spanV * 0.08;
    const scaleMaxV = maxV + spanV * 0.08;
    
    function getX(tVal) {
        const frac = (tVal - tMin) / (tMax - tMin);
        return padLeft + frac * pW;
    }
    function getY(vVal) {
        const frac = (vVal - scaleMinV) / (scaleMaxV - scaleMinV);
        return padTop + (1.0 - frac) * pH;
    }
    
    // Draw grid
    sCtx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    sCtx.lineWidth = 1;
    sCtx.fillStyle = "rgba(255, 255, 255, 0.35)";
    sCtx.font = "8px 'Fira Code', monospace";
    
    // Horizontal zero-energy line
    const zeroY = getY(0.0);
    if (zeroY >= padTop && zeroY <= h - padBottom) {
        sCtx.strokeStyle = "rgba(255, 255, 255, 0.06)";
        sCtx.beginPath();
        sCtx.moveTo(padLeft, zeroY);
        sCtx.lineTo(w - padRight, zeroY);
        sCtx.stroke();
    }
    
    // T-modulus axis labels
    sCtx.textAlign = "center";
    sCtx.textBaseline = "top";
    [5, 15, 25, 35].forEach(tVal => {
        const x = getX(tVal);
        sCtx.beginPath();
        sCtx.moveTo(x, padTop);
        sCtx.lineTo(x, h - padBottom);
        sCtx.stroke();
        sCtx.fillText(`T=${tVal}`, x, h - padBottom + 4);
    });
    
    // Potential axis labels
    sCtx.textAlign = "right";
    sCtx.textBaseline = "middle";
    [scaleMinV, (scaleMinV + scaleMaxV)/2.0, scaleMaxV].forEach(vVal => {
        const y = getY(vVal);
        sCtx.fillText(vVal.toExponential(1), padLeft - 6, y);
    });
    
    // Draw potential curve V(T)
    sCtx.save();
    sCtx.strokeStyle = "#ef4444"; // glowing red
    sCtx.shadowColor = "#ef4444";
    sCtx.shadowBlur = 6;
    sCtx.lineWidth = 2;
    sCtx.beginPath();
    
    for (let x = tMin; x <= tMax; x += 0.25) {
        const v = V_func(x);
        const px = getX(x);
        const py = getY(v);
        if (x === tMin) sCtx.moveTo(px, py);
        else sCtx.lineTo(px, py);
    }
    sCtx.stroke();
    sCtx.restore();
    
    // Active moduli point marker
    const mX = getX(activeT);
    const mY = getY(activeV);
    
    sCtx.save();
    sCtx.fillStyle = "#ffffff";
    sCtx.shadowColor = "#ffffff";
    sCtx.shadowBlur = 8;
    sCtx.beginPath();
    sCtx.arc(mX, mY, 4.5, 0, Math.PI * 2);
    sCtx.fill();
    sCtx.restore();
}

// Bind Swampland events
document.getElementById("swamp-roll").addEventListener("input", runSwamplandEngine);
document.getElementById("swamp-alpha").addEventListener("input", runSwamplandEngine);
document.getElementById("swamp-t-modulus").addEventListener("input", runSwamplandEngine);
document.getElementById("swamp-w0-flux").addEventListener("input", runSwamplandEngine);
document.getElementById("swamp-charge").addEventListener("input", runSwamplandEngine);
document.getElementById("swamp-mass").addEventListener("input", runSwamplandEngine);

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
    runHolographyEngine();
    runDiagnosticsEngine();
    runCosmologyEngine();
    runDualitiesEngine();
    runSwamplandEngine();
    
    handlePresetChange();
    drawStringSimulation();
};

window.addEventListener("resize", () => {
    resizeCanvas();
});
