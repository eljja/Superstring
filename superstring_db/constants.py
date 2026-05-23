"""
Physical constants and unit conversion utilities for superstring theory calculations.
Supports Natural Units (hbar = c = 1), Planck Units, and String Units.
"""

import math

# --- Physical Constants in SI Units ---
C_SI = 299792458.0              # Speed of light (m/s)
HBAR_SI = 1.054571817e-34       # Reduced Planck constant (J*s)
G_SI = 6.67430e-11              # Gravitational constant (m^3 / (kg * s^2))
QE_SI = 1.602176634e-19         # Elementary charge (C)

# --- Unit Conversion Factors ---
# Conversions to and from Natural Units (where hbar = c = 1)
# Energy in GeV is our base unit for natural units.
GEV_TO_JOULE = 1.602176634e-10
KG_TO_GEV = C_SI**2 / GEV_TO_JOULE
METER_TO_GEV_INV = HBAR_SI * C_SI / GEV_TO_JOULE
SEC_TO_GEV_INV = HBAR_SI / GEV_TO_JOULE

# SI values of fundamental scales
PLANCK_MASS_SI = math.sqrt((HBAR_SI * C_SI) / G_SI)    # ~ 2.176e-8 kg
PLANCK_LENGTH_SI = math.sqrt((HBAR_SI * G_SI) / C_SI**3) # ~ 1.616e-35 m
PLANCK_TIME_SI = PLANCK_LENGTH_SI / C_SI                # ~ 5.391e-44 s

# Planck values in natural units (GeV)
PLANCK_MASS_GEV = PLANCK_MASS_SI * C_SI**2 / GEV_TO_JOULE  # ~ 1.22e19 GeV
PLANCK_LENGTH_GEV_INV = 1.0 / (PLANCK_LENGTH_SI / (HBAR_SI * C_SI / GEV_TO_JOULE))


class StringUnits:
    """
    Representation of string scales and parameters based on Regge slope (alpha').
    All values default to alpha' = 1 / (2 * pi * T) in GeV^-2.
    """
    def __init__(self, alpha_prime: float = 1.0, g_s: float = 0.1):
        """
        Initialize string scale parameters.
        
        Args:
            alpha_prime: Regge slope (default: 1.0 GeV^-2)
            g_s: String coupling constant (default: 0.1)
        """
        self.alpha_prime = alpha_prime
        self.g_s = g_s
        
        # String tension: T = 1 / (2 * pi * alpha')
        self.tension = 1.0 / (2.0 * math.pi * self.alpha_prime)
        
        # String length scale: l_s = sqrt(alpha')
        self.string_length = math.sqrt(self.alpha_prime)
        
        # String mass scale: M_s = 1 / sqrt(alpha')
        self.string_mass = 1.0 / math.sqrt(self.alpha_prime)
        
    def get_planck_mass(self, v_6: float = 1.0) -> float:
        """
        Calculates the effective 4D Planck mass from 10D string parameters.
        M_pl^2 = (8 * V_6 * M_s^8) / (g_s^2) in string units, scaled appropriately.
        
        Args:
            v_6: Volume of the compactified 6D manifold in units of l_s^6.
        """
        # M_pl^2 ~ V_6 * M_s^2 / g_s^2
        # Standard relation in 10D Type II: 16pi * G_10 = (2pi)^7 g_s^2 (alpha')^4
        # G_4 = G_10 / V_6, M_pl = 1/sqrt(8pi G_4)
        m_s = self.string_mass
        return m_s * math.sqrt(v_6) / self.g_s

    def energy_to_string_units(self, energy_gev: float) -> float:
        """Convert energy in GeV to dimensionless string units (relative to M_s)"""
        return energy_gev / self.string_mass

    def string_units_to_energy(self, val: float) -> float:
        """Convert dimensionless string units to energy in GeV"""
        return val * self.string_mass

    def __repr__(self) -> str:
        return (f"StringUnits(alpha'={self.alpha_prime:.4e} GeV^-2, "
                f"g_s={self.g_s:.4f}, "
                f"M_s={self.string_mass:.4e} GeV, "
                f"l_s={self.string_length:.4e} GeV^-1)")
