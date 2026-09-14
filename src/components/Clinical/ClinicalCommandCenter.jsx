import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  HeartPulse,
  Bed,
  AlertTriangle,
  Activity,
  Stethoscope,
  ArrowRight,
  UserCheck,
  Info,
  Brain,
  CheckCircle2
} from 'lucide-react';

/* Static ICU demo patient — Suresh Narayanan (pat-101) */
const ICU_BED = {
  bedId: 'BED-ICU-02',
  patientName: 'Suresh Narayanan',
  uhid: 'CF-2026-00891',
  age: 58,
  gender: 'M',
  condition: 'Post-CABG Cardiac Monitoring',
  status: 'STABLE',
  attendingDoctor: 'Dr. Arvind Swaminathan',
  vitals: {
    hr:   { value: 72,         unit: 'bpm',   label: 'Heart Rate',  status: 'normal' },
    spo2: { value: '98',       unit: '%',      label: 'SpO₂',        status: 'normal' },
    bp:   { value: '128/82',   unit: 'mmHg',   label: 'Blood Press.', status: 'normal' },
    temp: { value: '98.4',     unit: '°F',     label: 'Temperature', status: 'normal' }
  },
  admittedAt: '2026-09-01',
  lastReview: '09:30 AM today'
};

/* Static ECG path (simulated waveform) */
const ECG_PATH = "M 0 22 L 20 22 L 25 16 L 30 28 L 35 4 L 40 38 L 45 22 L 75 22 L 80 16 L 85 28 L 90 4 L 95 38 L 100 22 L 140 22 L 145 16 L 150 28 L 155 4 L 160 38 L 165 22 L 200 22";

const VitalCard = ({ vital }) => {
  const statusColor = vital.status === 'critical'
    ? 'var(--color-critical-text)'
    : vital.status === 'warning'
    ? 'var(--color-warning-text)'
    : 'var(--color-success-text)';

  return (
    <div className="cf-vital-item">
      <div className="cf-vital-label">{vital.label}</div>
      <div className="cf-vital-value" style={{ color: statusColor }}>{vital.value}</div>
      <div className="cf-vital-unit">{vital.unit}</div>
    </div>
  );
};

