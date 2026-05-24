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
    "calculate_unified_couplings"
]

__version__ = "1.0.0"
