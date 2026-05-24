"""
Unit tests for the cosmic string & KKLT brane inflation backend.
Verifies loop lifetimes, gravitational wave strain amplitudes, and CMB slow-roll observables.
"""

import unittest
import math

from superstring_db.cosmology import (
    calculate_cosmic_string_gw,
    calculate_kklt_inflation
)

class TestCosmicCosmology(unittest.TestCase):
    
    def test_cosmic_string_gw(self):
        # Tension Gμ = 1e-7, Loop length L = 10 light-years, Distance d_L = 100 Mpc, f = 100 Hz
        res = calculate_cosmic_string_gw(tension_gmu=1e-7, loop_length_ly=10.0, frequency_hz=100.0, distance_mpc=100.0)
        
        # Lifetime τ = L / (50 * Gμ) = 10 / (50 * 1e-7) = 10 / 5e-6 = 2,000,000 years
        self.assertAlmostEqual(res["lifetime_years"], 2000000.0)
        
        # Power P = 50 * (Gμ)^2 * P_pl = 50 * 1e-14 * 3.628e52 = 1.814e40 W
        self.assertTrue(math.isclose(res["gw_emission_power_watts"], 1.814e40, rel_tol=1e-9))
        
        # Strain should be positive and physical
        self.assertTrue(res["gw_strain_h"] > 0.0)
        self.assertTrue(res["loop_mass_solar_masses"] > 0.0)

    def test_kklt_inflation(self):
        # Inflaton z = 0.5, flux w_0 = 1.0, beta = 0.05
        res = calculate_kklt_inflation(z_inflaton=0.5, flux_parameter=1.0, beta_h_sq=0.05)
        
        # V = V_0 * (1 - 0.5 * beta * z^2) = 1.5e-9 * (1 - 0.5 * 0.05 * 0.25) = 1.5e-9 * (1 - 0.00625) = 1.490625e-9
        self.assertAlmostEqual(res["potential_energy_v"], 1.490625e-9)
        
        # Derivatives: V_prime = -V_0 * beta * z = -1.5e-9 * 0.05 * 0.5 = -3.75e-11
        # V_double_prime = -V_0 * beta = -7.5e-11
        # epsilon = 0.5 * (V_prime / V)^2 = 0.5 * (-3.75e-11 / 1.490625e-9)^2 = 0.5 * (-0.025157)^2 = ~0.000316
        self.assertAlmostEqual(res["slow_roll_epsilon"], 0.5 * ((-3.75e-11 / 1.490625e-9) ** 2), places=8)
        
        # eta = V_double_prime / V = -7.5e-11 / 1.490625e-9 = -0.050314
        self.assertAlmostEqual(res["slow_roll_eta"], -7.5e-11 / 1.490625e-9, places=6)
        
        # Spectral index n_s should be close to 0.965
        self.assertTrue(0.85 < res["spectral_index_ns"] < 1.05)
        self.assertTrue(0.0 <= res["tensor_scalar_ratio_r"] < 0.1)

if __name__ == "__main__":
    unittest.main()
