"""
Physical solver module for quantum string interactions, S-matrix scattering amplitudes,
Regge resonance trajectories, and D-brane gauge-gravity coupling unification.
"""

import math
import cmath
from typing import Dict, List, Any, Tuple, Union

# Lanczos approximation coefficients for complex Gamma function
_LANCZOS_P = [
    0.99999999999980993,
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716e-6,
    1.5056327351493116e-7
]
_LANCZOS_G = 7

def complex_gamma(z: complex) -> complex:
    """
    Computes the Gamma function Γ(z) for complex numbers using the Lanczos approximation.
    Handles reflection for z.real < 0.5 to ensure numerical stability and correct pole behaviors.
    """
    # Safeguard against poles (non-positive integers)
    if z.real <= 0 and math.isclose(z.real, round(z.real), abs_tol=1e-9) and math.isclose(z.imag, 0.0, abs_tol=1e-9):
        return complex(float('inf'), 0.0)
    
    if z.real < 0.5:
        # Reflection formula: Γ(z) = π / (sin(πz) * Γ(1-z))
        sin_val = cmath.sin(cmath.pi * z)
        if math.isclose(abs(sin_val), 0.0, abs_tol=1e-12):
            return complex(float('inf'), 0.0)
        return cmath.pi / (sin_val * complex_gamma(1.0 - z))

    z_adj = z - 1.0
    x = _LANCZOS_P[0]
    for i in range(1, len(_LANCZOS_P)):
        x += _LANCZOS_P[i] / (z_adj + float(i))
    
    t = z_adj + _LANCZOS_G + 0.5
    # Standard formula: Γ(z) = sqrt(2π) * t^(z-0.5) * e^-t * x
    try:
        res = cmath.sqrt(2.0 * cmath.pi) * (t ** (z_adj + 0.5)) * cmath.exp(-t) * x
        return res
    except OverflowError:
        return complex(float('inf'), 0.0)

def calculate_veneziano_amplitude(
    s: float, 
    t: float, 
    alpha_prime: float = 1.0, 
    alpha_0: float = -1.0,
    epsilon: float = 0.02
) -> Dict[str, Any]:
    """
    Computes the four-point Veneziano scattering amplitude A(s, t) for open string tree-level.
    
    A(s, t) = Γ(-α(s)) * Γ(-α(t)) / Γ(-α(s) - α(t))
    
    To model realistic resonances with finite widths (decay rates of massive states) and avoid 
    divergences directly on poles, we add a small imaginary damping factor iε to Mandelstam s:
    s -> s + iε.
    
    Args:
        s: Mandelstam s variable (square of center-of-mass energy).
        t: Mandelstam t variable (momentum transfer squared).
        alpha_prime: Regge slope (string scale param).
        alpha_0: Trajectory intercept (-1.0 for tachyon-prone bosonic, 0.0 for massless vectors).
        epsilon: Imaginary regulator (resolves poles to finite peaks).
        
    Returns:
        Dictionary containing s, t, complex amplitude, absolute squared magnitude, and alpha values.
    """
    # Regge trajectory: α(s) = α_0 + α' * (s + iε)
    alpha_s = complex(alpha_0 + alpha_prime * s, alpha_prime * epsilon)
    # α(t) remains real for space-like or regulated momentum transfer
    alpha_t = complex(alpha_0 + alpha_prime * t, 0.0)
    
    # Arguments of the Gamma functions
    arg_s = -alpha_s
    arg_t = -alpha_t
    arg_st = -alpha_s - alpha_t
    
    # Calculate components
    gamma_s = complex_gamma(arg_s)
    gamma_t = complex_gamma(arg_t)
    gamma_st = complex_gamma(arg_st)
    
    # Check for infinity / division by zero
    if cmath.isinf(gamma_s) or cmath.isinf(gamma_t):
        amp = complex(float('inf'), 0.0)
        mag_sq = float('inf')
    elif cmath.isinf(gamma_st):
        # Γ(-α_s - α_t) -> infinity means the denominator is infinite, amplitude goes to zero
        amp = complex(0.0, 0.0)
        mag_sq = 0.0
    else:
        try:
            amp = (gamma_s * gamma_t) / gamma_st
            mag_sq = abs(amp) ** 2
        except ZeroDivisionError:
            amp = complex(float('inf'), 0.0)
            mag_sq = float('inf')
            
    # Cap numerical overflow for representation in graphs
    if math.isinf(mag_sq) or mag_sq > 1e12:
        mag_sq = 1e12
        if not math.isinf(amp.real):
            amp = amp / abs(amp) * 1e6
            
    return {
        "s": s,
        "t": t,
        "alpha_s": alpha_s,
        "alpha_t": alpha_t,
        "amplitude": amp,
        "magnitude_squared": mag_sq,
        "formula": "A(s,t) = Γ(-α(s))Γ(-α(t)) / Γ(-α(s)-α(t))"
    }

