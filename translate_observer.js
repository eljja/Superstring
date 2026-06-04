(function() {
    const TRANSLATION_MAP = {
        "🌌 5대 초끈 이론 및 M-이론": "🌌 5 Superstring Theories & M-Theory",
        "M-이론 (11D)": "M-Theory (11D)",
        "로딩 중...": "Loading...",
        "✨ 무질량 입자 스펙트럼 (Massless Spectrum)": "✨ Massless Particle Spectrum",
        "입자/필드명": "Particle/Field Name",
        "기호": "Symbol",
        "스핀": "Spin",
        "섹터": "Sector",
        "🛡️ 허용된 D-브레인 및 솔리톤 (Allowed Branes)": "🛡️ Allowed D-branes & Solitons",
        "🧪 끈 흥분 상태 입자 조립기": "🧪 String Excitation Particle Builder",
        "초끈의 특정 진동 수준과 압축화 차원의 양자화된 모멘텀을 설정하여 4차원의 실제 소립자를 합성합니다.": "Synthesize actual 4D elementary particles by setting specific vibration levels of superstrings and quantized momentum of compactification dimensions.",
        "NS-NS 보손 섹터 (Closed)": "NS-NS Bosonic Sector (Closed)",
        "R-R 보손 섹터 (Closed)": "R-R Bosonic Sector (Closed)",
        "NS-R 페르미온 섹터 (Closed)": "NS-R Fermionic Sector (Closed)",
        "R-NS 페르미온 섹터 (Closed)": "R-NS Fermionic Sector (Closed)",
        "NS 보손 섹터 (Open)": "NS Bosonic Sector (Open)",
        "R 페르미온 섹터 (Open)": "R Fermionic Sector (Open)",
        "좌진동 양자수 (N_L)": "Left Vibration Quantum Number (N_L)",
        "우진동 양자수 (N_R)": "Right Vibration Quantum Number (N_R)",
        "KK 모멘텀 수 (n)": "KK Momentum Number (n)",
        "Winding 감김 수 (w)": "Winding Number (w)",
        "압축 차원 반경 R (l_s)": "Compact Dimension Radius R (l_s)",
        "💥 고에너지 충돌 및 산란 설정": "💥 High-Energy Collision & Scattering Settings",
        "Mandelstam 변수 및 D-브레인 기하학 구조를 조정하여 끈 산란 진폭과 게이지-중력 결합 상수를 제어합니다.": "Control string scattering amplitudes and gauge-gravity coupling constants by adjusting Mandelstam variables and D-brane geometric structures.",
        "Mandelstam 충돌 에너지": "Mandelstam Collision Energy",
        "질량중심 에너지 제곱 (s)": "Center of Mass Energy Squared (s)",
        "모멘텀 전송 제곱 (t)": "Momentum Transfer Squared (t)",
        "Regge 기울기 (α')": "Regge Slope (α')",
        "궤적 절편 (α₀)": "Trajectory Intercept (α₀)",
        "D-브레인 & 압축화 차원 기하": "D-brane & Compactification Dimension Geometry",
        "D-브레인 차원 (p-brane)": "D-brane Dimension (p-brane)",
        "컴팩트 부피 (V_p-3)": "Compact Volume (V_p-3)",
        "6차원 CY 부피 (V_6)": "6D CY Volume (V_6)",
        "🔮 블랙홀 & 홀로그래피 설정": "🔮 Black Hole & Holography Settings",
        "D-브레인의 수량과 충돌 매개변수를 조정하여 블랙홀의 미시상태(Microstates) 엔트로피와 AdS/CFT 강결합 홀로그래피를 시뮬레이션합니다.": "Simulate black hole microstate entropy and AdS/CFT strong coupling holography by adjusting the quantity of D-branes and collision parameters.",
        "D1-D5-P 블랙홀 전하": "D1-D5-P Black Hole Charge",
        "D1-brane 전하 (Q₁)": "D1-brane Charge (Q₁)",
        "D5-brane 전하 (Q₅)": "D5-brane Charge (Q₅)",
        "S¹ 컴팩트 KK 모멘텀 (N_p)": "S¹ Compact KK Momentum (N_p)",
        "AdS/CFT Boundary CFT 매개변수": "AdS/CFT Boundary CFT Parameters",
        "D3-brane 갯수 (N_c)": "Number of D3-branes (N_c)",
        "Yang-Mills 결합제곱 (g_YM²)": "Yang-Mills Coupling Squared (g_YM²)",
        "🪐 우주끈 & 끈 인플레이션 설정": "🪐 Cosmic Strings & String Inflation Settings",
        "우주 스케일로 늘어난 초거대 우주끈(Cosmic String)의 장력과 모드가 남기는 중력파 신호, 그리고 브레인 급팽창(Inflation)의 우주 마이크로파 배경(CMB) 물리량을 설계합니다.": "Design gravitational wave signals left by tensions and modes of cosmic-scale supergiant cosmic strings, and cosmic microwave background (CMB) physical quantities of brane inflation.",
        "초대칭 깨짐 에너지 스케일 (SUSY Breaking)": "SUSY Breaking Scale",
        "초거대 우주끈 루프 & 중력파": "Supergiant Cosmic String Loops & Gravitational Waves",
        "루프 길이 L (광년)": "Loop Length L (Light Years)",
        "10.0 광년": "10.0 Light Years",
        "루프 거리 d_L (Mpc)": "Loop Distance d_L (Mpc)",
        "KKLT 브레인 급팽창 (CMB)": "KKLT Brane Inflation (CMB)",
        "인플라톤 위치 (z)": "Inflaton Position (z)",
        "플럭스 세기 (W₀)": "Flux Intensity (W₀)",
        "허블 파라미터 (β)": "Hubble Parameter (β)",
        "🔗 M-이론 & 초대칭 이중성 설정": "🔗 M-Theory & Supersymmetric Duality Settings",
        "끈 이론의 강결합/약결합(S-이중성) 및 거시/미시 반경(T-이중성) 공간을 결합하여, 5대 초끈 이론을 11차원 M-이론으로 매끄럽게 통합 분석합니다.": "Seamlessly integrate and analyze the 5 superstring theories into 11D M-Theory by combining strong/weak coupling (S-duality) and macro/micro radius (T-duality) spaces.",
        "이중성 매개변수 & 변환": "Duality Parameters & Transform",
        "Type IIA (폐곡선, 비키랄)": "Type IIA (Closed, Non-chiral)",
        "Type IIB (폐곡선, 키랄)": "Type IIB (Closed, Chiral)",
        "Type I (개방현/폐곡선 혼합)": "Type I (Open/Closed Mixed)",
        "압축 차원 반경 R (l_s 단위)": "Compact Dimension Radius R (in l_s)",
        "T-이중성 변환 (R ↔ 1/R)": "T-Duality Transform (R ↔ 1/R)",
        "S-이중성 변환 (g_s ↔ 1/g_s)": "S-Duality Transform (g_s ↔ 1/g_s)",
        "11D BFSS 비가환 행렬 역학": "11D BFSS Non-commutative Matrix Mechanics",
        "BFSS 행렬 모델에서 물리 좌표는 가환하지 않는 Hermitian 행렬들로 매핑되며, 양자 거품 공간의 거시적 fuzzy 막을 생성합니다.": "In the BFSS matrix model, physical coordinates are mapped to non-commutative Hermitian matrices, generating macro-fuzzy membranes in quantum foam space.",
        "행렬 크기 (N × N)": "Matrix Size (N × N)",
        "비가환 매개변수 (θ)": "Non-commutative Parameter (θ)",
        "🏜️ moduli 안정화 & 늪지대 설정": "🏜️ Moduli Stabilization & Swampland Settings",
        "초차원 컴팩트화(Compactification) 과정의 칼라비-야우 기하학 형태 변동(Kähler Modulus T)과 양자중력 섭동 조건의 일치성을 판별합니다.": "Determine the alignment between quantum gravity perturbation conditions and Calabi-Yau geometric shape variations (Kähler Modulus T) in hyper-dimensional compactification.",
        "모듈러스 이동 거리 (Δφ)": "Modulus Displacement (Δφ)",
        "지수 감쇠 상수 (α)": "Exponential Decay Constant (α)",
        "KKLT moduli 안정화 & dS 추측": "KKLT Moduli Stabilization & dS Conjecture",
        "플럭스 장벽 세기 (W₀)": "Flux Barrier Strength (W₀)",
        "자연계의 모든 입자는 중력이 가장 약한 힘이어야 한다는 조건(q/m >= 1/sqrt(2))을 만족해야만 안정적으로 붕괴할 수 있습니다.": "All particles in nature must satisfy the condition (q/m >= 1/sqrt(2)) where gravity is the weakest force to decay stably.",
        "테스트 전하량 (q)": "Test Charge (q)",
        "테스트 질량 (m)": "Test Mass (m)",
        "⚛️ 기본입자 유도 및 진공 선택": "⚛️ Elementary Particle Derivation & Vacuum Selection",
        "초끈이론의 10차원 콤팩트화 기하학에서 3세대 쿼크와 렙톤 및 표준 모형 게이지 대칭이 자연스럽게 도출되는 진공을 탐색하고 유도합니다.": "Explore and derive vacua where standard model gauge symmetries and three generations of quarks/leptons naturally emerge in the 10D compactification geometry of superstring theory.",
        "칼라비-야우 기하학 Hodge 수": "Calabi-Yau Geometric Hodge Numbers",
        "Hodge 수 h¹'¹과 h²'¹은 6차원 다양체의 차원 구멍을 결정하며, 오일러 지수 χ = 2(h¹'¹ - h²'¹)를 도출합니다.": "Hodge numbers h¹'¹ and h²'¹ determine dimensional holes of the 6D manifold, deriving the Euler characteristic χ = 2(h¹'¹ - h²'¹).",
        "윌슨 라인 (Wilson Line) 이산 이중군": "Wilson Line Discrete Quotient Group",
        "비자명 통로에 걸린 게이지 플럭스 대칭군 |G|의 위상학적 몫(Quotient) 구조가 세대 수 N_gen = |h¹'¹ - h²'¹| / |G|를 결정합니다.": "The topological quotient structure of the gauge flux symmetry group |G| wrapped on non-trivial cycles determines the generation count N_gen = |h¹'¹ - h²'¹| / |G|.",
        "이산 대칭군 크기 (|G|)": "Discrete Symmetry Group Size (|G|)",
        "교차 D-막 세계면 인스턴톤": "Intersecting D-brane Worldsheet Instantons",
        "두 D-막 사이의 세계면 인스턴톤 감김 면적 A_inst가 유카와 결합 Y ∝ exp(-A/α')을 지수함수적으로 억제해 3세대 극단적 질량 차이를 생성합니다.": "The worldsheet instanton wrapping area A_inst between two D-branes exponentially suppresses the Yukawa coupling Y ∝ exp(-A/α'), creating extreme mass hierarchies across three generations.",
        "🔍 최적 표준 모형 진공 자동 탐색 (Search Vacua)": "🔍 Automatic Search for Optimal Standard Model Vacua (Search Vacua)",
        "🛡️ 임계 우주 매개변수 설정": "🛡️ Critical Cosmological Parameter Settings",
        "우주의 물리적 매개변수를 강제로 조작하여 초끈의 등각장론적(CFT) 무결성과 변칙성(Anomaly)을 시뮬레이션 진단합니다.": "Diagnose superstring conformal field theory (CFT) integrity and anomaly cancelation by adjusting physical parameters of the universe.",
        "시공간 전체 차원 수 (D)": "Total Spacetime Dimensions (D)",
        "10차원": "10 Dimensions",
        "세계면 등각 변칙 설명": "Worldsheet Conformal Anomaly Explanation",
        "초끈 이론의 양자적 무결성은 10차원(임계 차원) 및 특정 게이지 대칭 구조(SO(32) 혹은 E8xE8) 하에서만 만족됩니다. 임의로 매개변수를 변동시키면 무질량 입자들의 양자 중력 이상 변칙이 상쇄되지 않으며, 이론에 고스트 상태가 발생합니다.": "Quantum integrity of superstring theory is satisfied only under 10 dimensions (critical dimension) and specific gauge symmetry structures (SO(32) or E8xE8). Modifying parameters arbitrarily prevents quantum gravitational anomalies of massless particles from canceling, resulting in ghost states.",
        "Virasoro 등각장론 대수 (CFT Algebra)": "Virasoro Conformal Field Theory Algebra (CFT Algebra)",
        "비라소로 생성자 $L_m, L_n$의 대수적 교환관계 $[L_m, L_n] = (m-n)L_{m+n} + \\frac{c}{12}m(m^2-1)\\delta_{m+n,0}$을 연산합니다.": "Calculate the algebraic commutation relation of Virasoro generators: $[L_m, L_n] = (m-n)L_{m+n} + \\frac{c}{12}m(m^2-1)\\delta_{m+n,0}$.",
        "생성자 지수 m": "Generator Index m",
        "생성자 지수 n": "Generator Index n",
        "☀️ 힉스 메커니즘 & 시소 메커니즘": "☀️ Higgs Mechanism & Seesaw Mechanism",
        "초끈이론의 초중력 퍼텐셜을 통해 힉스장의 자발적 대칭성 깨짐(EWSB)을 유도하고, 무거운 마조라나 끈 스케일 입자를 통한 중성미자 시소 메커니즘을 시뮬레이션합니다.": "Spontaneously break EW symmetry via superstring supergravity potentials and simulate the seesaw mechanism via Majorana string-scale neutrinos.",
        "초대칭(SUSY) 붕괴 스케일이 힉스 퍼텐셜의 형태(Mexican Hat)를 결정하여 W/Z 보손과 페르미온에 질량을 부여합니다.": "The supersymmetry (SUSY) breaking scale determines the shape of the Higgs potential (Mexican Hat), giving mass to W/Z bosons and fermions.",
        "SUSY 붕괴 스케일 (GeV)": "SUSY Breaking Scale (GeV)",
        "힉스 자가 결합 상수 (λ)": "Higgs Self-Coupling Constant (λ)",
        "우-카이럴 중성미자 시소 메커니즘": "Right-Handed Neutrino Seesaw Mechanism",
        "끈 스케일의 무거운 마조라나 중성미자 질량(M_R)이 표준 모형의 중성미자 질량을 eV 스케일로 극한으로 낮춥니다 (m_ν = m_D² / M_R).": "Heavy Majorana neutrino mass (M_R) at the string scale suppresses standard model neutrino masses down to the eV scale ($m_\\nu = m_D^2 / M_R$).",
        "마조라나 질량 M_R (10^X GeV)": "Majorana Mass M_R ($10^X$ GeV)",
        "디랙 결합 인스턴톤 면적": "Dirac Coupling Instanton Area",
        "🌟 힉스 진공 및 중성미자 질량 유도": "🌟 Spontaneous EWSB & Neutrino Mass Derivation",
        "🪞 거울 대칭 & 위상 끈 이론": "🪞 Mirror Symmetry & Topological String Theory",
        "거울 대칭(Mirror Symmetry)을 이용해 복잡한 A-모델(심플렉틱 기하학)의 양자 보정을 단순한 B-모델(복소 기하학)로 변환하여 그로모프-위튼(Gromov-Witten) 불변량을 계산합니다.": "Use Mirror Symmetry to transform complex quantum corrections of the A-model (symplectic geometry) into the B-model (complex geometry) to calculate Gromov-Witten invariants.",
        "칼라비-야우 다양체 종류 (대수 기하)": "Calabi-Yau Manifold Types (Algebraic Geometry)",
        "투영 공간 $\\mathbb{CP}^{d-1}$ 내의 $d$차 초곡면 다양체 $X_d$를 선택합니다.": "Select a hypersurface manifold $X_d$ of degree $d$ in projective space $\\mathbb{CP}^{d-1}$.",
        "초곡면 차수 (d)": "Hypersurface Degree (d)",
        "피카드-퓩스(Picard-Fuchs) 방정식": "Picard-Fuchs Equation",
        "B-모델의 복소 구조 변형 공간의 주기(Periods)를 결정하는 미분 방정식의 해를 통해, A-모델의 인스턴톤 양자 보정을 복원합니다.": "Reconstruct quantum instanton corrections of the A-model from solutions of differential equations determining periods of B-model complex structure moduli spaces.",
        "복소 구조 모듈러스 (z)": "Complex Structure Modulus (z)",
        "♾️ Gromov-Witten 불변량 자동 계산": "♾️ Automatic Computation of Gromov-Witten Invariants",
        "💎 진폭면체 & 트위스터 공간": "💎 Amplituhedron & Twistor Space",
        "무한히 복잡한 파인만 다이어그램(Feynman Diagrams)을 기하학적 도형인 진폭면체(Amplituhedron)의 부피로 대체하여 $\\mathcal{N}=4$ 초 대칭 양-밀스 이론의 산란 진폭을 완벽하게 계산합니다.": "Replace infinitely complex Feynman Diagrams with the volume of a geometric polytope called the Amplituhedron to solve scattering amplitudes in $\\mathcal{N}=4$ Super Yang-Mills theory.",
        "그라스만 다양체 (Grassmannian $G(k, n)$)": "Grassmannian Manifold ($G(k, n)$)",
        "입자의 개수 $n$과 헬리시티(Helicity) 섹터 $k$를 설정합니다.": "Set the particle count $n$ and helicity sector $k$.",
        "산란 입자 수 (n)": "Number of Scattering Particles (n)",
        "N^k MHV 헬리시티 (k)": "N^k MHV Helicity (k)",
        "루프(Loop) 양자 보정": "Loop Quantum Corrections",
        "루프 차수 $L$을 증가시켜 기하학적 층(layers)의 교차 부피를 계산합니다.": "Increase loop order $L$ to compute intersection volumes of geometric layers.",
        "루프 개수 (L)": "Number of Loops (L)",
        "💠 진폭면체 부피 (Amplitude) 계산": "💠 Calculate Amplituhedron Volume (Amplitude)",
        "🌌 끈 장론 & 타키온 응축": "🌌 String Field Theory & Tachyon Condensation",
        "에드워드 위튼(Edward Witten)이 창시한 개방 끈 장론(Open String Field Theory)을 통해 타키온 응축(Tachyon Condensation)과 센의 추측(Sen's Conjecture)을 물리적으로 계산합니다.": "Physically calculate Tachyon Condensation and Sen's Conjecture using Open String Field Theory formulated by Edward Witten.",
        "타키온 진공 상태 매개변수": "Tachyon Vacuum Parameters",
        "끈 장(String Field) $\\Phi$의 상태를 조정합니다.": "Adjust the state of the String Field $\\Phi$.",
        "오픈 스트링 결합 상수 ($g_o$)": "Open String Coupling Constant ($g_o$)",
        "두 개의 끈이 별(Star) 곱을 통해 세 번째 끈으로 합쳐지는 3차 상호작용 $S = \\int (\\frac{1}{2}\\Phi * Q\\Phi + \\frac{1}{3}\\Phi * \\Phi * \\Phi)$의 스칼라 포텐셜을 계산합니다.": "Calculate the scalar potential of the cubic interaction $S = \\int (\\frac{1}{2}\\Phi * Q\\Phi + \\frac{1}{3}\\Phi * \\Phi * \\Phi)$ where strings merge via star product.",
        "📉 D-막 장력 상쇄 (Sen's Conjecture) 연산": "📉 Compute D-brane Tension Cancellation (Sen's Conjecture)",
        "🕳️ 페이지 곡선 & 양자 극값 표면": "🕳️ Page Curve & Quantum Extremal Surfaces",
        "호킹의 블랙홀 정보 역설(Information Paradox)을 해결한 2019년의 기념비적 발견인": "Calculate the holographic Page curve using the monumentally discovered",
        "과": "and",
        "을 연산합니다.": "mechanisms to resolve Hawking's black hole information paradox.",
        "증발하는 블랙홀 매개변수": "Evaporating Black Hole Parameters",
        "블랙홀의 증발 시간(Time)과 엔트로피를 조절합니다.": "Adjust evaporation progress time and black hole entropy.",
        "미세 조정된 얽힘 엔트로피(Fine-grained Entanglement Entropy)를 QES(Quantum Extremal Surface)를 통과하여 계산합니다.": "Calculate fine-grained entanglement entropy passing through the Quantum Extremal Surface (QES).",
        "📉 호킹 방사 얽힘 엔트로피 연산": "📉 Calculate Hawking Radiation Entanglement Entropy",
        "🌀 위상 끈 이론 & OSV 추측": "🌀 Topological String Theory & OSV Conjecture",
        "우구리-스트로민저-바파(Ooguri-Strominger-Vafa, OSV) 추측을 통해 거시적인 BPS 블랙홀의 엔트로피가 미시적인 위상 끈(Topological String)의 분배 함수와 정확히 일치함을 연산합니다.": "Calculate how statistical microstates of topological strings match Bekenstein-Hawking entropy of macroscopic BPS black holes via the Ooguri-Strominger-Vafa (OSV) relation.",
        "위상 끈 블랙홀 매개변수": "Topological String Black Hole Parameters",
        "블랙홀의 자명한 자기 전하(Magnetic Charge) $p$와 전기 전하(Electric Charge) $q_0$를 설정합니다.": "Set magnetic charge $p$ and electric charge $q_0$ of the black hole.",
        "OSV 추측 (OSV Conjecture)": "OSV Conjecture",
        "거시적 블랙홀의 분배 함수는 미시적 위상 끈 분배 함수의 절대값 제곱과 같습니다.": "The partition function of the macroscopic black hole equals the absolute square of the microscopic topological string partition function.",
        "📉 미시-거시 엔트로피 일치성 검증": "📉 Verify Micro-Macro Entropy Correspondence",
        "🧲 사이버그-위튼 & 자기 홀극": "🧲 Seiberg-Witten Theory & Magnetic Monopoles",
        "$\\mathcal{N}=2$ 초거대칭 양자색역학(SQCD)의 저에너지 유효 작용을 지배하는 사이버그-위튼 곡선(Seiberg-Witten Curve)의 모듈라이 공간을 연산합니다.": "Calculate the moduli space of the Seiberg-Witten Curve governing low-energy effective actions of $\\mathcal{N}=2$ supersymmetric QCD (SQCD).",
        "진공 기댓값 매개변수 ($u$)": "Vacuum Expectation Value Parameter ($u$)",
        "📉 BPS 질량 연산": "📉 Calculate BPS Mass",
        "🧬 K-이론 & D-막 전하": "🧬 K-Theory & D-brane Charges",
        "D-막의 전하(RR Charge)가 단순한 코호몰로지(Cohomology) 군이 아닌 위상 K-이론(Topological K-Theory)에 의해 분류됨을 연산합니다.": "Calculate the classification of D-brane RR charges using topological K-theory rather than standard cohomology groups.",
        "다양체 차원 ($d$)": "Manifold Dimension ($d$)",
        "K-이론 분류 기호 (Atiyah-Hirzebruch)": "K-Theory Classification (Atiyah-Hirzebruch)",
        "📉 D-막 전하 분류 (K-Group) 연산": "📉 Classify D-brane Charges (K-Group)",
        "🔥 F-이론 & 특이점": "🔥 F-Theory & Singularities",
        "Type IIB 끈 이론의 액시온-딜라톤($\\tau$)을 2차원 원환면(Torus)의 복소 구조 매개변수로 승격시킨 12차원 F-이론을 연산합니다.": "Solve the 12D F-theory which geometrizes the Axion-Dilaton ($\\tau$) of Type IIB superstring theory into complex structure moduli of a torus.",
        "복소 매개변수 $f$": "Complex Parameter $f$",
        "복소 매개변수 $g$": "Complex Parameter $g$",
        "📉 게이지 대칭성 (ADE 분류) 연산": "📉 Solve Gauge Symmetry (ADE Classification)",
        "⬛ 행렬 모델 (Matrix Theory)": "⬛ Matrix Models (M-Theory)",
        "무한 차원 비가환 행렬(Non-commutative Matrix)의 고유값(Eigenvalue)으로부터 연속적인 시공간 차원과 중력이 창발하는 현상을 묘사합니다.": "Describe how continuous spacetime dimensions and gravity emerge from eigenvalues of infinite-dimensional non-commutative matrices.",
        "행렬 랭크 ($N$)": "Matrix Rank ($N$)",
        "BFSS 행렬 작용 (BFSS Action)": "BFSS Matrix Action (BFSS Action)",
        "📉 비가환 시공간 기하 연산": "📉 Compute Non-commutative Spacetime Geometry",
        "🕸️ 텐서 네트워크 & 홀로그래피": "🕸️ Tensor Networks & Holography",
        "MERA / HaPPY 코드를 통해 양자 얽힘(Quantum Entanglement)의 텐서 네트워크가 어떻게 거시적인 AdS 벌크 기하학(Bulk Geometry)을 형성하는지 묘사합니다.": "Describe how quantum entanglement tensor networks (MERA/HaPPY) form macroscopic AdS bulk geometry via the holographic principle.",
        "📉 양자 오류 수정 (QEC) 복원 연산": "📉 Restore Quantum Error Correction (QEC)",
        "🧮 비가환 기하학 & 모얄 곱": "🧮 Non-commutative Geometry & Moyal Product",
        "시공간 좌표 연산자가 교환하지 않는 비가환 공간 \\([X^\\mu, X^\\nu] = i \\theta^{\\mu\\nu}\\) 상에서 정의되는 스트링 월드시트와 스타 곱(Star Product) 물리적 결합을 모사합니다.": "Simulate string worldsheet dynamics and star product coupling defined on non-commutative spaces where coordinates do not commute: $[X^\\mu, X^\\nu] = i\\theta^{\\mu\\nu}$.",
        "Moyal-Weyl 스타 곱 공식 (Star Product)": "Moyal-Weyl Star Product Formula (Star Product)",
        "📉 모얄 곱 & 스타 가교 연산": "📉 Compute Moyal Star Product",
        "🌀 천-사이먼스 & 위상 양자 장론": "🌀 Chern-Simons & Topological Quantum Field Theory",
        "3차원 시공간에서 정의되는 등각장론 쌍대성과 매듭 기하 불변량을 계산하는 천-사이먼스(Chern-Simons TQFT) 이론의 작용소를 시뮬레이션합니다.": "Simulate operators of 3D Chern-Simons TQFT to compute knot invariants and dual 2D conformal field theories.",
        "게이지 군 랭크 ($SU(N)$)": "Gauge Group Rank ($SU(N)$)",
        "Chern-Simons 레벨 ($k$)": "Chern-Simons Level ($k$)",
        "Chern-Simons 작용식 (Action)": "Chern-Simons Action",
        "📉 위상 기하 불변량 (Jones Polynomial) 연산": "📉 Compute Topological Knot Invariant (Jones Polynomial)",
        "🌠 천구 홀로그래피 & 평평한 시공간": "🌠 Celestial Holography & Flat Spacetime",
        "4차원 민코프스키(Minkowski) 평평한 시공간에서의 끈 산란 진폭을 2차원 천구 상의 등각장론 상관함수로 변환(Mellin Transform)하는 천구 홀로그래피(Celestial Holography)를 탐색합니다.": "Explore Celestial Holography which maps 4D flat Minkowski scattering amplitudes to 2D celestial conformal field theory (CFT) correlation functions via Mellin transforms.",
        "멜린 스케일링 차원 & 중력 상수": "Mellin Scaling Dimension & Gravity Constant",
        "중력 결합 상수 ($G_N$)": "Gravitational Coupling Constant ($G_N$)",
        "📉 천구 산란 기하학 연산": "📉 Compute Celestial Scattering Geometry",
        "🧬 일반화 복소 기하학 & 코란트": "🧬 Generalized Complex Geometry & Courant Algebroids",
        "탄젠트 다발과 코탄젠트 다발의 직합 $T \\oplus T^*$ 상에서 규정되는 코란트 괄호(Courant Bracket) 및 Hitchin 복소 구조 변형을 계산합니다.": "Calculate Courant brackets and Hitchin complex structure deformations defined on the direct sum of tangent and cotangent bundles $T \\oplus T^*$.",
        "3-form Flux & 켈러 모듈러스": "3-form Flux & Kähler Moduli",
        "NS-NS 3-form 플럭스 ($H_3$)": "NS-NS 3-form Flux ($H_3$)",
        "켈러 부피 크기 ($t$)": "Kähler Volume Size ($t$)",
        "H-twist 코란트 괄호 (Courant Bracket)": "H-twisted Courant Bracket",
        "📉 코란트 괄호식 & 거울 구조 결합 연산": "📉 Compute Courant Bracket & Mirror Map",
        "🕸️ 루프 양자 중력 vs 초끈 이론": "🕸️ Loop Quantum Gravity vs Superstrings",
        "시공간의 불연속적인 격자망(스핀 네트워크)을 다루는 루프 양자 중력(LQG)의 면적 연산자 고유값 및 홀로그래픽 엔트로피 바운드 일치성을 검증합니다.": "Verify area operator eigenvalues and holographic entropy bounds in Loop Quantum Gravity (LQG) which treats spacetime as discrete spin networks.",
        "이미르지 매개변수 & 스핀 고유값": "Immirzi Parameter & Spin Eigenvalues",
        "Barbero-Immirzi 상수 ($\\gamma$)": "Barbero-Immirzi Constant ($\\gamma$)",
        "네트워크 스핀 양자수 ($j$)": "Network Spin Quantum Number ($j$)",
        "LQG 이산 면적 연산자 (Area Operator)": "LQG Discrete Area Operator",
        "📉 시공간 이산성 및 면적 연산자 고유값 연산": "📉 Solve Discrete Spacetime Area Eigenvalues",
        "🌀 비기하적 플럭스 & T-폴드": "🌀 Non-geometric Fluxes & T-folds",
        "Transition 함수가 O(d,d) T-duality 변환을 거쳐 결합되는 T-폴드 시공간과 비결합적 구조를 지닌 locally/globally non-geometric R-flux 물리를 솔빙합니다.": "Solve non-associative algebras and monodromies of T-folds where transition functions are glued by $O(d,d)$ T-duality, generating non-geometric $Q$/$R$-fluxes.",
        "비기하 R-플럭스 & 감김 양자수": "Non-geometric R-flux & Winding Quantums",
        "R-플럭스 강도 ($R$)": "R-flux Intensity ($R$)",
        "T-이중 감김수 ($w$)": "T-Duality Winding Number ($w$)",
        "📉 비기하적 모노드로미 연산": "📉 Solve Non-geometric Monodromy",
        "📐 등각 부트스트랩 & 교차 대칭": "📐 Conformal Bootstrap & Crossing Symmetry",
        "등각장론(CFT)의 유니터리성(Unitarity)과 교차 대칭성(Crossing Symmetry)을 기저로 삼아, 수치적인 고정점 경계를 연산하고 스케일링 차원을 한정합니다.": "Determine boundaries of CFT state spaces by imposing crossing symmetry and unitarity conditions without referencing Lagrangian descriptions.",
        "외부 장 차원 & 교환 스핀 양자수": "External Field Dimension & Exchange Spin",
        "수치적 4-point 교차 관계식 (Crossing)": "Numerical 4-point Crossing Equation",
        "📉 등각 수치적 고정점 경계 연산": "📉 Compute Conformal Bootstrap Bounds",
        "🔗 비가환 이중성 & 가적 변형": "🔗 Non-abelian Duality & Integrable Deformations",
        "비가환 등거리군 상의 Buscher 공식 NATD 및 고전적 적분가능성을 만족하는 Yang-Baxter $\\eta$-변형 끈 시그마 모델을 시뮬레이션합니다.": "Simulate Non-Abelian T-Duality (NATD) Buscher rules and classical integrability in Yang-Baxter $\\eta$-deformed string sigma models.",
        "변형 상수 & 군 다양체 부피": "Deformation Parameter & Group Manifold Volume",
        "군 다양체 부피 인자 ($V_G$)": "Group Manifold Volume Factor ($V_G$)",
        "NATD Lagrange 승수 작용식 (Action)": "NATD Lagrange Multiplier Action",
        "📉 양-백스터 비가환 쌍대 기하 연산": "📉 Solve Yang-Baxter Dual Geometry",
        "📈 리서전스 & Picard-Lefschetz": "📈 Resurgence Theory & Picard-Lefschetz",
        "섭동 급수의 asymptotic 발산 항들을 Borel 적분하고, Picard-Lefschetz 복소 안장점(instanton) 보정을 더해 완전하고 정확한 비섭동적 물리 값을 도출합니다.": "Borel-sum asymptotically divergent perturbative series and include complex instanton saddle-point corrections via Picard-Lefschetz theory to reconstruct exact non-perturbative physical values.",
        "최대 루프 오더 & 게이지 결합 상수": "Max Loop Order & Gauge Coupling",
        "섭동 절단 차수 ($N$)": "Perturbative Truncation Order ($N$)",
        "결합 상수 ($g^2$)": "Coupling Constant ($g^2$)",
        "Picard-Lefschetz Transseries 공식": "Picard-Lefschetz Transseries Formula",
        "📉 보렐 변환 및 안장점 기하 연산": "📉 Compute Borel Resummation & Instantons",
        "🔢 p-진수 초끈 & 아델릭 통합": "🔢 p-Adic Strings & Adelic Integration",
        "세계면 좌표를 p-진수(p-adic numbers $\\mathbb{Q}_p$)로 모델링하여 Freund-Olson tree 산란 진폭을 계산하고, 이들이 아델릭 곱 공식을 통해 실수 진폭으로 어떻게 통합되는지 봅니다.": "Model the string worldsheet over p-adic fields $\\mathbb{Q}_p$ to solve Freund-Olson tree amplitudes and verify their adelic product integration with real-sheet amplitudes.",
        "p-adic 소수 양자수 & 초끈 텐션": "p-Adic Prime & String Tension",
        "p-진수 소수 ($p$)": "p-Adic Prime ($p$)",
        "📉 p-진수 프뢰인트-올슨 산란 연산": "📉 Compute p-Adic Freund-Olson Amplitude",
        "🪞 목 모듈러 & 마티유 달빛": "🪞 Mock Modular Forms & Mathieu Moonshine",
        "K3 다양체 타원 단면 지수(Elliptic Genus)와 마티유 산재군 $M_{24}$ 표현론 간의 수수께끼와 같은 Moonshine 관계, 그리고 라마누잔의 목 세타 함수(Mock Theta Functions) 수렴 거동을 분석합니다.": "Analyze mock theta functions and Mathieu Moonshine which connects elliptic genus coefficients of K3 surfaces with dimensions of Mathieu group $M_{24}$ representations.",
        "마티유 환원 인자 & 복소 특이점": "Mathieu Reduction Factor & Complex Singularities",
        "M24 표현 차원 프리셋 ($d_{M24}$)": "M24 Rep Dimension Preset ($d_{M24}$)",
        "복소 열역학 파라미터 ($q$)": "Complex Parameter ($q$)",
        "K3 타원 지수 분해 공식": "K3 Elliptic Genus Decomposition Formula",
        "📉 마티유 가중 단면 지수 연산": "📉 Calculate Mathieu Moonshine Index",
        "🌀 캐롤 시공간 & 평탄 홀로그래피": "🌀 Carrollian Spacetime & Flat Holography",
        "광속이 극한으로 0에 수렴하는 비상대론의 쌍대 극한 공간인 캐롤(Carrollian) 다발 기하와, 4차원 평탄 Minkowski 시공간 산란 진폭을 통제하는 무한차원 Asymptotic BMS 대칭 전하를 해석합니다.": "Analyze Carrollian geometry ($c \\to 0$) and its infinite-dimensional asymptotic BMS symmetries controlling flat Minkowski holography.",
        "광속 극한비 & BMS 변환 매개변수": "Speed of Light Limit & BMS Parameters",
        "광속 한계 수렴값 ($c$)": "Speed of Light Convergence ($c$)",
        "BMS 초평행 이동전하 ($T$)": "BMS Supertranslation Charge ($T$)",
        "캐롤 메트릭 붕괴 한계": "Carrollian Metric Collapse Limit",
        "📉 캐롤 초전하 수렴 벡터 연산": "📉 Compute Carrollian Supercharge Vector",
        "⛓️ 비가역 대칭성 & 위상 결함": "⛓️ Non-Invertible Symmetries & Topological Defects",
        "군의 구조를 넘어서는 융합 범주론(Fusion Category)으로 묘사되는 고차 비가역(Non-invertible) global 대칭성과 이로 인한 위상 대칭 결함선(TDL) 간의 중력 변칙(Anomaly) 상쇄 기하학을 연산합니다.": "Solve anomaly cancellation of topological defect lines (TDLs) forming high-order non-invertible global symmetries described by fusion categories.",
        "결함선 차원 & 격자 융합수": "Defect Line Dimensions & Fusion Weights",
        "위상 결함선 양자수 ($p$)": "Topological Defect Line Quantum ($p$)",
        "비가역 결함 대칭성 융합식": "Non-Invertible Defect Fusion Relation",
        "📉 비가역 위상 결함 융합 구조 연산": "📉 Compute Non-Invertible Defect Fusion",
        "🌌 경계 끈 장론 & 타키온 응축": "🌌 Boundary SFT & Tachyon Condensation",
        "개방 끈 월드시트의 경계 작용(Boundary Action) 상의 재규격화군(RG) 흐름을 도출하여 D-막이 타키온 응축을 거쳐 Sen의 진공으로 붕괴하고 장력이 완전히 사멸하는 단계를 솔빙합니다.": "Track Boundary String Field Theory (BSFT) renormalization group (RG) flows on worldsheet boundaries to solve unstable D-brane decays to Sen's vacuum.",
        "타키온 진공 진동폭 & RG 스케일": "Tachyon VEV Amplitude & RG Scale",
        "타키온 평균 질량 장폭 ($T$)": "Tachyon Average Mass Amplitude ($T$)",
        "경계 RG 에너지 척도 ($t$)": "Boundary RG Energy Scale ($t$)",
        "개방 끈 타키온 센(Sen) 포텐셜": "Open String Tachyon Sen Potential",
        "📉 타키온 붕괴 임계 질량 연산": "📉 Compute Tachyon Decay Critical Mass",
        "🧬 프리드-위튼 변칙 & K-이론적 장애": "🧬 Freed-Witten Anomaly & K-Theory Obstruction",
        "3-form H-flux가 있는 공간에서 D-막이 감길 때, 월드시트 스핀 구조에 가해지는 topological obstruction인 Freed-Witten anomaly 조건을 규명하고 K-이론 전하 보존도를 산출합니다.": "Determine the Freed-Witten anomaly topological obstruction $W_3 + [H]|_{\\Sigma} \\neq 0$ on D-branes wrapping cycles in manifolds with 3-form H-flux, computing K-theoretic charges.",
        "H-플럭스 3-form 대수 & 스티펠-위트니 지표": "H-flux 3-form & Stiefel-Whitney Class",
        "H-플럭스 결합 정수하 ($k$)": "H-flux Integer ($k$)",
        "Stiefel-Whitney 특성류 위상차 ($W_3$)": "Stiefel-Whitney Class ($W_3$)",
        "프리드-위튼 변칙 상쇄 등식": "Freed-Witten Anomaly Cancellation Equation",
        "📉 프리드-위튼 위상 기하성 상쇄 연산": "📉 Compute Freed-Witten Anomaly Cancellation",
        "📚 이론적 핵심 요약 (Theory Digest)": "📚 Theory Digest",
        "🎻 초끈 진동 시뮬레이터 (String Vibration Simulator)": "🎻 String Vibration Simulator",
        "소립자 프리셋 (Particle Preset):": "Particle Preset:",
        "광자 (Photon) - NS N=1/2 (Massless Vector)": "Photon - NS N=1/2 (Massless Vector)",
        "열린 끈 고진동 상태 (Heavy Boson) - NS N=3/2": "Heavy Boson - NS N=3/2",
        "타키온 (Tachyon) - NS N=0 (Unstable)": "Tachyon - NS N=0 (Unstable)",
        "중력자 (Graviton) - NS-NS N_L=1/2, N_R=1/2": "Graviton - NS-NS N_L=1/2, N_R=1/2",
        "딜라톤 (Dilaton) - NS-NS Pulsating": "Dilaton - NS-NS Pulsating",
        "KK 모멘텀 진동 (Kaluza-Klein Mode)": "Kaluza-Klein Mode",
        "Winding 회전 감김 (Winding Mode)": "Winding Mode",
        "이론상 질량 제곱 (M²)": "Theoretical Mass Squared (M²)",
        "닫힌 끈의 가진 진동(NS-NS sector): 2개의 진행파가 합성되어 중력자 상태의 중력 텐서 요동을 묘사합니다.": "Vibrating Closed String (NS-NS sector): Two counter-propagating waves superpose to model graviton tensor fluctuations.",
        "🔄 이중성 관계 (Duality Relations)": "🔄 Duality Relations",
        "🧮 대입 계산기 & 솔버 (Physics Solvers)": "🧮 Physics Solvers",
        "💡 끈 가진 스펙트럼 계산기": "💡 String Excitation Spectrum Calculator",
        "장력 계수 (α')": "Tension Coefficient (α')",
        "끈 종류": "String Type",
        "좌진동 N_L": "Left Oscillation N_L",
        "우진동 N_R": "Right Oscillation N_R",
        "진동수 N": "Oscillation Number N",
        "NS 섹터 (a=1/2)": "NS Sector (a=1/2)",
        "R 섹터 (a=0)": "R Sector (a=0)",
        "질량 계산 대기 중...": "Waiting for mass calculation...",
        "🌀 원주 압축화 & T-이중성 계산기": "🌀 Circular Compactification & T-Duality Calculator",
        "압축화 반경 R (l_s)": "Compactification Radius R (l_s)",
        "KK 운동량 (n)": "KK Momentum (n)",
        "감김 수 (w)": "Winding Number (w)",
        "계산 중...": "Calculating...",
        "T-이중성 반경 R' = 0.50 l_s": "T-Duality Radius R' = 0.50 l_s",
        "🕸️ 칼라비-야우 다양체 세대 설계기": "🕸️ Calabi-Yau Manifold Generation Designer",
        "초차원 압축화를 통해 4차원에서 탄생할 표준모형의 페르미온 '세대 수'를 구합니다.": "Find the number of fermion families (generations) arising in 4D via extra-dimensional compactification.",
        "Kähler 모듈리 (h¹,¹)": "Kähler Moduli (h¹,¹)",
        "복소 구조 모듈리 (h²,¹)": "Complex Structure Moduli (h²,¹)",
        "📊 합성된 4차원 소립자 특성": "📊 Characteristics of Synthesized 4D Particle",
        "GSO 통과": "GSO Passed",
        "질량 제곱 M²": "Mass Squared M²",
        "물리적 질량": "Physical Mass",
        "소립자 스핀": "Particle Spin",
        "안정성 여부": "Stability Status",
        "입자 설명 및 게이지 대칭 표현:": "Particle Description & Gauge Representation:",
        "중력자 상태...": "Graviton state...",
        "🕸️ 칼라비-야우 게이지 대칭 대수 분해 트리": "🕸️ Calabi-Yau Gauge Symmetry Algebraic Decomposition Tree",
        "E8 대칭성이 세계면에 임베딩되어 표준모형의 게이지 대칭 및 대수적 페르미온 표현으로 깨지는 경로입니다.": "The symmetry breaking path of E8 embedded on the worldsheet down to the Standard Model gauge groups and algebraic fermion representations.",
        "s-채널 질량 극점(Poles)에서 극대화되는 4-point open string 트리 레벨 산란 진폭 |A(s,t)|² 분포 곡선입니다.": "4-point tree-level open string scattering amplitude $|A(s,t)|^2$ displaying poles at s-channel mass resonances.",
        "진폭 계산 중...": "Computing amplitude...",
        "게이지-중력 결합 홀로그래픽 통합": "Holographic Integration of Gauge-Gravity Coupling",
        "초끈 장력 및 여분 차원 기하로부터 4차원 초대칭 양-밀스 게이지 장의 g_YM 강도와 중력 상수 G_N의 상대적 비율을 유도합니다.": "Derive the relative ratio of the 4D Yang-Mills coupling $g_{YM}$ and gravitational constant $G_N$ from superstring tension and extra-dimensional volumes.",
        "게이지 결합 g_YM": "Gauge Coupling $g_{YM}$",
        "중력 상수 G_N": "Gravitational Constant $G_N$",
        "D3-brane 위의 YM 이론...": "Yang-Mills theory on D3-branes...",
        "Strominger-Vafa 엔트로피 일치 검증": "Strominger-Vafa Entropy Duality Verification",
        "D-브레인 미시상태 계수 계량($S_{\\text{micro}}$)과 5차원 아인슈타인 수중력 시공간 면적($S_{\\text{macro}}$)의 완벽한 상등(Duality)을 실시간 검증합니다.": "Real-time verification of exact match between statistical D-brane microstates ($S_{\\text{micro}}$) and 5D Einstein-Maxwell supergravity black hole horizon area ($S_{\\text{macro}}$).",
        "미시 상태 엔트로피 S_micro": "Microstate Entropy $S_{\\text{micro}}$",
        "시공간 면적 엔트로피 S_macro": "Spacetime Area Entropy $S_{\\text{macro}}$",
        "호킹 온도 (Hawking Temp):": "Hawking Temperature:",
        "블랙홀 BPS 질량:": "Black Hole BPS Mass:",
        "일치성 평가 중...": "Evaluating match...",
        "AdS/CFT Boundary-Bulk 사전 (Dictionary)": "AdS/CFT Boundary-Bulk Dictionary",
        "4차원 게이지 대칭성과 5차원 중력 시공간의 이중 대칭성 분류 및 대수적 매핑 사전입니다.": "Dictionary mapping 4D boundary gauge symmetries to 5D bulk gravitational fields.",
        "t' Hooft 결합 계수 (λ)": "t' Hooft Coupling (λ)",
        "AdS 곡률 반경 (R_ads)": "AdS Curvature Radius (R_ads)",
        "점성-엔트로피비 KSS Bound (η / s)": "Viscosity-to-Entropy Ratio KSS Bound (η/s)",
        "대표 연산자 이중성 매핑:": "Representative Operator Duality Mapping:",
        "우주끈 Cusp와 Kink의 고주파 충격파가 생성하는 중력파 진폭 h(f) 스펙트럼 곡선입니다. f⁻¹/³ 감소 특성을 보입니다.": "Gravitational wave amplitude spectrum $h(f)$ generated by cosmic string cusps and kinks, showing $f^{-1/3}$ fall-off behavior.",
        "중력파 스펙트럼 로딩 중...": "Loading gravitational wave spectrum...",
        "CMB 급팽창 관측 데이터 비교": "CMB Inflation Observation Comparison",
        "KKLT 끈 급팽창 모델의 4차원 유효 예측치들을 최신 Planck 2018 CMB 고해상도 우주 배경 복사 관측 한계들과 대조합니다.": "Compare 4D effective predictions of the KKLT string inflation model against Planck 2018 CMB observations.",
        "스펙트럼 지수 (n_s)": "Spectral Index ($n_s$)",
        "텐서-스칼라 비 (r)": "Tensor-to-Scalar Ratio ($r$)",
        "Planck spectral index 매칭 (Target: 0.961 - 0.969)": "Planck spectral index match (Target: 0.961 - 0.969)",
        "5대 초끈 이론과 11차원 M-이론을 연결하는 강결합/약결합(S) 및 공간반경(T) 이중성 거미줄 맵입니다. 중심점은 비섭동 11D M-이론 차원을 나타냅니다.": "The duality web mapping 5 superstring theories and 11D M-theory under strong/weak coupling (S) and compactification radius (T) limits. Center represents the 11D M-theory dimension.",
        "이중성 웹 로딩 중...": "Loading duality web...",
        "행렬 비가환성 $[X_i, X_j] \\neq 0$에 의해 11차원 속 양자 거품 공간에서 부풀어 올라 동적으로 안정화되는 Fuzzy Sphere 막의 물리량입니다.": "Physical properties of the stabilized fuzzy membrane expanding in 11D space due to non-commutativity $[X_i, X_j] \\neq 0$.",
        "행렬 대수 차원 (N)": "Matrix Dimension (N)",
        "Fuzzy 막 반경 (R_fuzzy)": "Fuzzy Membrane Radius ($R_{\\text{fuzzy}}$)",
        "Matrix 상호작용 에너지 (E)": "Matrix Interaction Energy (E)",
        "11D M-이론 차원 반경 (R₁)₁": "11D M-theory Circle Radius ($R_{11}$)",
        "11D M-이론 차원 반경 (R₁)": "11D M-theory Circle Radius ($R_{11}$)",
        "11D M-이론 차원 반경 (R₁₁)": "11D M-theory Circle Radius ($R_{11}$)",
        "칼라비-야우 체적을 조절하는 Kähler Modulus T의 잠재 에너지 V(T) 곡선입니다. 극솟값에서 모듈러스 필드가 고정되며 중력파 붕괴 늪지대로부터 탈출합니다.": "Potential energy $V(T)$ curve of the Kähler modulus $T$ governing Calabi-Yau volumes. Moduli are stabilized at the local minimum, escaping the swampland.",
        "모듈러스 잠재력 로딩 중...": "Loading moduli potential...",
        "모듈러스 거리 추측(SDC)의 장거리 한계 및 약중력 추측(WGC) 질량비를 평가하여 진공의 물리적 실존성을 진단합니다.": "Assess validity of the low-energy effective field theory by evaluating the Swampland Distance Conjecture (SDC) and the Weak Gravity Conjecture (WGC).",
        "양자중력 일치성 평가 결과:": "Quantum Gravity Consistency Check:",
        "KK 타워 상태 질량 (M_tower)": "KK Tower State Mass ($M_{\\text{tower}}$)",
        "테스트 전하/질량비 (q/m)": "Test Charge-to-Mass Ratio ($q/m$)",
        "📊 표준 모형 페르미온 스펙트럼": "📊 Standard Model Fermion Spectrum",
        "최종 통합 대칭군:": "Final Unified Group:",
        "표준 모형 게이지 대칭 로딩 중...": "Loading Standard Model gauge symmetries...",
        "초끈의 D-막 교차 거리로부터 유도된 페르미온 질량입니다. 1세대(e, u, d)에서 3세대(τ, t, b)로 갈수록 인스턴톤 억제 거리가 감소해 질량이 지수함수적으로 무거워집니다.": "Fermion masses derived from intersecting D-brane angles. Mass grows exponentially across generations (1st: e, u, d to 3rd: τ, t, b) due to instanton suppression factors.",
        "유카와 결합도 & CKM 혼합 매트릭스": "Yukawa Couplings & CKM Mixing Matrix",
        "📊 우주 물리 무결성 진단서 (Diagnostics Checklist)": "📊 Spacetime Anomaly & Physical Diagnostics Checklist",
        "Virasoro 대수 연산 결과 (Worldsheet Commutator)": "Virasoro Algebra Output (Worldsheet Commutator)",
        "임계 차원에 근거한 유효 중앙 전하 $c$를 추적하여 양자 교환자의 고스트 항 및 변칙 상쇄를 분석한 결과입니다.": "Trace the total central charge $c$ based on critical spacetime dimensions to check ghost-state cancellation and Weyl anomalies in the Virasoro commutator.",
        "📊 힉스 진공 기댓값 및 중성미자 스펙트럼": "📊 Higgs VEV & Neutrino Mass Spectrum",
        "퍼텐셜 상태": "Higgs Potential State",
        "대기 중...": "Waiting...",
        "물리적 힉스 질량 (m_H)": "Physical Higgs Mass ($m_H$)",
        "μ² 파라미터": "$\\mu^2$ Parameter",
        "가벼운 중성미자 1": "Light Neutrino $m_1$",
        "질량": "Mass",
        "가벼운 중성미자 2": "Light Neutrino $m_2$",
        "가벼운 중성미자 3": "Light Neutrino $m_3$",
        "태양 진동 (Δm²_21)": "Solar Oscillation ($\\Delta m^2_{21}$)",
        "대기 진동 (Δm²_32)": "Atmospheric Oscillation ($\\Delta m^2_{32}$)",
        "PMNS 혼합 행렬 각도 (근사)": "PMNS Mixing Angles (approx.)",
        "📊 거울 대칭 연산 결과 (Mirror Map & Invariants)": "📊 Mirror Symmetry Calculations & Invariants",
        "A-모델 (원래 다양체 X) 호지 수": "A-Model Hodge Numbers $h^{p,q}(X)$",
        "B-모델 (거울 다양체 Y) 호지 수": "B-Model Hodge Numbers $h^{p,q}(Y)$",
        "거울 대칭에 의해 심플렉틱 구조(Kähler)와 복소 구조가 완벽하게 뒤바뀝니다. χ(X) = -χ(Y).": "Symplectic structure (Kähler moduli) and complex structure moduli are swapped under Mirror Symmetry. $\\chi(X) = -\\chi(Y)$.",
        "Gromov-Witten 인스턴톤 수 (n_d)": "Gromov-Witten Instanton Numbers ($n_d$)",
        "B-모델의 궤적 적분(Period integrals)을 통해 A-모델의 양자적 끈 궤적(Rational curves)의 개수를 정확히 세어냅니다.": "Solve the count of rational curves on the A-model from period integrals of the B-model.",
        "의미": "Physical Significance",
        "직선(Lines)의 개수": "Number of Lines ($n_1$)",
        "이차 곡선(Conics)의 개수": "Number of Conics ($n_2$)",
        "삼차 곡선(Cubics)의 개수": "Number of Cubics ($n_3$)",
        "사차 곡선의 개수": "Number of Quartics ($n_4$)",
        "💎 진폭면체 부피 렌더링 & 산란 진폭": "💎 Amplituhedron Volume & Scattering Amplitude",
        "트위스터 기하학 연산 결과": "Twistor Geometry Calculations",
        "산란 진폭은 트위스터 공간 내 다면체 구조인 진폭면체(Amplituhedron)의 정준 미분형식(Canonical Form) 적분으로 정확히 계산됩니다.": "Scattering amplitudes are calculated exactly as the canonical differential form volume of the Amplituhedron in momentum twistor space.",
        "BCFW 재귀 관계를 넘어선 기하학적 체적(Volume) 기반의 수치 계산입니다.": "Polytope volume calculations representing scattering processes, bypassing Feynman diagrams.",
        "생략된 파인만 다이어그램 개수": "Bypassed Feynman Diagrams",
        "수백만 개 -> 단 1개의 기하학!": "Millions of diagrams -> Only 1 polytope!",
        "🌌 센의 타키온 응축 (Sen's Tachyon Condensation)": "🌌 Sen's Tachyon Condensation",
        "타키온 포텐셜 에너지": "Tachyon Potential Energy $V(T)$",
        "타키온 장 $T$의 붕괴에 따른 포텐셜 깊이 $V(T)$를 시각화합니다.": "Visualize the tachyon potential depth $V(T)$ during unstable D-brane decay.",
        "D-막 장력 상쇄 (Exact Cancellation)": "D-brane Tension Cancellation (Exact)",
        "타키온 진공 에너지 밀도가 정확히 D-막의 장력 $\\tau_p$를 상쇄하여, 닫힌 끈의 순수한 진공 상태로 되돌아가는지 확인합니다.": "Verify if the tachyon vacuum energy density exactly cancels the D-brane tension $\\tau_p$, leaving only the closed string vacuum.",
        "99.99% 일치": "99.99% Match",
        "🕳️ 정보 역설의 기하학적 해결": "🕳️ Geometric Solution to Information Paradox",
        "초기에는 호킹 방사(Hawking Radiation)의 엔트로피가 블랙홀의 엔트로피를 초과하는 역설이 발생하지만, 페이지 시간(Page Time) 이후 복제 웜홀(Replica Wormhole) 안장점(Saddle Point)이 주도하면서 엔트로피가 다시 감소하여 0으로 수렴합니다.": " Hawking's calculation initially leads to an information paradox (unbounded entropy), but after the Page Time, replica wormhole saddle points dominate, causing entropy to follow the unitary Page curve back to zero.",
        "증발 중반(Page Time) 이후, 섬(Island) $I$가 호킹 방사와 얽히게 되며 새로운 시공간 위상(Topology)이 경로 적분에서 지배적인 기여를 합니다.": "After the Page Time, a quantum island region emerges inside the black hole, altering the entanglement entropy calculation via replica wormholes.",
        "No Island (섬 없음)": "No Island",
        "🌀 OSV 미시-거시 엔트로피 일치 증명": "🌀 OSV Micro-Macro Entropy Correspondence",
        "엔트로피 상응(Entropy Matching) 연산": "Entropy Matching Calculations",
        "BPS 블랙홀의 베켄슈타인-호킹 엔트로피와 미시적 위상 끈 상태들의 통계적 엔트로피가 극도로 정확하게 일치함을 증명합니다.": "Verify if statistical microstates computed from topological strings match Bekenstein-Hawking black hole entropy.",
        "양자 중력과 위상수학의 통합": "Unification of Quantum Gravity & Topology",
        "OSV 공식은 M-이론의 블랙홀 양자 상태가 놀랍게도 칼라비-야우 다양체의 위상적(Gromov-Witten) 불변량만으로 결정됨을 뜻합니다.": "The OSV conjecture implies that microstates of black holes in M-theory are completely determined by topological invariants of the compact Calabi-Yau space.",
        "🧲 사이버그-위튼 질량 공식": "🧲 Seiberg-Witten Mass Formula",
        "BPS 상태 질량 (BPS State Mass)": "BPS Mass Formula",
        "초거대칭 대수가 중심 전하(Central Charge) $Z$에 의해 결정되며, 자기 홀극과 쌍극자(Dyons)의 질량은 모듈라이 공간의 주기로 표현됩니다.": "In $\\mathcal{N}=2$ SQCD, masses of BPS states (monopoles and dyons) are determined by periods of the Seiberg-Witten curve.",
        "중심 전하 ($Z = n_e a + n_m a_D$)": "Central Charge ($Z = n_e a + n_m a_D$)",
        "BPS 질량 공식 ($M = \\sqrt{2}|Z|$)": "BPS Mass Formula ($M = \\sqrt{2}|Z|$)",
        "🧬 D-막 전하와 K-이론 분류": "🧬 K-Theory Classification of D-brane Charges",
        "위상 K-이론 전하 (Topological K-Theory Charge)": "K-Theory Classification of D-branes",
        "타키온 장의 위상적 결함에 얽매인 게이지 장을 통해, Type II 끈 이론의 D-막이 호몰로지(Homology)가 아닌 K-이론에 의해 완벽하게 분류됨을 확인합니다.": "Verify that stable D-branes in Type II superstring theories are classified by topological K-theory groups of spacetime rather than standard homology.",
        "🔥 특이점 게이지 대칭 (ADE Classification)": "🔥 ADE Singularity Gauge Symmetry",
        "칼라비-야우 4-다양체 내부의 타원 곡선(Elliptic Curve)이 찌그러지는 특이점 구조로부터 7-막(7-Brane) 위에 형성되는 양자 게이지 대칭성을 판별합니다.": "Deduce gauge symmetry groups arising on 7-branes from Kodaira singularity types of elliptic fibrations in Calabi-Yau 4-folds.",
        "⬛ 행렬에서 창발하는 시공간": "⬛ Emergent Spacetime from Matrices",
        "1차원 양자 역학 행렬들의 고유값이 동시에 대각화되면서 연속적인 기하학적 공간으로 창발하는 홀로그래픽 쌍대성을 보여줍니다.": "Holographic duality showing continuous spatial geometry and gravity emerging from eigenvalues of non-commutative matrices in the large N limit.",
        "🕸️ 양자 얽힘과 시공간 기하학": "🕸️ Quantum Entanglement & Spacetime Geometry",
        "MERA 네트워크와 양자 오류 수정": "MERA Networks & Quantum Error Correction",
        "경계(Boundary)의 얽힘 엔트로피가 벌크(Bulk)의 최소 곡면 면적으로 기하학화되는 류-타카야나기(Ryu-Takayanagi) 공식을 MERA 텐서 네트워크를 통해 검증합니다.": "Map boundary entanglement entropy to bulk geodesic areas (Ryu-Takayanagi relation) modeled via MERA tensor networks.",
        "기하학적 얽힘 엔트로피 ($S_A$)": "Entanglement Entropy ($S_A$)",
        "🧮 비가환 모얄 평면 연산 결과": "🧮 Non-commutative Moyal Plane Outputs",
        "스타 곱 결합 & 위치 불확정성 관계": "Star Product Coupling & Uncertainty Relation",
        "비가환 시공간 변칙 하에서 두 가우스 파동함수의 중첩 스타 곱 강도와 최소 플랑크 분해 한계를 실시간 연산합니다.": "Compute the Moyal-Weyl star product of Gaussian wavefunctions under coordinate non-commutativity.",
        "🌀 천-사이먼스 위상 홀로그래피 연산 결과": "🌀 Chern-Simons TQFT Outputs",
        "매듭 불변량 & 2D CFT 경계 중심 전하": "Knot Invariants & 2D CFT Boundary Central Charge",
        "3차원 벌크 게이지 불변성과 2차원 Wess-Zumino-Witten 등각장론 경계 전하 및 세잎매듭(Trefoil Knot)의 존스 다항식 기대값을 연산합니다.": "Compute the Jones polynomial of the Trefoil knot and boundary central charges of the WZW model from bulk 3D Chern-Simons TQFT.",
        "존스 다항식 기대값 ($V_K(q)$ at $q = e^{i\\theta}$)": "Jones Polynomial Expectation ($V_K(q)$ at $q = e^{i\\theta}$)",
        "존스 다항식 기댓값 ($V_K(q)$ at $q = e^{i\\theta}$)": "Jones Polynomial Expectation ($V_K(q)$ at $q = e^{i\\theta}$)",
        "WZW 경계 등각장론 중심 전하 ($c$)": "WZW Boundary Central Charge ($c$)",
        "🌠 천구 홀로그래피 산란 진폭 연산 결과": "🌠 Celestial Holography Scattering Amplitude Outputs",
        "멜린 주파수 스펙트럼 & BMS 전하": "Mellin Spectrum & BMS Charges",
        "평평한 시공간의 산란 행렬(S-matrix)을 천구구면(Celestial Sphere)의 CFT 블록으로 사상하여 중력 적외선 BMS 전하 및 Mellin 진폭 값을 산출합니다.": "Map flat-spacetime S-matrix elements to conformal correlation functions on the celestial sphere via Mellin transforms.",
        "Mellin 대칭성 적합도 ($\\tilde{A}(\\Delta)$)": "Mellin Conformal Dimension Fit ($\\tilde{A}(\\Delta)$)",
        "Mellin 대칭성 적합도 ($\\tilde{A}(\\Delta)$)": "Mellin Conformal Dimension Fit ($\\tilde{A}(\\Delta)$)",
        "BMS Supertranslation 보존 전하 ($Q_{BMS}$)": "BMS Supertranslation Charge ($Q_{BMS}$)",
        "🧬 일반화 칼라비-야우 지표 연산 결과": "🧬 Generalized Calabi-Yau Index Outputs",
        "코란트 대수 & 힉스-켈러 이중성": "Courant Algebroid & Higgs-Kähler Duality",
        "거울대칭을 통일적으로 묘사하는 일반화 복소 대수 구조 하에서 3-form 플럭스 비가환도 지표와 디랙 코호몰로지 적합도를 평가합니다.": "Compute Hitchin generalized complex geometry indices and Courant algebroid anomalies under 3-form H-flux.",
        "Courant Dirac 구조 변칙 여부 ($d_H^2$)": "Courant Dirac Anomaly ($d_H^2$)",
        "$d_H^2 = 0$ (호환됨)": "$d_H^2 = 0$ (Compatible)",
        "🕸️ 루프 스핀 네트워크 계산 결과": "🕸️ Loop Spin Network Calculations",
        "시공간 면적 양자화 & 엔트로피 대응도": "Spacetime Area Quantization & Entropy Match",
        "스핀 네트워크 노드 주위의 불연속 기하 해상도를 기반으로 한 면적 크기와, 블랙홀 엔트로피의 베켄슈타인-호킹 상한 만족도를 계산합니다.": "Calculate discrete area eigenvalues and Bekenstein-Hawking entropy constraints on spin networks in LQG.",
        "Bekenstein-Hawking 엔트로피 한계 만족비": "Bekenstein-Hawking Entropy Limit Ratio",
        "100.0% 완벽 대응": "100.0% Exact Match",
        "🌀 비기하적 모노드로미 연산 결과": "🌀 Non-geometric Monodromy Calculations",
        "T-폴드 교차 구조 & 야코비 위반 지표": "T-fold Intersection & Jacobi Violation Index",
        "NS-NS R-플럭스로 인해 발생하는 시공간 좌표의 비결합성 대수 위반 강도와 시공간 폐곡선 감김 상호작용 에너지를 측정합니다.": "Measure non-associativity Jacobi violation indices $R^{ijk}$ of spacetime coordinates induced by NS-NS R-flux.",
        "감김-운동량 모노드로미 고유 기하학": "Winding-Momentum Monodromy Geometry",
        "📐 등각 수치적 부트스트랩 연산 결과": "📐 Conformal Numerical Bootstrap Calculations",
        "교차 방정식 해집합 & 스케일링 극대 한계": "Crossing Equation Solutions & Scaling Limit",
        "수치 반정부호 계획법(Semidefinite Programming)을 모사하여 4점 등각 블록 전개 교차 방정식을 만족하는 교환 연산자의 스케일링 차원 극대 임계 경계를 산출합니다.": "Solve numerical semidefinite programming bounds for CFT operator scaling dimensions using crossing symmetry constraints.",
        "$\\epsilon \\le 10^{-6}$ (합치)": "$\\epsilon \\le 10^{-6}$ (Consistent)",
        "🔗 비가환 이중성 & 가적 기하 연산 결과": "🔗 Non-abelian Duality & Integrable Geometry Calculations",
        "Yang-Baxter 시그마 모델 변형 계량": "Yang-Baxter Sigma Model Deformed Metric",
        "이중적 적분가능성을 만족하는 변형 배경 하에서 양-백스터 변형 계량의 왜곡율 및 비가환 Buscher T-이중성 시공간 계량의 체적 수축비율을 계산합니다.": "Calculate deformations of Yang-Baxter sigma models and volume contraction ratios of Non-Abelian T-Duality (NATD) spaces.",
        "NATD 변형 배경 시공간 왜곡율 ($\\eta_{\\text{eff}}$)": "NATD Spacetime Distortion Factor ($\\eta_{\\text{eff}}$)",
        "이중 끈 시그마 모형 작용소 적분가능성": "Double String Sigma Model Integrability",
        "Lax Pair 존재 (가적임)": "Lax Pair Exists (Integrable)",
        "📈 리서전스 보렐-Picard 안장점 연산 결과": "📈 Resurgence Borel-Picard Saddle Calculations",
        "보렐 평면 특이점 & 인스턴톤 비섭동 복원": "Borel Plane Singularities & Instanton Reconstruction",
        "asymptotic 하게 발산하는 섭동 급수 항들의 Borel 특이점 위치를 추적하고, 복소 Picard-Lefschetz 가우스 안장점 기여식을 통해 비섭동 인스턴톤 에너지를 완벽히 복원합니다.": "Reconstruct exact non-perturbative instanton energies from Borel resummation singularities and complex Picard-Lefschetz saddles.",
        "보렐 특이점 분지 컷 위치 ($s_0$)": "Borel Singularity Branch Cut ($s_0$)",
        "🔢 p-진수 프뢰인트-올슨 진폭 연산 결과": "🔢 p-Adic Freund-Olson Amplitude Calculations",
        "Freund-Olson 진폭 & 아델릭 대응도": "Freund-Olson Amplitude & Adelic Correspondence",
        "세계면이 p-진수 체 $\\mathbb{Q}_p$ 상에 존재할 때 도출되는 4점 트리 산란 Freund-Olson 진폭 $A_p$를 실수 진폭 $A_\\infty$와 결합하여 아델릭 등식을 입증합니다.": "Verify the adelic product relation combining real-sheet and p-adic Freund-Olson tree amplitudes.",
        "p-진수 4점 Freund-Olson 진폭 ($A_p(s,t)$)": "p-Adic 4-point Freund-Olson Amplitude ($A_p(s,t)$)",
        "아델릭 곱 보존 무모순성 등식 만족여부": "Adelic Product Consistency Check",
        "$A_\\infty \\cdot \\prod A_p = 1$ 증명 완료": "$A_\\infty \\cdot \\prod A_p = 1$ (Adelic Formula Verified)",
        "본 시뮬레이터는 10D 초중력 작용, 가토-스탠저-올리브(GSO) 투영, 그린-슈워츠 변칙 상쇄를 실시간 계산합니다.": "This simulator computes 10D supergravity actions, GSO projections, and Green-Schwarz anomaly cancelations in real time.",
        "T-이중성 (T-Duality)": "T-Duality",
        "Type IIB를 반경 R 원에 압축화한 것은 Type IIA를 반경 α'/R 원에 압축화한 것과 물리적으로 완벽히 동등합니다.": "Type IIB compactified on a circle of radius R is T-dual to Type IIA on a circle of radius α'/R.",
        "S-이중성 (S-Duality)": "S-Duality",
        "Type_IIB (자가이중성)": "Type IIB (Self-duality)",
        "강결합 Type IIB는 약결합 Type IIB와 동등하며, 이 과정에서 F1 끈 ↔ D1 끈, NS5-브레인 ↔ D5-브레인으로 교환됩니다.": "Strongly coupled Type IIB maps to weakly coupled Type IIB, swapping F1 ↔ D1 strings and NS5 ↔ D5 branes.",
        "Type IIA를 반경 R의 원에 압축화한 물리적 상태는 Type IIB를 반경 α'/R의 원에 압축화한 상태와 완전히 동일합니다.": "Type IIA compactified on a circle of radius R is physically identical to Type IIB compactified on a circle of radius α'/R.",
        "결합 상수 g_s가 무한대로 가는 강결합 극한에서 Type IIA는 11번째 공간 차원이 자라나며 11차원 M-이론으로 전이합니다.": "At strong coupling ($g_s \\to \\infty$), Type IIA grows an 11th dimension, transitioning to 11D M-Theory.",
        "강결합된 Type I 열린끈 이론은 수학적으로 약결합된 Heterotic SO(32) 닫힌끈 이론과 물리적으로 완전히 동일합니다.": "Strongly coupled Type I open string theory is dual to weakly coupled Heterotic SO(32) closed string theory.",
        "반경 R의 원에 압축화된 Heterotic E8xE8 이론은 반경 α'/R의 원에 압축화된 Heterotic SO(32)와 이중성 관계를 이룹니다.": "Heterotic E8xE8 compactified on a circle of radius R is T-dual to Heterotic SO(32) on a circle of radius α'/R.",
        "결합상수가 커지면 11차원 M-이론이 S1/Z2(선분) 상에 놓인 상태(호자바-위튼 이론)로 전이하며, 두 E8 게이지 그룹은 각각 선분의 양끝 9차원 경계면에 국소화됩니다.": "At strong coupling, Heterotic E8xE8 transitions to Horava-Witten theory (M-Theory on an interval $S^1/\\mathbb{Z}_2$), localizing the two $E_8$ groups on boundaries.",
        "Heterotic SO(32)를 반경 R 원에 압축화한 상태는 Heterotic E8xE8을 반경 α'/R 원에 압축화한 물리적 상태와 같습니다.": "Heterotic SO(32) compactified on a circle of radius R is T-dual to Heterotic E8xE8 on a circle of radius α'/R.",
        "강하게 결합된 Heterotic SO(32) 이론은 약하게 결합된 Type I 열린끈/닫힌끈 이론과 수학적으로 완전히 동치입니다.": "Strongly coupled Heterotic SO(32) is S-dual to weakly coupled Type I superstring theory.",
        "열린 끈의 가진 진동(NS sector, N=1/2): 종단점이 D-브레인에 구속된 벡터 전자기력 광자 요동을 묘사합니다.": "Vibrating Open String (NS sector, N=1/2): Endpoints are fixed on D-branes, modeling electromagnetic vector photon fluctuations.",
        "열린 끈의 고진동 흥분 상태(NS sector, N=3/2): 질량이 1.0/sqrt(α') 근처에 형성되는 무거운 보손 입자입니다.": "Excited Open String (NS sector, N=3/2): A heavy bosonic state with mass near $1.0/\\sqrt{\\alpha'}$.",
        "열린 끈의 타키온 불안정 진동 상태(NS sector, N=0): 질량 제곱이 음수(-0.5/α')이며, 끈 응축과 진공 붕괴 상태의 급격한 변동을 의미하는 허수 질량 진동입니다.": "Unstable Open String (NS sector, N=0): Imaginary mass state ($M^2 < 0$), representing vacuum decay and tachyon condensation.",
        "닫힌 끈의 가로-세로 편향 진동(NS-NS sector, N_L=0.5, N_R=0.5): 두 개의 반대 방향 진행파가 합성되어 정상파 형태의 스핀-2 중력 자극을 구현합니다.": "Vibrating Closed String (NS-NS sector, $N_L=N_R=0.5$): Two counter-propagating waves superpose to form a spin-2 tensor graviton.",
        "닫힌 끈의 방사형 팽창 수축 진동(NS-NS sector, breathing mode): 끈의 평균 반경이 주기적으로 요동하며 우주의 끈 결합 상수 g_s의 진공 상태(VEV)를 결정하는 딜라톤을 묘사합니다.": "Vibrating Closed String (breathing mode): Radial breathing fluctuations, modeling the dilaton which determines the string coupling VEV.",
        "압축된 원주 차원을 따라 회전(momentum)하는 Kaluza-Klein 진동: 끈이 압축 차원 축으로 물리적 속도를 가지며 달리는 양자 운동량을 묘사합니다.": "Kaluza-Klein Mode: String carries momentum along compact dimensions, representing KK momentum states.",
        "압축된 원주 차원을 감고(winding) 있는 진동: 공간이 작게 휘어짐에 따라 끈 자체가 둥글게 원 형태의 4차원에 단단히 감겨 있는 위상학적 요소를 묘사합니다.": "Winding Mode: Topological wrapping of closed strings around compact dimensions.",
        "입자 조립 연구소 라이브 진동면: 조합된 양자수와 압축 반경에 맞게 닫힌끈 또는 열린끈의 커스텀 정상파 진동 요동을 실시간으로 렌더링합니다.": "Particle Lab Live Vibrating Sheet: Renders real-time custom standing waves of open or closed strings based on quantum numbers and compactification radii.",
        "입자 산란 연구소 세계면 튜브 (pants diagram): 두 개의 끈이 병합된 후 붕괴하여 새로운 끈들로 나누어지는 연속적이고 특이점 없는 2차원 세계면 위상 공간을 시각화합니다.": "Scattering Lab Worldsheet (pants diagram): Visualizes smooth, singularity-free 2D worldsheet topologies where strings merge and decay.",
        "홀로그래피 & 블랙홀 연구소: D1-D5-P 블랙홀의 슈바르츠실트/BPS 이벤트 지평선(Event Horizon) 및 끈 fuzzball 미시진동 상태를 시각화합니다.": "Holography & Black Hole Lab: Visualizes Schwarzschild/BPS event horizons and stringy fuzzball microstate oscillations of D1-D5-P black holes.",
        "이론적 검증 및 진단 라이브 모니터: 설정된 매개변수 하에서 끈의 무결성 및 등각 변칙 붕괴 파동을 감지하고 상태를 점검합니다.": "Physical Diagnostics Live Monitor: Weyl anomaly and critical dimension compliance monitor.",
        "우주끈 & 우주론 연구소: 우주 거대 루프의 Cusp 진동 및 시공간을 흔드는 중력파 버스트 파동, 그리고 KKLT 인플레이션의 CMB 전천 편평도를 시각화합니다.": "Cosmic Strings & Cosmology Lab: Visualizes cusp dynamics of cosmic strings emitting gravitational wave bursts, and CMB maps of KKLT inflation.",
        "M-이론 & 이중성 연구소: 11차원 비가환 BFSS 행렬 역학에 의해 진공에서 안정화된 Fuzzy Sphere 막(membrane)을 시각화합니다.": "M-Theory & Dualities Lab: Visualizes the fuzzy membrane stabilized dynamically from eigenvalues of 11D non-commutative BFSS matrix mechanics.",
        "지형과 늪지대 연구소: 컴팩트화 moduli 공간 상의 양자중력 포텐셜을 따라 구르는 모듈러스(Modulus) 구슬과, 장거리 한계(Δφ > 1) 돌파 시 쏟아져 내리는 지수 감쇠 KK 파티클 타워를 묘사합니다.": "Moduli & Swampland Lab: Simulates moduli rolling along quantum gravity potentials and towers of KK states falling down at large field limits.",
        "기본입자 유도 연구소: 칼라비-야우 다양체의 몫 위상구조 아래 교차하는 3쌍의 D-막들과 그 교차점에 구속되어 진동하는 3세대의 표준 모형 쿼크/렙톤 상태를 시각화합니다.": "Particle Derivation Lab: Visualizes three generations of quarks and leptons vibrating at intersections of D-branes in Calabi-Yau quotient spaces.",
        "힉스 & 중성미자 연구소: 자발적 대칭성 깨짐(EWSB)을 설명하는 3D 힉스 멕시칸 햇 퍼텐셜과 진공 기댓값(VEV) 상태를 시각화합니다.": "Higgs & Neutrino Lab: Visualizes spontaneous EWSB in a 3D Mexican-hat Higgs potential displaying vacuum expectation values (VEV).",
        "거울 대칭 & 위상 끈 연구소: 칼라비-야우 다양체의 3차원 투영 상에서 A-모델의 인스턴톤과 B-모델의 복소 구조 변형을 계산합니다.": "Mirror Symmetry Lab: Simulates A-model instanton expansions and B-model complex structure moduli variations on 3D projections of CY spaces.",
        "진폭면체 & 트위스터 연구소: 산란 진폭을 N=4 SYM 공간의 그라스만 기하학 부피로 치환하여 트위스터 공간에서 기하학적 렌더링을 수행합니다.": "Amplituhedron Lab: Visualizes scattering amplitudes mapped to canonical volumes of Grassmannian polytopes in momentum twistor space.",
        "끈 장론 & 타키온 응축 연구소: 위튼의 3차 개방 끈 장론에서 별-곱(Star-Product)을 통한 열린 끈의 붕괴 현상과 닫힌 끈 진공으로의 변이(Sen's Conjecture)를 기하학적으로 시각화합니다.": "SFT & Tachyon Lab: Visualizes open string decays to closed string vacua (Sen's Conjecture) via star-product cubic string field interactions.",
        "페이지 곡선 & 복제 웜홀 연구소: 증발하는 블랙홀의 미세 조정된 얽힘 엔트로피(Fine-grained Entropy)를 섬 공식(Island Formula)을 통해 연산하고, 유니터리성이 보존되는 과정을 시각화합니다.": "Page Curve Lab: Computes fine-grained entanglement entropy of evaporating black holes using the island formula and replica wormholes.",
        "위상 끈 & OSV 연구소: 위상 끈 이론(Topological String Theory)의 분배 함수가 거시적 BPS 블랙홀의 엔트로피를 미시적으로 완벽하게 설명하는 OSV 추측을 시각화합니다.": "Topological String & OSV Lab: Visualizes the OSV relation connecting black hole partition functions to topological string partition functions.",
        "사이버그-위튼 연구소: N=2 초거대칭 양자색역학의 진공 구조와 자기 홀극(Magnetic Monopole) 응축에 의한 쿼크 가둠 현상을 위상학적으로 증명합니다.": "Seiberg-Witten Lab: Visualizes the moduli space of $\\mathcal{N}=2$ SQCD and quark confinement via magnetic monopole condensation.",
        "K-이론 연구소: D-막의 전하가 코호몰로지가 아닌 위상 K-이론(Topological K-Theory)에 의해 완전히 분류됨을 타키온 응축을 통해 시각화합니다.": "K-Theory Lab: Visualizes classification of D-brane charges using topological K-groups via tachyon condensation on D-brane-anti-D-brane pairs.",
        "F-이론 연구소: 액시온-딜라톤을 타원 곡선의 모듈라이로 기하학화하여, 12차원 F-이론의 특이점(Singularity)으로부터 창발하는 7-막의 게이지 대칭성을 시각화합니다.": "F-Theory Lab: Visualizes 7-brane gauge symmetries emerging from Kodaira singularities of elliptic fibrations in 12D F-theory.",
        "행렬 모델 연구소: 비가환(Non-commutative) 무한 차원 행렬의 고유값들이 대각화되면서 연속적인 기하학과 중력이 창발(Emergent)되는 M-이론 행렬 역학을 시뮬레이션합니다.": "Matrix Models Lab: Simulates eigenvalue distributions of non-commutative matrices in BFSS/IKKT models yielding emergent geometry and gravity.",
        "텐서 네트워크 연구소: 얽힘 엔트로피의 텐서 얽힘망(MERA/HaPPY)이 홀로그래피 원리를 통해 어떻게 거시적인 벌크(Bulk) 시공간으로 기하학화되는지 연산합니다.": "Tensor Networks Lab: Computes bulk spatial geometry reconstructing holographically from boundary MERA/HaPPY tensor networks.",
        "비가환 기하학 연구소: 시공간 연산자가 교환하지 않는 모얄 평면 상에서 D-막 월드시트 스타 곱(Star Product)의 강도와 위치 불확정성 물리량을 계산합니다.": "NC Geometry Lab: Computes Moyal star products and quantum uncertainty bounds on non-commutative spaces where coordinates do not commute.",
        "천-사이먼스 연구소: 3차원 위상 양자장론에서 게이지 군 N과 레벨 k 하에서 윌슨 루프 기댓값인 세잎매듭 존스 다항식과 2차원 WZW CFT 경계 전하를 계산합니다.": "Chern-Simons Lab: Computes Jones polynomials of knots and boundary central charges of 2D WZW models in 3D Chern-Simons TQFT.",
        "천구 홀로그래피 연구소: 4차원 민코프스키 평평한 시공간에서의 끈 산란 진폭을 멜린 변환하여 2차원 천구 상의 등각장론 진폭 및 BMS 무한 차원 초대칭 전하를 도출합니다.": "Celestial Holography Lab: Computes celestial CFT correlation functions via Mellin transforms of 4D flat S-matrix elements.",
        "일반화 기하학 연구소: 코탄젠트 다발 직합 T+T* 상의 H-플럭스 뒤틀림 코란트 괄호 연산과 Hitchin 일반화 복소 구조 지표를 계산하여 거울 대칭을 분석합니다.": "Generalized Geometry Lab: Computes H-twisted Courant brackets and generalized complex structure indices on the sum bundle $T \\oplus T^*$.",
        "루프 양자 중력 연구소: 스핀 네트워크 격자 위 면적 연산자 고유값 및 Barbero-Immirzi 상수를 통해 시공간의 이산성 기하학과 베켄슈타인-호킹 엔트로피 만족도를 계산합니다.": "Loop Quantum Gravity Lab: Computes discrete area eigenvalues and Bekenstein-Hawking entropy constraints on spin network nodes in LQG.",
        "비기하적 플럭스 & T-폴드 연구소: T-이중성 대칭 변환 $O(d,d,\\\\mathbb{Z})$ 모노드로미에 의해 접합된 T-폴드 상에서 비기하적 $R$-플럭스가 주입하는 비결합 대수 기하 구조를 계산합니다.": "Non-geometric Flux Lab: Computes non-associative coordinate algebras and monodromies of T-folds under $O(d,d,\\mathbb{Z})$ T-duality.",
        "등각 부트스트랩 연구소: 등각장론의 유니터리성 및 4점 상관함수 교차 대칭성(Crossing Symmetry)을 기저로 삼아, 수치 반정부호 계획법(SDP)을 모사해 연산자의 스케일링 극대 임계차원 경계를 연산합니다.": "Conformal Bootstrap Lab: Computes numerical bounds on scaling dimensions using crossing symmetry and unitarity conditions.",
        "비가환 이중성 & 가적 변형 연구소: 비가환 등거리군 상의 NATD Buscher T-이중성 배경 시공간 계량 왜곡율과 시그마 모형의 가적성(Lax Pair 적분성)을 실시간 시뮬레이션합니다.": "NATD & Integrable Lab: Computes metric distortions of Non-Abelian T-Duality (NATD) and integrability (Lax pair consistency) of string sigma models.",
        "리서전스 & 복소 안장점 연구소: 팩토리얼로 발산하는 섭동 급수항들의 Borel 특이점을 추적하고, Picard-Lefschetz 복소 인스턴톤 안장점 보정을 유기적으로 합성하여 비섭동 유효 에너지를 복원합니다.": "Resurgence Lab: Reconstructs exact non-perturbative instanton energies from Borel planes and Picard-Lefschetz saddles of divergent series.",
        "p-진수 초끈 연구소: 세계면 좌표가 p-진수 체 $\\mathbb{Q}_p$ 상에 존재할 때 도출되는 4점 tree Freund-Olson 진폭을 연산하고, 실수 및 p-진수 진폭의 아델릭 곱 보존식 만족여부를 증명합니다.": "p-Adic String Lab: Computes p-adic Freund-Olson tree amplitudes and verifies their adelic product integration with real-sheet amplitudes.",
        "목 모듈러 & 마티유 달빛 연구소: 라마누잔의 목 세타 함수 수렴 거동 및 K3 다양체 elliptic genus 분배 함수의 q-전개 계수들과 Mathieu 산재 단순군 $M_{24}$ 간의 달빛 대응 관계식을 계산합니다.": "Mathieu Moonshine Lab: Connects K3 elliptic genus partition coefficients to dimensions of Mathieu group $M_{24}$ representations using mock theta functions.",
        "캐롤 시공간 & 평탄 홀로그래피 연구소: 광속이 0인 한계 하에서 Minkowski 평탄 시공간 인과 붕괴를 연산하고, Asymptotic BMS 초대칭 무한 전하 고유값 보존율을 유도합니다.": "Carrollian Lab: Computes causal structures under $c \\to 0$ limits and asymptotic BMS charge conservations in Minkowski holography.",
        "비가역 대칭성 & 위상 결함 연구소: 군의 구조를 초월하는 융합 범주론(Fusion Category)을 기반으로 비가역 global 위상 대칭 조작 결함선(TDL) 간의 중력 변칙 상쇄 대수를 시뮬레이션합니다.": "Non-Invertible Symmetries Lab: Computes anomaly cancellations of topological defect lines (TDLs) described by fusion categories.",
        "경계 끈 장론 & 타키온 연구소: 개방 끈 월드시트 경계에서의 RG 흐름을 유도하여, 불안정한 D-막 상의 타키온 퍼텐셜 붕괴 흐름 $V(T)$ 및 D-막 장력 사멸 비율을 정밀 계산합니다.": "BSFT & Tachyon Lab: Computes open string tachyon potential decays $V(T)$ and D-brane tension cancellations from boundary RG flows.",
        "프리드-위튼 변칙 연구소: 배경 3-form H-플럭스 하에서 D-막이 사이클을 감쌀 때 발생하는 Freed-Witten topological obstruction $W_3 + [H]$ 및 K-이론적 integral 전하 구조를 연산합니다.": "Freed-Witten Lab: Computes Stiefel-Whitney obstructions $W_3 + [H]$ on D-branes wrapping cycles in 3-form H-flux backgrounds.",
        "이론 요약 대시보드 라이브 다양체: 물리적 공간 압축화 기하학을 제공하는 6차원 칼라비-야우 다양체(Calabi-Yau Manifold)의 3차원 투영 회전과 실시간 요동을 시각화합니다.": "Theory Digest Live Manifold: Visualizes a 3D rotating projection of a 6-dimensional Calabi-Yau manifold providing extra-dimensional spaces.",
        "M-이론은 최상위 11차원 연합 이론으로, 다른 끈 이론들이 극한 상태에서 M-이론으로 수렴합니다.": "M-Theory is the overarching 11-dimensional theory that unites all five superstring theories as different limits.",
        
        // Dynamic results in app.js
        "경고: 좌진동(N_L - a) ≠ 우진동(N_R - a)로 수준 일치 조건(Level Matching)에 어긋납니다. 물리적인 닫힌 끈 상태가 아닙니다!": "Warning: Left vibration (N_L - a) != Right vibration (N_R - a), violating the Level Matching condition. This is not a physical closed string state!",
        "수준 일치: 성공": "Level Matching: Success",
        "수준 불일치: 좌진동(N_L - a_L)과 우진동(N_R - a_R)의 차이": "Level mismatch: The difference between left vibration (N_L - a_L) and right vibration (N_R - a_R)",
        "와 다릅니다.": "is different from the expected value.",
        "이 조건이 무너지면 끈의 폐곡선 연속성이 파괴되어 4차원에 물리적 입자 상태를 형성할 수 없게 됩니다.": "If this condition is violated, the continuity of the closed string is destroyed, making it impossible to form physical particle states in 4D.",
        "GSO 차단: 설정된 끈 진동은 GSO 투영 필터링 조건에 탈락하여 시공간 초대칭에 어긋납니다.": "GSO Blocked: The configured string vibration failed the GSO projection filter, violating spacetime supersymmetry.",
        "초끈 이론이 안정적인 상태를 유지하려면 이 필터를 통해 비물리적 타키온 진동을 걸러내고 무질량 페르미온을 남겨야 합니다.": "To maintain stability in superstring theory, this filter must filter out non-physical tachyon oscillations and leave massless fermions.",
        "변칙 완전 상쇄!": "Anomaly fully canceled!",
        "변칙 존재 - 고스트 발생": "Anomaly exists - ghosts generated",
        "10차원 초대칭 끈 우주에서는 총 중앙 전하 c_tot = 15 - 15 = 0으로 Weyl 이상 변칙이 상쇄되어, 광복원(Gauge) 및 일반 상대론적 물리량 계산이 게이지 독립적이고 유일하며 수학적으로 아름답게 수렴합니다.": "In the 10D supersymmetric string universe, the total central charge c_tot = 15 - 15 = 0, canceling the Weyl anomaly. Thus, gauge and general relativistic calculations converge uniquely and gauge-independently.",
        "26차원 보손 끈 우주에서는 총 중앙 전하 c_tot = 26 - 26 = 0으로 conformal anomaly가 제거되나, bosonic tachyonic 진공 붕괴 불안정성이 남게 됩니다.": "In the 26D bosonic string universe, the total central charge c_tot = 26 - 26 = 0, removing the Weyl anomaly, but bosonic tachyonic vacuum instabilities remain.",
        "차원이 임계점(D=10, 26)을 이탈하여 총 c_tot": "The dimension has deviated from the critical value (D=10, 26). The total c_tot",
        "입니다. 이탈된 등각 변칙으로 인해 세계면의 Weyl 대칭이 파괴되며 물리 상태에 '유령(Ghost)' 상태가 잔존하는 치명적 수학적 모순이 증명되었습니다.": " The broken Weyl symmetry on the worldsheet leaves physical states with fatal 'ghost' state mathematical contradictions.",
        "불안정 진동": "Unstable Oscillation",
        "1.0x (안정)": "1.0x (Stable)",
        "1.8x (고에너지)": "1.8x (High Energy)",
        "열역학적 일치도 평가 (Strominger-Vafa 및 Cardy 공식):": "Thermodynamic Match Assessment (Strominger-Vafa and Cardy formulas):",
        "세 공식 일치 비율 (Ratio):       1.000000 (100.00% 일치)": "Duality Matching Ratio: 1.000000 (100.00% exact match)",
        "이론 검증: D1-D5-P 블랙홀의 5차원 BPS Bekenstein-Hawking 엔트로피와 2D CFT 경계 상의 Cardy 엔트로피 공식이 완벽한 양방향 대응을 이룹니다.": "D1-D5-P black hole microstate counts (Strominger-Vafa), 2D CFT Cardy formula, and bulk Bekenstein-Hawking entropy achieve exact holographic agreement.",
        "EFT가 늪지대(Swampland)에 빠졌습니다: 대형 장 롤링(Delta phi > 1)으로 타워 질량이 급락하였으며, q/m 비가 WGC(q/m < 0.707) 제한을 위반했습니다.": "The EFT has fallen into the Swampland: Large field rolling (Delta phi > 1) caused the state tower mass to drop, and the q/m ratio violated the WGC bounds.",
        "EFT가 늪지대에 빠졌습니다: 장 구동 거리가 플랑크 한계(1.0 M_pl)를 초과해 무한 입자 타워가 흘러내려와 저에너지 기술이 붕괴합니다.": "The EFT has fallen into the Swampland: Modulus displacement exceeded the Planck limit (1.0 M_pl), causing an infinite tower of states to collapse the low-energy description.",
        "EFT가 늪지대에 빠졌습니다: 테스트 입자의 전하/질량비(q/m)가 극대 블랙홀 한계(0.707) 미만으로 WGC를 위반했습니다.": "The EFT has fallen into the Swampland: The test charge-to-mass ratio (q/m) is below the extremal black hole bound (0.707), violating the WGC.",
        "EFT가 Landscape(지형)에 위치합니다: 모듈러스 거리가 한계 내에 있어 KK 상태가 안정적이며 q/m 비가 극대 블랙홀 제한을 만족합니다.": "The EFT is in the Landscape: Moduli distance is within stable limits, KK towers are heavy, and the q/m ratio satisfies the WGC.",
        "안정화 고정됨 (STABILIZED)": "Stabilized",
        "요동 중 (UNSTABILIZED)": "Unstabilized",
        "위반 (stable de Sitter 존재)": "Violated (Stable de Sitter exists)",
        "만족 (stable dS 배제)": "Satisfied (Stable dS excluded)",
        "표준 모형(Standard Model) 게이지 대칭: 이산 대칭군 G에 의한 윌슨 라인 플럭스가 E6 GUT 대칭을 성공적으로 깨뜨려 강력 SU(3), 약력 SU(2), 전자기약력 U(1)만을 남겨두었습니다.": "Standard Model Symmetries: Wilson line fluxes by discrete group G successfully broke E6 GUT down to strong SU(3), weak SU(2), and hypercharge U(1).",
        "E6 대통합 이론(GUT) 대칭 유지: 윌슨 라인이 활성화되지 않아 차원 축소 이후에도 E6 대칭이 그대로 보존되어 있고 양자 자외선 불안정성이 큽니다.": "E6 GUT Symmetry Restored: Wilson lines are inactive, preserving full E6 symmetry with high ultraviolet gauge couplings.",
        "SO(10) GUT 대칭과 추가 U(1): 윌슨 라인 대칭 깨짐이 불완전하여 표준 모형보다 넓은 SO(10) 대칭과 초대칭 액시온 결합이 잔존합니다.": "SO(10) GUT & Extra U(1): Incomplete Wilson line breaking leaves a broader SO(10) symmetry with active axionic couplings.",
        "플립된 SU(5) 대칭: 윌슨 라인이 게이지 대칭을 SU(5)와 초대칭 U(1)으로 분류하였으나, Weinberg 각도와 물리적 쿼크 결합이 조화롭지 않습니다.": "Flipped SU(5) Symmetry: Wilson lines split gauge symmetries into SU(5) and extra U(1), but Yukawa couplings are physically incompatible.",
        "Pati-Salam 대칭: 렙톤 수와 색상이 통합된 게이지 상태이지만 표준 모형의 3세대 키랄 페르미온을 온전히 설명하지 못합니다.": "Pati-Salam Symmetry: Unified lepton-color states, but fails to accommodate three generations of chiral Standard Model fermions.",
        "1세대": "1st Gen",
        "2세대": "2nd Gen",
        "3세대": "3rd Gen",
        "세대:": "Gen:",
        "강도": "Intensity",
        "질량 제곱 M² =": "Mass Squared M² =",
        "물리 질량 M  =": "Physical Mass M =",
        "상태:": "State:",
        "무질량 중력자/딜라톤/Kalb-Ramond": "Massless Graviton/Dilaton/Kalb-Ramond",
        "질량성 닫힌끈 가진 입자": "Massive Closed String Excitation",
        "수준 일치: 성공": "Level Match: Success",
        "무질량 게이지 보손/페르미온": "Massless Gauge Boson/Fermion",
        "질량성 가진 상태": "Massive State",
        "총 질량 제곱 M² =": "Total Mass Squared M² =",
        "물리적 질량 M  =": "Physical Mass M =",
        "↳ KK 운동량 기여:": "↳ KK momentum contribution:",
        "↳ Winding 감김 기여:": "↳ Winding contribution:",
        "↳ 끈 진동자 기여:": "↳ String oscillator contribution:",
        "오일러 지표 (Euler Characteristic) χ =": "Euler Characteristic χ =",
        "입자 세대 수 (Fermion Generations) =": "Fermion Generations =",
        "세대": "Generations",
        "물리적 결과: Heterotic E8xE8을 본 칼라비-야우 다양체에 압축화하면 E8 하나가 SU(3) 홀로노미에 의해 깨져 E6 GUT 그룹이 되며, 4차원상에 정확히": "Physical result: Compactifying Heterotic E8xE8 on this CY manifold breaks one E8 group via SU(3) holonomy to E6 GUT, yielding exactly",
        "세대의 페르미온 입자가 출현합니다.": "generations of chiral fermion particles in 4D.",
        "GSO 필터링됨": "GSO Filtered",
        "기본 진동 및 소형차원 모멘텀 모드가 결합된 질량성 끈 여흥 상태입니다.": "A massive string resonance coupling fundamental string oscillations with compactified momentum modes.",
        "중력자 (Graviton)": "Graviton",
        "4D 중력 싱글렛 (Singlet)": "4D Graviton Singlet",
        "닫힌 끈의 무질량 기저 상태(NS-NS sector)로 시공간 기하학 요동을 조율하는 중력의 매개 입자입니다.": "Massless closed string ground state (NS-NS sector) mediating gravity as spacetime metric fluctuations.",
        "Ramond-Ramond 폼 게이지": "Ramond-Ramond Gauge Field",
        "4D 싱글렛": "4D Singlet",
        "R-R sector의 무질량 게이지 대칭 성분으로, D-브레인의 하전 전하를 보장하는 미립자 형태입니다.": "Massless gauge field in the R-R sector, carrying D-brane charges.",
        "광자/글루온 (Gauge Boson)": "Photon/Gluon (Gauge Boson)",
        "GUT 게이지 결합 표현": "GUT Gauge Representation",
        "열린 끈의 무질량 기저 보손 상태로 상호작용의 게이지 전기력을 매개하는 매개 입자입니다.": "Massless open string ground state (NS sector) mediating gauge interactions.",
        "쿼크/렙톤 페르미온": "Quark/Lepton Fermion",
        "게이지 27 혹은 기본 표현": "Fundamental Gauge 27 Representation",
        "Ramond sector 열린 끈의 무질량 페르미온 상태로 우리 우주의 일반적인 질량성 물질을 구성합니다.": "Massless open string state in the Ramond sector forming standard model fermions.",
        "타키온 (Tachyon)": "Tachyon",
        "불안정 상태": "Unstable Vacuum State",
        "질량 제곱이 음수이며 진공 기저 상태의 붕괴(Tachyon Condensation)를 나타내는 비물리적 가상 입자입니다. GSO 투영에 의해 필터링됩니다.": "Negative mass-squared ($M^2 < 0$) tachyonic state representing vacuum decay. Filtered out by the GSO projection.",
        "게이지 대칭 표현:": "Gauge representation:",
        "불안정 (Tachyon)": "Unstable (Tachyon)",
        "비물리적 (GSO 차단)": "Non-physical (GSO Blocked)",
        "안정 (Stable)": "Stable",
        "E8 x E8 (10차원 초대칭 헤테로틱 게이지군)": "E8 x E8 (10D Supersymmetric Heterotic Gauge Group)",
        "➔ E6 x SU(3)_holonomy (칼라비-야우 다양체 진동면 매핑)": "➔ E6 x SU(3)_holonomy (Calabi-Yau Manifold Mapping)",
        "  ➔ SO(10) x U(1) (E6 대칭성 대수적 분해)": "  ➔ SO(10) x U(1) (Algebraic decomposition of E6)",
        "    ➔ SU(5) x U(1) (최소 대통합 이론 GUT 단계)": "    ➔ SU(5) x U(1) (Minimal GUT SU(5) Phase)",
        "      ➔ SU(3)_C x SU(2)_L x U(1)_Y (현대 저에너지 표준모형)": "      ➔ SU(3)_C x SU(2)_L x U(1)_Y (Low-Energy Standard Model)",
        "임계 차원 붕괴: 현재": "Critical dimension collapse: currently",
        "차원 설정입니다.": "Dimensions configured.",
        "등각 이상 변칙(Conformal Anomaly)과 유령 상태(Ghost State)가 완전히 제거되는 유일한 임계차원 D=10을 만족합니다.": "Satisfies critical dimension D=10 where worldsheet conformal anomalies and ghost states are completely absent.",
        "임계 차원 D=10이 아니면 세계면의 등각 대칭성(Weyl Symmetry)이 깨져 양자 붕괴가 발생하며 질량 계산이 무의미해집니다.": "Weyl conformal symmetry is broken on the worldsheet when D != 10, yielding fatal quantum ghost states.",
        "양자 게이지 변칙 발생: 게이지군": "Quantum gauge anomaly: gauge group",
        "는 10D Green-Schwarz 상쇄를 만족하지 않습니다.": "does not satisfy the 10D Green-Schwarz anomaly cancelation.",
        "10차원 N=1 초대칭 이론에서 발생하는 게이지 및 중력 합성 변칙이 해당 게이지군 하에서 대수적으로 상쇄되어 진공이 완전무결합니다.": "Gauge and gravitational anomalies cancel out algebraically in 10D N=1 supergravity under this gauge group.",
        "게이지군이 SO(32) 또는 E8 x E8이 아니면 중력-게이지 양자 변칙으로 인해 등가원리가 붕괴하고 광자가 가상 질량을 가지는 파멸적 오류가 발생합니다.": "If the gauge group is not SO(32) or E8 x E8, gauge/gravitational anomalies destroy the equivalence principle.",
        "수준 불일치: 좌진동(N_L - a_L)과 우진동(N_R - a_R)의 차이": "Level mismatch: left (N_L - a_L) and right (N_R - a_R) difference",
        "가토-스탠저-올리브(GSO) 투영을 통해 세계면의 불안정한 타키온 및 고스트 모드가 완전히 지워져, 시공간 초대칭(Space-time SUSY)이 보존되는 물리적 상태를 보증합니다.": "The GSO projection removes unstable tachyonic and ghost states, preserving spacetime supersymmetry.",
        "GSO 차단: 설정된 끈 진동은 GSO 투영 필터링 조건에 탈락하여 시공간 초대칭에 어긋납니다.": "GSO Blocked: The configured string vibration failed the GSO filter, breaking spacetime SUSY.",
        "• 세계면 CFT 중앙 전하 (Central Charge):": "• Worldsheet CFT Central Charge:",
        "  - Matter 중앙 전하 (c_m = 1.5 · D):": "  - Matter central charge (c_m = 1.5 * D):",
        "  - Ghost 중앙 전하 (c_g):": "  - Ghost central charge (c_g):",
        "  - 총 양자 등각 이상 변칙 (c_tot):": "  - Total conformal anomaly (c_tot):",
        " (변칙 완전 상쇄!)": " (Anomaly Canceled!)",
        " (변칙 존재 - 고스트 발생)": " (Anomaly Exists - Ghost States)",
        "• Virasoro 교환자 연산": "• Virasoro Commutation Relation",
        "• 물리적 진단:": "• Physical Diagnostics:",
        "  ↳ 10차원 초대칭 끈 우주에서는 총 중앙 전하 c_tot = 15 - 15 = 0으로 Weyl 이상 변칙이 상쇄되어, 광복원(Gauge) 및 일반 상대론적 물리량 계산이 게이지 독립적이고 유일하며 수학적으로 아름답게 수렴합니다.": "  ↳ In 10D superstring theory, total central charge c_tot = 15 - 15 = 0, canceling Weyl anomalies. Gauge-independent physics is restored.",
        "  ↳ 26차원 보손 끈 우주에서는 총 중앙 전하 c_tot = 26 - 26 = 0으로 conformal anomaly가 제거되나, bosonic tachyonic 진공 붕괴 불안정성이 남게 됩니다.": "  ↳ In 26D bosonic string theory, central charge c_tot = 26 - 26 = 0, canceling anomalies but leaving tachyonic instabilities.",
        "  ↳ 차원이 임계점(D=10, 26)을 이탈하여 총 c_tot =": "  ↳ The dimension has deviated from critical limits (D=10, 26), yielding c_tot =",
        " != 0 입니다. 이탈된 등각 변칙으로 인해 세계면의 Weyl 대칭이 파괴되며 물리 상태에 '유령(Ghost)' 상태가 잔존하는 치명적 수학적 모순이 증명되었습니다.": " != 0. Broken Weyl symmetry on the worldsheet leaves physical states with fatal ghost-state mathematical contradictions.",
        "4-Point Virasoro-Shapiro Closed String Amplitude 계산결과:": "4-Point Virasoro-Shapiro Closed String Amplitude Results:",
        "  닫힌 끈 질량껍질 조건 s + t + u = -4/α' =": "  Closed string mass-shell constraint s + t + u = -4/α' =",
        "  진폭 A_closed(s,t):": "  Amplitude A_closed(s,t):",
        "  강도 |A|²:": "  Intensity |A|^2:",
        "  궤적: α_closed(s) =": "  Trajectory: α_closed(s) =",
        "4-Point Veneziano Open String Amplitude 계산결과:": "4-Point Veneziano Open String Amplitude Results:",
        "  진폭 A_open(s,t):": "  Amplitude A_open(s,t):",
        "  강도 |A|²:": "  Intensity |A|^2:",
        "양-밀스 이론이": "Yang-Mills theory localized on",
        "상에 국소화되었습니다.": "D-branes.",
        "끈 스케일에서의 결합 대칭성: g_YM =": "Gauge coupling at string scale: g_YM =",
        "4차원 중력 대비 게이지 힘 강도 비율: 1 :": "Ratio of gravity to gauge strength: 1 :",
        "이는 초끈의 고에너지 영역에서 게이지 힘과 중력이 기하학적으로 통합됨을 시연합니다.": "This demonstrates geometric unification of gauge forces and gravity in the high-energy string regime.",
        "  1. 통계적 미시 상태 (S_micro):": "  1. Statistical Microstate Entropy (S_micro):",
        "  2. 거시 블랙홀 면적 (S_BH):": "  2. Bekenstein-Hawking Entropy (S_BH):",
        "  3. Cardy 등가 공식 (S_Cardy):": "  3. Cardy Entropy Formula (S_Cardy):",
        "  • 유효 중앙 전하 (c = 6·Q₁·Q₅):": "  • Central Charge (c = 6 * Q_1 * Q_5):",
        "  • 세 공식 일치 비율 (Ratio):       1.000000 (100.00% 일치)": "  • Correspondence Ratio: 1.000000 (100.00% Match)",
        "  ↳ 이론 검증: D1-D5-P 블랙홀의 5차원 BPS 미시상태 수(Strominger-Vafa)와 2D CFT 경계 상의 Cardy 엔트로피 공식, 그리고 벌크 AdS 시공간의 Bekenstein-Hawking 엔트로피가 완벽하게 양방향(Holographic) 대응을 이룹니다.": "  ↳ D1-D5-P black hole microstate counts (Strominger-Vafa), 2D CFT Cardy formula, and bulk Bekenstein-Hawking entropy achieve exact holographic agreement.",
        "Boundary CFT 연산자 (4D)  ↔  Bulk AdS 필드 (5D)": "Boundary CFT Operator (4D)  ↔  Bulk AdS Field (5D)",
        "• Chiral Primary (O₂):    m²R² = -4.0 (초중력 스칼라)": "• Chiral Primary (O₂):    m²R² = -4.0 (Supergravity Scalar)",
        "• tr F² (Dilaton Operator): m²R² =  0.0 (무질량 딜라톤)": "• tr F² (Dilaton Operator): m²R² =  0.0 (Massless Dilaton)",
        "• KK Excited State (O₆):   m²R² = 12.0 (질량성 KK 스칼라)": "• tr F² (Dilaton Operator): m²R² =  0.0 (Massless Dilaton)",
        "Boundary Perturbative CFT / Highly Curved Quantum String.": "Boundary Perturbative CFT / Highly Curved Quantum String.",
        "강한 시공간 곡률로 양자 중력 이상이 작용하여 고전적 아인슈타인 초중력 근사가 불가능합니다.": "Classic Einstein supergravity approximation is invalid due to strong quantum gravity effects.",
        "Intermediate Coupling. 반클래식 끈 요동 및 보정 계수가 활성화됩니다.": "Intermediate Coupling. Semiclassical string fluctuations are active.",
        "Strong CFT / Weak Classical Supergravity.": "Strong CFT / Weak Classical Supergravity.",
        "AdS 반경 R_ads =": "AdS curvature radius R_ads =",
        "로 시공간이 평평해져 클래식 Einstein 초중력 계산이 고도로 정확합니다!": "l_s >> l_s. Spacetime curvature is weak; classical Einstein supergravity is highly accurate!",
        "우주끈 루프 동역학 및 중력파 버스트 분석 결과:": "Cosmic String Loop Dynamics & GW Burst Results:",
        "  • 무차원 장력 (Gμ):": "  • Dimensionless tension (Gμ):",
        "  • 고유 루프 질량 (Mass):": "  • Loop solar mass (Mass):",
        "  • 방출 중력파 일률(Power):": "  • GW radiation power (Power):",
        "  • 중력 댐핑 수명 (τ):": "  • Gravitational damping lifetime (τ):",
        "  • 1Hz Cusp 변형률 h(f):": "  • 1Hz Cusp strain amplitude h(f):",
        "  • 감지 가능 상태:": "  • Detectability status:",
        "  • 유효 e-folds 수 (N_e):": "  • Effective e-folds (N_e):",
        "Type IIA 결합 상수가 강해짐에 따라": "As the Type IIA coupling constant grows",
        "반경의 11번째 공간 차원이 크게 발현되어 11차원 M-이론으로 대통합됩니다.": "an 11th spatial dimension emerges, unifying the system under 11D M-Theory.",
        "Type IIB 결합 상수가 강해짐에 따라 상쌍대성(S-Duality)이 동작하여, 결합 상수 g_s'=": "As the Type IIB coupling constant grows, S-Duality transforms the system into a weakly coupled dual theory with g_s' =",
        "를 가지는 가벼운 기본 끈(F1)과 무거운 D1-브레인의 역할이 반전된 가상 약결합 IIB 이론과 완벽하게 매치됩니다.": ", exchanging fundamental strings (F1) and D1-branes.",
        "Type I 개방현 이론의 강결합 한계는 상쌍대성에 의해 결합 상수 g_s'=": "The strong coupling limit of Type I open string theory is mapped to weakly coupled Heterotic SO(32) with g_s' =",
        "를 가진 Heterotic SO(32) 폐곡선 이론의 약결합 한계로 매핑됩니다.": " via S-Duality.",
        "Heterotic SO(32) 폐곡선 이론의 강결합 한계는 상쌍대성에 의해 결합 상수 g_s'=": "The strong coupling limit of Heterotic SO(32) is mapped to weakly coupled Type I with g_s' =",
        "인 Type I 개방현 이론의 약결합 한계로 완벽히 상쇄 매핑됩니다.": " via S-Duality.",
        "압축 반경 R=": "As the compactification radius R =",
        "가 스트링 스케일(R < 1)보다 훨씬 작아짐에 따라 T-이중성이 활성화되어, 반경 R'=": "l_s decreases below the string scale, T-Duality maps the system to radius R' =",
        "를 가진": "under",
        "와 모든 양자 질량 스펙트럼이 엄밀하게 동등해집니다.": ", preserving the entire physical mass spectrum.",
        "약결합 및 거시적 차원 반경 영역에 위치하며, 기존": "Located in the weak coupling/macroscopic regime, where the standard",
        "초대칭적 끈 섭동 이론의 테두리 안에서 안정적인 물리 상태가 기술됩니다.": "supersymmetric perturbation description remains stable.",
        "초대칭 이중성 변환 결과 분석:": "Supersymmetric Duality Transformation Results:",
        "  • 기점 이론:": "  • Origin Theory:",
        "  • 현재 결합 상수 g_s:": "  • Current Coupling constant g_s:",
        "  • 압축 반경 R:": "  • Compactification radius R:",
        "  • 활성 물리 영역:": "  • Active Physical Regime:",
        "  • ↳ 결과:": "  • ↳ Result:",
        "양자 불연속 행렬 위상 (Discrete SU(2) Matrix state active)": "Discrete SU(2) Matrix State Active",
        "초차원 fuzzy 막 진동상 (Stabilized quantum non-commutative membrane)": "Stabilized Quantum Non-commutative Membrane",
        "반클래식 기하학적 2-브레인 수렴 (Classical continuous M2-brane continuum limit reached!)": "Classical Continuous M2-brane Continuum Limit Reached!",
        "EFT가 늪지대(Swampland)에 빠졌습니다": "EFT in Swampland",
        "EFT가 Landscape(지형)에 위치합니다: 모듈러스 거리가 한계 내에 있어 KK 상태가 안정적이며 q/m 비가 극대 블랙홀 제한을 만족합니다.": "EFT in Landscape: Moduli distance is within stable limits, KK towers are heavy, and the q/m ratio satisfies the WGC.",
        "  • T-modulus 체적:": "  • T-modulus volume:",
        "  • 진공 잠재 에너지 V(T):": "  • Vacuum potential V(T):",
        "  • 1차 미분 V'(T):": "  • 1st derivative V'(T):",
        "  • 2차 미분 V''(T):": "  • 2nd derivative V''(T):",
        "  • moduli 고정 상태:": "  • Moduli stabilization status:",
        "  • dS Swampland 위반 여부:": "  • de Sitter Swampland violation:",
        "스타 곱": "Star Product",
        "스타곱": "Star Product",
        "자연계의 모든 입자는 중력이 가장 약한 힘이어야 한다는 조건": "Every particle in nature must satisfy the Weak Gravity Conjecture",
        "을 만족해야만 안정적으로 붕괴할 수 있습니다.": "to decay stably.",
        "초끈의 특정 진동 수준과 압축화 차원의 양자화된 모멘텀을 설정하여 4차원의 실제 소립자를 합성합니다.": "Set quantum numbers to construct physical particles from closed or open string oscillations.",
        "물리적 결과: Heterotic E8xE8을 본 칼라비-야우 다양체에 압축화하면 E8 하나가 SU(3) 홀로노미에 의해 깨져 E6 GUT 그룹이 되며, 4차원상에 정확히": "Physical result: Compactifying Heterotic E8xE8 on this CY manifold breaks one E8 group via SU(3) holonomy to E6 GUT, yielding exactly",
        "세대의 페르미온 입자가 출현합니다.": "generations of chiral fermion particles in 4D.",
        "대기 중": "Waiting",
        "안정화 고정됨": "Stabilized",
        "요동 중": "Unstabilized",
        "위반": "Violated",
        "만족": "Satisfied",
        "대표 연산자 이중성 매핑": "Representative Operator Duality Mapping",
        "태양 진동": "Solar Oscillation",
        "대기 진동": "Atmospheric Oscillation"
    };

    function getTranslation(text) {
        const trimmed = text.trim();
        if (TRANSLATION_MAP[trimmed]) return TRANSLATION_MAP[trimmed];
        
        for (let key in TRANSLATION_MAP) {
            if (trimmed.includes(key)) {
                return trimmed.replace(key, TRANSLATION_MAP[key]);
            }
        }
        
        // Auto extract parentheses
        const match = trimmed.match(/^([가-힣\s\d&,/~.-]+)\s*\(([^)]*[a-zA-Z]{2,}[^)]*)\)$/);
        if (match) {
            return match[2].trim();
        }

        return null;
    }

    let observer = null;
    const observerConfig = {
        childList: true,
        subtree: true,
        characterData: true
    };

    function startObserving() {
        if (observer) {
            observer.observe(document.body, observerConfig);
        }
    }

    function stopObserving() {
        if (observer) {
            observer.disconnect();
        }
    }

    function isMathJax(node) {
        let curr = node;
        while (curr) {
            if (curr.nodeType === 1) {
                const tagName = curr.tagName || "";
                if (tagName.startsWith("MJX")) return true;
                if (curr.classList && (curr.classList.contains("mjx-container") || curr.classList.contains("MathJax"))) return true;
            }
            curr = curr.parentNode;
        }
        return false;
    }

    function translateNode(node, lang) {
        const isEn = lang === "en";
        if (node.nodeType === 3) {
            if (isMathJax(node)) return;
            const val = node.nodeValue;
            const trimmed = val.trim();
            if (trimmed && /[가-힣]/.test(trimmed)) {
                if (!node._originalKoText) {
                    node._originalKoText = val;
                }
                if (isEn) {
                    const translated = getTranslation(trimmed);
                    if (translated) {
                        const leadingWs = val.match(/^\s*/)[0];
                        const trailingWs = val.match(/\s*$/)[0];
                        node.nodeValue = leadingWs + translated + trailingWs;
                    }
                }
            }
        } else if (node.nodeType === 1) {
            const tagName = node.tagName || "";
            if (tagName === "SCRIPT" || tagName === "STYLE" || tagName === "TEXTAREA" || tagName.startsWith("MJX")) {
                return;
            }
            if (node.classList && (node.classList.contains("mjx-container") || node.classList.contains("MathJax"))) {
                return;
            }
            node.childNodes.forEach(child => translateNode(child, lang));
        }
    }

    function restoreKo(node) {
        if (node.nodeType === 3) {
            if (isMathJax(node)) return;
            if (node._originalKoText) {
                node.nodeValue = node._originalKoText;
            }
        } else if (node.nodeType === 1) {
            const tagName = node.tagName || "";
            if (tagName === "SCRIPT" || tagName === "STYLE" || tagName === "TEXTAREA" || tagName.startsWith("MJX")) {
                return;
            }
            if (node.classList && (node.classList.contains("mjx-container") || node.classList.contains("MathJax"))) {
                return;
            }
            node.childNodes.forEach(restoreKo);
        }
    }

    const TAB_DESCRIPTIONS = {
        explorer: {
            ko: "5대 초끈 이론(Type IIA, IIB, I, Heterotic) 및 11차원 M-이론의 무질량 입자 스펙트럼과 허용된 D-브레인을 비교 탐색합니다.",
            en: "Explore massless spectra and allowed D-branes across the 5 superstring theories and 11D M-Theory."
        },
        assembly: {
            ko: "세계면 섹터(NS-NS, R-R 등)와 진동수 및 감김 수(Winding)를 설정하여 4차원의 실제 소립자를 합성합니다.",
            en: "Synthesize 4D elementary particles by configuring worldsheet sectors, vibration modes, and winding numbers."
        },
        scattering: {
            ko: "고에너지 영역에서 Mandelstam 변수를 조절하여 4점 끈 산란 진폭(Virasoro-Shapiro)과 공명 스펙트럼을 분석합니다.",
            en: "Analyze 4-point string scattering amplitudes (Virasoro-Shapiro) and resonance spectrums using Mandelstam variables."
        },
        holography: {
            ko: "D1-D5-P 블랙홀의 BPS 미시상태 수를 계산해 Cardy 공식을 통한 CFT 엔트로피와 베켄슈타인-호킹 중력 엔트로피의 일치성을 검증합니다.",
            en: "Verify the equivalence of statistical microstate entropy and gravitational Bekenstein-Hawking entropy via D1-D5-P black holes."
        },
        cosmology: {
            ko: "우주끈의 장력(Gμ)과 루프 크기에 따른 중력파 신호 및 KKLT 브레인 급팽창의 CMB 우주 마이크로파 배경 물리량을 계산합니다.",
            en: "Calculate gravitational wave signals from cosmic strings and cosmic microwave background (CMB) parameters from KKLT inflation."
        },
        dualities: {
            ko: "끈 결합 상수(g_s)와 반경(R) 공간을 결합하여 S-이중성(강결합-약결합) 및 T-이중성(대-소 반경) 통합 관계를 시뮬레이션합니다.",
            en: "Simulate S-duality and T-duality maps connecting different superstring regimes in M-theory."
        },
        swampland: {
            ko: "저에너지 유효장론이 양자중력과 모순되지 않는지 moduli 안정화 조건(SDC, dS, 약중력 추측)을 통해 검증합니다.",
            en: "Verify if low-energy effective field theories are consistent with quantum gravity using Swampland conjectures."
        },
        "standard-model": {
            ko: "Hodge 수와 Wilson Line 이산 몫군구조를 활용해 10차원 기하학에서 3세대 표준모형 기본 입자 및 유카와 결합을 유도합니다.",
            en: "Derive 3-generation Standard Model particles and Yukawa couplings from 10D geometry using Hodge numbers."
        },
        diagnostics: {
            ko: "시공간 차원(D)과 게이지군을 변경해 등각 변칙(total central charge) 및 Virasoro 대수의 고스트 상태 발생을 진단합니다.",
            en: "Diagnose conformal anomalies and ghost states in the Virasoro algebra by varying spacetime dimensions and gauge groups."
        },
        higgs: {
            ko: "초대칭(SUSY) 깨짐 스케일에 따른 힉스 퍼텐셜 대칭성 깨짐(EWSB)과 끈 스케일 우-카이럴 중성미자 시소 메커니즘을 연산합니다.",
            en: "Compute Higgs potential symmetry breaking (EWSB) and heavy Majorana neutrino seesaw mechanisms."
        },
        mirror: {
            ko: "칼라비-야우 A-모델과 B-모델 사이의 거울 대칭성을 분석하고 Leech 격자 위상 몫공간의 Gromov-Witten 불변량을 계산합니다.",
            en: "Analyze mirror symmetry between A- and B-models, computing Gromov-Witten invariants."
        },
        amplituhedron: {
            ko: "게이지 이론의 파인만 다이어그램을 대체하는 외적 기하학(진폭면체)을 구현해 수만 개의 산란 진폭을 단순 기하학적 부피로 계산합니다.",
            en: "Compute gauge theory scattering amplitudes as geometric volumes using the multi-dimensional Amplituhedron."
        },
        "string-field": {
            ko: "끈의 모든 진동 상태를 무한 차원 장(Field)으로 제안하는 끈장론(SFT)에서 센(Sen)의 퍼텐셜 에너지를 유도하고 타키온 붕괴를 관측합니다.",
            en: "Study string field theory (SFT), Sen's potential, and tachyon condensation energy profiles."
        },
        "page-curve": {
            ko: "정보 역설을 해결하는 블랙홀 얽힘 엔트로피의 Page 곡선과 여차원 시공간 벌크 상의 복소 위상 기하 섬(Island) 효과를 모사합니다.",
            en: "Track black hole entanglement entropy Page curves and quantum extremization islands."
        },
        "osv-topological": {
            ko: "Topological A/B-모델 자유에너지와 OSV 엔트로피 이중성(S_BH = ln|Ψ|^2)을 계산하고 오구리-스트로민저-바파 공식을 검증합니다.",
            en: "Compute topological string partition functions and verify Oguri-Strominger-Vafa (OSV) entropy dualities."
        },
        "seiberg-witten": {
            ko: "N=2 초대칭 게이지 이론의 저에너지 유효 작용소를 도출하고 모듈러 타원곡선 변동에 따른 BPS 단극자(monopole) 질량을 연산합니다.",
            en: "Solve low-energy N=2 SUSY gauge theories and BPS monopole mass spectrums via Seiberg-Witten geometry."
        },
        "k-theory": {
            ko: "위상 불변량인 위상 K-이론 군(K_0(X))을 정의하여 일반 호몰로지 대수로 분류되는 D-브레인의 등가 양자 전하와 안정성을 분류합니다.",
            en: "Classify allowed D-brane charges and topological stability using mathematical K-theory."
        },
        "f-theory": {
            ko: "Axion-dilaton 결합 상수를 추가 2차원 torus 복소 구조로 기하학화한 12차원 F-이론에서 Elliptic Fibration 타원 특이점(ADE 분류)을 추출합니다.",
            en: "Extract ADE gauge symmetries and elliptic fibration singularities in 12-dimensional F-theory."
        },
        "matrix-model": {
            ko: "BFSS 행렬 작용소 및 IKKT 행렬 모형의 Large N 고유값 분포로부터 연속적인 비가환 시공간과 중력이 창발하는 대수학을 연산합니다.",
            en: "Compute emergent spacetime and gravity from large-N matrix configurations (BFSS/IKKT models)."
        },
        "tensor-network": {
            ko: "MERA/HaPPY 양자 오류 정정 부호 텐서망을 설계하여 경계 CFT의 양자 얽힘이 벌크 AdS 곡률 기하학을 유도하는 홀로그래피를 시뮬레이션합니다.",
            en: "Model bulk AdS gravity and Ryu-Takayanagi minimal areas emerging from boundary CFT MERA tensor networks."
        },
        "non-commutative": {
            ko: "스타 곱(Moyal Product) 공간 [X^μ, X^ν] = i θ^μν 상의 세계면 결합을 계산하고 시공간 최소 면적 불확정성을 가시화합니다.",
            en: "Calculate Moyal-Weyl star products and examine coordinate non-commutativity limits."
        },
        "chern-simons": {
            ko: "3차원 Chern-Simons 게이지 작용과 레벨(k)을 조정하여 Trefoil 매듭의 위상적 기하학 불변량(Jones Polynomial)을 산출합니다.",
            en: "Solve 3D Chern-Simons topological quantum field theories and calculate Trefoil knot Jones polynomials."
        },
        celestial: {
            ko: "4차원 산란 진폭을 Mellin 변환을 통해 2차원 천구(Celestial Sphere) 등각상관 함수로 변환하고 BMS 초대칭 대수 전하를 유도합니다.",
            en: "Map 4D scattering amplitudes to 2D celestial sphere conformal blocks using Mellin transforms."
        },
        "generalized-geom": {
            ko: "접다발과 여접다발의 합인 T ⊕ T* 상의 일반화된 복소 구조와 Courant 괄호식을 정의해 Type II 초대칭 플럭스 기하학을 통합합니다.",
            en: "Unify Kähler and complex structures on tangent-cotangent bundles using Generalized Geometry."
        },
        "loop-gravity": {
            ko: "스핀 네트워크 기하학의 불연속적 시공간에서 면적 연산자(Area Operator)의 양자화된 고유값을 도출하고 Immirzi 변수 비율을 산정합니다.",
            en: "Compute quantized area operator eigenvalues on spin network nodes in Loop Quantum Gravity."
        },
        "non-geometric-flux": {
            ko: "끈이 감긴 감김 차원의 모노드로미 전이에서 발생하는 비기하학 플럭스 Q, R로 인해 유도되는 비가환/비결합 평탄 좌표계 작용을 계산합니다.",
            en: "Track non-geometric fluxes (Q, R) and coordinate non-associativity in T-fold backgrounds."
        },
        "conformal-bootstrap": {
            ko: "Crossing Symmetry 조건을 만족하는 연산자 곱 전개(OPE) 수치 범위를 설정하여 등각 3차원 Ising 모형의 임계 경계를 차트화합니다.",
            en: "Map non-perturbative bounds on conformal CFT operator dimensions using crossing symmetry bootstrap."
        },
        "integrable-deformations": {
            ko: "양-백스터(Yang-Baxter) 변형식을 통해 2차원 비선형 시그마 모형의 가적분성(Integrability)을 해소하고 중력 배경 다양체를 변형합니다.",
            en: "Calculate background deformations (such as eta-deformations) preserving integrable Lax connections."
        },
        resurgence: {
            ko: "섭동 전개 계수의 계승적 발산 거동에서 Borel 적분 특이점을 검출하고, Picard-Lefschetz saddle 변환을 거쳐 비섭동 instanton 가중치를 복원합니다.",
            en: "Reconstruct non-perturbative physics from divergent perturbation series via Borel resurgence and Lefschetz thimbles."
        },
        "padic-string": {
            ko: "p-진수 정수체(Q_p)의 월드시트 가환계를 구성하여 Freund-Olson p-adic 타키온 산란 진폭 및 아델릭 곱 공식을 계산합니다.",
            en: "Calculate tree-level amplitudes over p-adic number fields and verify the Adelic product formula."
        },
        "mock-modular": {
            ko: "K3 표면의 Elliptic genus 분배함수의 비홀로모픽 Maass completion 계수를 산출하여 Mathieu 군 M_24 표현론 차원과 대조합니다.",
            en: "Calculate mock modular forms and Mathieu group M24 representation dimensions of K3 elliptic genera."
        },
        "carrollian-physics": {
            ko: "광속 한계가 영으로 수렴하는 극단적 캐롤 극한(c -> 0) 시공간의 벡터장 변동성과 천구 등각장 초대칭 전하를 도출합니다.",
            en: "Explore Carrollian limits (c -> 0) and flat space holography at null infinity."
        },
        "non-invertible": {
            ko: "군론적 대칭성을 넘어서는 Fusion Category 결합선 교차를 설계하고, 위상 결함 결합에 따른 비가역적 대칭성 파동함수를 연산합니다.",
            en: "Evaluate fusion Category defect line (TDL) intersections and non-invertible symmetry actions."
        },
        "boundary-sft": {
            ko: "경계 등각장론(BCFT) 타키온 응축 퍼텐셜 V(T)에 따른 D-브레인 소멸 과정의 임계 분배함수와 잔여 에너지 흐름을 수치 모델링합니다.",
            en: "Model D-brane decay and energy-momentum tensor transitions under Boundary String Field Theory."
        },
        "freed-witten": {
            ko: "D-브레인 월드시트에 통과하는 게이지 B-필드 플럭스에 의해 발생하는 코호몰로지 변칙 W_3(W) + [H] = 0 기하 상쇄를 검증합니다.",
            en: "Verify the topological obstruction cancelation class for D-branes in flux backgrounds."
        },
        "theory-summary": {
            ko: "35개 물리 시뮬레이션의 수학적 정밀성과 상호 연관성(이중성, 변칙 상쇄, 게이지 변환 등)을 한눈에 요약 진단하는 대시보드 리포트입니다.",
            en: "View a unified synthesis of the mathematical physics, connection mappings, and consistency metrics of all labs."
        }
    };

    function translatePage(lang) {
        stopObserving();
        try {
            if (lang === "en") {
                translateNode(document.body, "en");
            } else {
                restoreKo(document.body);
            }
        } finally {
            startObserving();
        }
    }

    // Register hooks
    document.addEventListener("DOMContentLoaded", () => {
        const langButtons = document.querySelectorAll(".lang-pill-btn");
        
        langButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const lang = btn.getAttribute("data-lang");
                setTimeout(() => {
                    translatePage(lang);
                }, 50);
            });
        });
        
        // Initial run
        setTimeout(() => {
            const activeLang = document.querySelector(".lang-pill-btn.active")?.getAttribute("data-lang") || "en";
            translatePage(activeLang);
        }, 100);

        // Tooltip Engine for Navigation Tabs
        const tooltip = document.createElement("div");
        tooltip.className = "custom-tab-tooltip";
        document.body.appendChild(tooltip);

        const tabButtons = document.querySelectorAll(".tab-btn");
        tabButtons.forEach(btn => {
            const tabId = btn.getAttribute("data-tab");
            if (!TAB_DESCRIPTIONS[tabId]) return;

            btn.addEventListener("mouseenter", () => {
                const currentLang = document.querySelector(".lang-pill-btn.active")?.getAttribute("data-lang") || "en";
                const desc = TAB_DESCRIPTIONS[tabId][currentLang] || TAB_DESCRIPTIONS[tabId]["en"];
                tooltip.innerText = desc;
                tooltip.classList.add("visible");

                // Position calculation
                const rect = btn.getBoundingClientRect();
                const tooltipWidth = tooltip.offsetWidth;
                const tooltipHeight = tooltip.offsetHeight;

                let left = rect.left + (rect.width - tooltipWidth) / 2 + window.scrollX;
                let top = rect.top - tooltipHeight - 8 + window.scrollY;

                // Adjust to show below if it's too close to top
                if (rect.top - tooltipHeight - 8 < 10) {
                    top = rect.bottom + 8 + window.scrollY;
                }
                if (left < 10) left = 10;
                if (left + tooltipWidth > window.innerWidth - 10) {
                    left = window.innerWidth - tooltipWidth - 10;
                }

                tooltip.style.left = `${left}px`;
                tooltip.style.top = `${top}px`;
            });

            btn.addEventListener("mouseleave", () => {
                tooltip.classList.remove("visible");
            });

            btn.addEventListener("click", () => {
                tooltip.classList.remove("visible");
            });
        });
        
        // MutationObserver to watch text changes
        observer = new MutationObserver((mutations) => {
            const currentLang = document.querySelector(".lang-pill-btn.active")?.getAttribute("data-lang") || "en";
            if (currentLang === "en") {
                stopObserving();
                try {
                    mutations.forEach(mutation => {
                        if (mutation.type === "childList") {
                            mutation.addedNodes.forEach(node => {
                                if (!isMathJax(node)) {
                                    translateNode(node, "en");
                                }
                            });
                        } else if (mutation.type === "characterData") {
                            if (!isMathJax(mutation.target)) {
                                translateNode(mutation.target, "en");
                            }
                        }
                    });
                } finally {
                    startObserving();
                }
            }
        });
        
        startObserving();
    });
})();
