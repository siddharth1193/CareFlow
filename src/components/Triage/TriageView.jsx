import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Stethoscope,
  AlertTriangle,
  HeartPulse,
  Activity,
  UserCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Plus,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const TriageView = () => {
  const { patients, addToast } = useApp();

  const [triageQueue, setTriageQueue] = useState([
    {
      id: 't-1',
      patientName: 'Suresh Narayanan',
      uhid: 'CF-2026-00891',
      age: 58,
      stage: 'DOCTOR_CONSULT', // ARRIVAL | TRIAGE | DOCTOR_CONSULT | DIAGNOSTICS | TREATMENT | DISCHARGED
      esiScore: 2, // ESI 1 (Immediate) -> 5 (Non-urgent)
      chiefComplaint: 'Chest tightness on climbing stairs, BP elevated',
      vitals: { hr: 88, bp: '154/96', spo2: 96, temp: '98.6°F' },
      assignedDoctor: 'Dr. Arvind Swaminathan (Cardiology)',
      arrivedAt: '09:10 AM'
    },
    {
      id: 't-2',
      patientName: 'Karthik Sundaram',
      uhid: 'CF-2026-00893',
      age: 34,
      stage: 'DIAGNOSTICS',
      esiScore: 4,
      chiefComplaint: 'Right knee pain post football game',
      vitals: { hr: 74, bp: '122/80', spo2: 99, temp: '98.4°F' },
      assignedDoctor: 'Dr. Rahul Sharma (Orthopedics)',
      arrivedAt: '10:00 AM'
    },
    {
      id: 't-3',
      patientName: 'Ananya Deshmukh',
      uhid: 'CF-2026-00892',
      age: 29,
      stage: 'TREATMENT',
      esiScore: 4,
      chiefComplaint: 'Eczema flare-up with severe pruritus',
      vitals: { hr: 76, bp: '118/76', spo2: 99, temp: '98.2°F' },
      assignedDoctor: 'Dr. Priya Nair (Dermatology)',
      arrivedAt: '11:15 AM'
    },
    {
      id: 't-4',
      patientName: 'Rohan Kapoor',
      uhid: 'CF-2026-00895',
      age: 26,
      stage: 'ARRIVAL',
      esiScore: 5,
      chiefComplaint: 'Acne consultation (Converted Lead)',
      vitals: { hr: 72, bp: '120/80', spo2: 99, temp: '98.4°F' },
      assignedDoctor: 'Dr. Priya Nair (Dermatology)',
      arrivedAt: '05:15 PM'
    }
  ]);

  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [calcForm, setCalcForm] = useState({
    patientName: 'New Patient',
    age: 45,
    hr: 82,
    systolicBp: 130,
    diastolicBp: 85,
    spo2: 98,
    painScale: 4,
    highRiskAlert: false,
    complaint: 'Routine checkup & fatigue'
  });

  const stages = [
    { id: 'ARRIVAL', label: '1. Arrival', color: '#0ea5e9' },
    { id: 'TRIAGE', label: '2. Triage & Vitals', color: '#f59e0b' },
    { id: 'DOCTOR_CONSULT', label: '3. OPD Consult', color: '#6366f1' },
    { id: 'DIAGNOSTICS', label: '4. Lab / Scans', color: '#a855f7' },
    { id: 'TREATMENT', label: '5. Treatment', color: '#ec4899' },
    { id: 'DISCHARGED', label: '6. Discharged', color: '#10b981' }
  ];

  const movePatientStage = (patientId, nextStage) => {
    setTriageQueue((prev) =>
      prev.map((p) => (p.id === patientId ? { ...p, stage: nextStage } : p))
    );

    if (nextStage === 'DISCHARGED') {
      try {
        confetti({ particleCount: 70, spread: 60 });
      } catch (_) {}
      addToast({
        title: "Patient Discharged",
        message: "Digital prescription & billing invoice finalized",
        type: "success"
      });
    } else {
      addToast({
        title: "Stage Updated",
        message: `Patient transitioned to ${nextStage.replace('_', ' ')}`,
        type: "info"
      });
    }
  };

  // ESI Urgency Calculator Engine
  const calculateEsiLevel = () => {
    if (calcForm.spo2 < 90 || calcForm.hr > 140 || calcForm.highRiskAlert) {
      return { level: 1, text: "ESI Level 1 (Resuscitation / Immediate)", color: "#ef4444" };
    }
    if (calcForm.systolicBp > 180 || calcForm.spo2 < 94 || calcForm.painScale >= 8) {
      return { level: 2, text: "ESI Level 2 (Emergent / High Risk)", color: "#f87171" };
    }
    if (calcForm.painScale >= 5 || calcForm.systolicBp > 150) {
      return { level: 3, text: "ESI Level 3 (Urgent / 2+ Resources)", color: "#f59e0b" };
    }
    if (calcForm.painScale >= 3) {
      return { level: 4, text: "ESI Level 4 (Less Urgent / 1 Resource)", color: "#0ea5e9" };
    }
    return { level: 5, text: "ESI Level 5 (Non-Urgent / OPD)", color: "#10b981" };
  };

  const calculatedEsi = calculateEsiLevel();

  const handleAddTriagedPatient = (e) => {
    e.preventDefault();
    const newEntry = {
      id: `t-${Date.now()}`,
      patientName: calcForm.patientName,
      uhid: `CF-${Math.floor(10000 + Math.random() * 90000)}`,
      age: calcForm.age,
      stage: 'TRIAGE',
      esiScore: calculatedEsi.level,
      chiefComplaint: calcForm.complaint,
      vitals: {
        hr: calcForm.hr,
        bp: `${calcForm.systolicBp}/${calcForm.diastolicBp}`,
        spo2: calcForm.spo2,
        temp: '98.6°F'
      },
      assignedDoctor: 'Dr. Arvind Swaminathan (Cardiology)',
      arrivedAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };

    setTriageQueue((prev) => [newEntry, ...prev]);
    setIsCalculatorOpen(false);
    addToast({
      title: "Patient Triaged",
      message: `${newEntry.patientName} assigned ${calculatedEsi.text}`,
      type: "success"
    });
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-title">
            <Stethoscope size={24} color="var(--primary)" />
            <span>Smart ER & Clinic Flow Kanban</span>
          </div>
          <div className="page-subtitle">
            Emergency Severity Index (ESI 1-5) scoring and real-time clinical stage transitions
          </div>
        </div>

        <button className="btn btn-emerald" onClick={() => setIsCalculatorOpen(true)}>
          <HeartPulse size={16} /> ESI Triage Urgency Calculator
        </button>
      </div>

      {/* 6-Stage Clinical Kanban Flow */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, overflowX: 'auto', minHeight: 520 }}>
        {stages.map((st) => {
          const patientsInStage = triageQueue.filter((p) => p.stage === st.id);
          return (
            <div
              key={st.id}
              style={{
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                borderTop: `4px solid ${st.color}`,
                padding: 12,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontWeight: 800, fontSize: '0.82rem', color: '#fff' }}>
                  {st.label}
                </span>
                <span className="badge badge-muted" style={{ fontSize: '0.65rem' }}>
                  {patientsInStage.length}
                </span>
              </div>

              {/* Patient Cards in this Stage */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                {patientsInStage.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      padding: 12,
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-color)',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--text-main)' }}>
                        {p.patientName}
                      </span>
                      <span
                        className={`badge ${
                          p.esiScore <= 2 ? 'badge-crimson' : p.esiScore === 3 ? 'badge-amber' : 'badge-emerald'
                        }`}
                        style={{ fontSize: '0.62rem' }}
                      >
                        ESI {p.esiScore}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      {p.age}y • UHID: {p.uhid}
                    </div>

                    <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: 6, lineHeight: 1.4 }}>
                      {p.chiefComplaint}
                    </div>

                    {/* Vitals snapshot */}
                    <div style={{ padding: '4px 6px', borderRadius: 4, background: 'rgba(255,255,255,0.03)', marginTop: 8, fontSize: '0.68rem', color: '#38bdf8' }}>
                      HR: {p.vitals.hr} bpm • BP: {p.vitals.bp} • SpO2: {p.vitals.spo2}%
                    </div>

                    {/* Stage transition button */}
                    <div style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-end' }}>
                      {st.id !== 'DISCHARGED' ? (
                        <button
                          className="btn btn-secondary btn-sm"
                          style={{ fontSize: '0.7rem', padding: '3px 8px' }}
                          onClick={() => {
                            const currentIdx = stages.findIndex((s) => s.id === st.id);
                            const nextStage = stages[currentIdx + 1]?.id;
                            if (nextStage) movePatientStage(p.id, nextStage);
                          }}
                        >
                          Next <ArrowRight size={11} />
                        </button>
                      ) : (
                        <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                          <CheckCircle2 size={11} /> Completed
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ESI Triage Calculator Modal */}
      {isCalculatorOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>
                Emergency Severity Index (ESI) Triage Calculator
              </div>
              <button onClick={() => setIsCalculatorOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddTriagedPatient}>
              <div className="modal-body">
                <div className="grid-2">
                  <div className="input-group">
                    <label className="input-label">Patient Name</label>
                    <input
                      type="text"
                      className="input-control"
                      value={calcForm.patientName}
                      onChange={(e) => setCalcForm({ ...calcForm, patientName: e.target.value })}
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Age</label>
                    <input
                      type="number"
                      className="input-control"
                      value={calcForm.age}
                      onChange={(e) => setCalcForm({ ...calcForm, age: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="grid-3">
                  <div className="input-group">
                    <label className="input-label">Heart Rate (HR)</label>
                    <input
                      type="number"
                      className="input-control"
                      value={calcForm.hr}
                      onChange={(e) => setCalcForm({ ...calcForm, hr: Number(e.target.value) })}
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Systolic BP (mmHg)</label>
                    <input
                      type="number"
                      className="input-control"
                      value={calcForm.systolicBp}
                      onChange={(e) => setCalcForm({ ...calcForm, systolicBp: Number(e.target.value) })}
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">SpO2 Oxygen (%)</label>
                    <input
                      type="number"
                      className="input-control"
                      value={calcForm.spo2}
                      onChange={(e) => setCalcForm({ ...calcForm, spo2: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="input-group">
                    <label className="input-label">Pain Severity Scale (1 - 10)</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      className="input-control"
                      value={calcForm.painScale}
                      onChange={(e) => setCalcForm({ ...calcForm, painScale: Number(e.target.value) })}
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Chief Complaint</label>
                    <input
                      type="text"
                      className="input-control"
                      value={calcForm.complaint}
                      onChange={(e) => setCalcForm({ ...calcForm, complaint: e.target.value })}
                    />
                  </div>
                </div>

                {/* Calculated Urgency Result Box */}
                <div
                  style={{
                    padding: 14,
                    borderRadius: 'var(--radius-sm)',
                    background: `${calculatedEsi.color}22`,
                    border: `1px solid ${calculatedEsi.color}`,
                    color: calculatedEsi.color,
                    fontWeight: 800,
                    fontSize: '0.92rem',
                    textAlign: 'center',
                    marginTop: 8
                  }}
                >
                  Calculated Triage: {calculatedEsi.text}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={() => setIsCalculatorOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-emerald">
                  Add Patient to Triage Kanban
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
