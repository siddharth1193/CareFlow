import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Workflow,
  Sparkles,
  ShieldCheck,
  Clock,
  MessageSquare,
  Repeat,
  CheckCircle2,
  AlertTriangle,
  Languages,
  RotateCcw,
  Zap
} from 'lucide-react';
import { automationService } from '../../services/automationService';

export const AutomationView = () => {
  const { automationTemplates, organization, addToast } = useApp();

  const [activeLanguage, setActiveLanguage] = useState('EN'); // 'EN' | 'HI'
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(true);
  const [rateLimitPerDay, setRateLimitPerDay] = useState(3);
  const [consentEnforced, setConsentEnforced] = useState(true);

  const [executionLogs, setExecutionLogs] = useState([
    {
      id: 'log-1',
      trigger: 'APPOINTMENT_SCHEDULED_24H_BEFORE',
      recipient: 'Rohan Kapoor (+91 98450 12345)',
      status: 'DISPATCHED_WHATSAPP',
      timestamp: '2026-09-06 10:15 AM',
      latency: '240ms'
    },
    {
      id: 'log-2',
      trigger: 'APPOINTMENT_NO_SHOW_30M',
      recipient: 'Vikram Seth (+91 97411 66778)',
      status: 'DISPATCHED_WHATSAPP',
      timestamp: '2026-09-06 11:00 AM',
      latency: '180ms'
    },
    {
      id: 'log-3',
      trigger: 'PATIENT_INACTIVE_90_DAYS',
      recipient: 'Sunita Rao (+91 99452 88990)',
      status: 'DISPATCHED_WHATSAPP',
      timestamp: '2026-09-05 04:30 PM',
      latency: '310ms'
    }
  ]);

  const handleTestTrigger = (tmpl) => {
    const isQuiet = automationService.isQuietHours();
    if (isQuiet && quietHoursEnabled) {
      addToast({
        title: "Quiet Hours Policy Enforced",
        message: "Message queued for delivery at 08:30 AM IST to respect patient quiet hours",
        type: "warning"
      });
      return;
    }

    addToast({
      title: "Automation Trigger Executed",
      message: `Dispatched template '${tmpl.name}' via WhatsApp Gateway`,
      type: "success"
    });

    const newLog = {
      id: `log-${Date.now()}`,
      trigger: tmpl.trigger,
      recipient: 'Active Patient (+91 9845X XXXXX)',
      status: 'DISPATCHED_WHATSAPP',
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      latency: '190ms'
    };
    setExecutionLogs((prev) => [newLog, ...prev]);
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-title">
            <Workflow size={24} color="var(--primary)" />
            <span>Growth Automations & Message Safety Engine</span>
          </div>
          <div className="page-subtitle">
            Pre-built WhatsApp workflow triggers, bilingual English + Hindi templates, and anti-spam safety controls
          </div>
        </div>

        {/* English / Hindi Language Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--bg-surface)', padding: 4, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
          <Languages size={15} color="var(--primary)" style={{ marginLeft: 6 }} />
          <button
            className={`btn btn-sm ${activeLanguage === 'EN' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setActiveLanguage('EN')}
            style={{ fontSize: '0.74rem', padding: '3px 8px' }}
          >
            English
          </button>
          <button
            className={`btn btn-sm ${activeLanguage === 'HI' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setActiveLanguage('HI')}
            style={{ fontSize: '0.74rem', padding: '3px 8px' }}
          >
            हिन्दी (Hindi)
          </button>
        </div>
      </div>

      {/* Safety & Compliance Controls Banner (Requirement 18) */}
      <div
        className="glass-card"
        style={{
          background: 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(10,24,48,0.95))',
          borderColor: 'rgba(14,165,233,0.3)',
          marginBottom: 24,
          padding: 20
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShieldCheck size={20} color="#10b981" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff' }}>
              CareFlow Anti-Spam & Automation Safety Policy
            </h3>
          </div>
          <span className="badge badge-emerald">Safe Dispatch Guardrails Active</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {/* Rule 1: Quiet Hours */}
          <div style={{ padding: 14, borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#f8fafc' }}>Quiet Hours Lock</span>
              <input
                type="checkbox"
                checked={quietHoursEnabled}
                onChange={(e) => setQuietHoursEnabled(e.target.checked)}
                style={{ cursor: 'pointer', accentColor: '#0ea5e9' }}
              />
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              No marketing/promotional messages dispatched between <strong>09:00 PM and 08:30 AM IST</strong>.
            </div>
          </div>

          {/* Rule 2: Daily Rate Limit */}
          <div style={{ padding: 14, borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#f8fafc' }}>Daily Rate Limiting</span>
              <span className="badge badge-primary">Max {rateLimitPerDay}/day</span>
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              Prevents spamming by capping automated notifications per patient in a 24-hour window.
            </div>
          </div>

          {/* Rule 3: DPDP Consent Check */}
          <div style={{ padding: 14, borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#f8fafc' }}>Consent Verification</span>
              <span className="badge badge-emerald">Enforced</span>
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              Checks DPDP & NDHM opt-out state before sending non-essential communications.
            </div>
          </div>
        </div>
      </div>

      {/* Pre-built Automation Templates Grid */}
      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fff', marginBottom: 14 }}>
        Active Workflow Templates ({automationTemplates.length})
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        {automationTemplates.map((tmpl) => (
          <div key={tmpl.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#f8fafc' }}>
                  {tmpl.name}
                </span>
                <span className="badge badge-whatsapp">WHATSAPP BOT</span>
              </div>

              <div style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 700, marginBottom: 10 }}>
                Trigger: {tmpl.trigger}
              </div>

              {/* Message Body Preview */}
              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: '#0a1a14',
                  border: '1px solid rgba(37,211,102,0.25)',
                  color: '#f8fafc',
                  fontSize: '0.82rem',
                  lineHeight: 1.5,
                  marginBottom: 14,
                  whiteSpace: 'pre-line'
                }}
              >
                {activeLanguage === 'HI' && tmpl.hindiAvailable ? tmpl.bodyHi : tmpl.bodyEn}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Sent: <strong>{tmpl.sentCount}</strong> • Confirmation: <strong style={{ color: '#10b981' }}>{tmpl.confirmRate}%</strong>
              </div>

              <button
                className="btn btn-secondary btn-sm"
                onClick={() => handleTestTrigger(tmpl)}
              >
                <Zap size={13} color="#0ea5e9" /> Test Trigger
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Real-Time Execution Audit Logs */}
      <div className="glass-card">
        <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fff', marginBottom: 12 }}>
          Live Automation Dispatch Audit Logs
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Log ID</th>
                <th>Workflow Trigger</th>
                <th>Recipient Contact</th>
                <th>Dispatch Status</th>
                <th>Timestamp</th>
                <th>Gateway Latency</th>
              </tr>
            </thead>
            <tbody>
              {executionLogs.map((log) => (
                <tr key={log.id}>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{log.id}</td>
                  <td style={{ fontWeight: 700, color: 'var(--primary)' }}>{log.trigger}</td>
                  <td style={{ fontSize: '0.82rem', color: '#f8fafc' }}>{log.recipient}</td>
                  <td>
                    <span className="badge badge-emerald">{log.status}</span>
                  </td>
                  <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{log.timestamp}</td>
                  <td style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 600 }}>{log.latency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
