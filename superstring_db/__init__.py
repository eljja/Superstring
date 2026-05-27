"""
Superstring Theory Database & Computational Calculation Hub.
Exposes pre-populated theoretical data, Pydantic schemas, and mathematical physical solvers.
"""

from .constants import StringUnits, C_SI, HBAR_SI, G_SI, PLANCK_MASS_GEV, PLANCK_LENGTH_SI
from .models import SuperstringTheory, MasslessField, DBrane, DualityRelation, CalabiYauModuli
from .data import THEORIES
from .solvers import (
    calculate_open_string_mass,
    calculate_closed_string_mass,
    calculate_kk_winding_mass,
    calculate_brane_tensions,
    apply_t_duality,
    apply_s_duality,
    analyze_cy_generations
)
from .export import export_to_json, export_to_sqlite, export_all
from .simulator import StringParticleSimulator, ParticleState
from .diagnostics import run_full_diagnostics
from .interactions import (
    calculate_veneziano_amplitude,
    get_regge_poles,
    calculate_unified_couplings
)
from .holography import (
    calculate_strominger_vafa_entropy,
    calculate_near_extremal_hawking,
    calculate_adscft_dictionary
)
from .cosmology import (
    calculate_cosmic_string_gw,
    calculate_kklt_inflation
)
from .dualities import (
    calculate_duality_web,
    calculate_bfss_matrix_model
)
from .swampland import (
    calculate_swampland_bounds,
    calculate_kklt_potential_curve
)
from .standard_model import (
    select_standard_model_vacuum,
    find_matching_vacua_candidates
)
from .higgs_neutrino import (
    solve_ewsb_and_higgs,
    solve_seesaw_neutrinos
)

__all__ = [
    "StringUnits",
    "C_SI",
    "HBAR_SI",
    "G_SI",
    "PLANCK_MASS_GEV",
    "PLANCK_LENGTH_SI",
    "SuperstringTheory",
    "MasslessField",
    "DBrane",
    "DualityRelation",
    "CalabiYauModuli",
    "THEORIES",
    "calculate_open_string_mass",
    "calculate_closed_string_mass",
    "calculate_kk_winding_mass",
    "calculate_brane_tensions",
    "apply_t_duality",
    "apply_s_duality",
    "analyze_cy_generations",
    "export_to_json",
    "export_to_sqlite",
    "export_all",
    "StringParticleSimulator",
    "ParticleState",
    "run_full_diagnostics",
    "calculate_veneziano_amplitude",
    "get_regge_poles",
    "calculate_unified_couplings",
    "calculate_strominger_vafa_entropy",
    "calculate_near_extremal_hawking",
    "calculate_adscft_dictionary",
    "calculate_cosmic_string_gw",
    "calculate_kklt_inflation",
    "calculate_duality_web",
    "calculate_bfss_matrix_model",
    "calculate_swampland_bounds",
    "calculate_kklt_potential_curve",
    "select_standard_model_vacuum",
    "find_matching_vacua_candidates",
    "solve_ewsb_and_higgs",
    "solve_seesaw_neutrinos"
]

__version__ = "1.0.0"
