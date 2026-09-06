import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Zap,
  Repeat,
  RotateCcw,
  Users2,
  Calendar,
  ArrowUpRight,
  Sparkles,
  HelpCircle,
  IndianRupee,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const GrowthView = () => {
  const { growthMetrics, organization, runReactivationCampaign, addToast } = useApp();
  const [simulatedNoShowRate, setSimulatedNoShowRate] = useState(growthMetrics.noShowRecoveryRate);

  // Dynamic simulation calculations
  const potentialMonthlyGain = Math.round(((simulatedNoShowRate - 50) / 100) * 80000);

  const handleRunReactivation = () => {
    runReactivationCampaign(90);
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-title">
            <TrendingUp size={24} color="#10b981" />
            <span>Revenue Recovery & Clinic Growth Analytics</span>
          </div>
          <div className="page-subtitle">
            Measurable, database-calculated revenue metrics and automated patient retention impact
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-emerald btn-sm" onClick={handleRunReactivation}>
            <RotateCcw size={14} /> Run 90-Day Reactivation Campaign
          </button>
        </div>
      </div>

      {/* Revenue Breakdown HUD */}
      <div className="grid-3" style={{ marginBottom: 24 }}>
        {/* Metric 1: Total Collected Revenue */}
        <div className="glass-card" style={{ borderLeft: '4px solid #10b981' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
            ACTUAL COLLECTED REVENUE
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 900, color: '#f8fafc', marginTop: 6 }}>
            ₹{growthMetrics.revenueGenerated.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.74rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
            <ArrowUpRight size={14} /> ₹{(growthMetrics.revenueGenerated - 48000).toLocaleString('en-IN')} vs prior month
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: 8 }}>
            Includes consultations, procedures & diagnostics
          </div>
        </div>

        {/* Metric 2: Recovered Revenue from No-Shows */}
        <div className="glass-card" style={{ borderLeft: '4px solid #0ea5e9' }}>
          <div style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Zap size={14} /> AUTOMATED RECOVERED REVENUE
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 900, color: '#0ea5e9', marginTop: 6 }}>
            ₹{growthMetrics.revenueRecovered.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 4 }}>
            From <strong>{growthMetrics.recoveredAppointments} recovered appointments</strong> ({growthMetrics.noShowRecoveryRate}% recovery rate)
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: 8 }}>
            Zero manual calls needed • 100% WhatsApp bot recovery
          </div>
        </div>

        {/* Metric 3: Outstanding / Pending Revenue */}
        <div className="glass-card" style={{ borderLeft: '4px solid #ef4444' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
            OUTSTANDING PENDING INVOICES
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 900, color: '#ef4444', marginTop: 6 }}>
            ₹{growthMetrics.revenuePending.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 4 }}>
            Unpaid consultation balances & insurance pre-auths
          </div>
          <div style={{ fontSize: '0.7rem', color: '#f87171', marginTop: 8 }}>
            Automated payment reminders active
          </div>
        </div>
      </div>

      {/* Secondary Growth Streams */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* Follow-up Revenue */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ padding: 8, borderRadius: 'var(--radius-sm)', background: 'var(--amber-light)' }}>
                <Repeat size={18} color="#f59e0b" />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>
                  Follow-Up Retention Revenue
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Generated from automated chronic care & post-op follow-up queues
                </div>
              </div>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#f59e0b' }}>
              ₹{growthMetrics.followUpRevenue.toLocaleString('en-IN')}
            </div>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5 }}>
            Follow-up completion rate increased from <strong>38% to 64%</strong> using WhatsApp 1-tap booking reminders.
          </div>
        </div>

        {/* Reactivation Revenue */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ padding: 8, borderRadius: 'var(--radius-sm)', background: 'var(--purple-light)' }}>
                <RotateCcw size={18} color="#a855f7" />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>
                  Patient Reactivation Revenue
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Re-engaged patients inactive for over 90 days
                </div>
              </div>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#a855f7' }}>
              ₹{growthMetrics.reactivationRevenue.toLocaleString('en-IN')}
            </div>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5 }}>
            Compliant DPDP-verified check-in messages brought back <strong>48 inactive patients</strong> this quarter.
          </div>
        </div>
      </div>

      {/* Interactive No-Show Recovery Revenue Simulator */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(13,27,51,0.9))', borderColor: 'rgba(14,165,233,0.3)', marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Zap size={20} color="#0ea5e9" />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
                Interactive No-Show Recovery ROI Calculator
              </h3>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: 4 }}>
              Simulate the bottom-line financial impact of improving your clinic's automated recovery rate.
            </p>
          </div>

          <div style={{ padding: '8px 18px', borderRadius: 'var(--radius-md)', background: 'var(--emerald-light)', border: '1px solid rgba(16,185,129,0.3)', textAlign: 'right' }}>
            <div style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 700 }}>Projected Annual Revenue Gain</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#10b981' }}>
              +₹{((growthMetrics.revenueRecovered + (potentialMonthlyGain > 0 ? potentialMonthlyGain : 0)) * 12).toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Range Slider */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', fontWeight: 700, marginBottom: 8 }}>
            <span>Target Recovery Rate: <strong style={{ color: '#0ea5e9', fontSize: '1rem' }}>{simulatedNoShowRate}%</strong></span>
            <span style={{ color: 'var(--text-dim)' }}>Current Baseline: 72.7%</span>
          </div>
          <input
            type="range"
            min="30"
            max="95"
            value={simulatedNoShowRate}
            onChange={(e) => setSimulatedNoShowRate(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#0ea5e9', cursor: 'pointer', height: 8 }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
          <span>30% (Industry Average / Manual Calls)</span>
          <span>72.7% (CareFlow Automated WhatsApp)</span>
          <span>95% (CareFlow AI + Auto-Deposit)</span>
        </div>
      </div>

      {/* Commercial Attribution Breakdown */}
      <div className="glass-card">
        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fff', marginBottom: 14 }}>
          Channel Attribution & Acquisition Efficiency
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
          {[
            { channel: 'Instagram DMs / Ads', conv: '46.2%', volume: '142 Inquiries', roi: '8.4x ROI', color: '#ec4899' },
            { channel: 'WhatsApp Direct Link', conv: '41.8%', volume: '290 Inquiries', roi: '12.2x ROI', color: '#25D366' },
            { channel: 'Google Search / GMB', conv: '24.1%', volume: '180 Inquiries', roi: '4.8x ROI', color: '#0ea5e9' },
            { channel: 'Clinic Counter QR', conv: '68.5%', volume: '94 Scans', roi: 'Direct Walk-in', color: '#a855f7' }
          ].map((item) => (
            <div key={item.channel} style={{ padding: 14, borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: item.color }}>{item.channel}</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginTop: 4 }}>{item.conv}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>{item.volume} • {item.roi}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
