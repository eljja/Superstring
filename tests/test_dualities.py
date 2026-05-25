"""
Unit tests for the string dualities and nonperturbative BFSS Matrix Model.
Verifies toroidal T-duality, S-duality couplings, 11D M-theory limits, and fuzzy sphere membrane mechanics.
"""

import unittest
import math

from superstring_db.dualities import (
    calculate_duality_web,
    calculate_bfss_matrix_model
)

class TestStringDualities(unittest.TestCase):
    
    def test_duality_web(self):
        # 1. Test T-duality in small radius compactification (R = 0.1)
        res_t = calculate_duality_web(theory_id="Type_IIA", coupling_gs=0.5, radius_compact=0.1)
        self.assertAlmostEqual(res_t["dual_radius_compact"], 10.0)
        self.assertEqual(res_t["t_dual_partner"], "Type_IIB")
        self.assertEqual(res_t["active_regime"], "T-Dual Type_IIB (Small Radius Limit)")
        
        # 2. Test S-duality in strong coupling limit (g_s = 10.0)
        res_s = calculate_duality_web(theory_id="Type_I", coupling_gs=10.0, radius_compact=5.0)
        self.assertAlmostEqual(res_s["dual_coupling_gs"], 0.1)
        self.assertEqual(res_s["s_dual_partner"], "Heterotic_SO32")
        self.assertEqual(res_s["active_regime"], "SO(32) Heterotic (Strongly Coupled Type I)")
        
        # 3. Test M-Theory 11D dimension growth (g_s = 20.0 in Type IIA)
        res_m = calculate_duality_web(theory_id="Type_IIA", coupling_gs=20.0, radius_compact=5.0)
        self.assertAlmostEqual(res_m["m_theory_radius_r11"], 20.0)
        self.assertAlmostEqual(res_m["d0_brane_mass"], 0.05)
        self.assertEqual(res_m["active_regime"], "11D M-Theory (Strongly Coupled Type IIA)")

    def test_bfss_matrix_model(self):
        # Test fuzzy sphere membrane: N = 10, theta = 0.5
        res = calculate_bfss_matrix_model(N_dimension=10, theta_noncommutative=0.5)
        
        # 1. Fuzzy sphere radius: R = theta * sqrt((N^2 - 1) / 4) = 0.5 * sqrt(24.75) = 2.4874686
        expected_r = 0.5 * math.sqrt((100.0 - 1.0) / 4.0)
        self.assertAlmostEqual(res["fuzzy_sphere_radius"], expected_r)
        
        # 2. Matrix interaction energy: E = N * (N^2 - 1) / 8 * theta^4 = 10 * 99 / 8 * 0.0625 = 7.734375
        expected_e = 10.0 * (100.0 - 1.0) / 8.0 * (0.5 ** 4)
        self.assertAlmostEqual(res["matrix_interaction_energy"], expected_e)
        
        # 3. Fuzzy sphere volume: V = 4 * pi * R^2 = 24.75 * pi
        self.assertTrue(math.isclose(res["fuzzy_sphere_volume"], 24.75 * math.pi, rel_tol=1e-9))
        
        # 4. Classical limit deviation: 1 / N = 0.1
        self.assertAlmostEqual(res["classical_limit_deviation"], 0.1)

if __name__ == "__main__":
    unittest.main()
