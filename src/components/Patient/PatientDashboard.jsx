import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Stethoscope, AlertCircle, FileText, Pill, CreditCard, ChevronRight, Activity, Bot } from 'lucide-react';

export const PatientDashboard = () => {
  const { appointments, tasks, invoices, setActiveView, currentUser, addToast } = useApp();
  
  // Filter data for the demo patient (Suresh Narayanan - pat-101)
  const patientId = 'pat-101';
  
  const upcomingAppointments = appointments
    .filter(a => a.patientId === patientId && new Date(a.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date));
    
  const nextAppointment = upcomingAppointments[0];
  
  const pendingTasks = tasks.filter(t => t.patientId === patientId && t.status === 'TODO');
  const pendingInvoices = invoices.filter(i => i.patientId === patientId && i.status === 'PENDING');

  return (
    <div className="page-wrapper" style={{ maxWidth: 900, margin: '0 auto' }}>
      
      {/* Welcome Section */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: 4 }}>
          Good morning, {currentUser.name.split(' ')[0]}
        </h1>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          CareFlow Patient Portal <span className="badge badge-muted" style={{ marginLeft: 8 }}>Demo Data</span>
        </div>
      </div>

      <div className="grid-2" style={{ gridTemplateColumns: '2fr 1fr', gap: 20, alignItems: 'start' }}>
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Next Appointment Card */}
          <div className="cf-card" style={{ padding: '24px' }}>
            <div className="cf-section-header" style={{ marginBottom: 16 }}>Next Appointment</div>
            
            {nextAppointment ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: 4 }}>
                    {new Date(nextAppointment.date).toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })} at {nextAppointment.time}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 2 }}>
                    with {nextAppointment.doctorName}
                  </div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                    <span className="badge badge-primary">{nextAppointment.type === 'TELEHEALTH' ? 'Telehealth Video Call' : 'In-Person Clinic Visit'}</span>
                    <span className="badge badge-muted">{nextAppointment.department}</span>
                  </div>
                </div>
                <button 
                  className="btn btn-primary"
                  onClick={() => setActiveView('patient-appointments')}
                >
                  View Details
                </button>
              </div>
            ) : (
              <div className="cf-empty-state" style={{ padding: '20px 0' }}>
                <div className="cf-empty-title">No upcoming appointments</div>
                <button 
                  className="btn btn-primary btn-sm" 
                  style={{ marginTop: 12 }}
                  onClick={() => addToast({ title: 'Demo Action', message: 'Prototype Flow: Appointment request would be sent to the clinic.', type: 'info' })}
                >
                  Request Appointment
                </button>
              </div>
            )}
          </div>

          {/* Action Required */}
          <div className="cf-card">
            <div className="cf-section-header">Action Required</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
              {pendingInvoices.length > 0 && (
                <div className="cf-attention-item priority-high">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <CreditCard size={18} color="var(--color-critical-text)" />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Pending Payment</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>₹{pendingInvoices[0].amount} due for previous consultation</div>
                    </div>
                  </div>
                  <button className="btn btn-danger btn-sm" onClick={() => setActiveView('patient-billing')}>Pay Now</button>
                </div>
              )}
              
              {pendingTasks.map(task => (
                <div key={task.id} className="cf-attention-item priority-medium">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <AlertCircle size={18} color="var(--color-warning-text)" />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{task.title}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Due: {new Date(task.dueDate).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <button className="btn btn-secondary btn-sm" onClick={() => setActiveView('patient-followups')}>View Details</button>
                </div>
              ))}

              {pendingInvoices.length === 0 && pendingTasks.length === 0 && (
                <div style={{ color: 'var(--color-success-text)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Activity size={16} /> All caught up! No actions required.
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="cf-card" style={{ padding: '24px' }}>
            <div className="cf-section-header" style={{ marginBottom: 16 }}>Recent Activity</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'relative' }}>
              
              <div style={{ position: 'absolute', left: '11px', top: '24px', bottom: '24px', width: '2px', background: 'var(--border-color)', zIndex: 0 }}></div>
              
              <div style={{ display: 'flex', gap: 16, zIndex: 1, position: 'relative' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--bg-surface)', border: '2px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Calendar size={12} color="var(--primary)" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-main)' }}>Cardiology Consultation Completed</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Dr. Arvind Swaminathan • Sep 02, 2026</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16, zIndex: 1, position: 'relative' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--bg-surface)', border: '2px solid var(--color-success-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Pill size={12} color="var(--color-success-text)" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-main)' }}>Prescription Added</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>RX-2026-0906-01 (3 medications) • Sep 06, 2026</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16, zIndex: 1, position: 'relative' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--bg-surface)', border: '2px solid var(--color-info-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FileText size={12} color="var(--color-info-text)" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-main)' }}>Diagnostic Report Available</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Comprehensive Lipid Profile • Sep 06, 2026</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Your Care Links */}
          <div className="cf-card" style={{ padding: '20px' }}>
            <div className="cf-section-header">Your Care</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
              
              <button className="btn btn-ghost" style={{ justifyContent: 'space-between', padding: '12px', border: '1px solid var(--border-color)' }} onClick={() => setActiveView('patient-appointments')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Calendar size={16} color="var(--primary)" /> Appointments
                </div>
                <ChevronRight size={16} />
              </button>

              <button className="btn btn-ghost" style={{ justifyContent: 'space-between', padding: '12px', border: '1px solid var(--border-color)' }} onClick={() => setActiveView('patient-followups')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Stethoscope size={16} color="var(--color-warning-text)" /> Care & Follow-ups
                </div>
                <ChevronRight size={16} />
              </button>

              <button className="btn btn-ghost" style={{ justifyContent: 'space-between', padding: '12px', border: '1px solid var(--border-color)' }} onClick={() => setActiveView('patient-diagnostics')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <FileText size={16} color="var(--color-info-text)" /> Diagnostics
                </div>
                <ChevronRight size={16} />
              </button>

              <button className="btn btn-ghost" style={{ justifyContent: 'space-between', padding: '12px', border: '1px solid var(--border-color)' }} onClick={() => setActiveView('patient-prescriptions')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Pill size={16} color="var(--color-success-text)" /> Prescriptions
                </div>
                <ChevronRight size={16} />
              </button>

            </div>
          </div>

          {/* Care Assistant Quick Box */}
          <div className="cf-card" style={{ background: 'var(--color-ai-bg)', borderColor: 'var(--color-ai-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Bot size={18} color="var(--color-ai-text)" />
              <div style={{ fontWeight: 700, color: 'var(--color-ai-text)' }}>Care Assistant</div>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 16 }}>
              Have questions about your appointment or need help navigating CareFlow?
            </div>
            <button 
              className="btn btn-ai" 
              style={{ width: '100%' }}
              onClick={() => setActiveView('patient-care-assistant')}
            >
              Ask Care Assistant
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
