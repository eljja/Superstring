"""
Physical solver module for quantum black hole thermodynamics, Strominger-Vafa microstate counting,
Hawking radiation, and the AdS/CFT holographic correspondence dictionary.
"""

import math
from typing import Dict, Any, List, Tuple

def calculate_strominger_vafa_entropy(
    q1: int,
    q5: int,
    n_p: int,
    alpha_prime: float = 1.0,
    g_s: float = 0.1
) -> Dict[str, Any]:
    """
    Calculates the microscopic and macroscopic entropy of a 5D extremal BPS black hole
    constituted by D1-branes, D5-branes, and Kaluza-Klein momentum (P).
    
    This matches Strominger-Vafa's historic 1996 proof:
    S_micro = 2π * sqrt(Q_1 * Q_5 * N_p)
    S_macro = A / (4 * G_5) = 2π * sqrt(Q_1 * Q_5 * N_p)
    
    Args:
        q1: Number of D1-branes (charge Q_1).
        q5: Number of D5-branes (charge Q_5).
        n_p: Kaluza-Klein momentum charge (N_p) along the compactified S^1.
        alpha_prime: Regge slope (string parameter).
        g_s: String coupling.
        
    Returns:
        Dictionary containing microscopic entropy, macroscopic area, Newton constant,
        BPS mass, and comparison details.
    """
    # Safeguard against zero or negative charges
    q1_abs = abs(q1)
    q5_abs = abs(q5)
    n_p_abs = abs(n_p)
    
    # 1. Microscopic Entropy (counting of open string states between branes)
    # S_micro = 2 * pi * sqrt(Q1 * Q5 * Np)
    s_micro = 2.0 * math.pi * math.sqrt(q1_abs * q5_abs * n_p_abs)
    
    # 2. Macroscopic Bekenstein-Hawking Entropy
    # Strominger-Vafa proved that the 5D supergravity solution has an event horizon area:
    # A = 8 * pi^2 * G_5 * sqrt(Q1 * Q5 * Np)
    # Under this, S_macro = A / (4 * G_5) = 2 * pi * sqrt(Q1 * Q5 * Np)
    # We define G_5 (5D Newton constant) dynamically using compactification scaling:
    # G_5 = (g_s^2 * alpha_prime^4) / (8 * V_4 * R) in natural units
    v_compact_ratio = 1.0 # dimensionless volume ratio of compact K3 manifold
    r_circle = 1.0        # dimensionless compact radius of S^1
    
    # G_10 = g_s^2 * pi^3 * alpha_prime^4
    # G_5 = G_10 / (V_K3 * 2 * pi * R)
    g_10 = (g_s ** 2) * (math.pi ** 3) * (alpha_prime ** 4)
    v_k3 = v_compact_ratio * ((2.0 * math.pi * math.sqrt(alpha_prime)) ** 4)
    r_phys = r_circle * math.sqrt(alpha_prime)
    g_5 = g_10 / (v_k3 * 2.0 * math.pi * r_phys)
    
    # Event Horizon Area (5D spatial hyper-volume)
    area = 8.0 * math.pi * g_5 * math.sqrt(q1_abs * q5_abs * n_p_abs)
    s_macro = area / (4.0 * g_5) if g_5 > 0 else 0.0
    
    # BPS Mass of the extremal black hole (each charge contributes to tension)
    # M = Q1/g_s + Q5/g_s + Np (standard D-brane BPS bound)
    bps_mass = (q1_abs / g_s) + (q5_abs / g_s) + n_p_abs
    
    return {
        "q1": q1_abs,
        "q5": q5_abs,
        "n_p": n_p_abs,
        "s_micro": s_micro,
        "s_macro": s_macro,
        "event_horizon_area_5d": area,
        "G_5": g_5,
        "bps_mass_string_units": bps_mass,
        "entropy_ratio": s_micro / s_macro if s_macro > 0 else 1.0,
        "description": "D1-D5-P black hole microstate counting matching Bekenstein-Hawking area entropy."
    }

def calculate_near_extremal_hawking(
    q1: int,
    q5: int,
    n_p: int,
    delta_m: float = 0.0,
    alpha_prime: float = 1.0,
    g_s: float = 0.1
) -> Dict[str, Any]:
    """
    Computes the Hawking temperature and thermodynamics of a near-extremal black hole
    with a small thermal mass increment ΔM above the BPS extremity.
    
    T_H = sqrt(2 * ΔM) / (2π * sqrt(Q_1 * Q_5 * N_p))
    
    As ΔM -> 0, the black hole becomes extremal BPS, and the Hawking temperature
    goes to zero (frozen horizon, zero radiation), while preserving massive entropy.
    
    Returns:
        Dictionary with Hawking temperature, thermal entropy, and emission power.
    """
    q1_abs = max(1, abs(q1))
    q5_abs = max(1, abs(q5))
    n_p_abs = max(1, abs(n_p))
    delta_m_abs = max(0.0, delta_m)
    
    # Extremal baseline entropy
    s_extremal = 2.0 * math.pi * math.sqrt(q1_abs * q5_abs * n_p_abs)
    
    # Hawking Temperature
    # T_H = sqrt(2 * ΔM) / (2π * sqrt(Q1*Q5*Np))
    denom = 2.0 * math.pi * math.sqrt(q1_abs * q5_abs * n_p_abs)
    t_h = math.sqrt(2.0 * delta_m_abs) / denom if denom > 0 else 0.0
    
    # Near-extremal entropy (includes thermal correction)
    # S = S_ext * sqrt(1 + 2ΔM / M_ext) or simply S_ext + delta_S
    s_total = s_extremal * math.sqrt(1.0 + (delta_m_abs / (q1_abs + q5_abs + n_p_abs)))
    thermal_entropy = s_total - s_extremal
    
    # Hawking emission power (Stefan-Boltzmann scaling in 5D: P ~ A * T_H^5)
    # For representation, we use P = Area * T_H^4
    g_5 = (g_s ** 2) * (alpha_prime ** 2) / 8.0 # effective G_5
    area = 8.0 * math.pi * g_5 * math.sqrt(q1_abs * q5_abs * n_p_abs)
    emission_power = area * (t_h ** 4)
    
    return {
        "delta_m": delta_m_abs,
        "t_h_gev": t_h,
        "s_total": s_total,
        "s_thermal_increment": thermal_entropy,
        "emission_power_arbitrary": emission_power,
        "is_extremal": math.isclose(delta_m_abs, 0.0, abs_tol=1e-9)
    }

