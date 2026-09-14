import React from 'react';
import { useApp } from '../../context/AppContext';
import { FileSpreadsheet, Download, AlertTriangle } from 'lucide-react';

export const PatientDiagnostics = () => {
  const { data } = useApp();
  const patientId = 'pat-101';
  
  // Need to safely access diagnostics if they exist, otherwise fallback to empty array
  const diagnostics = data.diagnostics ? data.diagnostics.filter(d => d.patientId === patientId) : [];

  return (
    <div className="page-wrapper" style={{ maxWidth: 800, margin: '0 auto' }}>
      <div className="page-header">
        <div className="page-title"><FileSpreadsheet size={20} color="var(--primary)" /> Diagnostics</div>
        <div className="cf-demo-notice" style={{ marginBottom: 0 }}>Sample Patient Data</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {diagnostics.length > 0 ? diagnostics.map(diag => (
          <div key={diag.id} className="cf-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 4 }}>{diag.testName}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Ordered by {diag.orderedBy} • {new Date(diag.date).toLocaleDateString('en-IN')}
                </div>
              </div>
              <button className="btn btn-secondary btn-sm"><Download size={14} /> Download PDF</button>
            </div>
            
            {diag.abnormalFlag && (
              <div style={{ padding: '8px 12px', background: 'var(--color-warning-bg)', border: '1px solid var(--color-warning-border)', borderRadius: 'var(--radius-sm)', color: 'var(--color-warning-text)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <AlertTriangle size={14} /> This report contains out-of-range values. Please consult your doctor.
              </div>
            )}
            
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Result</th>
                    <th>Reference Range</th>
                  </tr>
                </thead>
                <tbody>
                  {diag.results && diag.results.map((res, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 500 }}>{res.parameter}</td>
                      <td style={{ color: res.isAbnormal ? 'var(--color-critical-text)' : 'var(--text-main)', fontWeight: res.isAbnormal ? 700 : 400 }}>
                        {res.value} {res.isAbnormal && <span className="badge badge-crimson" style={{ marginLeft: 6 }}>High</span>}
                      </td>
                      <td style={{ color: 'var(--text-muted)' }}>{res.normalRange}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )) : (
          <div className="cf-empty-state"><div className="cf-empty-title">No diagnostic reports available</div></div>
        )}
      </div>
    </div>
  );
};
