import React from 'react';
import { useApp } from '../../context/AppContext';
import { ClinicalCommandCenter } from '../Clinical/ClinicalCommandCenter';

import {
  TrendingUp,
  Users2,
  Calendar,
  HeartPulse,
  Activity,
  MessageSquare,
  CheckCircle2,
  ArrowUpRight,
  Zap,
  Bed,
  ArrowRight,
  Info,
  Brain,
  IndianRupee,
  Clock,
  UserCheck,
  Receipt,
  PhoneCall,
  Sparkles,
  Target
} from 'lucide-react';

/* ── Shared: Demo Notice ── */
const DemoNotice = () => (
  <div className="cf-demo-notice">
    <Info size={13} />
    <span>
      <strong>Sample Dataset</strong> — All metrics, patient records, and financial data shown here are synthetic demo data and do not represent real hospital information.
    </span>
  </div>
);

/* ── Shared: Category → Human label ── */
const CATEGORY_LABELS = {
  NO_SHOW_RECOVERY:    'No-show — Follow-up required',
  LEAD_FOLLOWUP:       'Lead follow-up overdue',
  REPORT_DELIVERY:     'Lab report ready for dispatch',
  PATIENT_REACTIVATION:'Patient inactive — Reactivation needed',
  BILLING_FOLLOWUP:    'Billing action required',
};

const PRIORITY_STYLE = {
  HIGH:   { dot: 'critical', badge: 'badge-crimson', border: 'priority-high' },
  MEDIUM: { dot: 'warning',  badge: 'badge-amber',   border: 'priority-medium' },
  LOW:    { dot: 'info',     badge: 'badge-muted',   border: 'priority-low' }
};

/* ── Shared: Attention Task Item ── */
const AttentionItem = ({ t, patients, triggerNoShowRecovery, updateTaskStatus, setActiveView, setSelectedPatient }) => {
  const style = PRIORITY_STYLE[t.priority] || PRIORITY_STYLE.LOW;
  const patient = patients.find(p => p.id === t.relatedPatientId);
  const reasonLabel = CATEGORY_LABELS[t.category] || t.category.replace(/_/g, ' ');
  const isCompleted = t.status === 'COMPLETED';

  return (
    <div
      className={`cf-attention-item ${style.border}`}
      style={{ opacity: isCompleted ? 0.5 : 1 }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 }}>
          <span className={`cf-status-dot ${style.dot}`} />
          <span className={`badge ${style.badge}`} style={{ fontSize: '0.62rem' }}>
            {t.priority}
          </span>
          {patient && (
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-main)' }}>
              {patient.name}
            </span>
          )}
        </div>
        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: 2 }}>
          {reasonLabel}
        </div>
        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-dim)', display: 'flex', gap: 10 }}>
          {t.dueDate && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Clock size={10} />
              Due: {new Date(t.dueDate).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          <span>Assigned: {t.assignedTo?.split(' (')[0]}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
        {t.category === 'NO_SHOW_RECOVERY' && !isCompleted && (
          <button
            className="btn btn-whatsapp btn-sm"
            onClick={() => triggerNoShowRecovery(t.relatedAppointmentId)}
            title="Send WhatsApp rescheduling message"
          >
            <MessageSquare size={11} /> Recover
          </button>
        )}
        {t.category === 'LEAD_FOLLOWUP' && !isCompleted && (
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setActiveView('inbox')}
            title="Open conversation"
          >
            <MessageSquare size={11} /> Open Inbox
          </button>
        )}
        {patient && !isCompleted && (
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => { setSelectedPatient(patient); setActiveView('patients'); }}
          >
            <UserCheck size={11} />
          </button>
        )}
        {!isCompleted && (
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => updateTaskStatus(t.id, 'COMPLETED')}
            title="Mark as done"
          >
            <CheckCircle2 size={13} color="var(--color-success-text)" />
          </button>
        )}
        {isCompleted && (
          <span className="badge badge-emerald" style={{ fontSize: '0.62rem' }}>
            <CheckCircle2 size={10} /> Done
          </span>
        )}
      </div>
    </div>
  );
};

