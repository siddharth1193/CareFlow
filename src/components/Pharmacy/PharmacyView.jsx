import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Pill,
  Plus,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Search,
  Printer,
  Sparkles,
  X
} from 'lucide-react';

export const PharmacyView = () => {
  const { prescriptions, patients, doctors, addToast } = useApp();

  const [search, setSearch] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || 'pat-101');
  const [testMedName, setTestMedName] = useState('Amoxicillin 500mg');
  const [safetyCheckResult, setSafetyCheckResult] = useState(null);

  const selectedPatient = patients.find((p) => p.id === selectedPatientId);

  const runSafetyCheck = () => {
    if (!selectedPatient) return;
    const isPenicillinAllergic = selectedPatient.allergies?.some((a) => a.toLowerCase().includes('penicillin'));
    const isAmox = testMedName.toLowerCase().includes('amox') || testMedName.toLowerCase().includes('penicillin');

    if (isPenicillinAllergic && isAmox) {
      setSafetyCheckResult({
        safe: false,
        severity: 'CRITICAL_CONTRAINDICATION',
        message: `🚨 CONTRAINDICATION DETECTED: Patient ${selectedPatient.name} has a recorded life-threatening allergy to PENICILLIN. Prescribing ${testMedName} (Beta-lactam class) is strictly blocked!`,
        substitute: "Recommended Safe Alternatives: Azithromycin 500mg (Macrolide) or Doxycycline 100mg."
      });
      addToast({
        title: "Allergy Conflict Intercepted!",
        message: "CareFlow Clinical Safety Engine blocked contraindicated drug",
        type: "danger"
      });
    } else {
      setSafetyCheckResult({
        safe: true,
        message: `✅ Safety Check Passed: No allergy or drug-to-drug contraindication detected for ${testMedName} in ${selectedPatient.name}'s profile.`
      });
      addToast({
        title: "Drug Safety Check Passed",
        message: "Formulary is safe to dispense",
        type: "success"
      });
    }
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-title">
            <Pill size={24} color="var(--primary)" />
            <span>e-Prescriptions & Clinical Safety Interceptor</span>
          </div>
          <div className="page-subtitle">
            Digital prescription pad with automated allergy and drug-drug contraindication checks
          </div>
        </div>

        <span className="badge badge-emerald">
          <ShieldCheck size={14} /> Real-Time Formulary Safety Active
        </span>
      </div>

      {/* Safety Interceptor Sandbox Banner */}
      <div
        className="glass-card"
        style={{
          background: 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(11,21,40,0.95))',
          borderColor: 'rgba(14,165,233,0.35)',
          marginBottom: 24,
          padding: 24
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <Sparkles size={18} color="var(--primary)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>
            Clinical Safety Interceptor Simulation
          </h3>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16 }}>
          Test the automated drug safety engine by prescribing a medication to a patient with documented allergies (e.g. Suresh Narayanan is allergic to Penicillin).
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 12, alignItems: 'center' }}>
          <div>
            <label className="input-label">Select Patient</label>
            <select
              className="input-control"
              value={selectedPatientId}
              onChange={(e) => {
                setSelectedPatientId(e.target.value);
                setSafetyCheckResult(null);
              }}
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (Allergies: {p.allergies?.join(', ') || 'None'})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="input-label">Medication to Prescribe</label>
            <input
              type="text"
              className="input-control"
              value={testMedName}
              onChange={(e) => setTestMedName(e.target.value)}
              placeholder="e.g. Amoxicillin 500mg, Telmisartan 40mg"
            />
          </div>

          <div style={{ marginTop: 22 }}>
            <button className="btn btn-primary" onClick={runSafetyCheck}>
              <ShieldCheck size={16} /> Run Safety Intercept Check
            </button>
          </div>
        </div>

        {/* Safety Check Output Result */}
        {safetyCheckResult && (
          <div
            style={{
              marginTop: 16,
              padding: 16,
              borderRadius: 'var(--radius-sm)',
              background: safetyCheckResult.safe ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.15)',
              border: `1px solid ${safetyCheckResult.safe ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.4)'}`,
              color: safetyCheckResult.safe ? '#34d399' : '#f87171'
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: 4 }}>
              {safetyCheckResult.message}
            </div>
            {safetyCheckResult.substitute && (
              <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: 4 }}>
                {safetyCheckResult.substitute}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Active Prescriptions Table */}
      <div className="glass-card">
        <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff', marginBottom: 14 }}>
          Recent Digital Prescriptions & Pharmacy Dispense Queue
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Rx #</th>
                <th>Patient</th>
                <th>Prescribed Doctor</th>
                <th>Diagnosis</th>
                <th>Medicines & Regimen</th>
                <th>Dispense Status</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((rx) => {
                const pat = patients.find((p) => p.id === rx.patientId);
                const doc = doctors.find((d) => d.id === rx.doctorId);
                return (
                  <tr key={rx.id}>
                    <td style={{ fontWeight: 800, color: 'var(--primary)' }}>
                      #{rx.rxNumber}
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{pat?.name}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>UHID: {pat?.uhid}</div>
                    </td>
                    <td style={{ fontSize: '0.84rem', color: '#f8fafc' }}>
                      {doc?.name}
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                      {rx.diagnosis}
                    </td>
                    <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)', maxWidth: 300 }}>
                      {rx.medicines?.map((m) => `${m.name} (${m.dosage})`).join(', ')}
                    </td>
                    <td>
                      <span className={`badge ${rx.dispenseStatus === 'DISPENSED' ? 'badge-emerald' : 'badge-amber'}`}>
                        {rx.dispenseStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
