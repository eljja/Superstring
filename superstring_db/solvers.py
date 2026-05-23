"""
Computational physics solvers for superstring theory calculations.
Contains formulas for mass spectra, D-brane tensions, Kaluza-Klein & winding modes,
T-duality, S-duality, and Calabi-Yau topological calculations.
"""

import math
from typing import Dict, Any, Tuple


def calculate_open_string_mass(
    N: float, 
    alpha_prime: float = 1.0, 
    sector: str = "NS"
) -> Dict[str, Any]:
    """
    Calculates the mass squared and mass of an open string state.
    
    NS sector: M^2 = (1 / alpha') * (N - 1/2)
    R sector:  M^2 = (1 / alpha') * N
    
    Args:
        N: Level of string excitation (non-negative float, usually integer or half-integer)
        alpha_prime: Regge slope (GeV^-2)
        sector: "NS" (Neveu-Schwarz) or "R" (Ramond)
    """
    if N < 0:
        raise ValueError("Excitation level N must be non-negative.")
        
    a = 0.5 if sector.upper() == "NS" else 0.0
    mass_sq = (1.0 / alpha_prime) * (N - a)
    
    if mass_sq < 0:
        # Tachyonic state
        mass = complex(0.0, math.sqrt(abs(mass_sq)))
        is_tachyon = True
    else:
        mass = math.sqrt(mass_sq)
        is_tachyon = False
        
    return {
        "level": N,
        "sector": sector.upper(),
        "mass_squared": mass_sq,
        "mass": mass,
        "is_tachyon": is_tachyon,
        "description": "Tachyon" if is_tachyon else ("Massless Gauge Boson/Fermion" if mass_sq == 0 else "Massive Excitation")
    }


def calculate_closed_string_mass(
    N_L: float,
    N_R: float,
    alpha_prime: float = 1.0,
    sector_L: str = "NS",
    sector_R: str = "NS"
) -> Dict[str, Any]:
    """
    Calculates the mass squared and mass of a closed string state.
    
    M^2 = (4 / alpha') * (N_L - a_L) = (4 / alpha') * (N_R - a_R)
    Requires level matching: N_L - a_L == N_R - a_R
    
    Args:
        N_L: Left-moving excitation level
        N_R: Right-moving excitation level
        alpha_prime: Regge slope (GeV^-2)
        sector_L: Left sector ("NS" or "R")
        sector_R: Right sector ("NS" or "R")
    """
    a_L = 0.5 if sector_L.upper() == "NS" else 0.0
    a_R = 0.5 if sector_R.upper() == "NS" else 0.0
    
    # Level matching check
    left_effective = N_L - a_L
    right_effective = N_R - a_R
    level_matched = math.isclose(left_effective, right_effective, abs_tol=1e-9)
    
    # Calculate mass squared from left-movers
    mass_sq = (4.0 / alpha_prime) * left_effective
    
    if mass_sq < 0:
        mass = complex(0.0, math.sqrt(abs(mass_sq)))
        is_tachyon = True
    else:
        mass = math.sqrt(mass_sq)
        is_tachyon = False
        
    return {
        "N_L": N_L,
        "N_R": N_R,
        "sector": f"{sector_L.upper()}-{sector_R.upper()}",
        "mass_squared": mass_sq,
        "mass": mass,
        "is_tachyon": is_tachyon,
        "level_matched": level_matched,
        "effective_left": left_effective,
        "effective_right": right_effective,
        "description": "Tachyon" if is_tachyon else ("Massless Graviton/Dilaton/etc." if mass_sq == 0 else "Massive Closed Excitation")
    }


