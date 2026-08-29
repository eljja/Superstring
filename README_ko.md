# 🪐 Superstring Hub (초끈 데이터베이스 & 통합 시각화 시뮬레이터)

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Version](https://img.shields.io/badge/Version-v1.1.0_Stable-purple.svg)](https://eljja.github.io/Superstring/)
[![GitHub Pages](https://img.shields.io/badge/Live_Demo-GitHub_Pages-success.svg)](https://eljja.github.io/Superstring/)
[![Physics Labs](https://img.shields.io/badge/실험실-35개_시뮬레이터-cyan.svg)](https://eljja.github.io/Superstring/)
[![Theory Chapters](https://img.shields.io/badge/이론_챕터-65개_챕터-orange.svg)](https://eljja.github.io/Superstring/)

[English version is available here.](README.md)

**Superstring Hub**는 10차원 5대 초끈 이론(`Type IIA`, `Type IIB`, `Type I`, `Heterotic SO(32)`, `Heterotic E8×E8`) 및 11차원 M-이론의 물리 스펙트럼과 수학적 공식 체계를 엄밀하게 공식화하여 데이터베이스화하고, 이를 인터랙티브하게 탐색·계산·시각화할 수 있도록 지원하는 **초끈 이론 연산 백엔드 패키지** 및 **인터랙티브 웹 대시보드(GUI)** 통합 프로젝트입니다.

* **🌐 웹 시뮬레이터 라이브 데모:** [https://eljja.github.io/Superstring/](https://eljja.github.io/Superstring/)
* **📄 라이선스:** [Apache License 2.0](LICENSE)

---

## 🌟 핵심 플랫폼 기능

* **🧪 35대 인터랙티브 물리 시뮬레이션 실험실:** 끈 스펙트럼, 산란 진폭, 칼라비-야우 기하학, 홀로그래픽 블랙홀 미시상태, 위상 장론, 비섭동 이중성 등을 실시간 연산하는 35개 전문 물리 엔진 탑재.
* **📚 65개 학술 논문급 이론 챕터:** 엄밀한 MathJax LaTeX 수식 유도와 대칭군 표현론을 담은 완전한 이론 핸드북 내장.
* **🌐 실시간 한/영 바이링구얼 엔진:** 완벽한 다국어 전환 지원으로 한글과 영문 페이지 간 기술적 차이 없는 번역 제공.
* **🔍 36개 탭 실시간 빠른 검색 및 5대 카테고리 필터:** 이름, 물리 기호, 연구 분야별로 원하는 실험실을 즉각 검색 및 필터링.
* **🎨 고성능 Cosmic Canvas GUI:** 실시간 3D 칼라비-야우 초곡면 투영, 끈 조화 진동 및 브레인 기하학 시각화.
* **📋 원클릭 수식 및 결과값 복사:** 화면의 LaTeX 수식 및 시뮬레이션 결과값을 클릭 한 번으로 클립보드에 복사.
* **📱 모바일 최적화 및 웹 접근성(A11y):** 모바일 터치 가로 스크롤 및 키보드 `Tab` 탐색 툴팁 지원.

---

## 🌌 35대 인터랙티브 물리 시뮬레이터 구성

5대 물리학 영역별로 체계화된 35개 시뮬레이션 엔진을 제공합니다:

### 1. 기초 및 끈 양자 스펙트럼 (Foundations)
* **🌌 이론 탐색기 (`explorer`):** 5대 초끈 및 11D M-이론의 무질량 입자(중력자, 딜라톤, B-필드, RR 폼) 및 허용된 D-브레인 스펙트럼 분석.
* **🧪 입자 조립 연구소 (`assembly`):** NS-NS, R-R, NS-R, R-NS 섹터와 토러스 압축화($S^1$) KK 모멘텀($n$), 감김 수($w$) 결합 질량 연산 및 수준 일치 조건($N_L - N_R = nw$) 검증.
* **💥 산란 연구소 (`scattering`):** 닫힌끈 Virasoro-Shapiro 및 열린끈 Veneziano 4점 산란 진폭($A(s,t,u)$)과 공명 스펙트럼 계산.
* **🛡️ 이론적 진단실 (`diagnostics`):** 임계 차원($D=10, 26$), 전체 등각 중심 전하 변칙($c_{\text{tot}}$) 및 Virasoro 교환자 대수 계산.
* **📚 대통합 서머리 (`theory-summary`):** 35개 시뮬레이션 엔진의 유기적 연결 관계 및 일관성 종합 리포트.

### 2. 브레인, 이중성 및 기하학 (Branes, Dualities & Geometry)
* **🔗 M-이론 & 이중성 (`dualities`):** 강-약결합 S-이중성($g_s \leftrightarrow 1/g_s$) 및 대-소반경 T-이중성($R \leftrightarrow \alpha'/R$) 맵 연산.
* **🪞 거울 대칭성 (`mirror`):** 칼라비-야우 A-모델 켈러 기하학과 B-모델 복소 구조 사이의 거울 변환 및 Gromov-Witten 불변량 산출.
* **🌀 위상수학적 끈 & OSV (`osv-topological`):** 오구리-스트로민저-바파 엔트로피 이중성($S_{\text{BH}} = \ln |\Psi_{\text{top}}|^2$) 검증.
* **🧬 K-이론 & D-브레인 (`k-theory`):** 위상수학적 K-이론 군($K_0(X)$)에 기초한 D-브레인 RR 전하 보존 분류.
* **🔥 F-이론 & 특이점 (`f-theory`):** 12차원 타원 올다발 Weierstrass 모델($\Delta = 4f^3 + 27g^2$) 및 Kodaira ADE 특이점 분류.
* **🧮 비가환 기하학 (`non-commutative`):** 모얄 스타 곱 좌표 교환자($[X^\mu, X^\nu] = i\theta^{\mu\nu}$) 및 시공간 최소 면적 불확정성 연산.
* **🧬 일반화된 기하학 (`generalized-geom`):** $T \oplus T^*$ 접다발 상의 일반화 복소 구조 및 Courant 괄호식 연산.
* **🌀 비기하학적 플럭스 (`non-geometric-flux`):** T-fold 배경 상의 비결합적 좌표계 작용($[x^i, x^j, x^k] = \frac{3}{2}\hbar^2 R^{ijk}$).
* **🔗 가적분 변형 (`integrable-deformations`):** 2차원 비선형 시그마 모형의 Yang-Baxter $\eta$-변형 및 Lax pair 가적분성 해석.
* **🧬 프리드-위튼 변칙 (`freed-witten`):** 월드시트 게이지 변칙 상쇄 코호몰로지 조건($W_3(W) + [H] = 0$) 검증.

### 3. 홀로그래피, 양자중력 및 우주론 (Holography & Cosmology)
* **🔮 홀로그래피 & 블랙홀 (`holography`):** Strominger-Vafa D1-D5-P 5D BPS 블랙홀 미시상태 수 계산 및 Cardy 공식을 통한 Bekenstein-Hawking 면적 엔트로피 일치 증명 ($S_{\text{micro}} = 2\pi\sqrt{Q_1 Q_5 N_p} \equiv S_{\text{BH}}$).
* **🪐 우주끈 & 인플레이션 (`cosmology`):** 초거대 우주끈 루프 Cusp 진동의 중력파 신호($G\mu$) 및 KKLT 인플레이션의 CMB 급팽창 섭동 파라미터($n_s, r$) 산출.
* **🕳️ 페이지 곡선 & 양자 섬 (`page-curve`):** 호킹 복사의 유니터리 엔트로피 Page 곡선 진화 및 양자 극대 곡면(QES) Island 공식 모사.
* **🕸️ 텐서 네트워크 & MERA (`tensor-network`):** HaPPY 양자 오류 정정 부호 텐서망과 Ryu-Takayanagi 벌크 시공간 창발.
* **🌠 천구 홀로그래피 (`celestial`):** 4D 산란 진폭의 Mellin 변환을 통한 2D 천구 등각 블록 및 BMS 초전하 계산.
* **🕸️ 루프 양자중력 (`loop-gravity`):** 스핀 네트워크 면적 연산자 고유값($\hat{A}|j\rangle = 8\pi\ell_P^2 \gamma \sqrt{j(j+1)}|j\rangle$) 및 Immirzi 변수 계산.
* **🌀 캐롤 시공간 (`carrollian-physics`):** 극단적 광속 소멸 극한($c \to 0$) 및 평평한 시공간 홀로그래피.

### 4. 첨단 장론 및 이론적 미개척 분야 (Advanced Frontiers)
* **🏜️ 늪지대 추측 (`swampland`):** 약중력 추측($q/m \ge 1/\sqrt{2}$), 늪지대 거리 추측($m \sim m_0 e^{-\alpha \Delta\phi}$), dS 양자중력 안정성 판별.
* **⚛️ 표준모형 유도 (`standard-model`):** 칼라비-야우 오일러 수 세대수 도출($N_{\text{gen}} = |h^{1,1} - h^{2,1}| / |G|$) 및 교차 D-막 인스턴톤 유카와 억제($Y \propto e^{-A/\alpha'}$).
* **☀️ 힉스 & 중성미자 시소 (`higgs`):** 초대칭 붕괴 전자기약력 대칭성 깨짐(EWSB) Mexican-hat 퍼텐셜 및 무거운 Majorana 중성미자 시소 메커니즘($m_\nu = m_D^2 / M_R$).
* **💎 진폭면체 (`amplituhedron`):** 파인만 다이어그램을 대체하는 그라스만 다포체 기하학적 부피 산란 진폭 연산.
* **🌌 끈장론 (`string-field`):** 위튼 3차 개방 끈장론 작용 및 센(Sen) 타키온 응축 퍼텐셜($V(T) = V_0(1+T)e^{-T}$).
* **🧲 세이베르크-위튼 (`seiberg-witten`):** $\mathcal{N}=2$ 초대칭 양-밀스 이론의 타원곡선 BPS 다이온 질량 스펙트럼 계산.
* **⬛ 행렬 모델 (`matrix-model`):** BFSS 및 IKKT 대규모 행렬 고유값 분포를 통한 연속 시공간 창발.
* **🌀 천-사이먼스 TQFT (`chern-simons`):** 3D 위상 양자장론 및 Trefoil 매듭의 Jones 다항식($V_K(q)$) 불변량 산출.
* **📐 등각 부트스트랩 (`conformal-bootstrap`):** 교차 대칭성(Crossing Symmetry)을 통한 단일 CFT 스칼라 연산자 차원 경계 도출.
* **📈 되살아남 이론 (`resurgence`):** Borel 특이점 분석 및 Picard-Lefschetz saddle 비섭동 인스턴톤 복원.
* **🔢 p-진수 끈 이론 (`padic-string`):** $\mathbb{Q}_p$ 수체 상의 Freund-Olson 진폭 및 아델릭 곱 공식($A_\infty \cdot \prod_p A_p = 1$) 검증.
* **🪞 마티유 문샤인 (`mock-modular`):** K3 타원 종수(Elliptic genus) Mock 모듈러 형식 및 Mathieu 군 $M_{24}$ 표현론 차원($c(1) = 2 \times 45$) 대응.
* **⛓️ 비가역 대칭성 (`non-invertible`):** 위상 결함선(TDL) Fusion Category 연산 및 비-군론적 대칭성 해석.
* **🌌 경계 끈장론 (`boundary-sft`):** 경계 RG 흐름에 따른 불안정한 D-브레인 붕괴 및 에너지-운동량 텐서 전이.

---

## 📂 저장소 디렉터리 구조

```
Superstring/
├── superstring_db/               # Python 핵심 데이터 & 계산 라이브러리
│   ├── __init__.py               # 패키지 진입점 (API 노출)
│   ├── constants.py              # 자연/플랑크/끈 단위계 물리 상수 및 변환계수
│   ├── models.py                 # Pydantic 데이터 구조 정의
│   ├── data.py                   # 5대 초끈 및 M-이론의 상세 물리 데이터 레지스트리
│   ├── solvers.py                # 질량 스펙트럼, 이중성, 압축화 물리 연산 솔버
│   └── export.py                 # SQLite 및 JSON 데이터베이스 내보내기 유틸
├── tests/
│   └── test_solvers.py           # 수식의 신뢰도를 검증하는 물리 법칙 단위 테스트
├── index.html                    # 웹 대시보드 UI (GitHub Pages 진입점)
├── style.css                     # Cosmic UI 유리효과 및 모바일 반응형 스타일시트
├── app.js                        # 실시간 끈 진동 시뮬레이션 및 수식 처리 프론트엔드 엔진
├── translate_observer.js         # 실시간 한/영 바이링구얼 번역 및 툴팁 컨트롤러
├── sitemap.xml                   # 검색엔진 색인용 사이트맵
├── robots.txt                    # 검색 로봇 접근 설정
├── superstring_db.json           # 내보내기 완료된 정밀 JSON 데이터베이스
├── superstring_db.sqlite         # 내보내기 완료된 SQLite 관계형 데이터베이스
├── package.json                  # 프로젝트 메타데이터 및 테스트 의존성
├── run_dashboard.py              # 로컬 테스트용 원클릭 HTTP 서버 구동 유틸
├── LICENSE                       # Apache License 2.0 라이선스 파일
├── README.md                     # 영문 가이드 문서
└── README_ko.md                  # 국문 가이드 문서 (본 파일)
```

---

## 🚀 시작하기 및 사용 방법

### 1. 로컬 환경에서 웹 대시보드 실행
파이썬 기본 라이브러리를 사용해 로컬 웹서버를 즉시 구동하고 브라우저로 대시보드를 열어볼 수 있습니다.
```bash
python run_dashboard.py
```
실행 시 자동으로 브라우저가 실행되며 `http://localhost:8000` 경로를 통해 시각화 대시보드가 열립니다.

### 2. 물리 연산 엔진 신뢰도 단위 테스트
이론 수식과 이중성 변환의 자아일관성(T-이중성 대칭 질량 동등성)을 검증하기 위한 단위 테스트를 실행합니다.
```bash
python -m unittest tests/test_solvers.py
```

### 3. 소립자 시뮬레이터 연동을 위한 Python 패키지 활용
시뮬레이터 프로그램(C++, Rust, Python 등) 개발 시 데이터베이스 파일들을 로드해 사용합니다.

```python
from superstring_db import THEORIES, calculate_kk_winding_mass

# 1. Type IIB 이론의 D-브레인 목록 탐색
iiB = THEORIES["Type_IIB"]
for brane in iiB.allowed_branes:
    print(f"브레인: {brane.name} | 장력 수식: {brane.tension_formula}")

# 2. 압축화 KK 모드와 Winding 모드가 합성된 가진 상태의 물리 질량 계산
result = calculate_kk_winding_mass(n=2, w=1, R=3.5, alpha_prime=1.0)
print(f"가진 질량: {result['mass']} GeV | 수준 일치 충족: {result['level_matched']}")
```

---

## 🪐 물리적 타당성 검증

본 라이브러리의 계산식은 Green-Schwarz-Witten, Polchinski, Becker-Becker-Schwarz 등 표준 대학원 물리학 교재의 엄밀한 유도식을 반영하고 있습니다:
* **T-이중성 대칭 동등성:** 반경 $R$에서 $(n,w)$ 상태의 질량은 반경 $R'$에서 $(w,n)$ 상태의 질량과 수리적으로 소수점 아래 무한대 자리까지 정확히 동일하게 계산됨을 증명.
* **GSO 투영 검증:** 월드시트 섹터로부터 저에너지 초중력 필드로의 엄격한 사상 규칙 확인.
* **Calabi-Yau 3-fold 오일러 수 검증:** $\chi = 2(h^{1,1} - h^{2,1})$.
* **BPS 엔트로피 일치:** Strominger-Vafa 통계적 미시상태 수 계산식이 거시적 Bekenstein-Hawking 면적 엔트로피와 100.00% 정확도로 일치함을 수학적으로 확인.

---

## 📄 라이선스 (License)

본 프로젝트는 **Apache License 2.0** 조건에 따라 라이선스가 부여됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.
