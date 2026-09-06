import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Zap,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  X,
  MessageSquareText,
  Calendar,
  UserCheck,
  Stethoscope,
  Pill,
  FileSpreadsheet,
  Star,
  Repeat,
  Bot,
  TrendingUp,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const InteractiveDemoModal = () => {
  const {
    isDemoModalOpen,
    closeDemoMode,
    demoStep,
    nextDemoStep,
    prevDemoStep,
    setDemoStep,
    setActiveView
  } = useApp();

  if (!isDemoModalOpen) return null;

  const steps = [
    {
      step: 1,
      title: "1. Inbound Patient Query via WhatsApp / Web",
      category: "PATIENT ACQUISITION",
      icon: MessageSquareText,
      color: "#0ea5e9",
      description: "A new prospective patient (Rohan Kapoor) sends an inquiry after seeing a clinic post: 'Hi, I have severe acne breakouts and need a dermatologist consultation.'",
      simulation: {
        type: "CHAT",
        sender: "Patient (Rohan Kapoor)",
        text: "Hi, I have severe acne breakouts on my face and need a dermatologist consultation."
      },
      takeaway: "CareFlow captures every inquiry instantly 24x7 without letting leads go cold."
    },
    {
      step: 2,
      title: "2. Instant AI Receptionist Engagement (< 3 Seconds)",
      category: "AI RECEPTIONIST",
      icon: Bot,
      color: "#25D366",
      description: "CareFlow's Administrative AI Receptionist analyzes the clinical intent (Dermatology) and responds instantly within safe non-clinical boundaries.",
      simulation: {
        type: "CHAT_AI",
        sender: "CareFlow AI Receptionist",
        text: "Hello Rohan! Welcome to Apex Healthcare. Our Senior Dermatologist Dr. Priya Nair (MD, DVL) specializes in acne management. The consultation fee is ₹1,000.\n\nWould you like to check today's available slots?"
      },
      takeaway: "Receptionist workload is cut by 80% with instantaneous personalized responses."
    },
    {
      step: 3,
      title: "3. Live Doctor Availability & Slot Matching",
      category: "SMART SCHEDULING",
      icon: Calendar,
      color: "#6366f1",
      description: "The AI checks Dr. Priya Nair's real-time OPD roster and offers immediate interactive booking slots.",
      simulation: {
        type: "SLOTS",
        slots: ["Today at 5:30 PM (OPD 104)", "Tomorrow at 11:00 AM (OPD 104)"]
      },
      takeaway: "Zero double-bookings with bi-directional Google Calendar and clinic roster sync."
    },
    {
      step: 4,
      title: "4. One-Click Lead-to-Appointment Conversion",
      category: "CRM CONVERSION",
      icon: CheckCircle2,
      color: "#10b981",
      description: "Patient taps 'Today at 5:30 PM'. CareFlow converts the anonymous lead into a registered patient with appointment #APT-2026-0906-04.",
      simulation: {
        type: "CARD",
        title: "Appointment Confirmed & Synced",
        detail: "Dr. Priya Nair • Today 5:30 PM • ₹1,000 Fee • Indiranagar Hub"
      },
      takeaway: "Lead conversion rate jumps to 41.2% with frictionless automated booking."
    },
    {
      step: 5,
      title: "5. Real-Time Clinic Operations Dashboard Sync",
      category: "CLINICAL OPS",
      icon: Stethoscope,
      color: "#0ea5e9",
      description: "The appointment appears on the clinic reception dashboard with an ESI triage score, patient history placeholder, and doctor OPD queue.",
      simulation: {
        type: "DASHBOARD_PREVIEW",
        queue: "Indiranagar Flagship Hub • OPD 104: Dr. Priya Nair • Next Patient: Rohan Kapoor"
      },
      takeaway: "Front desk staff have 100% visibility of today's arrival pipeline."
    },
    {
      step: 6,
      title: "6. Automated WhatsApp 24h & 2h Reminders",
      category: "NO-SHOW PREVENTION",
      icon: MessageSquareText,
      color: "#25D366",
      description: "Automated WhatsApp confirmation with Google Maps direction link and 1-tap confirmation button [Confirm] / [Reschedule].",
      simulation: {
        type: "CHAT_AI",
        sender: "CareFlow Automation",
        text: "Namaste Rohan! Reminder: Your consult with Dr. Priya Nair is at 5:30 PM today at Apex Indiranagar. Location: https://maps.app/apex"
      },
      takeaway: "Pre-appointment reminders reduce clinic no-show rate from 28% to under 8%."
    },
    {
      step: 7,
      title: "7. Patient Consult & EHR SOAP Note Logging",
      category: "CLINICAL EHR",
      icon: UserCheck,
      color: "#6366f1",
      description: "Patient arrives at OPD 104. Dr. Priya logs clinical findings, diagnosis (Cystic Acne L70.0), and treatment plan in CareFlow EHR 360°.",
      simulation: {
        type: "SOAP_NOTE",
        subjective: "Cystic acne on cheeks and forehead for 3 months.",
        assessment: "Acne Vulgaris Grade III (ICD-10 L70.0)",
        plan: "Topical Retinoid + Oral Clindamycin 10 days"
      },
      takeaway: "Fast structured clinical documentation without administrative clutter."
    },
    {
      step: 8,
      title: "8. e-Prescription with Real-Time Allergy Safety Intercept",
      category: "PATIENT SAFETY",
      icon: Pill,
      color: "#ec4899",
      description: "Doctor generates digital prescription. CareFlow's safety engine cross-checks contraindications against patient's recorded allergies.",
      simulation: {
        type: "SAFETY_CHECK",
        result: "✅ Allergy Safety Check Passed: 0 Adverse Drug Interactions detected."
      },
      takeaway: "Guarantees clinical safety and eliminates handwritten prescription errors."
    },
    {
      step: 9,
      title: "9. Diagnostic Lab / Scan Order & Upload",
      category: "DIAGNOSTICS",
      icon: FileSpreadsheet,
      color: "#f59e0b",
      description: "Doctor orders Serum Lipid Panel. Lab team uploads findings with automatic red-flagging of abnormal values.",
      simulation: {
        type: "LAB_REPORT",
        report: "Report #RPT-0412: Lipid Profile • Abnormal flag: LDL elevated"
      },
      takeaway: "Seamless lab workflow directly connected to patient dossier."
    },
    {
      step: 10,
      title: "10. Instant Patient Delivery on WhatsApp",
      category: "PATIENT ENGAGEMENT",
      icon: MessageSquareText,
      color: "#25D366",
      description: "Patient instantly receives digital prescription and verified lab reports on WhatsApp with a secure download token.",
      simulation: {
        type: "CHAT_AI",
        sender: "CareFlow Digital Delivery",
        text: "Hi Rohan, your prescription and lab report are ready to download: https://cf.link/rx-895"
      },
      takeaway: "Zero waiting at reception for printouts; 98% patient satisfaction."
    },
    {
      step: 11,
      title: "11. Post-Consultation Feedback & Google Review Request",
      category: "REPUTATION GROWTH",
      icon: Star,
      color: "#fbbf24",
      description: "2 Hours post-visit, CareFlow sends a polite WhatsApp experience rating prompt linking to the clinic's Google Business profile.",
      simulation: {
        type: "REVIEW_PROMPT",
        text: "⭐ 'How was your experience with Dr. Priya Nair today? Rate us on Google!'"
      },
      takeaway: "Clinics using CareFlow gain 4x more 5-star Google reviews every month."
    },
    {
      step: 12,
      title: "12. Follow-Up Scheduling & Daily Receptionist Queue",
      category: "CONTINUITY OF CARE",
      icon: Repeat,
      color: "#0ea5e9",
      description: "A 14-day follow-up is automatically logged in the 'Patients Requiring Attention Today' queue for front-desk tracking.",
      simulation: {
        type: "TASK_CREATED",
        task: "Follow-up due: Rohan Kapoor (Acne 2-week review) on 2026-09-20"
      },
      takeaway: "Follow-up completion jumps by 54%, boosting long-term patient retention."
    },
    {
      step: 13,
      title: "13. No-Show Recovery Engine (When Missed)",
      category: "REVENUE RECOVERY",
      icon: TrendingUp,
      color: "#10b981",
      description: "If another patient (e.g. Vikram Seth) misses an appointment, CareFlow dispatches an interactive WhatsApp recovery link with 1-click rebooking.",
      simulation: {
        type: "RECOVERY_ALERT",
        recovered: "💰 ₹1,100 No-Show Recovered: Patient rebooked for tomorrow morning!"
      },
      takeaway: "72.7% of missed appointments are recovered automatically without human calls."
    },
    {
      step: 14,
      title: "14. AI Business Copilot: Real Revenue & Growth Impact",
      category: "EXECUTIVE ROI",
      icon: Bot,
      color: "#a855f7",
      description: "Clinic owners query the AI Copilot to see exact database-calculated financial metrics and actionable growth recommendations.",
      simulation: {
        type: "COPILOT_SUMMARY",
        stats: "₹64,200 Recovered Revenue • 72.7% Recovery Rate • 41.2% Lead Conversion"
      },
      takeaway: "CareFlow gives clinic owners transparent, measurable commercial value."
    }
  ];

  const current = steps[demoStep - 1];
  const Icon = current.icon;

  const handleFinish = () => {
    try {
      confetti({ particleCount: 120, spread: 100, origin: { y: 0.5 } });
    } catch (_) {}
    closeDemoMode();
    setActiveView('growth');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-content-lg" style={{ background: '#0b1324', borderColor: 'rgba(255,255,255,0.15)' }}>
        {/* Header */}
        <div className="modal-header" style={{ background: '#0d172e' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 34, height: 34, borderRadius: 'var(--radius-sm)', background: current.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon size={18} color="#fff" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#fff' }}>
                CareFlow Interactive Sales Demo Walkthrough
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Step {demoStep} of 14 • Complete Patient Journey & Growth Automation
              </div>
            </div>
          </div>
          <button onClick={closeDemoMode} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div style={{ height: 4, width: '100%', background: 'rgba(255,255,255,0.08)' }}>
          <div style={{ height: '100%', width: `${(demoStep / 14) * 100}%`, background: 'linear-gradient(90deg, #0ea5e9, #10b981)', transition: 'width 0.3s ease' }} />
        </div>

        {/* Step Body */}
        <div className="modal-body" style={{ padding: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span className="badge" style={{ background: `${current.color}22`, color: current.color, border: `1px solid ${current.color}44` }}>
              {current.category}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
              Scenario: Apex Indiranagar Hub
            </span>
          </div>

          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fff', marginBottom: 12 }}>
            {current.title}
          </h2>

          <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: 24 }}>
            {current.description}
          </p>

          {/* Interactive Simulation Frame */}
          <div
            style={{
              padding: 20,
              borderRadius: 'var(--radius-md)',
              background: '#060a12',
              border: '1px solid rgba(255,255,255,0.1)',
              marginBottom: 24
            }}
          >
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
              Live System Simulation:
            </div>

            {current.simulation.type.startsWith('CHAT') ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ padding: '10px 14px', borderRadius: 'var(--radius-md)', background: current.simulation.type === 'CHAT_AI' ? '#0d3b2e' : '#1e293b', border: '1px solid rgba(255,255,255,0.08)', color: '#f8fafc', fontSize: '0.88rem', maxWidth: '85%' }}>
                  <div style={{ fontSize: '0.7rem', color: current.simulation.type === 'CHAT_AI' ? '#34d399' : '#38bdf8', fontWeight: 700, marginBottom: 4 }}>
                    {current.simulation.sender}
                  </div>
                  <div style={{ whiteSpace: 'pre-line' }}>{current.simulation.text}</div>
                </div>
              </div>
            ) : current.simulation.type === 'SLOTS' ? (
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {current.simulation.slots.map((s, i) => (
                  <div key={i} style={{ padding: '10px 16px', borderRadius: 'var(--radius-sm)', background: 'rgba(14,165,233,0.15)', border: '1px solid #0ea5e9', color: '#38bdf8', fontWeight: 700, fontSize: '0.85rem' }}>
                    📅 {s}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: 14, borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.04)', color: '#38bdf8', fontSize: '0.9rem', fontWeight: 600 }}>
                {current.simulation.title || current.simulation.detail || current.simulation.queue || current.simulation.result || current.simulation.report || current.simulation.text || current.simulation.task || current.simulation.recovered || current.simulation.stats}
              </div>
            )}
          </div>

          {/* Key Commercial Takeaway */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 'var(--radius-sm)', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', color: '#34d399', fontSize: '0.86rem', fontWeight: 600 }}>
            <Zap size={16} />
            <span>Commercial Value: {current.takeaway}</span>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="modal-footer" style={{ background: '#0d172e', display: 'flex', justifyContent: 'space-between' }}>
          <button
            className="btn btn-ghost"
            onClick={prevDemoStep}
            disabled={demoStep === 1}
          >
            <ChevronLeft size={16} /> Previous Step
          </button>

          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {steps.map((s) => (
              <div
                key={s.step}
                onClick={() => setDemoStep(s.step)}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: s.step === demoStep ? '#0ea5e9' : 'rgba(255,255,255,0.2)',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>

          {demoStep < 14 ? (
            <button className="btn btn-primary" onClick={nextDemoStep}>
              Next Step <ChevronRight size={16} />
            </button>
          ) : (
            <button className="btn btn-emerald" onClick={handleFinish}>
              Finish Demo & View Growth ROI <Zap size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
