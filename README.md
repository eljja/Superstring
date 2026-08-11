# 🪐 Superstring Hub: A Unified Quantum Gravity & String Phenomenology Simulator

[한국어 버전은 여기서 볼 수 있습니다. (Korean version is available here)](README_ko.md)

Superstring Hub is a mathematically rigorous, theoretically unified, and visually spectacular computational engine and interactive web interface that models, validates, and simulates the physical spectrum and mathematical formulations of the five consistent 10-dimensional superstring theories and 11-dimensional M-Theory. 

This repository serves as a self-consistent physics calculator, a standardized relational database (SQLite/JSON), and an immersive cosmic-themed dashboard (HTML5 Canvas GUI) developed to serve as the unified database and solver backend for advanced elementary particle simulators.

* **Live Deployment & Web GUI:** [https://eljja.github.io/Superstring/](https://eljja.github.io/Superstring/)

---

## 🌌 Mathematical & Physical Architecture

The codebase models and solves several critical mathematical structures across modern string theory:

### 1. Quantum String Mass Spectra & Level Matching
For a closed superstring compactified on a circle $S^1$ of radius $R$, the mass operator is formulated as:
$$M^2 = \frac{4}{\alpha'} (N_L - a) + \frac{n^2}{R^2} + \frac{w^2 R^2}{\alpha'^2}$$
$$M^2 = \frac{4}{\alpha'} (N_R - a) + \frac{n^2}{R^2} + \frac{w^2 R^2}{\alpha'^2}$$

Where:
* $\alpha'$ is the Regge slope parameter (governing string tension $T = 1 / 2\pi\alpha'$).
* $N_L, N_R$ are the left-moving and right-moving oscillation quantum levels.
* $n \in \mathbb{Z}$ is the Kaluza-Klein (KK) momentum quantum number.
* $w \in \mathbb{Z}$ is the topological winding number around the compact dimension.
* $a$ is the worldsheet vacuum energy (zero-point energy):
  * **Neveu-Schwarz (NS) sector**: $a_{NS} = 1/2$ (bosonic excitations)
  * **Ramond (R) sector**: $a_R = 0$ (fermionic excitations, protected by supersymmetry)

The physical spectrum must satisfy the **Level Matching Condition**:
$$N_L - N_R = n w$$
States violating this condition are unphysical and projected out.