/* ── Executive Command Center ── */
const ExecutiveDashboard = ({ ctx }) => {
  const { growthMetrics, appointments, tasks, patients, aiInsights, setActiveView, triggerNoShowRecovery, updateTaskStatus, setSelectedPatient } = ctx;
  const attentionTasks    = tasks.filter(t => t.status === 'TODO');
  const todayAppointments = appointments.filter(a => a.date === '2026-09-06');

  return (
    <>
      <DemoNotice />

      {/* KPI Row */}
      <div className="grid-4" style={{ marginBottom: 20 }}>
        {/* Revenue */}
        <div className="glass-card" style={{ borderLeft: '3px solid var(--color-success-text)' }}>
          <div className="cf-kpi-label">Total Collected Revenue</div>
          <div className="cf-kpi-value" style={{ marginTop: 6 }}>
            ₹{growthMetrics.revenueGenerated.toLocaleString('en-IN')}
          </div>
          <div className="cf-kpi-meta" style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-success-text)' }}>
            <ArrowUpRight size={11} /> +18.4% vs last month
          </div>
        </div>

        {/* Recovery */}
        <div
          className="glass-card glass-card-interactive"
          style={{ borderLeft: '3px solid var(--color-info-text)' }}
          onClick={() => setActiveView('growth')}
        >
          <div className="cf-kpi-label">No-Show Revenue Recovered</div>
          <div className="cf-kpi-value" style={{ marginTop: 6, color: 'var(--color-info-text)' }}>
            ₹{growthMetrics.revenueRecovered.toLocaleString('en-IN')}
          </div>
          <div className="cf-kpi-meta">
            <strong style={{ color: 'var(--color-info-text)' }}>{growthMetrics.recoveredAppointments}</strong> of {growthMetrics.noShowAppointments} no-shows rebooked
          </div>
        </div>

        {/* Lead Conversion — BLUE (informational, not AI/purple) */}
        <div
          className="glass-card glass-card-interactive"
          style={{ borderLeft: '3px solid var(--primary)' }}
          onClick={() => setActiveView('leads')}
        >
          <div className="cf-kpi-label">Lead → Consult Conversion</div>
          <div className="cf-kpi-value" style={{ marginTop: 6 }}>
            {growthMetrics.leadConversionRate}%
          </div>
          <div className="cf-kpi-meta">
            Avg response: <strong style={{ color: 'var(--primary)' }}>{growthMetrics.avgResponseTimeMinutes} mins</strong>
          </div>
        </div>

        {/* Bed Occupancy */}
        <div className="glass-card" style={{ borderLeft: '3px solid var(--color-warning-text)' }}>
          <div className="cf-kpi-label">Ward & Bed Occupancy</div>
          <div className="cf-kpi-value" style={{ marginTop: 6 }}>
            19 <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 600 }}>/ 24</span>
          </div>
          <div className="cf-kpi-meta">ICU: 4/4 Full · General: 15/20 beds</div>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Attention Queue */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 'var(--text-base)', display: 'flex', alignItems: 'center', gap: 7 }}>
                Patients Requiring Attention
                {attentionTasks.length > 0 && (
                  <span className="badge badge-crimson" style={{ fontSize: '0.62rem' }}>
                    {attentionTasks.length} Pending
                  </span>
                )}
              </div>
              <div className="page-subtitle" style={{ marginTop: 2 }}>
                Overdue follow-ups, no-shows, pending actions
              </div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => setActiveView('tasks')}>
              View All <ArrowRight size={12} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {attentionTasks.length === 0 ? (
              <div className="cf-empty-state">
                <div className="cf-empty-state-icon"><CheckCircle2 size={20} color="var(--color-success-text)" /></div>
                <div className="cf-empty-title">All caught up</div>
                <div className="cf-empty-desc">No pending attention items right now.</div>
              </div>
            ) : (
              attentionTasks.map(t => (
                <AttentionItem
                  key={t.id}
                  t={t}
                  patients={patients}
                  triggerNoShowRecovery={triggerNoShowRecovery}
                  updateTaskStatus={updateTaskStatus}
                  setActiveView={setActiveView}
                  setSelectedPatient={setSelectedPatient}
                />
              ))
            )}
          </div>
        </div>

        {/* Today's Consultations */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 'var(--text-base)' }}>
                Today's Consultations ({todayAppointments.length})
              </div>
              <div className="page-subtitle" style={{ marginTop: 2 }}>OPD & telehealth queue</div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => setActiveView('appointments')}>
              Calendar <ArrowRight size={12} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {todayAppointments.length === 0 ? (
              <div className="cf-empty-state">
                <div className="cf-empty-state-icon"><Calendar size={18} color="var(--text-dim)" /></div>
                <div className="cf-empty-title">No appointments today</div>
              </div>
            ) : (
              todayAppointments.map(apt => {
                const patient = patients.find(p => p.id === apt.patientId);
                const isNoShow = apt.status === 'NO_SHOW';
                return (
                  <div key={apt.id} className={`cf-appt-item ${isNoShow ? 'no-show' : ''}`}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--primary)' }}>
                          {apt.time}
                        </span>
                        <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-main)' }}>
                          {patient?.name || 'Patient'}
                        </span>
                        <span className={`badge ${apt.status === 'COMPLETED' ? 'badge-emerald' : isNoShow ? 'badge-crimson' : 'badge-primary'}`} style={{ fontSize: '0.62rem' }}>
                          {apt.status === 'NO_SHOW' ? 'No-Show' : apt.status}
                        </span>
                      </div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-dim)', marginTop: 2 }}>
                        {apt.reason} · ₹{apt.fee}
                      </div>
                    </div>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => { if (patient) { setSelectedPatient(patient); setActiveView('patients'); } }}
                      style={{ fontSize: 'var(--text-xs)' }}
                    >
                      <UserCheck size={12} />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* AI Operational Insights — purple because it IS AI content */}
      <div className="glass-card" style={{ borderLeft: '3px solid var(--color-ai-text)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Brain size={16} color="var(--color-ai-text)" />
            <span style={{ fontWeight: 700, fontSize: 'var(--text-base)' }}>Operational Intelligence</span>
            <span className="cf-ai-label">AI · Demo Data</span>
          </div>
          <button className="btn btn-ai btn-sm" onClick={() => setActiveView('ai-copilot')}>
            <Sparkles size={12} /> Ask Copilot
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {aiInsights.map(insight => (
            <div key={insight.id} className="cf-panel" style={{ borderLeft: `3px solid var(--color-ai-text)` }}>
              <div style={{ fontSize: '0.62rem', fontWeight: 700, color: 'var(--color-ai-text)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>
                {insight.category} · {insight.impact} Impact
              </div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-main)', marginBottom: 4, lineHeight: 1.4 }}>
                {insight.title}
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {insight.suggestedAction}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

/* ── Doctor Command Center ── */
const DoctorDashboard = ({ ctx }) => {
  const { appointments, tasks, patients, setActiveView, triggerNoShowRecovery, updateTaskStatus, setSelectedPatient, setTelehealthMeeting } = ctx;

  const todayAppointments = appointments.filter(a => a.date === '2026-09-06');
  const myPatientIds      = [...new Set(todayAppointments.map(a => a.patientId))];
  const attentionTasks    = tasks.filter(t => t.status === 'TODO');

  return (
    <>
      <DemoNotice />

      {/* KPI Row */}
      <div className="grid-4" style={{ marginBottom: 20 }}>
        <div className="glass-card" style={{ borderLeft: '3px solid var(--primary)' }}>
          <div className="cf-kpi-label">Today's Appointments</div>
          <div className="cf-kpi-value" style={{ marginTop: 6 }}>{todayAppointments.length}</div>
          <div className="cf-kpi-meta">
            {todayAppointments.filter(a => a.status === 'COMPLETED').length} completed · {todayAppointments.filter(a => a.status === 'CONFIRMED').length} upcoming
          </div>
        </div>
        <div className="glass-card" style={{ borderLeft: '3px solid var(--color-warning-text)' }}>
          <div className="cf-kpi-label">Pending Attention</div>
          <div className="cf-kpi-value" style={{ marginTop: 6, color: attentionTasks.length > 0 ? 'var(--color-warning-text)' : 'var(--color-success-text)' }}>
            {attentionTasks.length}
          </div>
          <div className="cf-kpi-meta">Patient follow-ups and alerts</div>
        </div>
        <div className="glass-card" style={{ borderLeft: '3px solid var(--color-success-text)' }}>
          <div className="cf-kpi-label">Active Patients</div>
          <div className="cf-kpi-value" style={{ marginTop: 6 }}>{patients.filter(p => p.status === 'ACTIVE' || p.status === 'NEW').length}</div>
          <div className="cf-kpi-meta">Under care</div>
        </div>
        <div className="glass-card" style={{ borderLeft: '3px solid var(--color-info-text)' }}>
          <div className="cf-kpi-label">No-Shows Today</div>
          <div className="cf-kpi-value" style={{ marginTop: 6, color: 'var(--color-critical-text)' }}>
            {todayAppointments.filter(a => a.status === 'NO_SHOW').length}
          </div>
          <div className="cf-kpi-meta">Require rescheduling</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Today's Schedule */}
        <div className="glass-card">
          <div style={{ fontWeight: 700, fontSize: 'var(--text-base)', marginBottom: 14, display: 'flex', justifyContent: 'space-between' }}>
            <span>Today's Schedule</span>
            <button className="btn btn-ghost btn-sm" onClick={() => setActiveView('appointments')}>
              Full Calendar <ArrowRight size={12} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {todayAppointments.length === 0 ? (
              <div className="cf-empty-state">
                <div className="cf-empty-title">No appointments scheduled today</div>
              </div>
            ) : (
              todayAppointments.map(apt => {
                const patient = patients.find(p => p.id === apt.patientId);
                return (
                  <div key={apt.id} className={`cf-appt-item ${apt.status === 'NO_SHOW' ? 'no-show' : ''}`}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--primary)' }}>{apt.time}</span>
                        <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{patient?.name}</span>
                        <span className={`badge ${apt.status === 'COMPLETED' ? 'badge-emerald' : apt.status === 'NO_SHOW' ? 'badge-crimson' : 'badge-primary'}`} style={{ fontSize: '0.62rem' }}>
                          {apt.status}
                        </span>
                      </div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-dim)', marginTop: 2 }}>
                        {apt.reason}
                        {patient?.chronicConditions?.length > 0 && (
                          <span style={{ marginLeft: 6, color: 'var(--color-warning-text)' }}>
                            · {patient.chronicConditions.join(', ')}
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 5 }}>
                      {apt.type === 'TELEHEALTH' && apt.status !== 'COMPLETED' && (
                        <button className="btn btn-primary btn-sm" onClick={() => setTelehealthMeeting(apt)}>
                          Join Call
                        </button>
                      )}
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => { if (patient) { setSelectedPatient(patient); setActiveView('patients'); } }}
                      >
                        <UserCheck size={12} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Attention Queue */}
        <div className="glass-card">
          <div style={{ fontWeight: 700, fontSize: 'var(--text-base)', marginBottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              Patients Requiring Attention
              {attentionTasks.length > 0 && <span className="badge badge-crimson" style={{ fontSize: '0.62rem' }}>{attentionTasks.length}</span>}
            </span>
            <button className="btn btn-ghost btn-sm" onClick={() => setActiveView('tasks')}>View All <ArrowRight size={12} /></button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {attentionTasks.length === 0 ? (
              <div className="cf-empty-state">
                <div className="cf-empty-state-icon"><CheckCircle2 size={20} color="var(--color-success-text)" /></div>
                <div className="cf-empty-title">All caught up</div>
              </div>
            ) : (
              attentionTasks.map(t => (
                <AttentionItem
                  key={t.id}
                  t={t}
                  patients={patients}
                  triggerNoShowRecovery={triggerNoShowRecovery}
                  updateTaskStatus={updateTaskStatus}
                  setActiveView={setActiveView}
                  setSelectedPatient={setSelectedPatient}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button className="btn btn-secondary btn-sm" onClick={() => setActiveView('patients')}>
          <UserCheck size={13} /> Patient Records
        </button>
        <button className="btn btn-secondary btn-sm" onClick={() => setActiveView('triage')}>
          <HeartPulse size={13} /> Open Triage
        </button>
        <button className="btn btn-secondary btn-sm" onClick={() => setActiveView('pharmacy')}>
          Write Prescription
        </button>
        <button className="btn btn-ai btn-sm" onClick={() => setActiveView('ai-copilot')}>
          <Brain size={13} /> Ask Clinical Copilot
        </button>
      </div>
    </>
  );
};

/* ── Reception / Growth Command Center ── */
const ReceptionDashboard = ({ ctx }) => {
  const { leads, appointments, tasks, conversations, patients, setActiveView, triggerNoShowRecovery, updateTaskStatus, setSelectedPatient } = ctx;

  const newLeads       = leads.filter(l => l.status === 'NEW');
  const qualifiedLeads = leads.filter(l => l.status === 'QUALIFIED' || l.status === 'APPOINTMENT_OFFERED');
  const noShows        = appointments.filter(a => a.status === 'NO_SHOW' && !a.isRecovered);
  const attentionTasks = tasks.filter(t => t.status === 'TODO');
  const unreadMsgs     = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  return (
    <>
      <DemoNotice />

      <div className="grid-4" style={{ marginBottom: 20 }}>
        <div className="glass-card glass-card-interactive" style={{ borderLeft: '3px solid var(--color-success-text)' }} onClick={() => setActiveView('leads')}>
          <div className="cf-kpi-label">New Inbound Leads</div>
          <div className="cf-kpi-value" style={{ marginTop: 6, color: 'var(--color-success-text)' }}>{newLeads.length}</div>
          <div className="cf-kpi-meta">Awaiting first contact</div>
        </div>
        <div className="glass-card glass-card-interactive" style={{ borderLeft: '3px solid var(--color-warning-text)' }} onClick={() => setActiveView('leads')}>
          <div className="cf-kpi-label">Leads Needing Follow-up</div>
          <div className="cf-kpi-value" style={{ marginTop: 6, color: 'var(--color-warning-text)' }}>{qualifiedLeads.length}</div>
          <div className="cf-kpi-meta">Qualified — slot not yet confirmed</div>
        </div>
        <div className="glass-card glass-card-interactive" style={{ borderLeft: '3px solid var(--color-critical-text)' }} onClick={() => setActiveView('appointments')}>
          <div className="cf-kpi-label">No-Shows to Recover</div>
          <div className="cf-kpi-value" style={{ marginTop: 6, color: 'var(--color-critical-text)' }}>{noShows.length}</div>
          <div className="cf-kpi-meta">Require WhatsApp outreach</div>
        </div>
        <div className="glass-card glass-card-interactive" style={{ borderLeft: '3px solid var(--primary)' }} onClick={() => setActiveView('inbox')}>
          <div className="cf-kpi-label">Unread Messages</div>
          <div className="cf-kpi-value" style={{ marginTop: 6 }}>{unreadMsgs}</div>
          <div className="cf-kpi-meta">Open inbox for responses</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Attention Queue */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontWeight: 700, fontSize: 'var(--text-base)', display: 'flex', alignItems: 'center', gap: 7 }}>
              Pending Actions
              {attentionTasks.length > 0 && <span className="badge badge-crimson" style={{ fontSize: '0.62rem' }}>{attentionTasks.length}</span>}
            </span>
            <button className="btn btn-ghost btn-sm" onClick={() => setActiveView('tasks')}>View All <ArrowRight size={12} /></button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {attentionTasks.length === 0 ? (
              <div className="cf-empty-state">
                <div className="cf-empty-title">No pending actions</div>
              </div>
            ) : (
              attentionTasks.map(t => (
                <AttentionItem
                  key={t.id}
                  t={t}
                  patients={patients}
                  triggerNoShowRecovery={triggerNoShowRecovery}
                  updateTaskStatus={updateTaskStatus}
                  setActiveView={setActiveView}
                  setSelectedPatient={setSelectedPatient}
                />
              ))
            )}
          </div>
        </div>

        {/* Lead Pipeline */}
        <div className="glass-card">
          <div style={{ fontWeight: 700, fontSize: 'var(--text-base)', marginBottom: 14, display: 'flex', justifyContent: 'space-between' }}>
            <span>Lead Pipeline</span>
            <button className="btn btn-ghost btn-sm" onClick={() => setActiveView('leads')}>Full CRM <ArrowRight size={12} /></button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {leads.slice(0, 5).map(lead => (
              <div key={lead.id} className="cf-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-main)' }}>{lead.name}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-dim)' }}>{lead.serviceInterested} · {lead.source}</div>
                </div>
                <span className={`badge ${lead.status === 'NEW' ? 'badge-emerald' : lead.status === 'CONVERTED' ? 'badge-primary' : lead.status === 'LOST' ? 'badge-muted' : 'badge-amber'}`} style={{ fontSize: '0.62rem' }}>
                  {lead.status.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button className="btn btn-emerald btn-sm" onClick={() => setActiveView('leads')}>
          <Users2 size={13} /> New Lead
        </button>
        <button className="btn btn-secondary btn-sm" onClick={() => setActiveView('inbox')}>
          <MessageSquare size={13} /> Open Inbox
        </button>
        <button className="btn btn-secondary btn-sm" onClick={() => setActiveView('appointments')}>
          <Calendar size={13} /> Appointments
        </button>
      </div>
    </>
  );
};

/* ── Billing / Finance Command Center ── */
const BillingDashboard = ({ ctx }) => {
  const { growthMetrics, invoices, setActiveView, markInvoicePaid } = ctx;

  const pendingInvoices = invoices.filter(i => i.status === 'PENDING');
  const paidToday       = invoices.filter(i => i.status === 'PAID');

  const monthTarget  = growthMetrics.monthlyTarget;
  const collected    = growthMetrics.revenueGenerated;
  const targetPct    = Math.min(100, Math.round((collected / monthTarget) * 100));

  return (
    <>
      <DemoNotice />

      <div className="grid-4" style={{ marginBottom: 20 }}>
        <div className="glass-card" style={{ borderLeft: '3px solid var(--color-success-text)' }}>
          <div className="cf-kpi-label">Total Collected</div>
          <div className="cf-kpi-value" style={{ marginTop: 6 }}>₹{collected.toLocaleString('en-IN')}</div>
          <div className="cf-kpi-meta" style={{ color: 'var(--color-success-text)' }}>
            <ArrowUpRight size={11} style={{ display: 'inline' }} /> {targetPct}% of ₹{(monthTarget / 100000).toFixed(1)}L target
          </div>
        </div>
        <div className="glass-card glass-card-interactive" style={{ borderLeft: '3px solid var(--color-warning-text)' }} onClick={() => setActiveView('billing')}>
          <div className="cf-kpi-label">Pending Dues</div>
          <div className="cf-kpi-value" style={{ marginTop: 6, color: 'var(--color-warning-text)' }}>
            ₹{growthMetrics.revenuePending.toLocaleString('en-IN')}
          </div>
          <div className="cf-kpi-meta">{pendingInvoices.length} invoices awaiting payment</div>
        </div>
        <div className="glass-card" style={{ borderLeft: '3px solid var(--color-info-text)' }}>
          <div className="cf-kpi-label">No-Show Recovery</div>
          <div className="cf-kpi-value" style={{ marginTop: 6, color: 'var(--color-info-text)' }}>
            ₹{growthMetrics.revenueRecovered.toLocaleString('en-IN')}
          </div>
          <div className="cf-kpi-meta">{growthMetrics.noShowRecoveryRate}% recovery rate</div>
        </div>
        <div className="glass-card" style={{ borderLeft: '3px solid var(--primary)' }}>
          <div className="cf-kpi-label">Follow-up Revenue</div>
          <div className="cf-kpi-value" style={{ marginTop: 6 }}>₹{growthMetrics.followUpRevenue.toLocaleString('en-IN')}</div>
          <div className="cf-kpi-meta">From reactivation + follow-ups</div>
        </div>
      </div>

      {/* Monthly Progress */}
      <div className="glass-card" style={{ marginBottom: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 'var(--text-base)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Target size={16} color="var(--color-success-text)" />
          Monthly Revenue Target Progress
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: 8 }}>
          <span>₹{collected.toLocaleString('en-IN')} collected</span>
          <span style={{ fontWeight: 700 }}>Target: ₹{monthTarget.toLocaleString('en-IN')}</span>
        </div>
        <div style={{ height: 8, background: 'var(--bg-surface-elevated)', borderRadius: 4 }}>
          <div style={{ height: '100%', width: `${targetPct}%`, background: 'var(--color-success)', borderRadius: 4, transition: 'width 0.5s ease' }} />
        </div>
        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-dim)', marginTop: 6 }}>
          {targetPct}% achieved · ₹{(monthTarget - collected).toLocaleString('en-IN')} remaining to target
        </div>
      </div>

      {/* Pending Invoices */}
      <div className="glass-card">
        <div style={{ fontWeight: 700, fontSize: 'var(--text-base)', marginBottom: 14, display: 'flex', justifyContent: 'space-between' }}>
          <span>Invoices Pending Payment</span>
          <button className="btn btn-ghost btn-sm" onClick={() => setActiveView('billing')}>View All <ArrowRight size={12} /></button>
        </div>
        {pendingInvoices.length === 0 ? (
          <div className="cf-empty-state">
            <div className="cf-empty-state-icon"><CheckCircle2 size={20} color="var(--color-success-text)" /></div>
            <div className="cf-empty-title">No pending invoices</div>
          </div>
        ) : (
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingInvoices.map(inv => (
                  <tr key={inv.id}>
                    <td style={{ fontWeight: 600 }}>{inv.invoiceNumber}</td>
                    <td style={{ fontWeight: 700, color: 'var(--color-warning-text)' }}>₹{inv.total.toLocaleString('en-IN')}</td>
                    <td><span className="badge badge-amber" style={{ fontSize: '0.62rem' }}>Pending</span></td>
                    <td>
                      <button className="btn btn-emerald btn-sm" onClick={() => markInvoicePaid(inv.id)}>
                        Mark Paid
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

/* ── Root DashboardView (role router) ── */
export const DashboardView = () => {
  const ctx = useApp();
  const { currentUser, setActiveView } = ctx;

  const roleTitle = {
    CLINIC_OWNER:  'Executive Command Center',
    DOCTOR:        'Doctor Command Center',
    RECEPTIONIST:  'Growth & Patient Operations',
    BILLING_STAFF: 'Finance Command Center'
  };

  const roleSubtitle = {
    CLINIC_OWNER:  'Operational overview — revenue, capacity, acquisition, and team performance',
    DOCTOR:        'Your schedule, patients requiring attention, and clinical workflow',
    RECEPTIONIST:  'Leads, follow-ups, no-show recovery, and patient communications',
    BILLING_STAFF: 'Revenue tracking, pending invoices, and financial performance'
  };

  const role = currentUser.role;

  if (role === 'NURSE') {
    return <ClinicalCommandCenter />;
  }

  return (
    <div className="page-wrapper">

      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="page-title">
            {roleTitle[role] || 'Command Center'}
          </div>
          <div className="page-subtitle">{roleSubtitle[role] || ''}</div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setActiveView('ai-copilot')}>
            <Brain size={13} color="var(--color-ai-text)" /> Operational Copilot
          </button>
          {(role === 'CLINIC_OWNER' || role === 'RECEPTIONIST') && (
            <button className="btn btn-emerald btn-sm" onClick={() => setActiveView('leads')}>
              <Users2 size={13} /> New Lead
            </button>
          )}
          <button className="btn btn-primary btn-sm" onClick={() => setActiveView('appointments')}>
            <Calendar size={13} /> Schedule
          </button>
        </div>
      </div>

      {role === 'DOCTOR'        && <DoctorDashboard     ctx={ctx} />}
      {role === 'RECEPTIONIST'  && <ReceptionDashboard  ctx={ctx} />}
      {role === 'BILLING_STAFF' && <BillingDashboard    ctx={ctx} />}
      {(role === 'CLINIC_OWNER' || !role) && <ExecutiveDashboard ctx={ctx} />}
    </div>
  );
};