export const ClinicalCommandCenter = () => {
  const { patients, setSelectedPatient, setActiveView } = useApp();

  const icuPatient = patients.find(p => p.id === 'pat-101');

  /* Demo triage summary */
  const triagedPatients = [
    { name: 'Suresh Narayanan',  esi: 2, complaint: 'Post-CABG monitoring',      stage: 'ICU Monitoring',   status: 'critical' },
    { name: 'Karthik Sundaram',  esi: 4, complaint: 'Knee pain post sports injury', stage: 'Diagnostics',    status: 'normal' },
    { name: 'Ananya Deshmukh',   esi: 4, complaint: 'Eczema flare-up',             stage: 'Treatment',       status: 'normal' },
    { name: 'Rohan Kapoor',      esi: 5, complaint: 'Acne consultation',           stage: 'Waiting — OPD',   status: 'normal' }
  ];

  const criticalCount = triagedPatients.filter(p => p.esi <= 2).length;
  const alertCount    = triagedPatients.filter(p => p.esi === 3).length;

  const esiColor = (esi) =>
    esi <= 2 ? 'var(--color-critical-text)' :
    esi === 3 ? 'var(--color-warning-text)' :
    'var(--color-success-text)';

  const esiBadge = (esi) =>
    esi <= 2 ? 'badge-crimson' :
    esi === 3 ? 'badge-amber' :
    'badge-emerald';

  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="page-title">
            <HeartPulse size={22} color="var(--color-critical-text)" />
            <span>Clinical Command Center</span>
          </div>
          <div className="page-subtitle">
            {ICU_BED.attendingDoctor} • Indiranagar Flagship Hub
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setActiveView('triage')}>
            <Stethoscope size={13} /> Open Triage Queue
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => { if (icuPatient) { setSelectedPatient(icuPatient); setActiveView('patients'); } }}
          >
            <UserCheck size={13} /> View Patient Record
          </button>
        </div>
      </div>

      {/* Demo Data Notice */}
      <div className="cf-demo-notice">
        <Info size={13} />
        <span><strong>Demo Data</strong> — All patient vitals, waveforms, and clinical data displayed here are synthetic and do not represent real hospital monitoring.</span>
      </div>

      {/* Summary Stats */}
      <div className="grid-3" style={{ marginBottom: 20 }}>
        <div className="glass-card" style={{ borderLeft: '3px solid var(--color-critical-text)', padding: '16px 20px' }}>
          <div className="cf-kpi-label">Critical Patients</div>
          <div className="cf-kpi-value" style={{ color: 'var(--color-critical-text)' }}>{criticalCount.toString().padStart(2, '0')}</div>
          <div className="cf-kpi-meta">ESI Level 1–2 · Requires immediate attention</div>
        </div>
        <div className="glass-card" style={{ borderLeft: '3px solid var(--color-warning-text)', padding: '16px 20px' }}>
          <div className="cf-kpi-label">Active Alerts</div>
          <div className="cf-kpi-value" style={{ color: 'var(--color-warning-text)' }}>{alertCount.toString().padStart(2, '0')}</div>
          <div className="cf-kpi-meta">ESI Level 3 · Urgent monitoring</div>
        </div>
        <div className="glass-card" style={{ borderLeft: '3px solid var(--color-info-text)', padding: '16px 20px' }}>
          <div className="cf-kpi-label">Beds Occupied</div>
          <div className="cf-kpi-value">19 <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 600 }}>/ 24</span></div>
          <div className="cf-kpi-meta">ICU: 4/4 Full · General: 15/20</div>
        </div>
      </div>

      {/* Main Layout: ICU Patient + Triage Queue */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* ICU Patient Card */}
        <div className="glass-card">
          {/* Card Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <div
                  style={{
                    width: 10, height: 10, borderRadius: '50%',
                    background: 'var(--color-success-text)',
                    position: 'relative'
                  }}
                >
                  <span style={{
                    position: 'absolute', top: -2, left: -2, right: -2, bottom: -2,
                    borderRadius: '50%', background: 'var(--color-success-text)',
                    opacity: 0.3, animation: 'pulse-ping 1.6s ease infinite'
                  }} />
                </div>
                <span style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--text-main)' }}>
                  {ICU_BED.bedId} — {ICU_BED.patientName}
                </span>
                <span className="badge badge-emerald">{ICU_BED.status}</span>
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-dim)' }}>
                {ICU_BED.age}{ICU_BED.gender} · UHID: {ICU_BED.uhid} · {ICU_BED.condition}
              </div>
            </div>
            <div style={{ textAlign: 'right', fontSize: 'var(--text-xs)', color: 'var(--text-dim)' }}>
              <div>Dr: {ICU_BED.attendingDoctor}</div>
              <div>Last review: {ICU_BED.lastReview}</div>
            </div>
          </div>

          {/* Vitals */}
          <div className="cf-vitals-grid" style={{ marginBottom: 16 }}>
            {Object.values(ICU_BED.vitals).map((v) => (
              <VitalCard key={v.label} vital={v} />
            ))}
          </div>

          {/* ECG Strip */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <HeartPulse size={13} color="var(--color-success-text)" />
                ECG Waveform — Lead II
              </div>
              <span style={{ fontSize: '0.62rem', background: 'var(--color-warning-bg)', color: 'var(--color-warning-text)', border: '1px solid var(--color-warning-border)', borderRadius: 'var(--radius-full)', padding: '1px 7px', fontWeight: 700, letterSpacing: '0.03em', textTransform: 'uppercase' }}>
                Demo Data — Simulated Waveform
              </span>
            </div>
            <div style={{
              width: '100%', height: 54,
              background: '#06091a',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <svg viewBox="0 0 200 44" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                {/* Grid lines */}
                <line x1="0" y1="22" x2="200" y2="22" stroke="rgba(22,163,74,0.1)" strokeWidth="0.5" />
                <line x1="50" y1="0" x2="50" y2="44" stroke="rgba(22,163,74,0.07)" strokeWidth="0.5" />
                <line x1="100" y1="0" x2="100" y2="44" stroke="rgba(22,163,74,0.07)" strokeWidth="0.5" />
                <line x1="150" y1="0" x2="150" y2="44" stroke="rgba(22,163,74,0.07)" strokeWidth="0.5" />
                {/* Waveform */}
                <path
                  d={ECG_PATH}
                  fill="none"
                  stroke="var(--color-success-text)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* AI Clinical Summary */}
          <div style={{
            padding: '12px 14px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--color-ai-bg)',
            border: '1px solid var(--color-ai-border)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Brain size={13} color="var(--color-ai-text)" />
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-ai-text)' }}>
                  AI Clinical Summary
                </span>
              </div>
              <span className="cf-ai-label">AI · Demo Data Only</span>
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
              Patient vitals are within normal post-operative range. BP 128/82 mmHg is mildly elevated — consistent with hypertension history. SpO₂ 98% is adequate. Cardiac rhythm shows normal sinus at 72 bpm.
            </p>
            <div style={{ marginTop: 6, fontSize: '0.62rem', color: 'var(--text-dim)' }}>
              ⚠ This is an AI-generated summary from demo records. It is not clinical advice and must not be used for medical decision-making.
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => { if (icuPatient) { setSelectedPatient(icuPatient); setActiveView('patients'); } }}
            >
              <UserCheck size={13} /> View Full Patient Record
            </button>
            <button className="btn btn-ghost btn-sm" onClick={() => setActiveView('triage')}>
              Open Triage Queue <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* Triage Queue Summary */}
        <div className="glass-card">
          <div style={{ fontWeight: 700, fontSize: 'var(--text-base)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Stethoscope size={16} color="var(--primary)" />
            Active Patient Queue
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {triagedPatients.map((p) => (
              <div
                key={p.name}
                className="cf-panel"
                style={{ borderLeft: `3px solid ${esiColor(p.esi)}` }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                  <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text-main)' }}>
                    {p.name}
                  </span>
                  <span className={`badge ${esiBadge(p.esi)}`} style={{ fontSize: '0.62rem' }}>
                    ESI {p.esi}
                  </span>
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: 2 }}>
                  {p.complaint}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-dim)' }}>
                  Stage: {p.stage}
                </div>
              </div>
            ))}
          </div>

          <button
            className="btn btn-ghost btn-sm"
            style={{ width: '100%', marginTop: 12, justifyContent: 'center' }}
            onClick={() => setActiveView('triage')}
          >
            Open Full Triage Kanban <ArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* Ward Status */}
      <div className="glass-card">
        <div style={{ fontWeight: 700, fontSize: 'var(--text-base)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Bed size={16} color="var(--color-info-text)" />
          Ward & Bed Status
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { ward: 'ICU',        total: 4,  occupied: 4,  color: 'var(--color-critical-text)' },
            { ward: 'Cardiology', total: 8,  occupied: 6,  color: 'var(--color-warning-text)' },
            { ward: 'General',    total: 12, occupied: 9,  color: 'var(--color-success-text)' }
          ].map(w => {
            const pct = Math.round((w.occupied / w.total) * 100);
            return (
              <div key={w.ward} className="cf-panel">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-main)' }}>{w.ward}</span>
                  <span style={{ fontSize: 'var(--text-xs)', color: w.color, fontWeight: 700 }}>{pct}% Full</span>
                </div>
                <div style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--text-main)', marginBottom: 6 }}>
                  {w.occupied} <span style={{ color: 'var(--text-dim)', fontSize: 'var(--text-sm)', fontWeight: 500 }}>/ {w.total} beds</span>
                </div>
                <div style={{ height: 4, background: 'var(--bg-surface-elevated)', borderRadius: 2 }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: w.color, borderRadius: 2, transition: 'width 0.3s ease' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
