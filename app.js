/**
 * Superstring Hub Core Application
 * Handles database UI rendering, interactive solvers, and real-time canvas physics animations.
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

// --- 3. UI Interaction: Theory Explorer ---
function updateTheoryUI(theoryId) {
    const theory = THEORIES_DB[theoryId];
    if (!theory) return;

    activeTheory = theoryId;
    
    // Update active tab styling
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

// Add event listeners to theory buttons
document.querySelectorAll(".theory-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-theory");
        updateTheoryUI(id);
    });
});

// --- 4. Interactive Math Solvers ---

// 4.1 String Spectrum Calculator
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
        
        // Level matching check
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

// 4.2 Compactification and T-Duality
function runCompactificationCalc() {
    const R = parseFloat(document.getElementById("comp-r").value) || 2.0;
    const n = parseInt(document.getElementById("comp-n").value) || 0;
    const w = parseInt(document.getElementById("comp-w").value) || 0;
    
    // Constants
    const alpha_prime = 1.0;
    
    // Formula: M^2 = n^2 / R^2 + w^2 * R^2 / alpha'^2 + (2 / alpha') * (N_L + N_R - a_L - a_R)
    // For simplicity, we assume the lowest oscillator excitation satisfying level matching N_L - N_R = n * w
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
    const osc_contrib = (2.0 / alpha_prime) * (N_L + N_R - 1.0); // assume a=0.5 (NS-NS)
    
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

// 4.3 Calabi-Yau generations calculator
function runCYCalc() {
    const h11 = parseInt(document.getElementById("cy-h11").value);
    const h21 = parseInt(document.getElementById("cy-h21").value);
    
    document.getElementById("cy-h11-val").innerText = h11;
    document.getElementById("cy-h21-val").innerText = h21;
    
    const chi = 2 * (h11 - h21);
    const gen = Math.abs(chi) / 2;
    
    let res = `오일러 지표 (Euler Characteristic) χ = ${chi}\n`;
    res += `입자 세대 수 (Fermion Generations) = ${gen} 세대\n\n`;
    res += `물리적 결과: Heterotic E8xE8을 본 칼라비-야우 다양체에 압축화하면 E8 하나가 SU(3) 홀로노미에 의해 깨져 E6 GUT 그룹이 되며, `;
    res += `4차원상에 정확히 ${gen} 세대의 페르미온 입자(표준모형의 전자, 쿼크 등의 세대 구조)가 출현합니다.`;
    
    document.getElementById("cy-result").innerText = res;
}

// Register all listeners for calculators
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


// --- 5. Real-Time Physics Canvas Animation ---
let animationFrameId = null;
let time = 0;

// Resize canvas properly
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
    ctx.fillStyle = "rgba(3, 3, 8, 0.2)"; // trail effect
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
    drawCosmicBackground();
    
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    
    const presetKey = document.getElementById("particle-preset").value;
    const preset = presets[presetKey];
    
    time += 0.04;
    
    // Global Glow Styling
    ctx.shadowBlur = 15;
    
    if (preset.type === "open") {
        // --- OPEN STRING: Standing Waves between two D-branes ---
        ctx.shadowColor = presetKey === "tachyon" ? "rgba(239, 68, 68, 0.8)" : "rgba(34, 211, 238, 0.8)";
        ctx.strokeStyle = presetKey === "tachyon" ? "#ef4444" : "#22d3ee";
        ctx.lineWidth = 3;
        
        // Draw two D-branes as vertical glowing lines
        const leftBraneX = cx - 180;
        const rightBraneX = cx + 180;
        
        ctx.save();
        ctx.shadowBlur = 8;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(leftBraneX, cy - 80);
        ctx.lineTo(leftBraneX, cy + 80);
        ctx.moveTo(rightBraneX, cy - 80);
        ctx.lineTo(rightBraneX, cy + 80);
        ctx.stroke();
        
        // Brane text labels
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.font = "10px Inter";
        ctx.fillText("D-Brane (L)", leftBraneX - 60, cy - 85);
        ctx.fillText("D-Brane (R)", rightBraneX - 10, cy - 85);
        ctx.restore();

        // Calculate wave equation
        const harmonic = preset.n * 2; // harmonic modes
        ctx.beginPath();
        
        const steps = 120;
        for (let i = 0; i <= steps; i++) {
            const frac = i / steps;
            const x = leftBraneX + frac * (rightBraneX - leftBraneX);
            
            // Standing wave formula: y = A * sin(k*pi*x/L) * cos(omega*t)
            let y = 0;
            if (presetKey === "tachyon") {
                // Tachyon shows unstable growing/exponential breathing
                const breath = 15 * Math.sin(time) * Math.cosh(0.8 * Math.sin(time * 0.4));
                y = cy + breath * Math.sin(Math.PI * frac);
            } else {
                // Standard harmonic standing wave
                const amp = 30 * Math.cos(time * 1.5);
                y = cy + amp * Math.sin(harmonic * Math.PI * frac);
            }
            
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
        
    } else if (presetKey === "kk_mode") {
        // --- KK MODE: Wave wrapping with momentum around the compact circle ---
        ctx.shadowColor = "rgba(167, 139, 250, 0.8)";
        ctx.strokeStyle = "#a78bfa";
        ctx.lineWidth = 3;
        
        // Compact dimension visualization: Circle
        const R = 80;
        ctx.beginPath();
        for (let i = 0; i <= 150; i++) {
            const angle = (i / 150) * Math.PI * 2;
            
            // KK momentum introduces a traveling phase wave along the circle
            // r(θ) = R + A * sin(n * θ - ω * t)
            const n = 4; // Momentum harmonic number
            const amp = 8 * Math.sin(n * angle - time * 2);
            const currentR = R + amp;
            
            const x = cx + currentR * Math.cos(angle);
            const y = cy + currentR * Math.sin(angle);
            
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
        
        // Compact dimension guide circle
        ctx.save();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
        
    } else if (presetKey === "winding_mode") {
        // --- WINDING MODE: A string winding around a cylinder cylinder ---
        ctx.shadowColor = "rgba(6, 182, 212, 0.8)";
        ctx.strokeStyle = "#06b6d4";
        ctx.lineWidth = 3;
        
        // Draw cylinder background
        ctx.save();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
        ctx.lineWidth = 1;
        
        const cylW = 100;
        const cylH = 180;
        ctx.beginPath();
        // Cylinder bounds
        ctx.ellipse(cx, cy - cylH/2, cylW, 20, 0, 0, Math.PI * 2);
        ctx.ellipse(cx, cy + cylH/2, cylW, 20, 0, 0, Math.PI * 2);
        ctx.moveTo(cx - cylW, cy - cylH/2);
        ctx.lineTo(cx - cylW, cy + cylH/2);
        ctx.moveTo(cx + cylW, cy - cylH/2);
        ctx.lineTo(cx + cylW, cy + cylH/2);
        ctx.stroke();
        ctx.restore();
        
        // Winding string (Helix) winding w=3 times
        ctx.beginPath();
        const helixSteps = 300;
        const w = 3; // winding number
        
        for (let i = 0; i <= helixSteps; i++) {
            const frac = i / helixSteps;
            const hY = cy - cylH/2 + frac * cylH;
            
            // angle wrapping with time pulsation
            const angle = frac * Math.PI * 2 * w + time * 0.3;
            // Radius of cylinder deforming
            const r = cylW + 5 * Math.sin(angle * 3 + time * 1.5);
            
            const hX = cx + r * Math.cos(angle);
            // apply isometric visual tilt
            const finalY = hY + 12 * Math.sin(angle);
            
            // Draw back part thinner, front part thicker for pseudo-3D
            const isFront = Math.sin(angle) > 0;
            ctx.lineWidth = isFront ? 3.5 : 1.5;
            ctx.strokeStyle = isFront ? "#06b6d4" : "rgba(6, 182, 212, 0.3)";
            
            if (i === 0) ctx.moveTo(hX, finalY);
            else {
                ctx.lineTo(hX, finalY);
                // Flush line segment to ensure width change looks decent
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(hX, finalY);
            }
        }
        ctx.stroke();
        
    } else {
        // --- CLOSED STRING: Pulsating/deforming loop (Graviton / Dilaton) ---
        ctx.shadowColor = presetKey === "dilaton" ? "rgba(16, 185, 129, 0.8)" : "rgba(124, 58, 237, 0.8)";
        ctx.strokeStyle = presetKey === "dilaton" ? "#10b981" : "#7c3aed";
        ctx.lineWidth = 3.5;
        
        const R = 80;
        ctx.beginPath();
        
        const steps = 160;
        for (let i = 0; i <= steps; i++) {
            const angle = (i / steps) * Math.PI * 2;
            
            let currentR = R;
            
            if (presetKey === "dilaton") {
                // Dilaton is the radial breathing scalar mode: r(t) = R + A * cos(ω*t)
                currentR = R + 14 * Math.cos(time * 1.8);
            } else {
                // Graviton has spin-2 transverse deforming waves:
                // Excitations left and right combined
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
    
    animationFrameId = requestAnimationFrame(drawStringSimulation);
}

// Handle Preset Changes
function handlePresetChange() {
    const key = document.getElementById("particle-preset").value;
    const preset = presets[key];
    if (!preset) return;
    
    // Update labels
    document.getElementById("sim-mass-sq").innerText = preset.m2.toFixed(2) + " M_s²";
    document.getElementById("sim-mass").innerText = preset.mass;
    document.getElementById("sim-freq").innerText = key === "tachyon" ? "폭발적 요동" : (key === "photon" || key === "graviton" ? "1.0x (안정)" : "1.8x (고에너지)");
    document.getElementById("canvas-desc").innerText = preset.desc;
}

document.getElementById("particle-preset").addEventListener("change", handlePresetChange);

// --- 6. Initialization ---
window.onload = () => {
    resizeCanvas();
    updateTheoryUI("Type_IIB");
    
    // Initial runs
    runSpectrumCalc();
    runCompactificationCalc();
    runCYCalc();
    
    handlePresetChange();
    drawStringSimulation();
};

// Canvas resize on window changes
window.addEventListener("resize", () => {
    resizeCanvas();
});
