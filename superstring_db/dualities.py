"""
Physical solver module for string theory dualities (S-duality, T-duality),
11D M-Theory dimensional expansion, and the nonperturbative BFSS Matrix Model.
"""

import math
from typing import Dict, Any

def calculate_duality_web(
    theory_id: str,
    coupling_gs: float,
    radius_compact: float
) -> Dict[str, Any]:
    """
    Computes the duality transitions and active phase in the superstring duality web.
    
    1. T-Duality: Relates R <--> alpha' / R. 
       Type IIA <--> Type IIB, SO(32) Het <--> E8xE8 Het.
       
    2. S-Duality: Relates g_s <--> 1 / g_s.
       Type I <--> SO(32) Het, Type IIB <--> Type IIB (self-dual).
       
    3. M-Theory 11D expansion: Type IIA at g_s -> infinity grows an 11th dimension
       of radius R_11 = g_s * l_s. D0-branes are Kaluza-Klein momentum states.
    """
    g_s = max(1e-4, min(1e4, coupling_gs))
    R = max(0.01, min(100.0, radius_compact))
    
    # 1. Dual parameters
    dual_g = 1.0 / g_s
    dual_R = 1.0 / R
    
    # Duality target mappings
    t_dual_map = {
        "Type_IIA": "Type_IIB",
        "Type_IIB": "Type_IIA",
        "Type_I": "None (Type I does not undergo toroidal T-duality in this form)",
        "Heterotic_SO32": "Heterotic_E8xE8",
        "Heterotic_E8xE8": "Heterotic_SO32"
    }
    
    s_dual_map = {
        "Type_IIA": "None (Type IIA S-duality opens 11D M-Theory)",
        "Type_IIB": "Type_IIB (Self-Dual)",
        "Type_I": "Heterotic_SO32",
        "Heterotic_SO32": "Type_I",
        "Heterotic_E8xE8": "None (Heterotic E8xE8 S-duality opens strongly-coupled M-Theory on S^1/Z_2)"
    }
    
    # 2. 11D compactification radius (R11 = g_s in string units)
    r11 = g_s if theory_id == "Type_IIA" else 0.0
    
    # D0-brane mass in solar masses relative scale (scaled for cosmological physics display)
    d0_mass_relative = 1.0 / g_s if theory_id == "Type_IIA" else 0.0
    
    # Define active physical regime description
    if theory_id == "Type_IIA" and g_s > 5.0:
        active_regime = "11D M-Theory (Strongly Coupled Type IIA)"
        desc = f"Type IIA 결합 상수가 강해짐에 따라 {r11:.2f} l_s 반경의 11번째 공간 차원이 크게 발현되어 11차원 초중력/M-이론으로 대통합됩니다."
    elif theory_id == "Type_IIB" and g_s > 5.0:
        active_regime = "S-Dual Type IIB (S-Duality Active)"
        desc = f"Type IIB 결합 상수가 강해짐에 따라(g_s={g_s:.2f}) 상쌍대성(S-Duality)이 동작하여, 결합 상수 g_s'={dual_g:.4f}를 가지는 가벼운 기본 끈(F1)과 무거운 D1-브레인의 역할이 반전된 가상 약결합 IIB 이론과 완벽하게 매치됩니다."
    elif theory_id == "Type_I" and g_s > 5.0:
        active_regime = "SO(32) Heterotic (Strongly Coupled Type I)"
        desc = f"Type I 개방현 이론의 강결합 한계(g_s={g_s:.2f})는 상쌍대성에 의해 결합 상수 g_s'={dual_g:.4f}를 가진 Heterotic SO(32) 폐곡선 이론의 약결합 한계로 매핑됩니다."
    elif theory_id == "Heterotic_SO32" and g_s > 5.0:
        active_regime = "Type I (Strongly Coupled Heterotic SO(32))"
        desc = f"Heterotic SO(32) 폐곡선 이론의 강결합 한계는 상쌍대성에 의해 결합 상수 g_s'={dual_g:.4f}인 Type I 개방현 이론의 약결합 한계로 완벽히 상쇄 매핑됩니다."
    elif R < 0.3:
        target_theory = t_dual_map.get(theory_id, "None")
        active_regime = f"T-Dual {target_theory} (Small Radius Limit)"
        desc = f"압축 반경 R={R:.3f} l_s가 스트링 스케일(R < 1)보다 훨씬 작아짐에 따라 T-이중성이 활성화되어, 반경 R'={dual_R:.2f} l_s를 가진 {target_theory}와 모든 양자 질량 스펙트럼이 엄밀하게 동등해집니다."
    else:
        active_regime = f"Perturbative 10D {theory_id}"
        desc = f"약결합 및 거시적 차원 반경 영역에 위치하며, 기존 {theory_id} 초초대칭적 끈 섭동 이론의 테두리 안에서 안정적인 물리 상태가 기술됩니다."
        
    return {
        "theory_id": theory_id,
        "coupling_gs": g_s,
        "radius_compact": R,
        "dual_coupling_gs": dual_g,
        "dual_radius_compact": dual_R,
        "m_theory_radius_r11": r11,
        "d0_brane_mass": d0_mass_relative,
        "t_dual_partner": t_dual_map.get(theory_id, "None"),
        "s_dual_partner": s_dual_map.get(theory_id, "None"),
        "active_regime": active_regime,
        "description": desc
    }

def calculate_bfss_matrix_model(
    N_dimension: int,
    theta_noncommutative: float
) -> Dict[str, Any]:
    """
    Computes the properties of a fuzzy sphere noncommutative membrane in the BFSS Matrix Model.
    The coordinates X_i are represented by N x N Hermitian matrices X_i = theta * J_i.
    
    1. Fuzzy sphere radius:
       R_fuzzy = theta * sqrt((N^2 - 1) / 4)
       
    2. Matrix interaction energy (commutator term):
       E_matrix = -1/4 * Tr([X_i, X_j]^2) = N * (N^2 - 1) / 8 * theta^4
       
    3. Fuzzy sphere volume:
       V_fuzzy = 4 * pi * R_fuzzy^2
    """
    N = max(2, int(N_dimension))
    theta = max(0.0, float(theta_noncommutative))
    
    # 1. Fuzzy Sphere Radius
    # R^2 = theta^2 * Casimir(SU2) = theta^2 * (N^2 - 1) / 4
    r_sq = (theta ** 2) * (N * N - 1) / 4.0
    r_fuzzy = math.sqrt(r_sq)
    
    # 2. Matrix Interaction Energy
    # E = -1/4 * Tr([X_i, X_j]^2) = N * (N^2 - 1) / 8 * theta^4
    energy = N * (N * N - 1) / 8.0 * (theta ** 4)
    
    # 3. Fuzzy Sphere Volume
    v_fuzzy = 4.0 * math.pi * r_sq
    
    # Classical limit deviation
    deviation = 1.0 / N
    
    # Noncommutativity scale
    noncommutative_param = theta * math.sqrt(N)
    
    return {
        "matrix_dimension_n": N,
        "noncommutativity_scale_theta": theta,
        "fuzzy_sphere_radius": r_fuzzy,
        "matrix_interaction_energy": energy,
        "fuzzy_sphere_volume": v_fuzzy,
        "classical_limit_deviation": deviation,
        "noncommutative_parameter": noncommutative_param,
        "description": "BFSS Matrix quantum mechanics fuzzy sphere representing a stabilized 11D noncommutative membrane."
    }
