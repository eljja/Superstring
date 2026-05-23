# 🪐 Superstring Hub (초끈 데이터베이스 & 시각화 계산기)

초끈 이론(Superstring Theory)의 모든 물리적 특성을 수학적으로 공식화하여 데이터베이스화하고, 이를 직관적으로 탐색 및 시각화할 수 있도록 지원하는 **초끈 이론 연산 백엔드 패키지** 및 **인터랙티브 웹 대시보드(GUI)** 통합 프로젝트입니다.

이 프로젝트는 추후 진행할 **소립자 시뮬레이터(Elementary Particle Simulator)**의 완벽한 물리 연산 및 데이터 라이브러리 역할을 수행하도록 설계되었습니다.

* **GitHub Pages 배포 주소 (웹 데모):** [https://eljja.github.io/Superstring/](https://eljja.github.io/Superstring/)

---

## 🌌 주요 특징 (Key Features)

### 1. 5대 consistent 초끈 이론 및 M-이론 데이터 모델화 (`superstring_db`)
* **강타입 데이터 검증**: Pydantic 모델을 사용하여 `Type I`, `Type IIA`, `Type IIB`, `Heterotic SO(32)`, `Heterotic E8×E8`, `M-이론`의 모든 대칭성, 차원, 게이지 그룹, 작용식, 허용되는 브레인 등을 엄격하게 규격화하였습니다.
* **무질량 스펙트럼 수록**: 중력자($g_{\mu\nu}$), 딜라톤($\phi$), Kalb-Ramond 필드($B_{\mu\nu}$), 각 이론별 Ramond-Ramond 폼 필드($C_p$)와 초대칭 짝 입자들(Gravitino, Dilatino, Gaugino)을 완벽히 데이터화했습니다.

### 2. 정밀 물리 연산 엔진 (Computational Physics Solvers)
* **끈 가진 스펙트럼**: 열린 끈과 닫힌 끈의 NS(Neveu-Schwarz) 및 R(Ramond) 섹터 가진 질량($M^2 = \frac{N-a}{\alpha'}$, $M^2 = \frac{4(N-a)}{\alpha'}$) 연산.
* **원주 압축화 (Toroidal Compactification)**: $S^1$ 공간 압축화에 따른 Kaluza-Klein(KK) 모멘텀 모드($n$)와 Winding 감김 모드 ($w$)의 질량 분리 계산 및 수준 일치 조건(Level Matching) 확인.
* **브레인 장력 계산**: D-브레인 ($Dp$-branes) 및 솔리토닉 $NS5$-브레인 장력 수식 계산.
* **이중성 (Dualities)**: 강결합-약결합 물리량 맵을 다루는 **S-이중성**($g_s \leftrightarrow 1/g_s$) 및 반경 역전을 다루는 **T-이중성**($R \leftrightarrow \alpha'/R$) 맵 구현.
* **칼라비-야우 압축화 세대수 연산**: 호지 수(Hodge numbers, $h^{1,1}, h^{2,1}$) 입력을 통해 4차원 상에 출현할 유효 표준모형의 페르미온 **세대 수**($N_{gen} = |h^{1,1} - h^{2,1}|$) 유도.

### 3. 소립자 시뮬레이터 연동용 DB 자동 내보내기 (JSON & SQLite)
* 시뮬레이터 프로그램 개발 시 즉각적으로 데이터를 가져다 연동할 수 있도록 구조화된 JSON 데이터 및 완전 정규화된 4개의 테이블 구조 SQLite 데이터베이스를 내장하고 있습니다.

### 4. 시네마틱 우주 테마 웹 대시보드 (Web GUI)
* **초끈 진동 실시간 시뮬레이터**: 광자, 중력자, 딜라톤, 타키온, KK/Winding 모드의 실제 조화 파동 함수 및 진행파 편향 진동 하모닉스를 HTML5 Canvas 상에 Pseudo-3D 글로잉 그래픽으로 구현.
* **인터랙티브 계산 패널**: 브라우저 상에서 즉석으로 α' 계수, 좌우 진동수, 압축화 반경, 호지 수를 대입하여 물리 값을 계산하고 T-이중성 대칭점을 도식화해주는 탐색기 제공.

---

## 📂 프로젝트 구조 (File Hierarchy)

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
├── style.css                     # Cosmic UI 유리효과 스타일시트
├── app.js                        # 실시간 끈 진동 시뮬레이션 및 수식 처리 프론트엔드 엔진
├── superstring_db.json           # 내보내기 완료된 정밀 JSON 데이터베이스
├── superstring_db.sqlite         # 내보내기 완료된 SQLite 관계형 데이터베이스
├── LICENSE                       # 저장소 라이선스 파일
├── run_dashboard.py              # 로컬 테스트용 원클릭 HTTP 서버 구동 유틸
└── README.md                     # 본 가이드 문서
```

---

## 🚀 시작하기 및 사용 방법 (Quick Start)

### 1. 로컬 환경에서 대시보드 실행하기 (GUI)
별도의 복잡한 웹서버 세팅 없이, 파이썬 기본 라이브러리를 사용해 로컬 웹서버를 즉시 구동하고 브라우저로 대시보드를 열어볼 수 있습니다.
```bash
python run_dashboard.py
```
실행 시 자동으로 브라우저가 실행되며 `http://localhost:8000` 경로를 통해 시각화 대시보드가 열립니다.

### 2. 물리 연산 엔진 신뢰도 테스트 (Unit Tests)
이론 수식과 이중성 변환의 자아일관성(T-이중성 대칭 질량 동등성)을 검증하기 위한 단위 테스트가 내장되어 있습니다.
```bash
python -m unittest tests/test_solvers.py
```

### 3. 소립자 시뮬레이터 연동을 위한 데이터 활용
시뮬레이터 프로그램(C++, Rust, Python 등) 개발 시 데이터베이스 파일들을 로드해 사용합니다.

#### Python 패키지 임포트 예제
```python
from superstring_db import THEORIES, calculate_kk_winding_mass

# Type IIB 이론의 D-브레인 목록 탐색
iiB = THEORIES["Type_IIB"]
for brane in iiB.allowed_branes:
    print(f"브레인: {brane.name}, 장력 수식: {brane.tension_formula}")

# 압축화 KK 모드와 Winding 모드가 합성된 가진 상태의 물리 질량 계산
result = calculate_kk_winding_mass(n=1, w=1, R=2.5, alpha_prime=1.0)
print(f"가진 질량: {result['mass']} GeV, 수준 일치 충족 여부: {result['level_matched']}")
```

---

## 🪐 물리적 타당성 검증 (Physics Verification)

본 라이브러리의 계산식은 다음과 같은 조화 파동 함수 및 이론 물리학 교재의 엄밀한 유도식을 반영하고 있습니다:
* **Neveu-Schwarz (NS) zero-point energy**: $a_{NS} = 1/2$
* **Ramond (R) zero-point energy**: $a_{R} = 0$
* **T-이중성 반경 반전 수식**: $R' = \alpha'/R$
* **T-이중성 대칭 동등**: 반경 $R$에서 $(n,w)$ 상태의 질량은 반경 $R'$에서 $(w,n)$ 상태의 질량과 수리적으로 소수점 아래 무한대 자리까지 정확히 동일하게 계산됨을 증명 및 테스트 완료.
* **Calabi-Yau 3-fold 오일러 수 및 세대 수 유도**: $\chi = 2(h^{1,1} - h^{2,1}) \implies N_{gen} = \frac{|\chi|}{2}$

---

## 📄 라이선스 (License)
본 프로젝트는 기존 저장소에 포함된 오픈소스 라이선스 정책을 따릅니다.
Detailed license terms can be found in the [LICENSE](file:///d:/Code/Superstring/LICENSE) file.
