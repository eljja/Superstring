"""
Unit tests for the string interactions backend.
Verifies Veneziano scattering amplitude, Regge resonance poles, and D-brane gauge-gravity unification.
"""

import unittest
import math
import cmath

from superstring_db.interactions import (
    calculate_veneziano_amplitude,
    get_regge_poles,
    calculate_unified_couplings,
    complex_gamma
)

class TestStringInteractions(unittest.TestCase):
    
    def test_complex_gamma_poles(self):
        # Γ(1) = 1
        self.assertAlmostEqual(complex_gamma(complex(1.0, 0.0)).real, 1.0, places=5)
        self.assertAlmostEqual(complex_gamma(complex(1.0, 0.0)).imag, 0.0, places=5)
        
        # Γ(2) = 1, Γ(3) = 2, Γ(4) = 6
        self.assertAlmostEqual(complex_gamma(complex(3.0, 0.0)).real, 2.0, places=5)
        self.assertAlmostEqual(complex_gamma(complex(4.0, 0.0)).real, 6.0, places=5)
        
        # Pole at 0: should return infinity
        res_zero = complex_gamma(complex(0.0, 0.0))
        self.assertTrue(math.isinf(res_zero.real))
        
        # Pole at -1: should return infinity
        res_neg = complex_gamma(complex(-1.0, 0.0))
        self.assertTrue(math.isinf(res_neg.real))

    def test_veneziano_amplitude(self):
        # Standard calculation with positive alpha'
        # Check that Veneziano amplitude computes fine
        res = calculate_veneziano_amplitude(s=0.5, t=-0.2, alpha_prime=1.0, alpha_0=-1.0, epsilon=0.01)
        self.assertEqual(res["s"], 0.5)
        self.assertEqual(res["t"], -0.2)
        self.assertTrue(isinstance(res["amplitude"], complex))
        self.assertTrue(res["magnitude_squared"] >= 0.0)

        # Check resonance pole near s = 1.0 (with alpha_0 = -1.0, alpha_prime = 1.0, first pole is s = (0 - (-1))/1 = 1.0)
        res_pole = calculate_veneziano_amplitude(s=1.0, t=-0.5, alpha_prime=1.0, alpha_0=-1.0, epsilon=0.01)
        # Should have a massive peak due to the small epsilon
        res_far = calculate_veneziano_amplitude(s=1.5, t=-0.5, alpha_prime=1.0, alpha_0=-1.0, epsilon=0.01)
        self.assertTrue(res_pole["magnitude_squared"] > res_far["magnitude_squared"])

    def test_regge_poles(self):
        # With alpha_0 = -1.0, alpha_prime = 1.0, s_max = 3.5:
        # s = (n + 1) / 1 => poles at s = 1.0, 2.0, 3.0
        poles = get_regge_poles(s_max=3.5, alpha_prime=1.0, alpha_0=-1.0)
        self.assertEqual(len(poles), 3)
        self.assertAlmostEqual(poles[0]["s_pole"], 1.0)
        self.assertAlmostEqual(poles[1]["s_pole"], 2.0)
        self.assertAlmostEqual(poles[2]["s_pole"], 3.0)

    def test_unified_couplings(self):
        # D3-brane: p=3. factor = (2pi)^0 = 1. g_YM^2 = g_s / V_0 = g_s
        res_d3 = calculate_unified_couplings(g_s=0.1, alpha_prime=1.0, p_brane=3, v_compact=1.0, v_6=1.0)
        self.assertAlmostEqual(res_d3["g_ym_squared"], 0.1)
        self.assertAlmostEqual(res_d3["g_ym"], math.sqrt(0.1))
        
        # D5-brane: p=5. factor = (2pi)^2 = 4pi^2.
        # g_YM^2 = 4pi^2 * g_s * alpha_prime / v_compact
        res_d5 = calculate_unified_couplings(g_s=0.15, alpha_prime=2.0, p_brane=5, v_compact=10.0, v_6=4.0)
        expected_g_ym_sq = (4.0 * math.pi**2) * 0.15 * 2.0 / 10.0
        self.assertAlmostEqual(res_d5["g_ym_squared"], expected_g_ym_sq)
        
        # Gravitational constant G_N = (g_s^2 * alpha_prime^4) / (8 * V_6)
        # G_N = (0.15^2 * 2.0^4) / (8 * 4.0) = (0.0225 * 16.0) / 32.0 = 0.36 / 32.0 = 0.01125
        self.assertAlmostEqual(res_d5["G_N"], 0.01125)

if __name__ == "__main__":
    unittest.main()