def get_regge_poles(
    s_max: float, 
    alpha_prime: float = 1.0, 
    alpha_0: float = -1.0
) -> List[Dict[str, Any]]:
    """
    Finds the Mandelstam s coordinates of the physical Regge resonance poles in the spectrum.
    Poles occur at α(s) = n, for non-negative integers n.
    
    α(s) = α_0 + α's = n  =>  s = (n - α_0) / α'
    
    Args:
        s_max: Maximum s boundary to search for poles.
        alpha_prime: Regge slope.
        alpha_0: Intercept.
        
    Returns:
        List of dictionaries with level n, pole s coordinate, and state classification.
    """
    poles = []
    n = 0
    while True:
        s_pole = (n - alpha_0) / alpha_prime
        if s_pole > s_max:
            break
        
        # State classification
        if n == 0 and alpha_0 == -1.0:
            classification = "Tachyonic Vacuum State (Unstable)"
        elif s_pole == 0.0:
            classification = "Massless Gauge / Gravity State"
        else:
            classification = f"Massive Level-{n} String Resonance"
            
        poles.append({
            "level": n,
            "s_pole": s_pole,
            "classification": classification
        })
        n += 1
        
    return poles

def calculate_unified_couplings(
    g_s: float,
    alpha_prime: float = 1.0,
    p_brane: int = 3,
    v_compact: float = 1.0,
    v_6: float = 1.0
) -> Dict[str, Any]:
    """
    Computes Yang-Mills gauge coupling on Dp-branes and the 4D gravitational constant,
    demonstrating the holographic and geometric unification of gauge forces and gravity.
    
    1. Yang-Mills Coupling on Dp-brane:
       g_YM^2 = (2π)^(p-3) * g_s * (α')^((p-3)/2) / V_(p-3)
       Where V_(p-3) is the volume of the cycle in the extra dimensions wrapped by the D-brane.
       If p=3, g_YM^2 = g_s (independent of volume).
       
    2. Gravitational Newton Constant G_N (or coupling kappa^2 ~ 8π G_N):
       G_N = (g_s^2 * α'^4) / (8 * V_6)
       Where V_6 is the Calabi-Yau volume in units of (l_s)^6 = (sqrt(α'))^6.
       
    Returns:
       Dictionary containing gauge coupling g_YM, gravitational constant G_N,
       and relative strengths.
    """
    # 1. Gauge Coupling
    if p_brane < 3:
        # Lower dimensional branes are treated as defects, we return a scaled value
        factor = (2 * math.pi) ** (p_brane - 3)
        g_ym_sq = factor * g_s * (alpha_prime ** ((p_brane - 3) / 2.0)) / v_compact
    else:
        # p >= 3
        factor = (2 * math.pi) ** (p_brane - 3)
        g_ym_sq = factor * g_s * (alpha_prime ** ((p_brane - 3) / 2.0)) / v_compact
        
    g_ym = math.sqrt(g_ym_sq) if g_ym_sq > 0 else 0.0
    # Fine structure constant equivalent for gauge group: alpha = g_YM^2 / 4pi
    alpha_ym = g_ym_sq / (4.0 * math.pi)
    
    # 2. Gravitational Coupling
    G_N = (g_s ** 2 * (alpha_prime ** 4)) / (8.0 * v_6)
    
    # Dimensionless strength comparison at energy E = 1 GeV
    # F_gravity / F_gauge ~ G_N / g_YM^2
    relative_strength = G_N / g_ym_sq if g_ym_sq > 0 else 0.0
    
    return {
        "p_brane": p_brane,
        "g_s": g_s,
        "alpha_prime": alpha_prime,
        "v_compact": v_compact,
        "v_6": v_6,
        "g_ym_squared": g_ym_sq,
        "g_ym": g_ym,
        "alpha_ym": alpha_ym,
        "G_N": G_N,
        "relative_strength_1gev": relative_strength,
        "description": f"D{p_brane}-brane Yang-Mills theory unified with 10D Supergravity."
    }
