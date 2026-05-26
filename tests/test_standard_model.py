"""
Unit tests for Standard Model Derivation and Vacuum Selection in Superstring Theory.
Verifies derived fermion generations, gauge symmetry breaking, and Yukawa mass hierarchies.
"""

import unittest
import math

from superstring_db.standard_model import (
    select_standard_model_vacuum,
    find_matching_vacua_candidates
)

class TestStandardModelDerivation(unittest.TestCase):
    
    def test_standard_model_vacuum_success(self):
        # Tian-Yau Manifold configuration: h11 = 6, h21 = 15, group_order = 3
        # |h11 - h21| / G = |6 - 15| / 3 = 9 / 3 = 3 generations
        res = select_standard_model_vacuum(h11=6, h21=15, group_order=3, instanton_area=1.5)
        
        self.assertEqual(res["generations"], 3)
        self.assertEqual(res["gauge_symmetry"], "SU(3)_C x SU(2)_L x U(1)_Y")
        self.assertTrue(res["is_standard_model_vacuum"])
        self.assertAlmostEqual(res["instanton_area"], 1.5)
        
        # Verify particles lists exist
        self.assertIn("leptons", res["particles"])
        self.assertIn("quarks_up", res["particles"])
        self.assertIn("quarks_down", res["particles"])
        
        # Verify lepton generations mass hierarchy (electron < muon < tau)
        leptons = res["particles"]["leptons"]
        self.assertEqual(len(leptons), 3)
        self.assertTrue(leptons[0]["mass_gev"] < leptons[1]["mass_gev"])
        self.assertTrue(leptons[1]["mass_gev"] < leptons[2]["mass_gev"])
        
        # Verify top quark is heavy (~173 GeV suppression at area=1.5 and c_u[2]=0.0 is math.exp(0)=1.0, so m_t = 173 GeV)
        quarks_up = res["particles"]["quarks_up"]
        self.assertEqual(quarks_up[2]["name"], "Top (t)")
        self.assertAlmostEqual(quarks_up[2]["mass_gev"], 173.0)

    def test_non_standard_vacuum_exotics(self):
        # 1. Test group_order = 1 (No Wilson line breaking -> E6 remains)
        res_e6 = select_standard_model_vacuum(h11=6, h21=15, group_order=1, instanton_area=1.5)
        self.assertEqual(res_e6["gauge_symmetry"], "E6")
        self.assertFalse(res_e6["is_standard_model_vacuum"])
        
        # 2. Test group_order = 2 (Unclean Wilson breaking -> SO(10) x U(1))
        res_so10 = select_standard_model_vacuum(h11=6, h21=12, group_order=2, instanton_area=1.5)
        self.assertEqual(res_so10["gauge_symmetry"], "SO(10) x U(1)")
        self.assertFalse(res_so10["is_standard_model_vacuum"])
        
        # 3. Test wrong generations (e.g., h11 = 5, h21 = 25, G = 5 -> 4 generations)
        res_4gen = select_standard_model_vacuum(h11=5, h21=25, group_order=5, instanton_area=1.5)
        self.assertEqual(res_4gen["generations"], 4)
        self.assertFalse(res_4gen["is_standard_model_vacuum"])
        # Masses should be shifted due to exotic vacuum instability
        leptons_4gen = res_4gen["particles"]["leptons"]
        leptons_3gen = select_standard_model_vacuum(h11=6, h21=15, group_order=3, instanton_area=1.5)["particles"]["leptons"]
        self.assertTrue(leptons_4gen[0]["mass_gev"] > leptons_3gen[0]["mass_gev"])

    def test_vacuum_candidates_database(self):
        # Target generations = 3
        candidates = find_matching_vacua_candidates(target_generations=3)
        self.assertGreater(len(candidates), 0)
        self.assertEqual(candidates[0]["name"], "Tian-Yau Manifold")
        self.assertEqual(candidates[0]["group_order"], 3)
        
        # Target generations = 4 (should dynamically generate exotics)
        candidates_4 = find_matching_vacua_candidates(target_generations=4)
        self.assertGreater(len(candidates_4), 0)
        self.assertIn("Exotic CY-Q", candidates_4[0]["name"])

if __name__ == "__main__":
    unittest.main()
