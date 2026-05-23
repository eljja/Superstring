"""
Pydantic models representing superstring theories, branes, dualities, and excited states.
Provides strong typing and documentation for the database.
"""

from typing import List, Dict, Optional
from pydantic import BaseModel, Field


class MasslessField(BaseModel):
    """Represents a massless particle/field in the string spectrum."""
    name: str = Field(..., description="Name of the field (e.g., Graviton, Dilaton, Axion)")
    symbol: str = Field(..., description="Mathematical symbol (e.g., g_mu_nu, phi)")
    sector: str = Field(..., description="Sector of the worldsheet theory (NS-NS, R-R, NS-R, R-NS, or Gauge)")
    spin: float = Field(..., description="Spin of the field (0, 0.5, 1, 1.5, 2)")
    description: str = Field(..., description="Physical role or description of the field")


class DBrane(BaseModel):
    """Represents a D-brane or solitonic brane in the theory."""
    name: str = Field(..., description="Name of the brane (e.g., D3-brane, NS5-brane)")
    dimension: int = Field(..., description="Spatial dimensions of the brane (p)")
    tension_formula: str = Field(..., description="Formula for brane tension in terms of g_s and alpha'")
    is_dirichlet: bool = Field(True, description="True if it is a D-brane (endpoint of open strings)")
    charge_carrier: str = Field(..., description="Type of Ramond-Ramond or NS-NS field it couples to")
    description: str = Field(..., description="Role and properties in the theory")


class DualityRelation(BaseModel):
    """Represents a duality mapping between superstring theories."""
    type: str = Field(..., description="Type of duality (S-duality, T-duality, M-theory limit)")
    target_theory: str = Field(..., description="The theory this duality maps to")
    parameter_mapping: str = Field(..., description="Mathematical mapping (e.g., R -> alpha'/R, g_s -> 1/g_s)")
    physical_effect: str = Field(..., description="Physical description of the mapping (e.g., exchange of F1 and D1)")


class SuperstringTheory(BaseModel):
    """Represents a full 10D (or 11D) consistent superstring theory."""
    name: str = Field(..., description="Name of the theory (e.g., Type IIB)")
    dimensions: int = Field(10, description="Spacetime dimensions")
    orientation: str = Field("Oriented", description="Oriented or Unoriented strings")
    string_type: str = Field("Closed", description="Open, Closed, or Both")
    supersymmetry: str = Field(..., description="Supersymmetry details (e.g., N=2, chiral (2,0))")
    supercharges: int = Field(..., description="Number of supercharges (e.g., 32 or 16)")
    gauge_group: Optional[str] = Field(None, description="Gauge symmetry group in 10D (e.g., SO(32), E8xE8)")
    description: str = Field(..., description="Summary of the theory's characteristics")
    massless_spectrum: List[MasslessField] = Field(default_factory=list, description="List of massless fields")
    allowed_branes: List[DBrane] = Field(default_factory=list, description="Stable branes supported by the theory")
    dualities: List[DualityRelation] = Field(default_factory=list, description="Dualities associated with this theory")


class CalabiYauModuli(BaseModel):
    """Topological properties of Calabi-Yau 3-fold compactifications."""
    h_11: int = Field(..., description="Hodge number h^(1,1) representing Kähler moduli")
    h_21: int = Field(..., description="Hodge number h^(2,1) representing Complex structure moduli")
    euler_characteristic: int = Field(..., description="Euler characteristic chi = 2 * (h_11 - h_21)")
    particle_generations: int = Field(..., description="Number of chiral fermion generations (N_gen = |chi| / 2)")
    gauge_breaking: str = Field(..., description="Standard gauge group breaking scheme (e.g. E8 -> E6)")
