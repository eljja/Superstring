"""
Unit tests for the superstring particle simulator and theoretical diagnostic suite.
Verifies GSO projections, E6 GUT breaking calculations, and spacetime anomaly checks.
"""

import unittest
import math

from superstring_db.simulator import StringParticleSimulator
from superstring_db.diagnostics import (
    verify_critical_dimension,
    verify_anomaly_cancellation,
    verify_level_matching,
    run_full_diagnostics
)


class TestSuperstringSimulator(unittest.TestCase):

    def setUp(self):
        self.sim = StringParticleSimulator(alpha_prime=1.0, g_s=0.1)

    def test_gso_projection(self):
        # 1. NS sector: N=0 (Tachyon) must be GSO blocked!
        self.assertFalse(self.sim.check_gso_projection("NS", 0.0))
        # 2. NS sector: N=0.5 (Massless Vector) must be GSO allowed!
        self.assertTrue(self.sim.check_gso_projection("NS", 0.5))
        # 3. NS sector: N=1.5 (Massive state) must be GSO allowed!
        self.assertTrue(self.sim.check_gso_projection("NS", 1.5))
        # 4. NS sector: N=1.0 (Even multiple) must be GSO blocked!
        self.assertFalse(self.sim.check_gso_projection("NS", 1.0))
        
        # 5. R sector: N=0 (Massless Fermion) must be GSO allowed!
        self.assertTrue(self.sim.check_gso_projection("R", 0.0))
        # 6. R sector: N=1.0 (Massive Fermion) must be GSO allowed!
        self.assertTrue(self.sim.check_gso_projection("R", 1.0))
        # 7. R sector: N=0.5 (Half-integer) must be GSO blocked!
        self.assertFalse(self.sim.check_gso_projection("R", 0.5))

    def test_assemble_particle(self):
        # Assemble standard closed string graviton in Type IIB (NS-NS sector, N_L=0.5, N_R=0.5)
        graviton = self.sim.assemble_particle(
            theory_name="Type IIB",
            sector="NS-NS",
            N_L=0.5,
            N_R=0.5
        )
        self.assertEqual(graviton.name, "Graviton")
        self.assertEqual(graviton.spin, 2.0)
        self.assertAlmostEqual(graviton.mass_squared, 0.0)
        self.assertTrue(graviton.is_gso_allowed)
        self.assertFalse(graviton.is_tachyon)

        # Assemble a tachyon (N_L=0, N_R=0 without GSO filter)
        tachyon = self.sim.assemble_particle(
            theory_name="Type IIB",
            sector="NS-NS",
            N_L=0.0,
            N_R=0.0
        )
        self.assertEqual(tachyon.name, "Tachyon")
        self.assertTrue(tachyon.is_tachyon)
        self.assertFalse(tachyon.is_gso_allowed) # GSO should flag this as false

    def test_e6_representations(self):
        # Hodge numbers h_11 = 19, h_21 = 15
        # chi = 2 * (19 - 15) = 8
        # generations = 4. Total chiral fields = 4 * 27 = 108.
        e6_data = self.sim.get_e6_representations(h_11=19, h_21=15)
        self.assertEqual(e6_data["euler_characteristic"], 8)
        self.assertEqual(e6_data["net_generations"], 4)
        self.assertEqual(e6_data["total_chiral_fields_4d"], 108)
        self.assertEqual(e6_data["chiral_multiplets_27"], 15)
        self.assertEqual(e6_data["chiral_multiplets_27_bar"], 19)

    def test_diagnostics_critical_dimension(self):
        # Type IIB in 10D: Pass
        res1 = verify_critical_dimension("Type IIB", 10)
        self.assertTrue(res1.passed)
        
        # Type IIB in 8D: Fail
        res2 = verify_critical_dimension("Type IIB", 8)
        self.assertFalse(res2.passed)
        self.assertIn("임계 차원 불일치", res2.error_message)

    def test_diagnostics_anomaly_cancellation(self):
        # Type I with SO(32): Pass
        res1 = verify_anomaly_cancellation("Type I", "SO(32)")
        self.assertTrue(res1.passed)

        # Type I with SU(5): Fail
        res2 = verify_anomaly_cancellation("Type I", "SU(5)")
        self.assertFalse(res2.passed)
        self.assertIn("게이지 변칙 경고", res2.error_message)

    def test_diagnostics_level_matching(self):
        # w=0, n=0, N_L=0.5, N_R=0.5: Pass
        res1 = verify_level_matching(n=0, w=0, N_L=0.5, N_R=0.5)
        self.assertTrue(res1.passed)

        # w=1, n=1, N_L=1.5, N_R=0.5: Pass (1.5 - 0.5 - 0.5 + 0.5 = 1.0 == 1*1)
        res2 = verify_level_matching(n=1, w=1, N_L=1.5, N_R=0.5)
        self.assertTrue(res2.passed)

        # w=1, n=1, N_L=0.5, N_R=0.5: Fail (0.0 != 1.0)
        res3 = verify_level_matching(n=1, w=1, N_L=0.5, N_R=0.5)
        self.assertFalse(res3.passed)


if __name__ == "__main__":
    unittest.main()
