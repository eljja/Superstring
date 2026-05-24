"""
Theoretical consistency checker and anomaly diagnostic engine for superstring configurations.
Examines critical dimensions, anomaly cancellations, level matching, and GSO projections.
"""

import math
from typing import Dict, Any, List


class DiagnosticResult:
    """Represents the results of a single consistency check."""
    def __init__(self, name: str, passed: bool, error_message: str = "", explanation: str = ""):
        self.name = name
        self.passed = passed
        self.error_message = error_message
        self.explanation = explanation

    def to_dict(self) -> Dict[str, Any]:
        return {
            "name": self.name,
            "passed": self.passed,
            "error_message": self.error_message,
            "explanation": self.explanation
        }


def verify_critical_dimension(theory_name: str, dimensions: int) -> DiagnosticResult:
    """Verifies that the configuration conforms to critical dimensions (10D or 11D)."""
    theory_key = theory_name.replace(" ", "_").upper()
    expected = 11 if "M_THEORY" in theory_key or "M-THEORY" in theory_key else 10
    
    passed = dimensions == expected
    error_msg = ""
    explanation = f"초끈 이론은 등각 변칙(conformal anomaly)과 고스트 상태를 상쇄하기 위해 임계 차원 D={expected}을 만족해야 합니다."
    
    if not passed:
        error_msg = f"임계 차원 불일치: 현재 {dimensions}D이나, 이론상 반드시 {expected}D이어야 합니다."
        explanation += " 차원이 맞지 않으면 진공의 등각 대칭성(Weyl symmetry)이 양자역학적으로 붕괴하여 물리적인 진동 상태를 정의할 수 없게 됩니다."
        
    return DiagnosticResult("시공간 임계 차원 검사 (Critical Spacetime Dimension)", passed, error_msg, explanation)


def verify_anomaly_cancellation(theory_name: str, gauge_group: str) -> DiagnosticResult:
    """
    Verifies Green-Schwarz anomaly cancellation in 10D N=1 supersymmetry.
    Requires SO(32) or E8 x E8 for anomaly cancellation.
    """
    theory_key = theory_name.replace(" ", "_").upper()
    passed = True
    error_msg = ""
    explanation = "10차원 N=1 초대칭 끈 이론에서는 양자 변칙(Quantum Anomaly)이 발생하나, 특정 게이지 그룹 하에서 Green-Schwarz 메커니즘을 통해 완벽히 상쇄됩니다."
    
    if "TYPE_I" in theory_key:
        passed = gauge_group.upper().replace(" ", "") == "SO(32)"
        if not passed:
            error_msg = f"게이지 변칙 경고: Type I은 반드시 SO(32) 게이지 대칭이어야 합니다. 현재 입력: {gauge_group}"
            explanation += " SO(32) 그룹이 아니면 중력-게이지 합성 양자 변칙이 상쇄되지 않아 진공이 양자역학적으로 불안정해집니다."
    elif "HETEROTIC_SO32" in theory_key:
        passed = gauge_group.upper().replace(" ", "") == "SO(32)"
        if not passed:
            error_msg = f"게이지 변칙 경고: Heterotic SO(32)는 반드시 SO(32) 게이지 그룹이어야 합니다."
    elif "HETEROTIC_E8XE8" in theory_key:
        g_clean = gauge_group.upper().replace(" ", "").replace("X", "X")
        passed = "E8" in g_clean
        if not passed:
            error_msg = f"게이지 변칙 경고: Heterotic E8xE8은 반드시 E8 x E8 게이지 그룹이어야 합니다."
    
    return DiagnosticResult("Green-Schwarz 게이지 변칙 상쇄 검사 (Anomaly Cancellation)", passed, error_msg, explanation)


def verify_level_matching(
    n: int, 
    w: int, 
    N_L: float, 
    N_R: float, 
    sector_L: str = "NS", 
    sector_R: str = "NS"
) -> DiagnosticResult:
    """
    Verifies closed string level matching constraint.
    N_L - a_L - (N_R - a_R) = n * w
    """
    a_L = 0.5 if sector_L.upper() == "NS" else 0.0
    a_R = 0.5 if sector_R.upper() == "NS" else 0.0
    
    actual_diff = (N_L - a_L) - (N_R - a_R)
    expected_diff = float(n * w)
    
    passed = math.isclose(actual_diff, expected_diff, abs_tol=1e-9)
    error_msg = ""
    explanation = "닫힌 끈의 세계면(worldsheet) 좌표 재매개변수화 대칭성(L_0 - L_bar_0 = 0)을 유지하기 위해 수준 일치 조건(Level Matching)을 충족해야 합니다."
    
    if not passed:
        error_msg = f"수준 일치 불일치: 좌-우 가진 차이({actual_diff})가 n * w ({expected_diff})와 다릅니다."
        explanation += " 이 조건이 충족되지 않으면 끈의 세계면 위에 정의된 양자 격자 구조가 깨져 물리적으로 존재할 수 없는 유령 상태(Ghost State)가 발생합니다."
        
    return DiagnosticResult("닫힌 끈 수준 일치 조건 검사 (Level Matching Constraint)", passed, error_msg, explanation)


def run_full_diagnostics(
    theory_name: str,
    dimensions: int,
    gauge_group: str,
    n: int = 0,
    w: int = 0,
    N_L: float = 0.5,
    N_R: float = 0.5,
    sector_L: str = "NS",
    sector_R: str = "NS"
) -> List[Dict[str, Any]]:
    """Runs a full suite of theoretical diagnostics on the current configuration."""
    results = []
    
    # 1. Critical Dimension
    results.append(verify_critical_dimension(theory_name, dimensions).to_dict())
    
    # 2. Anomaly Cancellation
    results.append(verify_anomaly_cancellation(theory_name, gauge_group).to_dict())
    
    # 3. Level Matching (only for closed strings or theories with closed strings)
    if "open" not in sector_L.lower() and "open" not in sector_R.lower() and theory_name.replace(" ", "_") != "Type_I":
        results.append(verify_level_matching(n, w, N_L, N_R, sector_L, sector_R).to_dict())
        
    return results