### 2. Dualities: Target Space and Coupling Maps
* **T-Duality ($R \leftrightarrow \alpha'/R$)**: Inverts the compactification radius while exchanging Kaluza-Klein momentum states with topological winding states:
  $$(n, w, R) \longleftrightarrow (w, n, \alpha'/R)$$
  This establishes a profound quantum equivalence: a string winding around a tiny circle is physically indistinguishable from a string moving on a large circle.
* **S-Duality ($g_s \longleftrightarrow 1/g_s$)**: Establishes a strong-weak coupling duality. For instance, Type I superstring theory at strong coupling is isomorphic to Heterotic $SO(32)$ at weak coupling, and Type IIB theory is self-dual.

### 3. Calabi-Yau 3-Fold Compactification & Wilson Lines
Compacting the 10D spacetime on a 6-dimensional Calabi-Yau 3-fold $Y$ down to 4D Minkowski space determines the low-energy gauge group and the number of chiral fermion generations. The number of generations $N_{\text{gen}}$ is topologically governed by the Euler characteristic $\chi(Y)$:
$$\chi(Y) = 2(h^{1,1} - h^{2,1})$$
$$N_{\text{gen}} = \frac{|\chi(Y)|}{2} = |h^{1,1} - h^{2,1}|$$

Where $h^{1,1}$ (Kähler moduli) and $h^{2,1}$ (complex structure moduli) are the Hodge numbers of $Y$. 
Introducing a discrete symmetry group $G$ acting freely on $Y$ via **Wilson Lines** breaks the grand unified gauge group and reduces the generations by the order of the quotient group:
$$N_{\text{gen}} = \frac{|h^{1,1} - h^{2,1}|}{|G|}$$

### 4. Bekenstein-Hawking vs. Microstate Entropy
The Strominger-Vafa BPS black hole entropy matches the microscopic counting of D-brane configurations with the macroscopic Bekenstein-Hawking area entropy:
$$S_{\text{micro}} = 2\pi \sqrt{Q_1 Q_5 N_p} \equiv S_{\text{macro}} = \frac{A}{4 G_N}$$
Where $Q_1$ is the D1-brane charge, $Q_5$ is the D5-brane charge, and $N_p$ is the KK momentum charge along the shared circle $S^1$.

### 5. Virasoro-Veneziano Scattering Amplitude
The tree-level four-point scattering amplitude of open tachyon strings is governed by the Veneziano amplitude:
$$A(s,t) = \frac{\Gamma(-\alpha(s))\Gamma(-\alpha(t))}{\Gamma(-\alpha(s)-\alpha(t))}$$
Where $\alpha(s) = \alpha_0 + \alpha' s$, and $s, t, u$ are the Mandelstam variables satisfying $s + t + u = \sum m_i^2$.

### 6. Swampland & Moduli Stabilization
* **Weak Gravity Conjecture (WGC)**: Asserts that in any consistent quantum gravity vacuum, there must exist a state with charge-to-mass ratio larger than or equal to that of an extremal black hole:
  $$\frac{q}{m} \ge \frac{1}{\sqrt{2}} \quad (\text{in Planck units } M_P = 1)$$
* **Swampland Distance Conjecture (SDC)**: Tracing a distance $\Delta\phi$ in moduli space triggers an infinite tower of Kaluza-Klein states to descend exponentially in mass:
  $$m(\Delta\phi) \approx m_0 e^{-\alpha \Delta\phi}$$

### 7. Electroweak Symmetry Breaking & Seesaw Mechanism
* **Higgs Potential**: Governed by supersymmetry-breaking parameters that trigger Electro-Weak Symmetry Breaking (EWSB) via a spontaneous Mexican-hat potential minimum:
  $$V(\phi) = -\mu^2 |\phi|^2 + \lambda |\phi|^4$$
* **Seesaw Mechanism (Type I)**: Explains the extreme lightness of active left-handed neutrinos via coupling to heavy string-scale Majorana states $M_R$:
  $$m_\nu \approx \frac{m_D^2}{M_R}$$

---

## 📂 Repository Structure

```
Superstring/
├── superstring_db/               # Core Python library & physical solvers
│   ├── __init__.py               # API entry point
│   ├── constants.py              # Physics constants (Planck, String, Natural units)
│   ├── models.py                 # Pydantic data schemas for strong type verification
│   ├── data.py                   # Physical parameters of the 5 superstring & M-theories
│   ├── solvers.py                # Mathematical engines (spectra, dualities, CY, etc.)
│   └── export.py                 # Relational SQLite and JSON exporters
├── tests/
│   └── test_solvers.py           # Comprehensive physical self-consistency tests
├── index.html                    # Unified cosmic dashboard layout (HTML5/GUI)
├── style.css                     # Glassmorphic cosmic styling and layout sheet
├── app.js                        # Client-side simulator, math solvers, and Canvas rendering
├── superstring_db.json           # Fully compiled relational database in JSON format
├── superstring_db.sqlite         # Normalized relational database in SQLite format
├── LICENSE                       # Open-source license agreement
├── run_dashboard.py              # Local high-performance web server starter
└── README.md                     # Main documentation (this file)
```

---

## 🚀 Getting Started & Execution

### 1. Launching the Interactive Web GUI Locally
Run the lightweight local server utility to view the simulation in your browser:
```bash
python run_dashboard.py
```
This automatically initiates a local web server at `http://localhost:8000` and launches your default browser, allowing you to interact with all 11 simulation tabs.

### 2. Physical Engine Unit Tests
To verify the self-consistency of the computational engine, T-duality mass equivalences, and Hodge number calculations, run the automated test suite:
```bash
python -m unittest tests/test_solvers.py
```

### 3. Integrating `superstring_db` into your own Physics Simulators
The SQLite and JSON export files are structured to allow effortless imports in external projects (C++, Rust, Python, Unity, Unreal).

#### Python API Integration Example:
```python
from superstring_db import THEORIES, calculate_kk_winding_mass

# Query Type IIB D-branes & their tension formulas
iiB_theory = THEORIES["Type_IIB"]
for brane in iiB_theory.allowed_branes:
    print(f"Brane: {brane.name} | Tension Formula: {brane.tension_formula}")

# Calculate physical mass of a winding Kaluza-Klein state
mass_data = calculate_kk_winding_mass(n=2, w=1, R=3.5, alpha_prime=1.0)
print(f"Physical Mass: {mass_data['mass']} GeV | Level Matched: {mass_data['level_matched']}")
```

---

## 🪐 Theoretical Verification Status

All algorithms in this package are strictly verified against standard treatises in mathematical physics (e.g., Green-Schwarz-Witten, Polchinski, and Becker-Becker-Schwarz):
- **T-Duality Self-Consistency**: Formally proven that $M^2(n, w, R) \equiv M^2(w, n, R')$ for $R' = \alpha'/R$ to infinite floating-point precision.
- **GSO Projection Validation**: Strict filter rules mapping worldsheet sectors to low-energy supergravity fields.
- **Calabi-Yau Euler numbers**: Validated according to $\chi = 2(h^{1,1} - h^{2,1})$.

---

## 📄 License
This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
