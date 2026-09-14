import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Zap,
  Repeat,
  RotateCcw,
  ArrowUpRight,
  Info
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
            <TrendingUp size={20} color="var(--color-success-text)" />
            <span>Revenue Recovery &amp; Growth Analytics</span>
          </div>
          <div className="page-subtitle">
            No-show recovery, lead conversion, and patient retention metrics
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-emerald btn-sm" onClick={handleRunReactivation}>
            <RotateCcw size={13} /> Run Reactivation Campaign
          </button>
        </div>
      </div>

      {/* Demo Notice */}
      <div className="cf-demo-notice">
        <Info size={13} />
        <span><strong>Sample Dataset</strong> — Revenue figures and acquisition metrics shown here are synthetic demo data.</span>
      </div>

      {/* Revenue Breakdown */}
      <div className="grid-3" style={{ marginBottom: 20 }}>
        <div className="glass-card" style={{ borderLeft: '3px solid var(--color-success-text)' }}>
          <div className="cf-kpi-label">Total Collected Revenue</div>
          <div className="cf-kpi-value" style={{ marginTop: 6 }}>
            ₹{growthMetrics.revenueGenerated.toLocaleString('en-IN')}
          </div>
          <div className="cf-kpi-meta" style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-success-text)', marginTop: 4 }}>
            <ArrowUpRight size={11} /> +18.4% vs prior month
          </div>
          <div className="cf-kpi-meta" style={{ marginTop: 4 }}>Consultations, procedures &amp; diagnostics</div>
        </div>

        <div className="glass-card" style={{ borderLeft: '3px solid var(--color-info-text)' }}>
          <div className="cf-kpi-label">Automated Recovery Revenue</div>
          <div className="cf-kpi-value" style={{ marginTop: 6, color: 'var(--color-info-text)' }}>
            ₹{growthMetrics.revenueRecovered.toLocaleString('en-IN')}
          </div>
          <div className="cf-kpi-meta" style={{ marginTop: 4 }}>
            <strong>{growthMetrics.recoveredAppointments}</strong> of {growthMetrics.noShowAppointments} no-shows rebooked ({growthMetrics.noShowRecoveryRate}%)
          </div>
        </div>

        <div className="glass-card" style={{ borderLeft: '3px solid var(--color-critical-text)' }}>
          <div className="cf-kpi-label">Outstanding Pending Invoices</div>
          <div className="cf-kpi-value" style={{ marginTop: 6, color: 'var(--color-critical-text)' }}>
            ₹{growthMetrics.revenuePending.toLocaleString('en-IN')}
          </div>
          <div className="cf-kpi-meta" style={{ marginTop: 4 }}>Unpaid balances awaiting collection</div>
        </div>
      </div>

      {/* Secondary Growth Streams */}
      <div className="grid-2" style={{ marginBottom: 20 }}>
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Repeat size={16} color="var(--color-warning-text)" />
                Follow-Up Retention Revenue
              </div>
              <div className="page-subtitle" style={{ marginTop: 2 }}>Chronic care &amp; post-op follow-up queues</div>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-warning-text)' }}>
              ₹{growthMetrics.followUpRevenue.toLocaleString('en-IN')}
            </div>
          </div>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Follow-up completion rate increased using WhatsApp 1-tap booking reminders.
          </div>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <RotateCcw size={16} color="var(--primary)" />
                Patient Reactivation Revenue
              </div>
              <div className="page-subtitle" style={{ marginTop: 2 }}>Re-engaged patients inactive &gt;90 days</div>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
              ₹{growthMetrics.reactivationRevenue.toLocaleString('en-IN')}
            </div>
          </div>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Consent-compliant check-in messages brought back inactive patients this quarter.
          </div>
        </div>
      </div>

      {/* No-Show Recovery ROI Calculator */}
      <div className="glass-card" style={{ borderLeft: '3px solid var(--primary)', marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14, marginBottom: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Zap size={18} color="var(--primary)" />
              <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--text-main)' }}>
                No-Show Recovery ROI Simulator
              </h3>
            </div>
            <p className="page-subtitle" style={{ marginTop: 4 }}>
              Simulate the financial impact of improving automated recovery rate.
            </p>
          </div>

          <div style={{ padding: '8px 16px', borderRadius: 'var(--radius-sm)', background: 'var(--color-success-bg)', border: '1px solid var(--color-success-border)', textAlign: 'right' }}>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-success-text)', fontWeight: 700 }}>Projected Annual Gain</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-success-text)' }}>
              +₹{((growthMetrics.revenueRecovered + (potentialMonthlyGain > 0 ? potentialMonthlyGain : 0)) * 12).toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', fontWeight: 700, marginBottom: 8, color: 'var(--text-muted)' }}>
            <span>Target Recovery Rate: <strong style={{ color: 'var(--primary)' }}>{simulatedNoShowRate}%</strong></span>
            <span>Current Baseline: 72.7%</span>
          </div>
          <input
            type="range"
            min="30"
            max="95"
            value={simulatedNoShowRate}
            onChange={(e) => setSimulatedNoShowRate(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer', height: 6 }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: 'var(--text-dim)' }}>
          <span>30% (Manual Calls)</span>
          <span>72.7% (Automated WhatsApp)</span>
          <span>95% (Target)</span>
        </div>
      </div>

      {/* Channel Attribution */}
      <div className="glass-card">
        <div style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--text-main)', marginBottom: 14 }}>
          Channel Attribution &amp; Acquisition Efficiency
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
          {[
            { channel: 'Instagram',        conv: '46.2%', volume: '142 Inquiries', roi: '8.4x ROI',     color: 'var(--color-critical-text)' },
            { channel: 'WhatsApp Direct',  conv: '41.8%', volume: '290 Inquiries', roi: '12.2x ROI',   color: 'var(--whatsapp)' },
            { channel: 'Google Search',    conv: '24.1%', volume: '180 Inquiries', roi: '4.8x ROI',    color: 'var(--primary)' },
            { channel: 'Clinic QR Code',   conv: '68.5%', volume: '94 Scans',      roi: 'Direct Walk-in', color: 'var(--color-success-text)' }
          ].map((item) => (
            <div key={item.channel} className="cf-panel">
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: item.color, marginBottom: 4 }}>{item.channel}</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>{item.conv}</div>
              <div className="cf-kpi-meta">{item.volume} · {item.roi}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
