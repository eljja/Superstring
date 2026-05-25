"""
Physical solver module for Calabi-Yau compactification moduli stabilization
and the Swampland Program Conjectures (Distance Conjecture, de Sitter Conjecture, Weak Gravity Conjecture).
"""

import math
from typing import Dict, Any

def calculate_swampland_bounds(
    modulus_roll: float,
    charge_q: float,
    mass_m: float,
    alpha_param: float = 1.0,
    wgc_limit_ratio: float = 0.7071
) -> Dict[str, Any]:
    """
    Computes the quantum gravity consistency bounds for a 4D Effective Field Theory (EFT).
    
    1. Swampland Distance Conjecture (SDC):
       As a modulus rolls by Delta phi, a tower of states becomes exponentially light:
       m(phi) = m_0 * e^(-alpha * Delta phi)
       EFT breaks down if Delta phi > 1.0 M_pl.
       
    2. Weak Gravity Conjecture (WGC):
       Gravity must be the weakest force:
       q / m >= 1 / sqrt(2) * M_pl
    """
    roll = max(0.0, min(5.0, modulus_roll))
    q = max(0.0, min(2.0, charge_q))
    m = max(0.01, min(2.0, mass_m))
    alpha = max(0.1, min(3.0, alpha_param))
    
    # 1. Swampland Distance Conjecture mass decay
    m_0 = 1.0
    tower_mass = m_0 * math.exp(-alpha * roll)
    is_sdc_active = roll > 1.0
    
    # 2. Weak Gravity Conjecture ratio check
    ratio = q / m
    is_wgc_compliant = ratio >= wgc_limit_ratio
    
    # 3. Overall classification
    # If SDC is active (Delta phi > 1.0) or WGC is violated, the theory falls into the Swampland!
    if is_sdc_active or not is_wgc_compliant:
        classification = "Swampland (Inconsistent EFT)"
        if is_sdc_active and not is_wgc_compliant:
            desc = "EFT가 늪지대(Swampland)에 빠졌습니다: 대형 장 롤링(Delta phi > 1)으로 대규모 KK 타워 상태가 급락해 국소 저에너지 기술이 파괴되었으며, 약중력 추측(q/m < 0.707)마저 위반해 중력보다 강한 안정 상태가 존재하지 않습니다."
        elif is_sdc_active:
            desc = "EFT가 늪지대에 빠졌습니다: 장 구동 거리 Delta phi가 플랑크 한계(1.0 M_pl)를 넘어 지수함수적인 중력 타워 상태들이 흘러내려 와 EFT 이론 기술이 붕괴합니다."
        else:
            desc = "EFT가 늪지대에 빠졌습니다: 테스트 입자의 전하/질량비(q/m)가 극대 블랙홀 한계(0.707) 미만이므로 WGC를 위반하여 중력 자격을 상실한 상태입니다."
    else:
        classification = "Landscape (Consistent QG Vacua)"
        desc = "EFT가 양자 중력의 일치 영역인 지형(Landscape)에 속합니다: 모듈러스 롤링 거리가 플랑크 한계 내에 있으며, WGC 조건을 완벽히 충족해 중력 붕괴의 모순이 없습니다."
        
    return {
        "modulus_roll_distance": roll,
        "tower_mass_fraction": tower_mass,
        "is_sdc_active": is_sdc_active,
        "charge_to_mass_ratio": ratio,
        "wgc_limit": wgc_limit_ratio,
        "is_wgc_compliant": is_wgc_compliant,
        "classification": classification,
        "description": desc
    }

def calculate_kklt_potential_curve(
    t_modulus: float,
    w0_flux: float,
    a_instanton: float = 0.1
) -> Dict[str, Any]:
    """
    Computes the exact KKLT potential energy V(T) and its derivatives to check de Sitter Swampland Conjecture (dSC).
    
    V(T) = a * A * e^(-a * T) / T^2 * ( 1/3 * a * T * A * e^(-a * T) + w_0 + A * e^(-a * T) )
    We set constant A = 1.0.
    
    de Sitter Swampland Conjecture (dSC):
    |V'| / V >= c   or   V'' / V <= -c'
    If a stable de Sitter minimum exists, it violates dSC!
    """
    T = max(1.0, min(50.0, t_modulus))
    w0 = max(-3.0, min(0.0, w0_flux))
    a = max(0.01, min(1.0, a_instanton))
    A = 1.0
    
    # Define potential function V(T)
    def V_func(x: float) -> float:
        exp_factor = math.exp(-a * x)
        bracket = (a * x * A * exp_factor / 3.0) + w0 + A * exp_factor
        return (a * A * exp_factor / (x * x)) * bracket
        
    V_val = V_func(T)
    
    # Numerical derivatives for high stability
    h = 0.001
    V_plus = V_func(T + h)
    V_minus = V_func(T - h)
    
    v_prime = (V_plus - V_minus) / (2.0 * h)
    v_double_prime = (V_plus - 2.0 * V_val + V_minus) / (h * h)
    
    # de Sitter Swampland Conjecture check
    # dSC holds if |V'|/V >= 1.0 OR V''/V <= -1.0
    is_dsc_violated = False
    if V_val > 0:
        slope_ratio = abs(v_prime) / V_val
        curve_ratio = v_double_prime / V_val
        if slope_ratio < 1.0 and curve_ratio > -1.0:
            is_dsc_violated = True
            
    # Check if stabilized in a local minimum
    is_stabilized = abs(v_prime) < 1e-4 and v_double_prime > 0.0
    
    if is_dsc_violated:
        dsc_status = "de Sitter Swampland Conjecture VIOLATED (Stable de Sitter minimum active)"
    else:
        dsc_status = "de Sitter Swampland Conjecture COMPLIANT (No stable dS minimum)"
        
    return {
        "kahler_modulus_t": T,
        "flux_w0": w0,
        "potential_energy_v": V_val,
        "potential_prime": v_prime,
        "potential_double_prime": v_double_prime,
        "is_stabilized": is_stabilized,
        "is_dsc_violated": is_dsc_violated,
        "dsc_status": dsc_status,
        "description": "Moduli potential stabilization and de Sitter Swampland conjecture metric solver."
    }
