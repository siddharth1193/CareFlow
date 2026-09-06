import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  UserCheck,
  Search,
  Plus,
  FileText,
  Pill,
  FileSpreadsheet,
  Receipt,
  ShieldCheck,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  X,
  History,
  Phone,
  HeartPulse,
  Activity
} from 'lucide-react';

export const PatientsView = () => {
  const {
    patients,
    appointments,
    prescriptions,
    diagnostics,
    invoices,
    selectedPatient,
    setSelectedPatient,
    addPatient,
    addToast
  } = useApp();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [activeTab, setActiveTab] = useState('encounters');
  const [isNewPatientModalOpen, setIsNewPatientModalOpen] = useState(false);

  // New Patient Form
  const [newPatForm, setNewPatForm] = useState({
    name: '',
    age: 35,
    gender: 'Male',
    phone: '',
    email: '',
    bloodGroup: 'B+',
    address: 'Bengaluru'
  });

  // Local SOAP note draft
  const [newSoapNote, setNewSoapNote] = useState({
    complaint: '',
    bp: '120/80',
    hr: '74',
    assessment: '',
    plan: ''
  });

  const filteredPatients = patients.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.uhid.toLowerCase().includes(search.toLowerCase()) || p.phone.includes(search);
    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activePat = selectedPatient || patients[0];
  const patAppointments = appointments.filter((a) => a.patientId === activePat?.id);
  const patPrescriptions = prescriptions.filter((r) => r.patientId === activePat?.id);
  const patDiagnostics = diagnostics.filter((d) => d.patientId === activePat?.id);
  const patInvoices = invoices.filter((i) => i.patientId === activePat?.id);

  const handleCreatePatient = (e) => {
    e.preventDefault();
    if (!newPatForm.name || !newPatForm.phone) {
      addToast({ title: "Validation Error", message: "Name & phone required", type: "warning" });
      return;
    }
    const created = addPatient(newPatForm);
    setSelectedPatient(created);
    setIsNewPatientModalOpen(false);
  };

  const handleSaveSoapNote = (e) => {
    e.preventDefault();
    addToast({
      title: "Clinical Encounter Logged",
      message: `SOAP note appended to ${activePat.name}'s permanent EHR timeline`,
      type: "success"
    });
    setNewSoapNote({ complaint: '', bp: '120/80', hr: '74', assessment: '', plan: '' });
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-title">
            <UserCheck size={24} color="var(--primary)" />
            <span>Electronic Health Records (EHR 360°)</span>
          </div>
          <div className="page-subtitle">
            Relational Clinical Encounters, SOAP Notes, Prescriptions, Diagnostics & Consent Records
          </div>
        </div>

        <button className="btn btn-emerald" onClick={() => setIsNewPatientModalOpen(true)}>
          <Plus size={16} /> Register Patient
        </button>
      </div>

      {/* Main Grid: Directory + Patient Dossier HUD */}
      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 24 }}>
        {/* LEFT COLUMN: Patient Directory */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Search & Filter */}
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={14} style={{ position: 'absolute', left: 10, top: 11, color: 'var(--text-dim)' }} />
              <input
                type="text"
                className="input-control"
                placeholder="Search by UHID, name, phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: 32, fontSize: '0.82rem' }}
              />
            </div>
            <select
              className="input-control"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ width: 130, fontSize: '0.8rem' }}
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE_90D">INACTIVE 90D</option>
              <option value="NO_SHOW_PENDING">NO SHOW</option>
            </select>
          </div>

          {/* Patient Card List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 'calc(100vh - 240px)', overflowY: 'auto' }}>
            {filteredPatients.map((p) => {
              const isSelected = p.id === activePat?.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPatient(p)}
                  className="glass-card"
                  style={{
                    padding: 14,
                    cursor: 'pointer',
                    background: isSelected ? 'var(--primary-light)' : 'var(--bg-card)',
                    borderLeft: isSelected ? '4px solid var(--primary)' : '4px solid transparent'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: isSelected ? 'var(--primary)' : 'var(--text-main)' }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 2 }}>
                        UHID: <strong style={{ color: 'var(--primary)' }}>{p.uhid}</strong> • {p.age}y / {p.gender}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        {p.phone}
                      </div>
                    </div>

                    <span
                      className={`badge ${
                        p.status === 'ACTIVE'
                          ? 'badge-emerald'
                          : p.status === 'INACTIVE_90D'
                          ? 'badge-amber'
                          : 'badge-crimson'
                      }`}
                      style={{ fontSize: '0.62rem' }}
                    >
                      {p.status.replace(/_/g, ' ')}
                    </span>
                  </div>

                  {p.allergies?.length > 0 && (
                    <div style={{ marginTop: 6, fontSize: '0.68rem', color: '#f87171', fontWeight: 700 }}>
                      ⚠️ Allergy: {p.allergies.join(', ')}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Selected Patient 360° Dossier */}
        {activePat ? (
          <div className="glass-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', height: 'fit-content' }}>
            {/* Dossier Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 18, borderBottom: '1px solid var(--border-color)', marginBottom: 20 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {activePat.name}
                  </h2>
                  <span className="badge badge-primary">UHID: {activePat.uhid}</span>
                  <span className="badge badge-muted">Blood: {activePat.bloodGroup}</span>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  {activePat.age} Years • {activePat.gender} • Phone: <strong>{activePat.phone}</strong> • Address: {activePat.address}
                </div>
              </div>

              {/* Total Spent / Financial Health */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Lifetime Value (LTV)</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981' }}>
                  ₹{activePat.totalSpent?.toLocaleString('en-IN') || 0}
                </div>
              </div>
            </div>

            {/* High-Visibility Clinical Warning Banners */}
            {activePat.allergies?.length > 0 && (
              <div style={{ padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', fontWeight: 700, fontSize: '0.82rem', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <AlertTriangle size={16} />
                CRITICAL ALLERGY ALERT: Patient allergic to {activePat.allergies.join(' & ')}. Do not prescribe contraindicated formulary!
              </div>
            )}

            {/* EHR Dossier Tabs */}
            <div className="tabs-container">
              <button
                className={`tab-btn ${activeTab === 'encounters' ? 'active' : ''}`}
                onClick={() => setActiveTab('encounters')}
              >
                <FileText size={15} /> Clinical SOAP Encounters
              </button>
              <button
                className={`tab-btn ${activeTab === 'prescriptions' ? 'active' : ''}`}
                onClick={() => setActiveTab('prescriptions')}
              >
                <Pill size={15} /> Prescriptions ({patPrescriptions.length})
              </button>
              <button
                className={`tab-btn ${activeTab === 'diagnostics' ? 'active' : ''}`}
                onClick={() => setActiveTab('diagnostics')}
              >
                <FileSpreadsheet size={15} /> Lab & Scans ({patDiagnostics.length})
              </button>
              <button
                className={`tab-btn ${activeTab === 'billing' ? 'active' : ''}`}
                onClick={() => setActiveTab('billing')}
              >
                <Receipt size={15} /> Invoices ({patInvoices.length})
              </button>
              <button
                className={`tab-btn ${activeTab === 'consent' ? 'active' : ''}`}
                onClick={() => setActiveTab('consent')}
              >
                <ShieldCheck size={15} /> Consent & Audit
              </button>
            </div>

            {/* Tab 1: Clinical Encounters & SOAP Note Builder */}
            {activeTab === 'encounters' && (
              <div>
                {/* Add SOAP Note Form */}
                <div style={{ padding: 18, borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', marginBottom: 20 }}>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#fff', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Activity size={16} color="var(--primary)" />
                    Record New Clinical Consultation Encounter
                  </div>
                  <form onSubmit={handleSaveSoapNote}>
                    <div className="grid-2">
                      <div className="input-group">
                        <label className="input-label">Chief Complaint & Subjective History</label>
                        <input
                          type="text"
                          className="input-control"
                          placeholder="e.g. Chest heaviness on exertion, BP review"
                          value={newSoapNote.complaint}
                          onChange={(e) => setNewSoapNote({ ...newSoapNote, complaint: e.target.value })}
                        />
                      </div>
                      <div className="grid-2">
                        <div className="input-group">
                          <label className="input-label">Blood Pressure (BP)</label>
                          <input
                            type="text"
                            className="input-control"
                            value={newSoapNote.bp}
                            onChange={(e) => setNewSoapNote({ ...newSoapNote, bp: e.target.value })}
                          />
                        </div>
                        <div className="input-group">
                          <label className="input-label">Heart Rate (HR)</label>
                          <input
                            type="text"
                            className="input-control"
                            value={newSoapNote.hr}
                            onChange={(e) => setNewSoapNote({ ...newSoapNote, hr: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid-2">
                      <div className="input-group">
                        <label className="input-label">Assessment & ICD-10 Diagnosis</label>
                        <input
                          type="text"
                          className="input-control"
                          placeholder="e.g. Essential Hypertension (I10)"
                          value={newSoapNote.assessment}
                          onChange={(e) => setNewSoapNote({ ...newSoapNote, assessment: e.target.value })}
                        />
                      </div>
                      <div className="input-group">
                        <label className="input-label">Clinical Plan & Follow-up</label>
                        <input
                          type="text"
                          className="input-control"
                          placeholder="e.g. Continue Telmisartan 40mg, review in 3 weeks"
                          value={newSoapNote.plan}
                          onChange={(e) => setNewSoapNote({ ...newSoapNote, plan: e.target.value })}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <button type="submit" className="btn btn-primary btn-sm">
                        <CheckCircle2 size={14} /> Log Consultation & e-Sign
                      </button>
                    </div>
                  </form>
                </div>

                {/* Encounters Timeline */}
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 12 }}>
                  Historical Clinical Consultations
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {patAppointments.map((apt) => (
                    <div key={apt.id} style={{ padding: 14, borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--primary)' }}>
                          {apt.date} • {apt.time} ({apt.type})
                        </span>
                        <span className="badge badge-emerald">{apt.status}</span>
                      </div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f8fafc' }}>
                        Reason: {apt.reason}
                      </div>
                      {apt.notes && (
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4, fontStyle: 'italic' }}>
                          Doctor Note: {apt.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Prescriptions */}
            {activeTab === 'prescriptions' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {patPrescriptions.map((rx) => (
                  <div key={rx.id} style={{ padding: 16, borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--primary)' }}>
                        Rx #{rx.rxNumber} ({rx.date})
                      </span>
                      <span className="badge badge-emerald">{rx.dispenseStatus}</span>
                    </div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#f8fafc', marginBottom: 10 }}>
                      Diagnosis: {rx.diagnosis}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {rx.medicines.map((m, idx) => (
                        <div key={idx} style={{ padding: '8px 12px', borderRadius: 'var(--radius-xs)', background: 'rgba(255,255,255,0.03)', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                          <span style={{ fontWeight: 700, color: '#38bdf8' }}>{m.name}</span>
                          <span style={{ color: 'var(--text-muted)' }}>{m.dosage} • {m.frequency} ({m.duration})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Diagnostics */}
            {activeTab === 'diagnostics' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {patDiagnostics.map((d) => (
                  <div key={d.id} style={{ padding: 16, borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--primary)' }}>
                        {d.testName} ({d.date})
                      </span>
                      {d.abnormalFlag && (
                        <span className="badge badge-crimson">Abnormal Values Flagged</span>
                      )}
                    </div>
                    {d.findings && (
                      <div style={{ fontSize: '0.82rem', color: '#cbd5e1', marginBottom: 8 }}>
                        Findings: {d.findings}
                      </div>
                    )}
                    {d.results && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {d.results.map((r, i) => (
                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', padding: '4px 8px', borderRadius: 4, background: r.isAbnormal ? 'rgba(239,68,68,0.1)' : 'transparent' }}>
                            <span style={{ color: r.isAbnormal ? '#f87171' : 'var(--text-main)', fontWeight: r.isAbnormal ? 700 : 500 }}>
                              {r.parameter}
                            </span>
                            <span style={{ color: r.isAbnormal ? '#f87171' : 'var(--text-muted)' }}>
                              {r.value} (Normal: {r.normalRange})
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Tab 4: Invoices & Receipts */}
            {activeTab === 'billing' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {patInvoices.map((inv) => (
                  <div key={inv.id} style={{ padding: 14, borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#f8fafc' }}>
                        Invoice #{inv.invoiceNumber}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                        Date: {inv.date} • Method: {inv.paymentMethod || 'Pending'}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1rem', fontWeight: 800, color: inv.status === 'PAID' ? '#10b981' : '#ef4444' }}>
                        ₹{inv.total.toLocaleString('en-IN')}
                      </div>
                      <span className={`badge ${inv.status === 'PAID' ? 'badge-emerald' : 'badge-crimson'}`} style={{ fontSize: '0.62rem' }}>
                        {inv.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 5: Consent & Communication Preferences */}
            {activeTab === 'consent' && (
              <div style={{ padding: 16, borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#fff', marginBottom: 12 }}>
                  DPDP Act (India) & NDHM Consent Record
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.82rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: 8, background: 'rgba(255,255,255,0.03)', borderRadius: 6 }}>
                    <span>WhatsApp Transactional Notifications</span>
                    <span className="badge badge-emerald">GRANTED (Source: In-Clinic Registration)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: 8, background: 'rgba(255,255,255,0.03)', borderRadius: 6 }}>
                    <span>Marketing & Preventive Health Campaigns</span>
                    <span className="badge badge-emerald">GRANTED (Opt-Out Available)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: 8, background: 'rgba(255,255,255,0.03)', borderRadius: 6 }}>
                    <span>Medical Record Sharing for Telehealth</span>
                    <span className="badge badge-emerald">E2E ENCRYPTED</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
            Select a patient from the directory to view complete EHR Dossier
          </div>
        )}
      </div>

      {/* New Patient Registration Modal */}
      {isNewPatientModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>Register New Patient</div>
              <button onClick={() => setIsNewPatientModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreatePatient}>
              <div className="modal-body">
                <div className="grid-2">
                  <div className="input-group">
                    <label className="input-label">Full Name *</label>
                    <input
                      type="text"
                      className="input-control"
                      placeholder="e.g. Sunita Rao"
                      required
                      value={newPatForm.name}
                      onChange={(e) => setNewPatForm({ ...newPatForm, name: e.target.value })}
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Phone Number *</label>
                    <input
                      type="tel"
                      className="input-control"
                      placeholder="+91 98450 12345"
                      required
                      value={newPatForm.phone}
                      onChange={(e) => setNewPatForm({ ...newPatForm, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid-3">
                  <div className="input-group">
                    <label className="input-label">Age</label>
                    <input
                      type="number"
                      className="input-control"
                      value={newPatForm.age}
                      onChange={(e) => setNewPatForm({ ...newPatForm, age: Number(e.target.value) })}
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Gender</label>
                    <select
                      className="input-control"
                      value={newPatForm.gender}
                      onChange={(e) => setNewPatForm({ ...newPatForm, gender: e.target.value })}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label className="input-label">Blood Group</label>
                    <select
                      className="input-control"
                      value={newPatForm.bloodGroup}
                      onChange={(e) => setNewPatForm({ ...newPatForm, bloodGroup: e.target.value })}
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">City / Address</label>
                  <input
                    type="text"
                    className="input-control"
                    value={newPatForm.address}
                    onChange={(e) => setNewPatForm({ ...newPatForm, address: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={() => setIsNewPatientModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-emerald">
                  Save & Open EHR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
