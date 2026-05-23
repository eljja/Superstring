"""
Export utilities for the superstring database.
Allows dumping the theoretical registry into structured JSON or a normalized SQLite database.
"""

import json
import sqlite3
import os
from typing import Any, Dict
from .data import THEORIES


def export_to_json(filepath: str = "superstring_db.json") -> str:
    """
    Exports the entire pre-populated database to a single JSON file.
    
    Args:
        filepath: Output JSON file path
    """
    # Convert Pydantic models to dicts
    data_dict = {key: theory.model_dump() for key, theory in THEORIES.items()}
    
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data_dict, f, indent=4, ensure_ascii=False)
        
    return os.path.abspath(filepath)


def export_to_sqlite(filepath: str = "superstring_db.sqlite") -> str:
    """
    Exports the database to a fully normalized SQLite database.
    Creates tables: Theories, MasslessSpectrum, AllowedBranes, Dualities.
    
    Args:
        filepath: Output SQLite file path
    """
    # Remove existing file if any to start clean
    if os.path.exists(filepath):
        try:
            os.remove(filepath)
        except OSError:
            pass

    conn = sqlite3.connect(filepath)
    cursor = conn.cursor()

    # Create tables
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS Theories (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            dimensions INTEGER NOT NULL,
            orientation TEXT NOT NULL,
            string_type TEXT NOT NULL,
            supersymmetry TEXT NOT NULL,
            supercharges INTEGER NOT NULL,
            gauge_group TEXT,
            description TEXT NOT NULL
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS MasslessSpectrum (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            theory_id TEXT NOT NULL,
            name TEXT NOT NULL,
            symbol TEXT NOT NULL,
            sector TEXT NOT NULL,
            spin REAL NOT NULL,
            description TEXT NOT NULL,
            FOREIGN KEY(theory_id) REFERENCES Theories(id)
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS AllowedBranes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            theory_id TEXT NOT NULL,
            name TEXT NOT NULL,
            dimension INTEGER NOT NULL,
            tension_formula TEXT NOT NULL,
            is_dirichlet INTEGER NOT NULL,
            charge_carrier TEXT NOT NULL,
            description TEXT NOT NULL,
            FOREIGN KEY(theory_id) REFERENCES Theories(id)
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS Dualities (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            theory_id TEXT NOT NULL,
            type TEXT NOT NULL,
            target_theory TEXT NOT NULL,
            parameter_mapping TEXT NOT NULL,
            physical_effect TEXT NOT NULL,
            FOREIGN KEY(theory_id) REFERENCES Theories(id)
        )
    """)

    # Populate tables
    for key, theory in THEORIES.items():
        # Insert theory
        cursor.execute("""
            INSERT INTO Theories (id, name, dimensions, orientation, string_type, supersymmetry, supercharges, gauge_group, description)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            key,
            theory.name,
            theory.dimensions,
            theory.orientation,
            theory.string_type,
            theory.supersymmetry,
            theory.supercharges,
            theory.gauge_group,
            theory.description
        ))

        # Insert massless spectrum
        for field in theory.massless_spectrum:
            cursor.execute("""
                INSERT INTO MasslessSpectrum (theory_id, name, symbol, sector, spin, description)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (
                key,
                field.name,
                field.symbol,
                field.sector,
                field.spin,
                field.description
            ))

        # Insert allowed branes
        for brane in theory.allowed_branes:
            cursor.execute("""
                INSERT INTO AllowedBranes (theory_id, name, dimension, tension_formula, is_dirichlet, charge_carrier, description)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (
                key,
                brane.name,
                brane.dimension,
                brane.tension_formula,
                1 if brane.is_dirichlet else 0,
                brane.charge_carrier,
                brane.description
            ))

        # Insert dualities
        for duality in theory.dualities:
            cursor.execute("""
                INSERT INTO Dualities (theory_id, type, target_theory, parameter_mapping, physical_effect)
                VALUES (?, ?, ?, ?, ?)
            """, (
                key,
                duality.type,
                duality.target_theory,
                duality.parameter_mapping,
                duality.physical_effect
            ))

    conn.commit()
    conn.close()
    
    return os.path.abspath(filepath)


def export_all(directory: str = ".") -> Dict[str, str]:
    """
    Helper to run all exports and save to the specified directory.
    """
    json_path = os.path.join(directory, "superstring_db.json")
    sqlite_path = os.path.join(directory, "superstring_db.sqlite")
    
    res_json = export_to_json(json_path)
    res_sqlite = export_to_sqlite(sqlite_path)
    
    return {
        "json": res_json,
        "sqlite": res_sqlite
    }
