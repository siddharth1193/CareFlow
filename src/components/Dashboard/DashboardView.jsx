import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Users2,
  Calendar,
  AlertTriangle,
  HeartPulse,
  Activity,
  PhoneCall,
  MessageSquare,
  CheckCircle2,
  ArrowUpRight,
  Zap,
  Bed,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const DashboardView = () => {
  const {
    organization,
    growthMetrics,
    appointments,
    leads,
    patients,
    tasks,
    setActiveView,
    triggerNoShowRecovery,
    setSelectedPatient,
    setTelehealthMeeting,
    updateTaskStatus
  } = useApp();

  const attentionTasks = tasks.filter((t) => t.status === 'TODO');
  const noShows = appointments.filter((a) => a.status === 'NO_SHOW' && !a.isRecovered);
  const todayAppointments = appointments.filter((a) => a.date === '2026-09-06');

  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="page-title">
            <span>Executive Operations & Growth HUD</span>
            <span className="badge badge-emerald">
              <span className="pulse-dot pulse-dot-emerald" /> Live Telemetry
            </span>
          </div>
          <div className="page-subtitle">
            {organization.name} • Automated Clinical Growth, AI Reception & Revenue Recovery
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setActiveView('ai-copilot')}>
            <Sparkles size={14} color="#6366f1" /> Ask AI Copilot
          </button>
          <button className="btn btn-emerald btn-sm" onClick={() => setActiveView('leads')}>
            <Users2 size={14} /> + New Inbound Lead
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setActiveView('appointments')}>
            <Calendar size={14} /> Schedule Appointment
          </button>
        </div>
      </div>

      {/* Top Real-Time KPI Cards */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        {/* Metric 1: Revenue Generated */}
        <div className="glass-card" style={{ borderLeft: '4px solid #10b981' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Collected Revenue</span>
            <div style={{ padding: 6, borderRadius: 'var(--radius-sm)', background: 'var(--emerald-light)' }}>
              <TrendingUp size={16} color="#10b981" />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: 8, color: '#f8fafc' }}>
            ₹{growthMetrics.revenueGenerated.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.74rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
            <ArrowUpRight size={13} /> +18.4% vs last month (Database Verified)
          </div>
        </div>

        {/* Metric 2: Revenue Recovered from No-Shows */}
        <div className="glass-card glass-card-interactive" onClick={() => setActiveView('growth')} style={{ borderLeft: '4px solid #0ea5e9' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>No-Show Recovered Revenue</span>
            <div style={{ padding: 6, borderRadius: 'var(--radius-sm)', background: 'var(--primary-light)' }}>
              <Zap size={16} color="#0ea5e9" />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: 8, color: '#0ea5e9' }}>
            ₹{growthMetrics.revenueRecovered.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 4 }}>
            <strong style={{ color: '#0ea5e9' }}>{growthMetrics.recoveredAppointments} of {growthMetrics.noShowAppointments}</strong> no-shows rebooked ({growthMetrics.noShowRecoveryRate}%)
          </div>
        </div>

        {/* Metric 3: Lead-to-Patient Conversion */}
        <div className="glass-card glass-card-interactive" onClick={() => setActiveView('leads')} style={{ borderLeft: '4px solid #a855f7' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Lead &rarr; Consult Conversion</span>
            <div style={{ padding: 6, borderRadius: 'var(--radius-sm)', background: 'var(--purple-light)' }}>
              <Users2 size={16} color="#a855f7" />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: 8, color: '#a855f7' }}>
            {growthMetrics.leadConversionRate}%
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 4 }}>
            Avg AI Response: <strong style={{ color: '#25D366' }}>{growthMetrics.avgResponseTimeMinutes} mins</strong>
          </div>
        </div>

        {/* Metric 4: Bed & Inpatient Capacity */}
        <div className="glass-card" style={{ borderLeft: '4px solid #f59e0b' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Ward & Bed Occupancy</span>
            <div style={{ padding: 6, borderRadius: 'var(--radius-sm)', background: 'var(--amber-light)' }}>
              <Bed size={16} color="#f59e0b" />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: 8, color: '#f59e0b' }}>
            19 / 24 <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>(79%)</span>
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 4 }}>
            ICU: 4/4 Full • General: 15/20 Beds
          </div>
        </div>
      </div>

      {/* Main Grid: Attention Today Queue + Telemetry & Live Appointments */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24, marginBottom: 24 }}>
        {/* Section 1: "Patients Requiring Attention Today" Queue (Requirement 8) */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>Patients Requiring Attention Today</span>
                <span className="badge badge-crimson" style={{ fontSize: '0.7rem' }}>
                  {attentionTasks.length} Pending
                </span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                Overdue follow-ups, no-shows requiring rebooking, pending lab deliveries & lead outreach
              </div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => setActiveView('tasks')}>
              View All <ArrowRight size={13} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {attentionTasks.map((t) => (
              <div
                key={t.id}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 12
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <span className={`badge ${t.priority === 'HIGH' ? 'badge-crimson' : 'badge-amber'}`} style={{ fontSize: '0.65rem' }}>
                      {t.priority}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                      Category: {t.category.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {t.title}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    Assigned: {t.assignedTo}
                  </div>
                </div>

                {/* One-Click Action Buttons */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'nowrap' }}>
                  {t.category === 'NO_SHOW_RECOVERY' && (
                    <button
                      className="btn btn-emerald btn-sm"
                      onClick={() => triggerNoShowRecovery(t.relatedAppointmentId)}
                      title="Send instant WhatsApp reschedule offer"
                    >
                      <MessageSquare size={13} /> WhatsApp
                    </button>
                  )}
                  {t.category === 'LEAD_FOLLOWUP' && (
                    <button
                      className="btn btn-whatsapp btn-sm"
                      onClick={() => setActiveView('inbox')}
                      title="Open WhatsApp chat"
                    >
                      <MessageSquare size={13} /> Chat
                    </button>
                  )}
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => updateTaskStatus(t.id, 'COMPLETED')}
                    title="Mark task completed"
                  >
                    <CheckCircle2 size={13} color="#10b981" /> Done
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Live OPD & Telehealth Consultation Schedule */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>
                Today's Consultations ({todayAppointments.length})
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                Live OPD queue & telehealth video links
              </div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => setActiveView('appointments')}>
              Calendar <ArrowRight size={13} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {todayAppointments.map((apt) => {
              const patient = patients.find((p) => p.id === apt.patientId);
              return (
                <div
                  key={apt.id}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: apt.status === 'NO_SHOW' ? 'rgba(239,68,68,0.06)' : 'var(--bg-surface)',
                    border: `1px solid ${apt.status === 'NO_SHOW' ? 'rgba(239,68,68,0.25)' : 'var(--border-color)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)' }}>
                        {apt.time}
                      </span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        {patient?.name || 'Patient'}
                      </span>
                      <span className={`badge ${apt.status === 'COMPLETED' ? 'badge-emerald' : apt.status === 'NO_SHOW' ? 'badge-crimson' : 'badge-primary'}`} style={{ fontSize: '0.65rem' }}>
                        {apt.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 3 }}>
                      {apt.reason} • Fee: ₹{apt.fee}
                    </div>
                  </div>

                  <div>
                    {apt.type === 'TELEHEALTH' ? (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setTelehealthMeeting(apt)}
                      >
                        Join Call
                      </button>
                    ) : (
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => { setSelectedPatient(patient); setActiveView('patients'); }}
                      >
                        EHR 360°
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Simulated Live Telemetry ECG Wave Preview for Critical / ER Patients */}
      <div
        className="glass-card"
        style={{
          background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(11,19,36,0.9))',
          borderColor: 'rgba(14,165,233,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HeartPulse size={24} color="#ef4444" style={{ animation: 'pulse-ping 1.4s infinite' }} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>ICU Telemetry Wave Monitor — Bed 02 (Suresh Narayanan, 58M)</span>
              <span className="badge badge-emerald">STABLE</span>
            </div>
            <div style={{ fontSize: '0.76rem', color: '#94a3b8', marginTop: 2 }}>
              HR: <strong>72 bpm (Normal Sinus)</strong> • SpO2: <strong>98%</strong> • BP: <strong>128/82 mmHg</strong> • Temp: <strong>98.4°F</strong>
            </div>
          </div>
        </div>

        {/* Mini ECG Canvas Visualization */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 200, height: 36, position: 'relative', overflow: 'hidden', background: '#050811', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <svg viewBox="0 0 200 36" style={{ width: '100%', height: '100%' }}>
              <path
                d="M 0 18 L 30 18 L 35 12 L 40 24 L 45 4 L 50 32 L 55 18 L 90 18 L 95 12 L 100 24 L 105 4 L 110 32 L 115 18 L 160 18 L 165 12 L 170 24 L 175 4 L 180 32 L 185 18 L 200 18"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
              />
            </svg>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => setActiveView('triage')}>
            View Triage Queue
          </button>
        </div>
      </div>
    </div>
  );
};
