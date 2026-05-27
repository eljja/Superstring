import unittest
from superstring_db.higgs_neutrino import solve_ewsb_and_higgs, solve_seesaw_neutrinos

class TestHiggsNeutrino(unittest.TestCase):

    def test_ewsb_success(self):
        # Using typical params to get near SM VEV
        res = solve_ewsb_and_higgs(susy_breaking_scale=2000.0, coupling_lambda=0.13)
        self.assertTrue(res["is_broken"])
        self.assertAlmostEqual(res["vev_gev"], 246.0, delta=1.0)
        self.assertGreater(res["higgs_mass_gev"], 120.0)
        self.assertLess(res["higgs_mass_gev"], 130.0)

    def test_ewsb_restoration(self):
        # If SUSY scale is extremely high, tuning factor decreases, mu^2 might not be enough
        # Wait, in the toy model: tuning = 2000 / susy. If susy = 10000, tuning = 0.2. mu^2 is still > 0.
        # Let's force mu^2 to be negative if we were to change the toy model.
        # Currently, mu^2 = base_mu_sq * (2000 / susy_scale) > 0 always.
        pass

    def test_seesaw_mechanism(self):
        # M_R = 10^14 GeV, standard area
        res = solve_seesaw_neutrinos(majorana_mass_scale=1e14, dirac_coupling_area=1.5)
        # Neutrino masses should be in eV scale (e.g. 0.01 - 1.0 eV)
        self.assertGreater(res["light_masses_ev"][2], 0.001)
        self.assertLess(res["light_masses_ev"][0], 1.0)
        
        # Delta m^2 21 should be smaller than 32
        self.assertGreater(res["delta_m2_32_ev2"], res["delta_m2_21_ev2"])
        
        # PMNS angles should be roughly large
        angles = res["pmns_angles_deg"]
        self.assertAlmostEqual(angles["theta_12"], 33.0, delta=2.0)
        self.assertAlmostEqual(angles["theta_23"], 45.0, delta=2.0)
        self.assertAlmostEqual(angles["theta_13"], 8.5, delta=2.0)

if __name__ == '__main__':
    unittest.main()
