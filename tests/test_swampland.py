"""
Unit tests for Calabi-Yau compactification moduli stabilization and the Swampland Conjectures.
Verifies the Swampland Distance Conjecture, Weak Gravity Conjecture, and de Sitter potential slope bounds.
"""

import unittest
import math

from superstring_db.swampland import (
    calculate_swampland_bounds,
    calculate_kklt_potential_curve
)

class TestSwamplandProgram(unittest.TestCase):
    
    def test_swampland_bounds(self):
        # 1. Test Landscape (Consistent vacua): Delta phi = 0.5, q = 1.0, m = 1.0 (ratio = 1.0 > 0.707)
        res_l = calculate_swampland_bounds(modulus_roll=0.5, charge_q=1.0, mass_m=1.0, alpha_param=1.0)
        self.assertEqual(res_l["classification"], "Landscape (Consistent QG Vacua)")
        self.assertTrue(res_l["is_wgc_compliant"])
        self.assertFalse(res_l["is_sdc_active"])
        self.assertAlmostEqual(res_l["tower_mass_fraction"], math.exp(-0.5))
        
        # 2. Test SDC Active (Swampland): Delta phi = 2.0 (critical distance roll)
        res_sdc = calculate_swampland_bounds(modulus_roll=2.0, charge_q=1.0, mass_m=1.0, alpha_param=1.5)
        self.assertEqual(res_sdc["classification"], "Swampland (Inconsistent EFT)")
        self.assertTrue(res_sdc["is_sdc_active"])
        self.assertAlmostEqual(res_sdc["tower_mass_fraction"], math.exp(-3.0))
        
        # 3. Test WGC Violated (Swampland): q = 0.1, m = 1.0 (ratio = 0.1 < 0.707)
        res_wgc = calculate_swampland_bounds(modulus_roll=0.2, charge_q=0.1, mass_m=1.0)
        self.assertEqual(res_wgc["classification"], "Swampland (Inconsistent EFT)")
        self.assertFalse(res_wgc["is_wgc_compliant"])
        self.assertFalse(res_wgc["is_sdc_active"])

    def test_kklt_potential_curve(self):
        # Test KKLT potential scaling: T = 10.0, W0 = -1.0, a = 0.1
        res = calculate_kklt_potential_curve(t_modulus=10.0, w0_flux=-1.0, a_instanton=0.1)
        
        # Verify potential energy and derivatives are computed
        self.assertTrue("potential_energy_v" in res)
        self.assertTrue("potential_prime" in res)
        self.assertTrue("potential_double_prime" in res)
        self.assertTrue("is_dsc_violated" in res)
        
        # Hand-calculated potential values for safety checks
        # exp_factor = e^(-1) = ~0.367879
        # bracket = (0.1 * 10 * 1 * exp_factor / 3) - 1.0 + 1 * exp_factor = (exp_factor / 3) - 1.0 + exp_factor = 4/3 * exp_factor - 1.0 = ~-0.50949
        # coef = 0.1 * 1 * exp_factor / 100 = ~0.000367879
        # V = coef * bracket = ~-0.0001874
        self.assertTrue(res["potential_energy_v"] < 0.0) # negative at high T due to negative W0 and decay

if __name__ == "__main__":
    unittest.main()
