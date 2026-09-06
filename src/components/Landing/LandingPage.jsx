import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Activity,
  Zap,
  CheckCircle2,
  TrendingUp,
  MessageSquareText,
  Calendar,
  ShieldAlert,
  Bot,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Clock,
  IndianRupee,
  Users,
  Repeat
} from 'lucide-react';

export const LandingPage = () => {
  const { setActiveView, startDemoMode, growthMetrics, organization } = useApp();

  return (
    <div style={{ background: '#070b14', color: '#f8fafc', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Top Banner Navigation */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 48px',
          maxWidth: 1400,
          margin: '0 auto',
          borderBottom: '1px solid rgba(255,255,255,0.06)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(14, 165, 233, 0.5)'
            }}
          >
            <Activity size={24} color="#fff" />
          </div>
          <div>
            <span style={{ fontWeight: 900, fontSize: '1.35rem', letterSpacing: '-0.03em' }}>CareFlow</span>
            <span className="badge badge-primary" style={{ marginLeft: 8, fontSize: '0.65rem' }}>AI HEALTHCARE SAAS</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button className="btn btn-ghost" onClick={() => setActiveView('dashboard')}>
            Clinic Dashboard
          </button>
          <button className="btn btn-emerald" onClick={startDemoMode}>
            <Zap size={15} /> Try Interactive Demo
          </button>
          <button className="btn btn-primary" onClick={() => setActiveView('dashboard')}>
            Launch Platform <ArrowRight size={15} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '80px 24px 60px', maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(14, 165, 233, 0.1)',
            border: '1px solid rgba(14, 165, 233, 0.3)',
            color: '#38bdf8',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: 24,
            animation: 'fadeIn 0.6s ease'
          }}
        >
          <Sparkles size={16} /> AI Healthcare Growth & Automation Platform
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
            fontWeight: 900,
            lineHeight: 1.12,
            letterSpacing: '-0.04em',
            maxWidth: 950,
            margin: '0 auto 24px',
            background: 'linear-gradient(180deg, #ffffff 40%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Turn Your Clinic Into an Automated Healthcare Business.
        </h1>

        <p
          style={{
            fontSize: '1.2rem',
            color: '#94a3b8',
            maxWidth: 780,
            margin: '0 auto 36px',
            lineHeight: 1.6
          }}
        >
          AI reception, WhatsApp omnichannel automation, no-show revenue recovery, patient follow-ups, and measurable business analytics — all in one unified platform.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 50 }}>
          <button className="btn btn-emerald btn-lg" onClick={startDemoMode} style={{ boxShadow: '0 0 25px rgba(16, 185, 129, 0.4)' }}>
            <Zap size={18} /> Try 14-Step Interactive Demo
          </button>
          <button className="btn btn-secondary btn-lg" onClick={() => setActiveView('dashboard')}>
            Open Clinic OS Dashboard <ArrowRight size={18} />
          </button>
        </div>

        {/* Live Metrics Showcase */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
            padding: 24,
            borderRadius: 'var(--radius-xl)',
            background: 'rgba(15, 23, 42, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}
        >
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#10b981' }}>72.7%</div>
            <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: 4 }}>No-Show Recovery Rate</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0ea5e9' }}>₹64,200</div>
            <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: 4 }}>Monthly Recovered Revenue</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#a855f7' }}>41.2%</div>
            <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: 4 }}>Lead &rarr; Consult Conversion</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#25D366' }}>1.4 min</div>
            <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: 4 }}>Avg AI WhatsApp Response</div>
          </div>
        </div>
      </section>

      {/* The Core Patient Growth Loop */}
      <section style={{ padding: '60px 24px', maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0ea5e9', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
          The CareFlow Engine
        </div>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: 40 }}>
          The Complete Automated Patient Growth Loop
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
          {[
            { step: '1. ATTRACT', desc: 'Social & Web Leads', color: '#0ea5e9' },
            { step: '2. CONVERT', desc: 'AI Receptionist', color: '#a855f7' },
            { step: '3. BOOK', desc: 'Multi-Doctor Sync', color: '#6366f1' },
            { step: '4. REMIND', desc: '24h WhatsApp Bot', color: '#25D366' },
            { step: '5. CONSULT', desc: 'EHR & Telehealth', color: '#10b981' },
            { step: '6. FOLLOW UP', desc: 'Attention Tasks', color: '#f59e0b' },
            { step: '7. RETAIN', desc: 'Digital Rx & Care', color: '#38bdf8' },
            { step: '8. REACTIVATE', desc: '90-Day Outreach', color: '#ec4899' }
          ].map((item, idx) => (
            <div
              key={item.step}
              style={{
                padding: '16px 10px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(15,23,42,0.8)',
                border: '1px solid rgba(255,255,255,0.08)',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: item.color, marginBottom: 4 }}>
                {item.step}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Grid: Pain Points vs CareFlow Solutions */}
      <section style={{ padding: '60px 24px 100px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: 12 }}>
            Why Modern Clinics Switch to CareFlow
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
            Transform clinical inefficiencies into predictable revenue and happier patients.
          </p>
        </div>

        <div className="grid-2">
          {/* Pain Points Card */}
          <div
            style={{
              padding: 32,
              borderRadius: 'var(--radius-xl)',
              background: 'rgba(239, 68, 68, 0.04)',
              border: '1px solid rgba(239, 68, 68, 0.2)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#f87171', fontWeight: 800, fontSize: '1.2rem', marginBottom: 20 }}>
              <ShieldAlert size={22} />
              Stop Losing Patients Because Of:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                "Missed Calls & Slow Inquiries: Prospective patients book competitors when reception is busy.",
                "High No-Show Rates: Up to 20-30% of booked slots remain empty with zero revenue.",
                "Forgotten Follow-ups: Chronic & post-op patients drop off without continuity of care.",
                "Uncontacted Social Leads: Instagram & Google leads go cold within 4 hours.",
                "Manual Receptionist Overload: Staff buried under repetitive timing and fee queries."
              ].map((text, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.9rem', color: '#cbd5e1' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', marginTop: 7, flexShrink: 0 }} />
                  <div>{text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CareFlow Solutions Card */}
          <div
            style={{
              padding: 32,
              borderRadius: 'var(--radius-xl)',
              background: 'rgba(16, 185, 129, 0.04)',
              border: '1px solid rgba(16, 185, 129, 0.2)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#34d399', fontWeight: 800, fontSize: '1.2rem', marginBottom: 20 }}>
              <CheckCircle2 size={22} />
              CareFlow Automatically:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                "Captures & Converts Inbound Leads 24x7 via WhatsApp AI Receptionist.",
                "Recovers Missed Appointments with automated instant re-booking prompts.",
                "Dispatches 24h & 2h Smart WhatsApp reminders with 1-click confirmation.",
                "Re-engages Inactive Patients (>90 days) with compliant personalized check-ins.",
                "Shows Real Business ROI with exact database-calculated recovered revenue in ₹."
              ].map((text, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.9rem', color: '#cbd5e1' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', marginTop: 7, flexShrink: 0 }} />
                  <div>{text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div
          style={{
            marginTop: 48,
            padding: '40px',
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(99,102,241,0.15))',
            border: '1px solid rgba(14,165,233,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 6 }}>
              Ready to Automate Your Clinic's Growth?
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
              Experience the complete patient journey walkthrough in under 2 minutes.
            </p>
          </div>
          <button className="btn btn-emerald btn-lg" onClick={startDemoMode}>
            <Zap size={18} /> Launch Interactive Demo Walkthrough
          </button>
        </div>
      </section>
    </div>
  );
};
