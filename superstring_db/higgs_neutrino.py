"""
Physical solver module for Higgs Mechanism (Electroweak Symmetry Breaking)
and Neutrino Oscillations (Seesaw Mechanism) derived from String Theory.
"""

import math
from typing import Dict, Any

def solve_ewsb_and_higgs(susy_breaking_scale: float, coupling_lambda: float) -> Dict[str, Any]:
    """
    Simulates the generation of the Higgs Mexican Hat potential and Electroweak
    Symmetry Breaking (EWSB) from string moduli and supersymmetry breaking.
    
    The potential is V(H) = -mu^2 |H|^2 + lambda |H|^4
    where mu^2 is driven by the SUSY breaking scale.
    """
    # Sanitize inputs
    susy_scale = max(100.0, min(10000.0, float(susy_breaking_scale))) # in GeV
    lam = max(0.01, min(1.0, float(coupling_lambda)))
    
    # In gravity mediation (e.g. from string theory moduli F-terms),
    # the soft mass squared m_H^2 can be driven negative via RG evolution.
    # Here, we use a toy model where mu^2 is proportional to the SUSY breaking scale.
    # We aim for VEV v = 246 GeV when lambda ~ 0.13 (SM value) and susy_scale is tuned.
    
    # Target SM VEV is 246 GeV.
    # v = sqrt(mu^2 / lam) => mu^2 = lam * v^2
    # So we calculate mu^2 dynamically:
    
    base_mu_sq = lam * (246.0 ** 2)
    
    # Introduce deviation based on SUSY scale to show dynamic symmetry breaking/restoration
    # If SUSY scale is too high, it might not break EW symmetry properly in this toy model.
    tuning_factor = (2000.0 / susy_scale)
    mu_sq = base_mu_sq * tuning_factor
    
    if mu_sq > 0:
        # Symmetry is broken (Mexican Hat)
        vev = math.sqrt(mu_sq / lam)
        higgs_mass = math.sqrt(2 * mu_sq)
        status = "Symmetry Broken (EWSB Active)"
        is_broken = True
    else:
        # Symmetry is restored (Parabola)
        vev = 0.0
        higgs_mass = math.sqrt(-mu_sq) if mu_sq < 0 else 0.0
        status = "Symmetry Restored (EWSB Inactive)"
        is_broken = False
        
    return {
        "susy_breaking_scale_gev": susy_scale,
        "coupling_lambda": lam,
        "mu_squared": mu_sq,
        "vev_gev": vev,
        "higgs_mass_gev": higgs_mass,
        "status": status,
        "is_broken": is_broken
    }

def solve_seesaw_neutrinos(majorana_mass_scale: float, dirac_coupling_area: float) -> Dict[str, Any]:
    """
    Simulates the Type-I Seesaw mechanism for neutrinos using a heavy right-handed
    Majorana neutrino derived from string scale / GUT scale physics.
    
    m_nu = m_D^2 / M_R
    where m_D is the Dirac mass (exponentially suppressed by string instantons)
    and M_R is the heavy Majorana mass scale.
    """
    # Sanitize inputs
    m_r = max(1e10, min(1e16, float(majorana_mass_scale))) # in GeV
    area = max(0.5, min(5.0, float(dirac_coupling_area)))
    
    # SM VEV
    v = 246.0
    
    # Dirac couplings (exponentially suppressed similar to quarks/leptons)
    y_1 = 0.01 * math.exp(-area)
    y_2 = 0.1 * math.exp(-area * 0.5)
    y_3 = 1.0 * math.exp(-area * 0.1)
    
    # Dirac masses in GeV
    m_d1 = y_1 * v
    m_d2 = y_2 * v
    m_d3 = y_3 * v
    
    # Light neutrino masses (Seesaw: m_nu = m_D^2 / M_R) in eV
    # 1 GeV = 1e9 eV
    m_nu1_eV = (m_d1 ** 2 / m_r) * 1e9
    m_nu2_eV = (m_d2 ** 2 / m_r) * 1e9
    m_nu3_eV = (m_d3 ** 2 / m_r) * 1e9
    
    # Mass squared differences
    dm2_21 = m_nu2_eV**2 - m_nu1_eV**2
    dm2_32 = m_nu3_eV**2 - m_nu2_eV**2
    
    # PMNS Mixing Angles (toy generation based on M_R scale)
    # Neutrino mixing is notoriously large (unlike CKM).
    theta_12 = 33.0 + (math.log10(m_r) - 14.0) * 2.0  # degrees
    theta_23 = 45.0 + (math.log10(m_r) - 14.0) * 1.5
    theta_13 = 8.5 + (math.log10(m_r) - 14.0) * 0.5
    
    # Clamp angles to realistic bounds roughly
    theta_12 = max(0.0, min(90.0, theta_12))
    theta_23 = max(0.0, min(90.0, theta_23))
    theta_13 = max(0.0, min(90.0, theta_13))
    
    return {
        "majorana_scale_gev": m_r,
        "dirac_masses_gev": [m_d1, m_d2, m_d3],
        "light_masses_ev": [m_nu1_eV, m_nu2_eV, m_nu3_eV],
        "delta_m2_21_ev2": dm2_21,
        "delta_m2_32_ev2": dm2_32,
        "pmns_angles_deg": {
            "theta_12": theta_12,
            "theta_23": theta_23,
            "theta_13": theta_13
        }
    }
