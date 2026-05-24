"""
Unit tests for the black hole thermodynamics & holography backend.
Verifies Strominger-Vafa entropy counting, near-extremal Hawking radiation, and AdS/CFT dictionaries.
"""

import unittest
import math

from superstring_db.holography import (
    calculate_strominger_vafa_entropy,
    calculate_near_extremal_hawking,
    calculate_adscft_dictionary
)

class TestBlackHoleHolography(unittest.TestCase):
    
    def test_strominger_vafa_entropy(self):
        # Setup D-brane charges: Q1=4, Q5=9, Np=16
        # S_micro = 2 * pi * sqrt(4 * 9 * 16) = 2 * pi * sqrt(576) = 2 * pi * 24 = 48 * pi
        res = calculate_strominger_vafa_entropy(q1=4, q5=9, n_p=16, alpha_prime=1.0, g_s=0.1)
        expected_s = 48.0 * math.pi
        
        self.assertAlmostEqual(res["s_micro"], expected_s)
        self.assertAlmostEqual(res["s_macro"], expected_s)
        self.assertAlmostEqual(res["entropy_ratio"], 1.0)
        self.assertTrue(res["bps_mass_string_units"] > 0)
        self.assertTrue(res["event_horizon_area_5d"] > 0)

    def test_near_extremal_hawking(self):
        # extremal case: delta_m = 0.0 => T_H = 0.0
        res_ext = calculate_near_extremal_hawking(q1=4, q5=9, n_p=16, delta_m=0.0)
        self.assertEqual(res_ext["t_h_gev"], 0.0)
        self.assertTrue(res_ext["is_extremal"])
        
        # thermal excitation: delta_m = 2.0
        res_therm = calculate_near_extremal_hawking(q1=4, q5=9, n_p=16, delta_m=2.0)
        # T_H = sqrt(2 * 2) / (2pi * sqrt(4*9*16)) = 2 / (2pi * 24) = 1 / (24pi)
        expected_t = 1.0 / (24.0 * math.pi)
        self.assertAlmostEqual(res_therm["t_h_gev"], expected_t)
        self.assertFalse(res_therm["is_extremal"])
        self.assertTrue(res_therm["s_thermal_increment"] > 0)
        self.assertTrue(res_therm["emission_power_arbitrary"] > 0)

    def test_adscft_dictionary(self):
        # CFT group with N=100 branes, g_YM^2 = 0.5
        # lambda = 0.5 * 100 = 50.0
        # R_ads_string = 50^0.25 = ~2.659
        res = calculate_adscft_dictionary(n_branes=100, g_ym_squared=0.5, alpha_prime=2.0)
        self.assertAlmostEqual(res["t_hooft_lambda"], 50.0)
        self.assertAlmostEqual(res["r_ads_string_units"], 50.0 ** 0.25)
        self.assertAlmostEqual(res["r_ads_physical_gev_inv"], (50.0 ** 0.25) * math.sqrt(2.0))
        self.assertAlmostEqual(res["kss_viscosity_entropy_ratio"], 1.0 / (4.0 * math.pi))
        
        # Check operator mapping
        ops = res["operators_dictionary"]
        self.assertEqual(len(ops), 3)
        self.assertEqual(ops[0]["dimension_delta"], 2.0)
        self.assertEqual(ops[0]["m_sq_r_sq"], -4.0)
        self.assertEqual(ops[1]["dimension_delta"], 4.0)
        self.assertEqual(ops[1]["m_sq_r_sq"], 0.0)
        self.assertEqual(ops[2]["dimension_delta"], 6.0)
        self.assertEqual(ops[2]["m_sq_r_sq"], 12.0)

if __name__ == "__main__":
    unittest.main()
