import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Video, MapPin, Clock, X, RefreshCw } from 'lucide-react';

export const PatientAppointments = () => {
  const { appointments, addToast } = useApp();
  const patientId = 'pat-101';
  
  const myAppointments = appointments.filter(a => a.patientId === patientId).sort((a, b) => new Date(b.date) - new Date(a.date));
  
  const upcoming = myAppointments.filter(a => new Date(a.date) >= new Date() && a.status !== 'CANCELLED');
  const past = myAppointments.filter(a => new Date(a.date) < new Date() || a.status === 'CANCELLED');

  const handleDemoAction = (action) => {
    addToast({
      title: 'Demo Action',
      message: `Prototype Flow: ${action} request would be sent to the clinic.`,
      type: 'info'
    });
  };

  const AppointmentCard = ({ apt, isUpcoming }) => (
    <div className="cf-card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span className={`badge ${apt.status === 'COMPLETED' ? 'badge-emerald' : apt.status === 'NO_SHOW' ? 'badge-crimson' : apt.status === 'CANCELLED' ? 'badge-muted' : 'badge-primary'}`}>
              {apt.status}
            </span>
            {apt.type === 'TELEHEALTH' && <span className="badge badge-indigo"><Video size={10} style={{ marginRight: 4 }}/> Telehealth</span>}
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
            {new Date(apt.date).toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>
            <Clock size={14} /> {apt.time} ({apt.duration} mins)
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{apt.doctorName}</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{apt.department}</div>
        </div>
      </div>
      
      <div style={{ padding: '12px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
        <strong>Reason for visit:</strong> {apt.reason}
      </div>

      {isUpcoming && (
        <div style={{ display: 'flex', gap: 12, borderTop: '1px solid var(--border-color)', paddingTop: 16 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => handleDemoAction('Reschedule')}>
            <RefreshCw size={14} /> Request Reschedule
          </button>
          <button className="btn btn-danger btn-sm" onClick={() => handleDemoAction('Cancellation')}>
            <X size={14} /> Cancel
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="page-wrapper" style={{ maxWidth: 800, margin: '0 auto' }}>
      <div className="page-header">
        <div className="page-title"><Calendar size={20} color="var(--primary)" /> My Appointments</div>
        <div className="cf-demo-notice" style={{ marginBottom: 0 }}>Sample Patient Data</div>
      </div>

      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: 16, color: 'var(--text-main)' }}>Upcoming Appointments</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {upcoming.length > 0 ? upcoming.map(apt => <AppointmentCard key={apt.id} apt={apt} isUpcoming={true} />) : (
            <div className="cf-empty-state"><div className="cf-empty-title">No upcoming appointments</div></div>
          )}
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '1.1rem', marginBottom: 16, color: 'var(--text-main)' }}>Past Appointments</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {past.length > 0 ? past.map(apt => <AppointmentCard key={apt.id} apt={apt} isUpcoming={false} />) : (
            <div className="cf-empty-state"><div className="cf-empty-title">No past appointments</div></div>
          )}
        </div>
      </div>
    </div>
  );
};