def calculate_adscft_dictionary(
    n_branes: int,
    g_ym_squared: float,
    alpha_prime: float = 1.0
) -> Dict[str, Any]:
    """
    Translates boundary Conformal Field Theory (CFT) variables on D3-branes
    into bulk Anti-de Sitter (AdS) gravity metrics in AdS_5 x S^5 spacetime.
    
    1. t' Hooft Coupling:
       λ = g_YM^2 * N
       Maps boundary gauge field strength to bulk geometry. Large λ (> 10) indicates
       strongly coupled gauge theory, which maps to weakly coupled bulk Einstein gravity.
       
    2. AdS Radius:
       R^4 = λ * α'^2  =>  R = (λ)^0.25 * sqrt(α')
       
    3. Bulk Mass to Operator Dimension Map (for scalars):
       m^2 * R^2 = Δ * (Δ - 4)
       
    4. KSS bound (Viscosity-to-entropy ratio):
       η / s = 1 / (4π)  (universal signature of holographic liquid/QGP).
    """
    n_c = max(1, abs(n_branes))
    g_ym_sq = max(1e-6, g_ym_squared)
    
    # t' Hooft Coupling
    t_hooft_lambda = g_ym_sq * n_c
    
    # AdS curvature radius in string length units (l_s = sqrt(alpha'))
    r_ads_string = (t_hooft_lambda ** 0.25)
    r_ads_phys = r_ads_string * math.sqrt(alpha_prime)
    
    # Operator dictionary mappings (Scalar Operators)
    # We define a list of boundary conformal operators and evaluate their bulk masses
    operators = [
        {
            "operator": "Chiral Primary Operator (O_2)",
            "dimension_delta": 2.0,
            "bulk_field": "Supergravity Scalar Moduli",
            "m_sq_r_sq": 2.0 * (2.0 - 4.0), # -4.0
            "description": "Mass squared is negative but satisfies Breitenlohner-Freedman stability bound m^2 >= -4/R^2."
        },
        {
            "operator": "Dilaton Operator (tr F^2)",
            "dimension_delta": 4.0,
            "bulk_field": "Massless Dilaton Field",
            "m_sq_r_sq": 4.0 * (4.0 - 4.0), # 0.0
            "description": "Massless bulk scalar representing the gauge coupling moderator."
        },
        {
            "operator": "Kaluza-Klein Excited State (O_6)",
            "dimension_delta": 6.0,
            "bulk_field": "Massive KK Scalar",
            "m_sq_r_sq": 6.0 * (6.0 - 4.0), # 12.0
            "description": "Massive bulk scalar from dimensional reduction on S^5."
        }
    ]
    
    # Viscosity-to-entropy density ratio (KSS bound)
    # η/s = hbar / 4pi k_B = 1 / 4pi
    kss_ratio = 1.0 / (4.0 * math.pi)
    
    # Holographic coupling regime classification
    if t_hooft_lambda < 1.0:
        regime = "Perturbative CFT (Boundary) / Highly Curved Quantum String (Bulk)"
        validity = "Weak gauge coupling. Bulk gravity has high curvature and stringy corrections. Supergravity approximation is INVALID."
    elif t_hooft_lambda < 10.0:
        regime = "Intermediate Coupling / Semi-Classical String Corrections"
        validity = "Curvature is moderate. String corrections are active."
    else:
        regime = "Strong Conformal Coupling (Boundary) / Weak Classical Supergravity (Bulk)"
        validity = "Curvature is small (R >> l_s). String corrections are suppressed. Einstein classical Supergravity approximation is HIGHLY ACCURATE."
        
    return {
        "N_branes": n_c,
        "g_ym_squared": g_ym_sq,
        "t_hooft_lambda": t_hooft_lambda,
        "r_ads_string_units": r_ads_string,
        "r_ads_physical_gev_inv": r_ads_phys,
        "kss_viscosity_entropy_ratio": kss_ratio,
        "holographic_regime": regime,
        "supergravity_validity": validity,
        "operators_dictionary": operators
    }
