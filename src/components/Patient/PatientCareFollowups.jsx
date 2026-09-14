import React from 'react';
import { useApp } from '../../context/AppContext';
import { Stethoscope, CheckCircle2, Clock } from 'lucide-react';

export const PatientCareFollowups = () => {
  const { tasks } = useApp();
  const patientId = 'pat-101';
  
  const followUps = tasks.filter(t => t.patientId === patientId);

  return (
    <div className="page-wrapper" style={{ maxWidth: 800, margin: '0 auto' }}>
      <div className="page-header">
        <div className="page-title"><Stethoscope size={20} color="var(--primary)" /> Care & Follow-ups</div>
        <div className="cf-demo-notice" style={{ marginBottom: 0 }}>Sample Patient Data</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {followUps.length > 0 ? followUps.map(f => (
          <div key={f.id} className="cf-card" style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ marginTop: 4 }}>
              {f.status === 'TODO' ? <Clock size={24} color="var(--color-warning-text)" /> : <CheckCircle2 size={24} color="var(--color-success-text)" />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-main)' }}>{f.title}</div>
                <span className={`badge ${f.status === 'TODO' ? 'badge-amber' : 'badge-emerald'}`}>
                  {f.status === 'TODO' ? 'Pending' : 'Completed'}
                </span>
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 12 }}>
                Due Date: {new Date(f.dueDate).toLocaleDateString('en-IN')}
              </div>
              
              {f.status === 'TODO' && (
                <div style={{ padding: '12px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--color-warning-text)', fontSize: '0.85rem' }}>
                  Please ensure you complete this follow-up as advised by your care team.
                </div>
              )}
            </div>
          </div>
        )) : (
          <div className="cf-empty-state"><div className="cf-empty-title">No pending follow-ups</div></div>
        )}
      </div>
    </div>
  );
};
