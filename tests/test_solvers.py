"""
Unit tests for the superstring database physical solvers.
Verifies the mathematical correctness of mass spectra, T-duality, Calabi-Yau compactifications, and database exports.
"""

import unittest
import math
import os
import tempfile
import json
import sqlite3

from superstring_db.constants import StringUnits
from superstring_db.solvers import (
    calculate_open_string_mass,
    calculate_closed_string_mass,
    calculate_kk_winding_mass,
    calculate_brane_tensions,
    apply_t_duality,
    apply_s_duality,
    analyze_cy_generations
)
from superstring_db.export import export_all


class TestSuperstringSolvers(unittest.TestCase):

    def test_open_string_mass(self):
        # 1. NS sector: N = 1/2 should be massless (photon/vector)
        res_ns_massless = calculate_open_string_mass(N=0.5, alpha_prime=1.0, sector="NS")
        self.assertAlmostEqual(res_ns_massless["mass_squared"], 0.0)
        self.assertAlmostEqual(res_ns_massless["mass"], 0.0)
        self.assertFalse(res_ns_massless["is_tachyon"])

        # 2. NS sector: N = 0 should be tachyon
        res_ns_tachyon = calculate_open_string_mass(N=0.0, alpha_prime=1.0, sector="NS")
        self.assertEqual(res_ns_tachyon["mass_squared"], -0.5)
        self.assertTrue(res_ns_tachyon["is_tachyon"])
        self.assertEqual(res_ns_tachyon["mass"].imag, math.sqrt(0.5))

        # 3. R sector: N = 0 should be massless (gaugino/fermion)
        res_r_massless = calculate_open_string_mass(N=0.0, alpha_prime=1.0, sector="R")
        self.assertAlmostEqual(res_r_massless["mass_squared"], 0.0)
        self.assertAlmostEqual(res_r_massless["mass"], 0.0)
        self.assertFalse(res_r_massless["is_tachyon"])

        # 4. R sector: N = 1 should be massive state
        res_r_massive = calculate_open_string_mass(N=1.0, alpha_prime=2.0, sector="R")
        self.assertAlmostEqual(res_r_massive["mass_squared"], 0.5)
        self.assertAlmostEqual(res_r_massive["mass"], math.sqrt(0.5))

    def test_closed_string_mass(self):
        # NS-NS sector: N_L = N_R = 0.5 should be massless (graviton)
        res_closed_massless = calculate_closed_string_mass(
            N_L=0.5, N_R=0.5, alpha_prime=1.0, sector_L="NS", sector_R="NS"
        )
        self.assertAlmostEqual(res_closed_massless["mass_squared"], 0.0)
        self.assertTrue(res_closed_massless["level_matched"])

        # N_L = 0.5, N_R = 0 should NOT be level matched for NS-NS
        res_unmatched = calculate_closed_string_mass(
            N_L=0.5, N_R=0.0, alpha_prime=1.0, sector_L="NS", sector_R="NS"
        )
        self.assertFalse(res_unmatched["level_matched"])

    def test_kk_winding_and_t_duality(self):
        # Mass of KK/winding modes on circle of radius R
        # M^2 = n^2 / R^2 + w^2 * R^2 / alpha'^2 + (2 / alpha') * (N_L + N_R - a_L - a_R)
        # Level matching constraint: N_L - a_L - (N_R - a_R) = n * w
        
        # Test 1: n = 1, w = 1, R = 2.0, alpha' = 1.0
        # N_L = 1.5 (NS), N_R = 0.5 (NS)
        # Left eff = 1.5 - 0.5 = 1.0
        # Right eff = 0.5 - 0.5 = 0.0
        # Left eff - Right eff = 1.0 == n * w = 1
        res = calculate_kk_winding_mass(
            n=1, w=1, R=2.0, alpha_prime=1.0,
            N_L=1.5, N_R=0.5, sector_L="NS", sector_R="NS"
        )
        self.assertTrue(res["level_matched"])
        
        # Calculate expected mass squared:
        # (1 / 2.0)^2 + (1 * 2.0 / 1.0)^2 + (2 / 1.0) * (1.5 + 0.5 - 0.5 - 0.5)
        # = 0.25 + 4.0 + 2.0 * 1.0 = 6.25
        self.assertAlmostEqual(res["mass_squared"], 6.25)
        self.assertAlmostEqual(res["mass"], 2.5)

        # Test T-duality mapping: Mass at R with (n, w) equals mass at R_dual = alpha'/R with (w, n)
        alpha_p = 2.0
        R = 5.0
        R_dual = apply_t_duality(R, alpha_p)  # 2.0 / 5.0 = 0.4
        self.assertAlmostEqual(R_dual, 0.4)

        # Mode A: radius R, momentum n=2, winding w=3
        mode_A = calculate_kk_winding_mass(
            n=2, w=3, R=R, alpha_prime=alpha_p,
            N_L=6.5, N_R=0.5, sector_L="NS", sector_R="NS"
        )
        # Mode B: radius R_dual, momentum n=3, winding w=2
        mode_B = calculate_kk_winding_mass(
            n=3, w=2, R=R_dual, alpha_prime=alpha_p,
            N_L=6.5, N_R=0.5, sector_L="NS", sector_R="NS"
        )
        
        # Verify level matching is identical
        self.assertTrue(mode_A["level_matched"])
        self.assertTrue(mode_B["level_matched"])
        # Verify physical mass squares are exactly equal under T-duality!
        self.assertAlmostEqual(mode_A["mass_squared"], mode_B["mass_squared"])

    def test_brane_tensions(self):
        # Tension formulas:
        # T_F1 = 1 / (2 * pi * alpha')
        # T_D0 = 1 / (g_s * sqrt(alpha'))
        tensions = calculate_brane_tensions(g_s=0.5, alpha_prime=2.0)
        
        self.assertAlmostEqual(tensions["F1"], 1.0 / (4.0 * math.pi))
        self.assertAlmostEqual(tensions["D0"], 1.0 / (0.5 * math.sqrt(2.0)))

    def test_calabi_yau_compactification(self):
        # test h_11 = 19, h_21 = 15
        # chi = 2 * (19 - 15) = 8
        # generations = |8| / 2 = 4
        res = analyze_cy_generations(h_11=19, h_21=15)
        self.assertEqual(res["euler_characteristic"], 8)
        self.assertEqual(res["particle_generations"], 4)

    def test_database_export(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            exported = export_all(tmpdir)
            
            # Verify paths
            self.assertTrue(os.path.exists(exported["json"]))
            self.assertTrue(os.path.exists(exported["sqlite"]))
            
            # 1. Verify JSON contents
            with open(exported["json"], "r", encoding="utf-8") as f:
                data = json.load(f)
            self.assertIn("Type_IIB", data)
            self.assertEqual(data["Type_IIB"]["dimensions"], 10)
            self.assertEqual(data["Type_IIB"]["supersymmetry"], "N=2 chiral (2,0)")

            # 2. Verify SQLite contents
            conn = sqlite3.connect(exported["sqlite"])
            cursor = conn.cursor()
            
            # Check theories table
            cursor.execute("SELECT name, dimensions, supersymmetry FROM Theories WHERE id='Type_IIB'")
            row = cursor.fetchone()
            self.assertIsNotNone(row)
            self.assertEqual(row[0], "Type IIB")
            self.assertEqual(row[1], 10)
            self.assertEqual(row[2], "N=2 chiral (2,0)")
            
            # Check allowed branes
            cursor.execute("SELECT name, dimension FROM AllowedBranes WHERE theory_id='Type_IIB'")
            branes = cursor.fetchall()
            self.assertTrue(len(branes) > 0)
            brane_names = [b[0] for b in branes]
            self.assertIn("D3-brane", brane_names)
            
            conn.close()


if __name__ == "__main__":
    unittest.main()
