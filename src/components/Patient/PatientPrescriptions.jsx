import React from 'react';
import { useApp } from '../../context/AppContext';
import { Pill, AlertTriangle } from 'lucide-react';

export const PatientPrescriptions = () => {
  const { data } = useApp();
  const patientId = 'pat-101';
  
  const prescriptions = data.prescriptions ? data.prescriptions.filter(p => p.patientId === patientId).sort((a, b) => new Date(b.date) - new Date(a.date)) : [];

  return (
    <div className="page-wrapper" style={{ maxWidth: 800, margin: '0 auto' }}>
      <div className="page-header">
        <div className="page-title"><Pill size={20} color="var(--color-success-text)" /> Prescriptions</div>
        <div className="cf-demo-notice" style={{ marginBottom: 0 }}>Sample Patient Data</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {prescriptions.length > 0 ? prescriptions.map(rx => (
          <div key={rx.id} className="cf-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 4 }}>
                  Prescription {rx.rxNumber}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Issued on {new Date(rx.date).toLocaleDateString('en-IN')}
                </div>
              </div>
              <span className={`badge ${rx.dispenseStatus === 'DISPENSED' ? 'badge-emerald' : 'badge-primary'}`}>
                {rx.dispenseStatus.replace(/_/g, ' ')}
              </span>
            </div>
            
            <div style={{ marginBottom: 20 }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Diagnosis</span>
              <div style={{ marginTop: 4, color: 'var(--text-main)', fontWeight: 500 }}>{rx.diagnosis}</div>
            </div>

            {rx.warnings && rx.warnings.length > 0 && (
              <div style={{ padding: '8px 12px', background: 'var(--color-warning-bg)', border: '1px solid var(--color-warning-border)', borderRadius: 'var(--radius-sm)', color: 'var(--color-warning-text)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <AlertTriangle size={14} /> {rx.warnings.join(', ')}
              </div>
            )}

            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 8 }}>Medications</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {rx.medicines.map((med, i) => (
                <div key={i} style={{ padding: '12px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{med.name}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{med.duration}</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: '0.85rem' }}>
                    <div>
                      <span style={{ color: 'var(--text-dim)' }}>Dosage:</span> <span style={{ color: 'var(--text-main)' }}>{med.dosage}</span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-dim)' }}>Frequency:</span> <span style={{ color: 'var(--text-main)' }}>{med.frequency}</span>
                    </div>
                  </div>
                  {med.instructions && (
                    <div style={{ marginTop: 8, fontSize: '0.85rem', color: 'var(--primary)' }}>
                      <strong>Note:</strong> {med.instructions}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )) : (
          <div className="cf-empty-state"><div className="cf-empty-title">No prescriptions available</div></div>
        )}
      </div>
    </div>
  );
};
