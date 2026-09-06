import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileSpreadsheet,
  Plus,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Sun,
  Contrast,
  Sliders,
  CheckCircle2,
  FileText,
  Search
} from 'lucide-react';

export const DiagnosticsView = () => {
  const { diagnostics, patients, addToast } = useApp();

  const [selectedReport, setSelectedReport] = useState(diagnostics[1] || diagnostics[0]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [isInverted, setIsInverted] = useState(false);

  const resetViewer = () => {
    setZoomLevel(1);
    setBrightness(100);
    setContrast(100);
    setIsInverted(false);
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-title">
            <FileSpreadsheet size={24} color="var(--primary)" />
            <span>Diagnostics, Lab Reports & Radiology Viewer</span>
          </div>
          <div className="page-subtitle">
            Pathology panel results, abnormal value alerting, and interactive radiological scan viewer
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: 24 }}>
        {/* LEFT COLUMN: Reports List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
            Diagnostic Reports ({diagnostics.length})
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {diagnostics.map((d) => {
              const patient = patients.find((p) => p.id === d.patientId);
              const isSelected = selectedReport?.id === d.id;
              return (
                <div
                  key={d.id}
                  onClick={() => { setSelectedReport(d); resetViewer(); }}
                  className="glass-card"
                  style={{
                    padding: 16,
                    cursor: 'pointer',
                    background: isSelected ? 'var(--primary-light)' : 'var(--bg-card)',
                    borderLeft: isSelected ? '4px solid var(--primary)' : '4px solid transparent'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                    <span style={{ fontWeight: 800, fontSize: '0.92rem', color: isSelected ? 'var(--primary)' : 'var(--text-main)' }}>
                      {d.testName}
                    </span>
                    <span className="badge badge-emerald">{d.status}</span>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Patient: <strong>{patient?.name}</strong> • Date: {d.date}
                  </div>

                  {d.abnormalFlag && (
                    <div style={{ marginTop: 8, padding: '4px 8px', borderRadius: 4, background: 'rgba(239,68,68,0.15)', color: '#f87171', fontSize: '0.72rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <AlertTriangle size={12} /> Abnormal Parameters Flagged
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Diagnostic Viewer & Findings */}
        {selectedReport ? (
          <div className="glass-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: 16, marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                  {selectedReport.testName} — Report #{selectedReport.reportNumber}
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>
                  Ordered By: {selectedReport.orderedBy} • Date: {selectedReport.date}
                </div>
              </div>

              {selectedReport.abnormalFlag && (
                <span className="badge badge-crimson" style={{ padding: '6px 12px' }}>
                  <AlertTriangle size={14} /> Attention Needed
                </span>
              )}
            </div>

            {/* If Radiology Scan exists, show interactive scan viewer */}
            {selectedReport.scanImage ? (
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8' }}>
                    Interactive DICOM / Radiological Image Console
                  </div>

                  {/* Image Controls */}
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))} title="Zoom In">
                      <ZoomIn size={14} />
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.2))} title="Zoom Out">
                      <ZoomOut size={14} />
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setIsInverted(!isInverted)} title="Invert Colors">
                      <Contrast size={14} /> Invert
                    </button>
                    <button className="btn btn-ghost btn-sm" onClick={resetViewer}>
                      Reset
                    </button>
                  </div>
                </div>

                {/* Scan Frame */}
                <div style={{ width: '100%', height: 380, borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#000', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <img
                    src={selectedReport.scanImage}
                    alt="Scan Viewer"
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      transform: `scale(${zoomLevel})`,
                      filter: `brightness(${brightness}%) contrast(${contrast}%) ${isInverted ? 'invert(1)' : ''}`,
                      transition: 'transform 0.15s ease'
                    }}
                  />

                  {/* Scan Info Overlay */}
                  <div style={{ position: 'absolute', bottom: 12, left: 12, padding: '4px 10px', background: 'rgba(0,0,0,0.7)', borderRadius: 4, fontSize: '0.72rem', color: '#94a3b8' }}>
                    Zoom: {Math.round(zoomLevel * 100)}% • Mode: {isInverted ? 'Inverted' : 'Standard'}
                  </div>
                </div>
              </div>
            ) : null}

            {/* Findings & Lab Results Table */}
            {selectedReport.findings && (
              <div style={{ padding: 16, borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', marginBottom: 20 }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#fff', marginBottom: 4 }}>
                  Radiologist / Pathologist Clinical Impression:
                </div>
                <div style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                  {selectedReport.findings}
                </div>
              </div>
            )}

            {selectedReport.results && (
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Test Parameter</th>
                      <th>Measured Value</th>
                      <th>Biological Reference Interval</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedReport.results.map((r, i) => (
                      <tr key={i} style={{ background: r.isAbnormal ? 'rgba(239,68,68,0.08)' : 'transparent' }}>
                        <td style={{ fontWeight: 700, color: r.isAbnormal ? '#f87171' : 'var(--text-main)' }}>
                          {r.parameter}
                        </td>
                        <td style={{ fontWeight: 800, color: r.isAbnormal ? '#ef4444' : '#10b981' }}>
                          {r.value}
                        </td>
                        <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {r.normalRange}
                        </td>
                        <td>
                          <span className={`badge ${r.isAbnormal ? 'badge-crimson' : 'badge-emerald'}`}>
                            {r.isAbnormal ? 'ABNORMAL' : 'NORMAL'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