def calculate_kk_winding_mass(
    n: int,
    w: int,
    R: float,
    alpha_prime: float = 1.0,
    N_L: float = 0.0,
    N_R: float = 0.0,
    sector_L: str = "NS",
    sector_R: str = "NS"
) -> Dict[str, Any]:
    """
    Calculates the mass squared of a closed string on a compactified circle of radius R.
    
    M^2 = (n / R)^2 + (w * R / alpha')^2 + (2 / alpha') * (N_L + N_R - a_L - a_R)
    Level matching condition: N_L - a_L - (N_R - a_R) = n * w
    
    Args:
        n: Kaluza-Klein momentum number (integer)
        w: Winding number (integer)
        R: Radius of compactified circle (GeV^-1)
        alpha_prime: Regge slope (GeV^-2)
        N_L: Left-moving oscillator number
        N_R: Right-moving oscillator number
        sector_L: "NS" or "R"
        sector_R: "NS" or "R"
    """
    a_L = 0.5 if sector_L.upper() == "NS" else 0.0
    a_R = 0.5 if sector_R.upper() == "NS" else 0.0
    
    # Calculate mass contributions
    kk_contrib = (n / R) ** 2
    winding_contrib = (w * R / alpha_prime) ** 2
    oscillator_contrib = (2.0 / alpha_prime) * (N_L + N_R - a_L - a_R)
    
    mass_sq = kk_contrib + winding_contrib + oscillator_contrib
    
    # Level matching constraint check
    left_eff = N_L - a_L
    right_eff = N_R - a_R
    actual_diff = left_eff - right_eff
    expected_diff = float(n * w)
    level_matched = math.isclose(actual_diff, expected_diff, abs_tol=1e-9)
    
    if mass_sq < 0:
        mass = complex(0.0, math.sqrt(abs(mass_sq)))
        is_tachyon = True
    else:
        mass = math.sqrt(mass_sq)
        is_tachyon = False
        
    return {
        "n": n,
        "w": w,
        "R": R,
        "mass_squared": mass_sq,
        "mass": mass,
        "kk_contribution": kk_contrib,
        "winding_contribution": winding_contrib,
        "oscillator_contribution": oscillator_contrib,
        "level_matched": level_matched,
        "level_matching_diff": actual_diff - expected_diff,
        "is_tachyon": is_tachyon
    }


def calculate_brane_tensions(
    g_s: float,
    alpha_prime: float = 1.0
) -> Dict[str, float]:
    """
    Calculates the tensions of various branes in the theory.
    
    T_F1 (Fundamental String) = 1 / (2 * pi * alpha')
    T_Dp = 1 / ((2 * pi)^p * g_s * alpha'^((p+1)/2))
    T_NS5 = 1 / ((2 * pi)^5 * g_s^2 * alpha'^3)
    
    Args:
        g_s: String coupling constant
        alpha_prime: Regge slope (GeV^-2)
    """
    tensions = {}
    
    # F1 string tension
    tensions["F1"] = 1.0 / (2.0 * math.pi * alpha_prime)
    
    # Dp-brane tensions (p from 0 to 9)
    for p in range(10):
        factor = (2.0 * math.pi) ** p
        power = (p + 1) / 2.0
        t_dp = 1.0 / (factor * g_s * (alpha_prime ** power))
        tensions[f"D{p}"] = t_dp
        
    # NS5-brane tension
    tensions["NS5"] = 1.0 / (((2.0 * math.pi) ** 5) * (g_s ** 2) * (alpha_prime ** 3))
    
    return tensions


def apply_t_duality(R: float, alpha_prime: float = 1.0) -> float:
    """
    Applies T-duality to a toroidal radius R.
    R_dual = alpha' / R
    """
    if R <= 0:
        raise ValueError("Radius must be greater than zero.")
    return alpha_prime / R


def apply_s_duality(g_s: float) -> float:
    """
    Applies S-duality to a coupling constant g_s.
    g_s_dual = 1 / g_s
    """
    if g_s <= 0:
        raise ValueError("Coupling constant g_s must be greater than zero.")
    return 1.0 / g_s


def analyze_cy_generations(h_11: int, h_21: int) -> Dict[str, Any]:
    """
    Calculates properties of a Calabi-Yau 3-fold compactification.
    
    Euler Characteristic (chi) = 2 * (h_11 - h_21)
    Fermion Generations = |chi| / 2 = |h_11 - h_21|
    
    Args:
        h_11: Hodge number h^(1,1) (number of Kahler moduli / 2-cycles)
        h_21: Hodge number h^(2,1) (number of Complex structure moduli / 3-cycles)
    """
    if h_11 < 0 or h_21 < 0:
        raise ValueError("Hodge numbers must be non-negative.")
        
    chi = 2 * (h_11 - h_21)
    generations = abs(chi) // 2
    
    return {
        "h_11": h_11,
        "h_21": h_21,
        "euler_characteristic": chi,
        "particle_generations": generations,
        "description": (
            f"Calabi-Yau 3-fold with Euler characteristic {chi}. "
            f"Under Heterotic E8xE8 compactification with SU(3) holonomy, "
            f"this yields {generations} standard chiral generations of particles "
            f"in E6 representations."
        )
    }
